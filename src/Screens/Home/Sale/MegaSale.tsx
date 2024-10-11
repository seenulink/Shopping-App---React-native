import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import axios from 'axios';
import { Image } from 'react-native';
import { COLORS } from '../../../constant/Colors';
import { FONTS } from '../../../constant/Fonts';
import { Api_Data } from '../../../data/data';
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

const MegaSale:React.FC = () => {

    const Navigation:RootStackParamList=useNavigation();
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(Api_Data);
                const products = response.data.products;
                const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 8);
                setData(randomProducts);
            } catch (error) {
                console.error("Error fetching product data:", error);
            }
        }
        fetchData();
    }, []);

    return (
        <SafeAreaView style={style.container}>
            <View style={style.categoryLink}>
                <Text style={style.linkHead}>Mega Sale</Text>
                <TouchableOpacity onPress={()=>{Navigation.navigate('SuperMegaSale')}}>
                    <Text style={style.linkLink}>See More</Text>
                </TouchableOpacity>
            </View>
            <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} >
                <View style={style.product_view}>
                    {data.map((item:Product) => (
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
    categoryLink: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        // paddingVertical: 10,
        marginVertical:20
    },
    linkHead: {
        fontSize: FONTS.body,
        color: COLORS.text,
        fontWeight: 'bold',
    },
    linkLink: {
        fontSize: FONTS.body,
        fontWeight: 'bold',
        color: COLORS.buttonBackgrountColor,
    },
    product_view: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    product_card: {
        width: 150,  
        marginHorizontal: 10,
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

export default MegaSale;
