import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Alert } from 'react-native';
import { COLORS } from '../../../../constant/Colors';
import { FONTS } from '../../../../constant/Fonts';
import Icon from '@react-native-vector-icons/material-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { RootStackParamList } from '../../../../../App';
import { loginAndPersonalData } from '../../../../data/data';

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

const Address: React.FC = () => {
    const navigation:RootStackParamList = useNavigation();
    const [data, setData] = useState<AddressData[]>([]);

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

    const handleEdit = (item: AddressData) => {
        navigation.navigate('EditAddress', { address: item });
    };

    const handleDelete = (id: string) => {
        Alert.alert(
            'Confirm Delete',
            'Are you sure you want to delete this address?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete', 
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await axios.delete(`${loginAndPersonalData}/${id}`);
                            setData(prevData => prevData.filter(address => address.id !== id));
                            Alert.alert('Success', 'Address deleted successfully.');
                        } catch (error) {
                            console.error('Error deleting address:', error);
                            Alert.alert('Error', 'There was an error deleting the address.');
                        }
                    }
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerView}>
                <View style={styles.backview}>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('SettingIndex') }}>
                        <Icon name='arrow-back-ios-new' size={22} style={styles.linkicon} />
                    </TouchableOpacity>
                    <Text style={styles.linktext}>Address</Text>
                </View>
            </View>

            <ScrollView
                style={styles.scrollView}
                bounces={false}
                showsVerticalScrollIndicator={false}>
                {data.map((item: AddressData) => (
                    <View key={item.id} style={styles.addreaaView}>
                        <View style={styles.editTextView}>
                            <Text style={styles.textName}>{item.firstName} {item.lastName}</Text>
                        </View>
                        <View style={styles.editTextView}>
                            <Text style={styles.text}>{item.streetAddress} {item.streetAddress2}, {item.city}, {item.state}</Text>
                        </View>
                        <View style={styles.editTextView}>
                            <Text style={styles.text}>{item.phoneNumber}</Text>
                        </View>

                        <View style={styles.iconsView}>
                            <TouchableOpacity
                                onPress={() => handleEdit(item)}
                                style={styles.editIconTouch}>
                                <Icon name='edit' size={22} style={styles.editIcon} />
                                <Text style={styles.editIconText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleDelete(item.id)}
                                style={styles.deleteIconTouch}>
                                <Icon name='delete-outline' size={22} style={styles.deleteIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.addAddressView}>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('AddAddress'); }}
                    style={styles.addIconTouch}>
                    <Text style={styles.addIconText}>Add Address</Text>
                </TouchableOpacity>
            </View>
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
        borderColor: COLORS.inputBorderColor,
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
    editIconTouch: {
        backgroundColor: COLORS.buttonBackgrountColor,
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
    },
    deleteIconTouch: {
        paddingHorizontal: 30,
    },
    editIcon: {
        color: COLORS.backgroundColor,
        paddingHorizontal: 5,
    },
    editIconText: {
        fontSize: FONTS.subheader,
        paddingHorizontal: 5,
        color: COLORS.backgroundColor,
    },
    deleteIcon: {
        color: COLORS.textTwo,
    },
    iconsView: {
        flexDirection: 'row',
        paddingHorizontal: 30,
        alignItems: 'center',
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

export default Address;
