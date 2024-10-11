import Icon from 'react-native-vector-icons/MaterialIcons';
import React, { useEffect, useState } from 'react';
import {
    FlatList, KeyboardAvoidingView, Platform, SafeAreaView,
    ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View
} from 'react-native';
import { FONTS } from '../../../constant/Fonts';
import { COLORS } from '../../../constant/Colors';
import { RootStackParamList } from '../../../../App';
import { useNavigation } from '@react-navigation/native';
import { Api_Data } from '../../../data/data';

const CategoryIcons = [
    { name: 'Men', icon: 'person' },
    { name: 'Women', icon: 'person-2' },
    { name: 'Work Equipment', icon: 'work' },
    { name: 'Furniture', icon: 'weekend' },
    { name: 'Electronics', icon: 'local-see' },
    { name: 'Sports', icon: 'sports-kabaddi' },
    { name: 'Woman Bag', icon: 'shopping-bag' },
    { name: 'Woman Pants', icon: 'fastfood' },
    { name: 'Cameras', icon: 'camera' },
    { name: 'Gift Card', icon: 'card-giftcard' },
];

const Explore: React.FC = () => {
    const [isFocused, setIsFocused] = useState(false);
    const [products, setProducts] = useState<{ title: string }[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState<{ title: string }[]>([]);
    const Navigation: RootStackParamList = useNavigation();

    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(Api_Data);
                const data = await response.json();
                setProducts(data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (searchTerm) {
            setFilteredProducts(
                products.filter(product =>
                    product.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        } else {
            setFilteredProducts([]);
        }
    }, [searchTerm, products]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={style.container}
        >
            <SafeAreaView style={style.safeArea}>
                <View style={style.header}>
                    <View style={style.input_container}>
                        <View style={[style.inputView, isFocused && style.focusedInput]}>
                            <Icon name="search" size={24} color={COLORS.buttonBackgrountColor} />
                            <TextInput
                                style={style.input}
                                placeholder="Search"
                                placeholderTextColor={COLORS.textTwo}
                                value={searchTerm}
                                onChangeText={setSearchTerm}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                            />
                        </View>
                        {searchTerm && filteredProducts.length > 0 && (
                            <View style={style.suggestionsContainer}>
                                <FlatList
                                    data={filteredProducts}
                                    keyExtractor={(item) => item.title}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            style={style.suggestionItem}
                                            onPress={() => {
                                                setSearchTerm(item.title);
                                                setFilteredProducts([]);
                                            }}
                                        >
                                            <Text style={style.suggestionText}>{item.title}</Text>
                                        </TouchableOpacity>
                                    )}
                                />
                            </View>
                        )}
                    </View>
                    <View style={style.Icons_view}>
                        <TouchableOpacity onPress={() => Navigation.navigate('Favorite')}>
                            <Icon name="favorite-border" size={24} style={style.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Navigation.navigate('Notification')}>
                            <Icon name="notifications-none" size={24} style={style.icon} />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                    style={style.scrollView}>
                    {CategoryIcons.map((item, index) => (
                        <TouchableOpacity key={index} style={style.item}>
                            <View style={style.iconview} >
                                <Icon name={item.icon} size={20} color={COLORS.buttonBackgrountColor} />
                            </View>

                            <Text style={style.text}>{item.name}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
    },
    safeArea: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    header: {
        flexDirection: 'row',
        borderBottomColor: COLORS.inputBorderColor,
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    input_container: {
        flex: 3,
        justifyContent: 'center',
    },
    inputView: {
        flexDirection: 'row',
        borderColor: COLORS.inputBorderColor,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    focusedInput: {
        borderColor: COLORS.buttonBackgrountColor,
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        fontSize: FONTS.body,
        color: COLORS.textTwo,
    },
    suggestionsContainer: {
        position: 'absolute',
        top: 50,
        backgroundColor: COLORS.backgroundColor,
        borderRadius: 5,
        borderColor: COLORS.inputBorderColor,
        borderWidth: 1,
        zIndex: 10,
        width: '100%',
    },
    suggestionItem: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomColor: COLORS.inputBorderColor,
        borderBottomWidth: 1,
    },
    suggestionText: {
        fontSize: FONTS.body,
        color: COLORS.textTwo,
    },
    icon: {
        color: COLORS.textTwo,
    },
    Icons_view: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    scrollView: {
        flex: 0.9,
        paddingHorizontal: 20,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
    },
    iconview: {
        width: '15%',
        height: '15%',
        aspectRatio: 1,
        borderRadius: 50,
        marginHorizontal: 2,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: COLORS.buttonBackgrountColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: FONTS.header,
        color: COLORS.text,
        paddingHorizontal: 20,
    },
});

export default Explore;
