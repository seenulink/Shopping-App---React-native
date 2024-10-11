import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from '../../../constant/Colors';
import Icon from '@react-native-vector-icons/material-icons';
import { FONTS } from '../../../constant/Fonts';
import { RootStackParamList } from '../../../../App';
import { useNavigation } from '@react-navigation/native';


const ordersData = [
    {
        id: '1',
        orderNumber: 'LQNSU346JK',
        orderDate: 'August 1, 2017',
        status: 'Shipping',
        items: 2,
        price: 299.43,
    },
    {
        id: '2',
        orderNumber: 'SDG1345KJD',
        orderDate: 'August 1, 2017',
        status: 'Shipping',
        items: 1,
        price: 289.43,
    },
];

const orders: React.FC = () => {
    const navigation: RootStackParamList = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerView}>
                <View style={styles.backview}>
                    {/* <TouchableOpacity
                        onPress={() => { navigation.navigate('ConformCart'); }}>
                        <Icon name='arrow-back-ios-new' size={22} style={styles.linkicon} />
                    </TouchableOpacity> */}
                    <Text style={styles.linktext}>Order</Text>
                </View>
            </View>


            <ScrollView
                style={styles.scrollView}
                bounces={false}
                showsVerticalScrollIndicator={false}>

                {ordersData.map((item) => (

                    <TouchableOpacity 
                onPress={()=>navigation.navigate('OrderDetails')}
                    style={styles.orderContainer}>
                        <Text style={styles.orderNumber}>{item.orderNumber}</Text>
                        <Text style={styles.orderDate}>Order at E-comm : {item.orderDate}</Text>
                        <View style={styles.divider} />
                        <View style={styles.row}>
                            <Text style={styles.label}>Order Status</Text>
                            <Text style={styles.value}>{item.status}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Items</Text>
                            <Text style={styles.value}>{item.items} Items purchased</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Price</Text>
                            <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundColor,

    },


    headerView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 0.1,
        alignItems: 'center',
        paddingHorizontal: 30,
        borderWidth: 1,
        borderColor: COLORS.inputBorderColor,
    },
    backview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    linkicon: {
        color: COLORS.textTwo,
        fontWeight: 'bold',
        fontSize: FONTS.header,
    },
    linktext: {
        fontSize: FONTS.subheader,
        color: COLORS.text,
        fontWeight: 'bold',
        paddingHorizontal: 20,
    },

    scrollView: {
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
        flexGrow: 1,
    },

    orderContainer: {
        marginHorizontal: 20,
        marginVertical: 15,
        backgroundColor: COLORS.backgroundColor,
        elevation: 5,
        paddingHorizontal: 20,
        paddingVertical: 15,
    },
    orderNumber: {
        fontSize: FONTS.header,
        color: COLORS.text,
        fontWeight: 'bold',
    },
    orderDate: {
        fontSize: FONTS.subheader ,
        color: COLORS.textTwo,
        paddingVertical:5,
            },
    divider: {
        borderBottomColor:COLORS.inputBorderColor,
        borderBottomWidth: 1,
        marginVertical: 8,
        borderStyle:'dashed',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginBottom: 8,
    },
    label: {
        fontSize: FONTS.subheader ,
        color: COLORS.textTwo,
    },
    value: {
        fontSize: FONTS.subheader ,
        color: COLORS.textTwo,
    },
    price: {
        fontSize: FONTS.header ,
        fontWeight: 'bold',
        color: COLORS.buttonBackgrountColor,
    },
});

export default orders;
