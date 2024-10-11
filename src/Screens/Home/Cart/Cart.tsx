import React, { useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { COLORS } from '../../../constant/Colors';
import { FONTS } from '../../../constant/Fonts';
import { RootStackParamList } from '../../../../App';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { cartData } from '../../../data/data';
import Icon from '@react-native-vector-icons/material-icons';

interface Product {
    id: string;
    product_name: string;
    price: number;
    quantity: number;
    thumpline: any[];
    isFavorite: boolean;
    category?: string; // Make category optional
}

const Cart: React.FC = () => {
    const [data, setData] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showCartButton, setShowCartButton] = useState(false); // New state for button visibility
    const navigation = useNavigation<RootStackParamList>();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await axios.get(cartData);
                setData(response.data);

                // Check if any product has category: 'selectProduct'
                const hasSelectProduct = response.data.some((item: Product) => item.category === 'selectProduct');
                setShowCartButton(hasSelectProduct);
            } catch (error) {
                console.error("Error fetching product data:", error);
                Alert.alert('Error', 'Failed to load data');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const updateQuantity = async (index: number, increment: boolean) => {
        const updatedData = [...data];
        const item = updatedData[index];

        if (increment) {
            item.quantity += 1;
        } else if (item.quantity > 1) {
            item.quantity -= 1;
        } else {
            return; 
        }

        setData(updatedData);

        try {
            const response = await axios.put(`https://65cb4c92efec34d9ed8732bd.mockapi.io/products/${item.id}`, {
                ...item,
                price: item.price * item.quantity
            });

            if (response.status !== 200) {
                Alert.alert('Error', 'Failed to update product quantity');
            }
        } catch (error) {
            console.error("Error updating product quantity:", error);
            Alert.alert('Error', 'Failed to update product quantity');
        }
    };

    const handleDeleteProduct = async (id: string) => {
        try {
            const response = await axios.delete(`https://65cb4c92efec34d9ed8732bd.mockapi.io/products/${id}`);
            if (response.status === 200) {
                Alert.alert('Success', 'Product deleted successfully');
                const updatedData = data.filter(product => product.id !== id);
                setData(updatedData);

                // Check if any remaining product has category: 'selectProduct'
                const hasSelectProduct = updatedData.some((item: Product) => item.category === 'selectProduct');
                setShowCartButton(hasSelectProduct);
            } else {
                Alert.alert('Error', 'Failed to delete product');
            }
        } catch (error) {
            console.error("Error deleting product:", error);
            Alert.alert('Error', 'Failed to delete product');
        }
    };

    const handleToggleFavorite = async (item: Product) => {
        // Implement favorite toggle functionality
    };

    const handleSelectProduct = async (item: Product) => {
        try {
            const response = await axios.put(`https://65cb4c92efec34d9ed8732bd.mockapi.io/products/${item.id}`, {
                ...item,
                category: 'selectProduct'
            });

            if (response.status === 200) {
                Alert.alert('Success', 'Product selected successfully');
                // Update local data
                const updatedData = data.map(p => p.id === item.id ? { ...p, category: 'selectProduct' } : p);
                setData(updatedData);

                // Check if any product has category: 'selectProduct'
                const hasSelectProduct = updatedData.some((item: Product) => item.category === 'selectProduct');
                setShowCartButton(hasSelectProduct);
            } else {
                Alert.alert('Error', 'Failed to update product category');
            }
        } catch (error) {
            console.error("Error updating product category:", error);
            Alert.alert('Error', 'Failed to update product category');
        }
    };

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={COLORS.buttonBackgrountColor} />
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headertext}>Your Cart</Text>
                {showCartButton && (
                    <TouchableOpacity onPress={() => navigation.navigate('ConformCart')}>
                        <Icon name='shopping-cart' size={22} color={COLORS.buttonBackgrountColor} />
                    </TouchableOpacity>
                )}
            </View>

            {data.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Your cart is empty</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Home')}
                        style={styles.emptyButton}
                    >
                        <Text style={styles.emptyButtonText}>Go to Shopping</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <ScrollView
                    style={styles.scrollView}
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View>
                        {data.map((item, index) => (
                            <View key={item.id} style={styles.cartview}>
                                <View style={styles.imageView}>
                                    <Image
                                        // source={{ uri: item.thumpline[0] }}
                                        style={styles.image}
                                    />
                                </View>

                                <View style={styles.container2}>
                                    <View>
                                        <Text style={styles.text}>{item.product_name}</Text>
                                        <Text style={styles.priceText}>$ {item.price * item.quantity}</Text>
                                    </View>
                                    <View style={styles.addContainor}>
                                        <View style={styles.AddButtonView}>
                                            <TouchableOpacity
                                                onPress={() => updateQuantity(index, false)}
                                                style={styles.addLessIcon}
                                            >
                                                <Text style={styles.addLessText}> - </Text>
                                            </TouchableOpacity>
                                            <Text style={styles.addLessTextNum}>{item.quantity}</Text>
                                            <TouchableOpacity
                                                onPress={() => updateQuantity(index, true)}
                                                style={styles.addLessIcon}
                                            >
                                                <Text style={styles.addLessText}> + </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.iconButtonView}>
                                            <TouchableOpacity onPress={() => handleToggleFavorite(item)}>
                                                <Icon name={item.isFavorite ? 'favorite' : 'favorite-border'} size={22} color={COLORS.textTwo} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => handleDeleteProduct(item.id)}>
                                                <Icon name='delete-outline' size={22} color={COLORS.textTwo} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={styles.seleteView}>
                                        <TouchableOpacity
                                            onPress={() => handleSelectProduct(item)}
                                            style={styles.seleteProductButton}
                                        >
                                            <Text style={styles.seleteProductText}>Select Product</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
    },
    header: {
        flex: 0.1,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.inputBorderColor,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: COLORS.inputBorderColor,
    },
    headertext: {
        fontSize: FONTS.header,
        color: COLORS.text,
        fontWeight: 'bold',
    },
    scrollView: {
        flex: 1,
        paddingHorizontal: 10,
    },
    cartview: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: COLORS.inputBorderColor,
        borderRadius: 10,
        marginVertical: 10,
        padding: 10,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    imageView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 10,
    },
    container2: {
        flex: 2,
        justifyContent: 'space-between',
    },
    text: {
        color: COLORS.text,
        fontSize: FONTS.subheader,
    },
    priceText: {
        color: COLORS.buttonBackgrountColor,
        fontSize: FONTS.subheader,
    },
    addContainor: {
        flexDirection: 'row',
        marginVertical: 10,
        justifyContent: 'space-between',
    },
    AddButtonView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.inputBorderColor,
        width: '50%',
    },
    addLessIcon: {
        fontSize: FONTS.body,
        backgroundColor: COLORS.textTwo,
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    addLessTextNum: {
        fontSize: FONTS.subheader,
        color: COLORS.text,
        borderRadius: 5,
    },
    addLessText: {
        fontSize: FONTS.body,
        color: COLORS.text,
        borderRadius: 5,
        paddingVertical: 5,
    },
    iconButtonView: {
        width: '40%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    seleteView: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.buttonBackgrountColor,
        paddingVertical: 10,
        borderRadius: 10,
    },
    seleteProductButton: {
    },
    seleteProductText: {
        fontSize: FONTS.subheader,
        color: COLORS.buttonTextColor,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: FONTS.subheader,
        color: COLORS.text,
        marginBottom: 10,
    },
    emptyButton: {
        backgroundColor: COLORS.buttonBackgrountColor,
        padding: 10,
        borderRadius: 5,
    },
    emptyButtonText: {
        fontSize: FONTS.subheader,
        color: COLORS.buttonTextColor,
    },
});

export default Cart;
