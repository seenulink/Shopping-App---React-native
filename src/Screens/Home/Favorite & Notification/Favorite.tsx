import Icon from '@react-native-vector-icons/material-icons';
import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../../../constant/Colors';
import { FONTS } from '../../../constant/Fonts';
import { RootStackParamList } from '../../../../App';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { Producttype } from '../../../data/Producttype';
import axios from 'axios';
import { Api_Data } from '../../../data/data';

const Favorite:React.FC = () => {

    const Navigation: RootStackParamList = useNavigation();

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(Api_Data);
                const products = response.data.products;
                const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 4);
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
                    <TouchableOpacity onPress={() => { Navigation.navigate('Home') }}>
                        <Icon name='arrow-back-ios-new' size={22} style={style.linkicon} />
                    </TouchableOpacity>

                    <Text style={style.linktext}>Favorite Product</Text>
                </View>
            </View>

            <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false} 
             style={style.ScrollView}>
                <View style={style.product_view}>
                    {data.map((item: Producttype) => (
                        <TouchableOpacity key={item.id} style={style.product_card}>
                            <Image
                                source={{ uri: item.thumbnail }}
                                style={style.image}
                                alt={item.title}
                            />
                            <View style={style.textview}>
                                <View>
                                    <Text style={style.title}>{item.title}</Text>
                                    <Text style={style.price}>${item.price}</Text>
                                    <Text style={style.discount}> {item.discountPercentage}% off</Text>
                                </View>
                                <View style={style.deleteiconview}>
                                    <TouchableOpacity>
                                        <Icon name='delete-outline' size={24} style={style.linkicon} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
    },
    SuperFlash: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        borderBottomColor: COLORS.inputBorderColor,
        borderBottomWidth: 1
    },
    backview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    linkicon: {
        color: COLORS.textTwo,
        fontWeight: 'bold',
    },
    linktext: {
        fontSize: FONTS.subheader,
        color: COLORS.text,
        fontWeight: 'bold',
        paddingHorizontal: 20
    },


    ScrollView: {
        flex: 0.9,
    },
    product_view: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 10,
        justifyContent: 'center'
    },
    product_card: {
        width: '42%',
        marginHorizontal: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: COLORS.inputBorderColor,
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
    textview:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center',
        paddingHorizontal:10,
    },
    deleteiconview:{
        alignSelf:'flex-end',
        marginHorizontal:20
    }
})


export default Favorite