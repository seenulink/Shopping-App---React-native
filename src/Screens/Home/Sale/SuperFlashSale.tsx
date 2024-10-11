import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { Image } from 'react-native';
import { COLORS } from '../../../constant/Colors';
import { FONTS } from '../../../constant/Fonts';
import { Api_Data } from '../../../data/data';
import Icon from '@react-native-vector-icons/material-icons';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../../App';

interface Product {
    id: number;
    title: string;
    price: number;
    discountPercentage: number;
    rating: any;
    thumbnail: string;
}

const SuperFlashSale: React.FC = () => {
    const [data, setData] = useState([]);

    const Navigation:RootStackParamList=useNavigation();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(Api_Data);
                const products = response.data.products;
                const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 9);
                setData(randomProducts);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        }
        fetchData();
    }, []);

    return (
        <SafeAreaView style={style.container}>
            <View style={style.SuperFlash}>
                <View style={style.backview}>
                    <TouchableOpacity onPress={()=>{Navigation.navigate('Home')}}>
                        <Icon name='arrow-back-ios-new' size={22} style={style.linkicon} />
                    </TouchableOpacity>

                    <Text style={style.linktext}>Super Flash Sale</Text>
                </View>
                <View>
                    <TouchableOpacity style={style.searchview}>
                        <Icon name='search' size={22} style={style.linkicon}/>
                    </TouchableOpacity>
                </View>
            </View>
            
            <ScrollView 
            style={style.ScrollView}      
            showsVerticalScrollIndicator={false}>
                <View style={style.product_view}>
                    {data.map((item: Product) => (
                        <TouchableOpacity key={item.id} style={style.product_card}>
                            <Image
                                source={{ uri: item.thumbnail }}
                                style={style.image}
                                alt={item.title}
                            />
                            <Text style={style.title}>{item.title}</Text>
                            <Text style={style.price}>${item.price}</Text>
                            <Text style={style.discount}>Offer: {item.discountPercentage}% off</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
    },
 
    SuperFlash:{
        flex:0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        paddingHorizontal:30,
        borderBottomColor:COLORS.inputBorderColor,
        borderBottomWidth:1
    },
    backview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        },
        
    linkicon: {
        color: COLORS.text,
        fontWeight: 'bold',
    },
    linktext:{
        fontSize: FONTS.subheader,
        color: COLORS.text,
        fontWeight: 'bold',
        paddingHorizontal:20
    },
    searchview:{

    },
    ScrollView: {
        flex: 0.9,
    },
    product_view: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10,
        justifyContent:'center'
    },
    product_card: {
        width: '42%',
        marginHorizontal: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: COLORS.inputBorderColor,
        alignItems: 'center',
        borderRadius: 5,
        padding: 10,
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
    },
    title: {
        fontSize: FONTS.body,
        fontWeight: 'bold',
        color: COLORS.text,
        marginVertical: 5,
        textAlign: 'center',
    },
    price: {
        fontSize: FONTS.body,
        fontWeight: 'bold',
        color: COLORS.buttonBackgrountColor,
        marginVertical: 5,
    },
    discount: {
        fontSize: FONTS.body,
        color: COLORS.alert,
        marginVertical: 5,
    },
});

export default SuperFlashSale;