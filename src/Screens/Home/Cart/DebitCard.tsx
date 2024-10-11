import Icon from '@react-native-vector-icons/material-icons';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../../../constant/Colors';
import { FONTS } from '../../../constant/Fonts';
import { RootStackParamList } from '../../../../App';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { loginAndPersonalData } from '../../../data/data';

interface CardData {
    id: string;
    CardHolder: string;
    CardNumber: string;
    ExpirationDate: string;
  }
const DebitCard:React.FC = () => {
    const navigation: RootStackParamList = useNavigation();

    
    const [data, setData] = useState<CardData[]>([]);
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(loginAndPersonalData);
                const allData = response.data;
                const filteredData = allData.filter((item: { category: string; }) => item.category === 'card');
                setData(filteredData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleSelect = (id: string) => {
        setSelectedAddressId(id);
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerView}>
                <View style={styles.backview}>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('Payment'); }}>
                        <Icon name='arrow-back-ios-new' size={22} style={styles.linkicon} />
                    </TouchableOpacity>
                    <Text style={styles.linktext}>Choose Card</Text>
                </View>
            </View>

            <ScrollView  
             style={styles.scrollView}
                bounces={false}
                showsVerticalScrollIndicator={false}>
                {data.map((data) => (
                    <TouchableOpacity
                    key={data.id} 
                    style={[
                        styles.cardView, 
                        { borderColor: data.id === selectedAddressId ? COLORS.buttonBackgrountColor : COLORS.inputBorderColor }
                    ]}
                    onPress={() => handleSelect(data.id)}>

                        <View style={styles.cardNumView} >
                            <Text style={styles.cardNumText}>{data.CardNumber}</Text>
                        </View>
                        <View style={styles.cardAddView}  >
                            <View>
                                <Text style={styles.cardHead}>CARD HOLDER</Text>
                                <Text style={styles.cardText}>{data.CardHolder}</Text>
                            </View>
                            <View>
                                <Text style={styles.cardHead}>CARD SAVE</Text>
                                <Text style={styles.cardText}>{data.ExpirationDate}</Text>
                            </View>
                        </View>


                    </TouchableOpacity>
                ))}
            </ScrollView>
            {selectedAddressId && (
            <View style={styles.checkOuView}>
                        <TouchableOpacity
                            onPress={() => {navigation.navigate('Success')}}
                            style={styles.checkOutTouch}>
                            <Text style={styles.checkOutText}>Conform Payment</Text>
                        </TouchableOpacity>
                    </View>
            )}
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundColor
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
    addIcon: {
        color: COLORS.buttonBackgrountColor,
        fontSize: FONTS.header,
        fontWeight: 'bold',
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
    cardView:{
        marginVertical:20,
        marginHorizontal:20,
        borderWidth:2,
        borderColor:COLORS.inputBorderColor,
        paddingVertical:20,
        paddingHorizontal:20,
        backgroundColor:COLORS.primary,
        borderRadius:20,
        elevation: 5,
    },
    cardNumView:{
        flexDirection:'row',
        justifyContent:'center',
        marginVertical:30,
    },
    cardNumText:{
        fontSize:FONTS.main,
        color:COLORS.buttonTextColor,
    },
    cardAddView:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingHorizontal:30,
    },
    cardHead:{
        paddingVertical:15,
        color:COLORS.textTwo,
        fontSize:FONTS.body,
        fontWeight:'bold',
    },
    cardText:{
        paddingVertical:5,
        color:COLORS.buttonTextColor,
        fontSize:FONTS.body,
        fontWeight:'bold',
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
})

export default DebitCard