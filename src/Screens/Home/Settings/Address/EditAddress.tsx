import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import axios from 'axios';
import { useRoute, useNavigation } from '@react-navigation/native';
import { COLORS } from '../../../../constant/Colors';
import { FONTS } from '../../../../constant/Fonts';
import { loginAndPersonalData } from '../../../../data/data';
import Icon from '@react-native-vector-icons/material-icons';
import { RootStackParamList } from '../../../../../App';
import { red } from 'react-native-reanimated/lib/typescript/Colors';

interface AddressData {
    id: string;
    firstName: string;
    lastName: string;
    streetAddress: string;
    city: string;
    state: string;
    streetAddress2: string;
    phoneNumber: string;
    zipCode:string;
}

const EditAddress: React.FC = () => {
    const route = useRoute();
    const navigation:RootStackParamList = useNavigation();
    const { address } = route.params as { address: AddressData };

    const [firstName, setFirstName] = useState(address.firstName);
    const [lastName, setLastName] = useState(address.lastName);
    const [streetAddress, setStreetAddress] = useState(address.streetAddress);
    const [streetAddress2, setStreetAddress2] = useState(address.streetAddress2);
    const [city, setCity] = useState(address.city);
    const [state, setState] = useState(address.state);
    const [zipCode, setZipCode] = useState(address.zipCode);  
    const [phoneNumber, setPhoneNumber] = useState(address.phoneNumber);

    const handleUpdate = async () => {
        try {
            const updatedAddress = {
                firstName,
                lastName,
                streetAddress,
                streetAddress2,
                city,
                state,
                zipCode, 
                phoneNumber
            };
            await axios.put(`${loginAndPersonalData}/addresses/${address.id}`, updatedAddress); 
            Alert.alert('Success', 'Address updated successfully.');
            navigation.navigate('Address');
        } catch (error) {
            console.error('Error updating address:', error);
            Alert.alert('Error', 'There was an error updating the address.');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.headerView}>
                <View style={styles.backview}>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('Address') }}>
                        <Icon name='arrow-back-ios-new' size={22} style={styles.linkicon} />
                    </TouchableOpacity>
                    <Text style={styles.linktext}>Edit Address</Text>
                </View>
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.inputView}>
                    <Text style={styles.text}>First Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor='blue'
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.text}>Last Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={COLORS.textTwo}
                        value={lastName}
                        onChangeText={setLastName}
                    />
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.text}>Street Address</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={COLORS.text}
                        value={streetAddress}
                        onChangeText={setStreetAddress}
                    />
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.text}>Street Address 2 (Optional)</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={COLORS.textTwo}
                        value={streetAddress2}
                        onChangeText={setStreetAddress2}
                    />
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.text}>City</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={COLORS.textTwo}
                        value={city}
                        onChangeText={setCity}
                    />
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.text}>State/Province/Region</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={COLORS.textTwo}
                        value={state}
                        onChangeText={setState}
                    />
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.text}>Zip Code</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={COLORS.textTwo}
                        value={zipCode}
                        onChangeText={setZipCode}
                    />
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.text}>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={COLORS.textTwo}
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                    />
                </View>

            </ScrollView>

            <View style={styles.addAddressView}>
                <TouchableOpacity
                    onPress={handleUpdate}
                    style={styles.addIconTouch}>
                    <Text style={styles.addIconText}>Update Address</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView >
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
        paddingHorizontal: 20,
    },
    inputView: {
        justifyContent: 'center',
        paddingVertical: 20,
    },
    input: {
        borderColor: COLORS.inputBorderColor,
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        paddingHorizontal: 20,
        color:COLORS.textTwo,
    },
    text: {
        fontSize: FONTS.header,
        color: COLORS.text,
        fontWeight: '400',
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

export default EditAddress;
