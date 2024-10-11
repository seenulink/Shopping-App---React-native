import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { RootStackParamList } from '../../../../App';
import { loginAndPersonalData } from '../../../data/data';
import { COLORS } from '../../../constant/Colors';
import { FONTS } from '../../../constant/Fonts';

interface AddressData {
    id: string;
    firstName: string;
    lastName: string;
    streetAddress: string;
    city: string;
    state: string;
    streetAddress2: string;
    phoneNumber: string;
}

const ShipTo: React.FC = () => {
    const navigation: RootStackParamList = useNavigation();
    const [data, setData] = useState<AddressData[]>([]);
    const [selectedAddressId, setSelectedAddressId] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(loginAndPersonalData);
                const allData = response.data;
                const filteredData = allData.filter((item: { category: string; }) => item.category === 'Address');
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
                    <TouchableOpacity onPress={() => { navigation.navigate('ConformCart'); }}>
                        <Icon name='arrow-back-ios-new' size={22} style={styles.linkicon} />
                    </TouchableOpacity>
                    <Text style={styles.linktext}>Ship To</Text>
                </View>
            </View>

            <ScrollView
                style={styles.scrollView}
                bounces={false}
                showsVerticalScrollIndicator={false}>
                {data.map((item: AddressData) => (
                    <TouchableOpacity 
                        key={item.id} 
                        style={[
                            styles.addreaaView, 
                            { borderColor: item.id === selectedAddressId ? COLORS.buttonBackgrountColor : COLORS.inputBorderColor }
                        ]}
                        onPress={() => handleSelect(item.id)}
                    >
                        <View style={styles.editTextView}>
                            <Text style={styles.textName}>{item.firstName} {item.lastName}</Text>
                        </View>
                        <View style={styles.editTextView}>
                            <Text style={styles.text}>{item.streetAddress} {item.streetAddress2}, {item.city}, {item.state}</Text>
                        </View>
                        <View style={styles.editTextView}>
                            <Text style={styles.text}>{item.phoneNumber}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {selectedAddressId && (
                <View style={styles.addAddressView}>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('Payment'); }}
                        style={styles.addIconTouch}
                    >
                        <Text style={styles.addIconText}>Next</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
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
        fontSize: FONTS.header,
        color: COLORS.text,
        fontWeight: 'bold',
        paddingHorizontal: 20,
    },
    scrollView: {
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
        flexGrow: 1,
    },
    addreaaView: {
        marginHorizontal: 15,
        marginVertical: 15,
        justifyContent: 'space-evenly',
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 10,
    },
    editTextView: {
        flexDirection: 'row',
        paddingHorizontal: 30,
        paddingVertical: 15,
    },
    text: {
        fontSize: FONTS.subheader,
        color: COLORS.textTwo,
    },
    textName: {
        fontSize: FONTS.header,
        color: COLORS.text,
        fontWeight: 'bold',
    },
    addAddressView: {
        flex: 0.1,
        justifyContent: 'center',
    },
    addIconTouch: {
        backgroundColor: COLORS.buttonBackgrountColor,
        marginHorizontal: 30,
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    addIconText: {
        color: COLORS.buttonTextColor,
        fontSize: FONTS.subheader,
    },
});

export default ShipTo;
