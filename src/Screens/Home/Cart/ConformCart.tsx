import React, { useEffect, useState } from 'react';
import { Animated, Image, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../../constant/Colors';
import { FONTS } from '../../../constant/Fonts';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { cartData} from '../../../data/data';
import Icon from '@react-native-vector-icons/material-icons';
import { RootStackParamList } from '../../../../App';

// Define the type for the product data
interface Product {
    id: string;
    product_name: string;
    price: number;
    quantity: number;
    images: string[];
}

const ConformCart: React.FC = () => {
    const [data, setData] = useState<Product[]>([]);
    const [totalQuantity, setTotalQuantity] = useState<number>(0);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [showPopup, setShowPopup] = useState(false);
    const popupHeight = useState(new Animated.Value(0))[0];
    const navigation:RootStackParamList = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(cartData);
                const allData = response.data;
                const filteredData = allData.filter((item: { category: string; }) => item.category === 'selectProduct');
                setData(filteredData);
                calculateTotals(filteredData);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        };
        fetchData();
    }, []);

    const updateQuantity = (index: number, increment: boolean) => {
        const updatedData = [...data];
        const item = updatedData[index];
        if (increment) {
            item.quantity += 1;
        } else if (item.quantity > 1) {
            item.quantity -= 1;
        }
        setData(updatedData);
        calculateTotals(updatedData);
    };

    const deleteItem = (index: number) => {
        const updatedData = data.filter((_, i) => i !== index);
        setData(updatedData);
        calculateTotals(updatedData);
    };

    const calculateTotals = (items: Product[]) => {
        const quantity = items.reduce((acc, item) => acc + item.quantity, 0);
        const amount = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        setTotalQuantity(quantity);
        setTotalAmount(amount);
    };

    const togglePopup = () => {
        setShowPopup(!showPopup);
        Animated.timing(popupHeight, {
            toValue: showPopup ? 0 : 510,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headertext}>Your Cart</Text>
            </View>

            <ScrollView
                style={styles.scrollView}
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                <View>
                    {data.map((item, index) => (
                        <View key={index} style={styles.cartview}>
                            <View style={styles.imageView}>
                                <Image
                                    // source={{ uri: item.thumpline }}
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
                                        <Icon name='favorite-border' size={22} color={COLORS.textTwo} />
                                        <TouchableOpacity onPress={() => deleteItem(index)}>
                                            <Icon name='delete-outline' size={22} color={COLORS.textTwo} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.checkOuView}>
                <TouchableOpacity
                    onPress={() => { togglePopup(); }}
                    style={styles.checkOutTouch}>
                    <Text style={styles.checkOutText}>Check Out</Text>
                </TouchableOpacity>
            </View>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <Animated.View style={[styles.popupview, { height: popupHeight }]}>
                    <TouchableOpacity
                        style={styles.popupreturn}
                        onPress={() => { togglePopup(); }}>
                        <View style={styles.popupreturnline}></View>
                    </TouchableOpacity>

                    <View style={styles.cuponView}>
                        <TextInput
                            style={styles.cupon}
                            placeholder='Enter Cupon Code'
                            placeholderTextColor={COLORS.textTwo}
                        />
                        <TouchableOpacity style={styles.cuponApplyView}>
                            <Text style={styles.cuponApplyText}>Apply</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.paymentViews}>
                        <View style={styles.paymentView}>
                            <Text style={styles.paymentText}>items ({totalQuantity})</Text>
                            <Text style={styles.paymentText}>$ {totalAmount.toFixed(2)}</Text>
                        </View>
                        <View style={styles.paymentView}>
                            <Text style={styles.paymentText}>Shipping</Text>
                            <Text style={styles.paymentText}>$ 50.00</Text>
                        </View>
                        <View style={styles.paymentView}>
                            <Text style={styles.paymentText}>Import charges</Text>
                            <Text style={styles.paymentText}>$ 128.00</Text>
                        </View>
                        <View style={styles.totelView}>
                            <Text style={styles.totelText}>Total Price</Text>
                            <Text style={styles.totelTextAmount}>$ {(totalAmount + 50 + 128).toFixed(2)}</Text>
                        </View>
                    </View>

                    <View style={styles.checkOuView}>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('ShipTo') }}
                            style={styles.checkOutTouch}>
                            <Text style={styles.checkOutText}>Check Out</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            </KeyboardAvoidingView>
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
        borderWidth:1,
        borderColor:COLORS.inputBorderColor,
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
    checkOuView: {
        flex: 0.1,
        justifyContent: 'center',
    },
    checkOutTouch: {
        backgroundColor: COLORS.buttonBackgrountColor,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
        marginHorizontal: 20,
        borderRadius: 10,
    },
    checkOutText: {
        color: COLORS.buttonTextColor,
        fontSize: FONTS.subheader,
    },


    popupview: {
        backgroundColor: COLORS.backgroundColor,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        overflow: 'hidden',
        borderColor: COLORS.inputBorderColor,
        borderWidth: 2,
        paddingHorizontal: 20,
        justifyContent: 'space-evenly'
    },
    popupreturn: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    popupreturnline: {
        backgroundColor: COLORS.inputBorderColor,
        paddingVertical: 5,
        paddingHorizontal: 50,
        borderRadius: 50
    },

    cuponView: {
        flex: 0.1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        borderColor: COLORS.inputBorderColor,
        borderWidth: 1,
        borderRadius: 10,

    },
    cupon: {
        width: '75%',
        color:COLORS.textTwo,
    },

    cuponApplyView: {
        backgroundColor: COLORS.buttonBackgrountColor,
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomEndRadius: 10,
        borderTopEndRadius: 10,
    },
    cuponApplyText: {
        color: COLORS.buttonTextColor,
        fontSize: FONTS.subheader,
    },

    paymentViews: {
        flex: 0.6,
        justifyContent: 'space-evenly',
        borderWidth: 1,
        borderColor: COLORS.inputBorderColor,
        borderRadius:10,
    },
    paymentView: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    paymentText:{
        fontSize: FONTS.subheader,
        color:COLORS.textTwo
    },
    totelView:{
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        borderTopWidth:2,
        borderStyle: 'dashed',
        borderColor:COLORS.inputBorderColor,
    },
    totelText:{
        fontSize: FONTS.header,
        color:COLORS.text,
        fontWeight:'bold',
    },
    totelTextAmount:{
        fontSize: FONTS.header,
        color:COLORS.buttonBackgrountColor  ,
        fontWeight:'bold',
    },
});

export default ConformCart;
