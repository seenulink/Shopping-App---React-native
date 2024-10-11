import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from '@react-native-vector-icons/material-icons';
import { COLORS } from '../../../../constant/Colors';
import { FONTS } from '../../../../constant/Fonts';
import { RootStackParamList } from '../../../../../App';
import { loginAndPersonalData } from '../../../../data/data';
import axios from 'axios';


interface FormData {
    country: string;
    firstName: string;
    lastName: string;
    streetAddress: string;
    streetAddress2: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
    category:String;
}

const AddAddress: React.FC = () => {
    const navigation:RootStackParamList = useNavigation();

    const [formData, setFormData] = useState<FormData>({
        country: '',
        firstName: '',
        lastName: '',
        streetAddress: '',
        streetAddress2: '',
        city: '',
        state: '',
        zipCode: '',
        phoneNumber: '',
        category:'Address'
    });

    const handleSubmit = async () => {
        // Simple validation
        const requiredFields: Array<keyof FormData> = ['category','country', 'firstName', 'lastName', 'streetAddress', 'city', 'state', 'zipCode', 'phoneNumber'];
        for (const field of requiredFields) {
            if (!formData[field]) {
                Alert.alert('Validation Error', `Please fill out the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                return;
            }
        }

        try {
            const response = await axios.post(loginAndPersonalData, formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log('Success:', response.data);
            Alert.alert('Success', 'Card added successfully!');
            navigation.navigate('Address');
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Failed to add address. Please try again.');
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
                        onPress={() => { navigation.navigate('Address'); }}>
                        <Icon name='arrow-back-ios-new' size={22} style={styles.linkicon} />
                    </TouchableOpacity>
                    <Text style={styles.linktext}>Add Address</Text>
                </View>
            </View>

            <ScrollView
                style={styles.scrollView}
                bounces={false}
                showsVerticalScrollIndicator={false}>

                <View style={styles.inputView}>
                    <Text style={styles.text}>Country or region</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={COLORS.textTwo}
                        value={formData.country}
                        onChangeText={(text) => setFormData({ ...formData, country: text })}
                    />
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.text}>First Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={COLORS.textTwo}
                        value={formData.firstName}
                        onChangeText={(text) => setFormData({ ...formData, firstName: text })}
                    />
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.text}>Last Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={COLORS.textTwo}
                        value={formData.lastName}
                        onChangeText={(text) => setFormData({ ...formData, lastName: text })}
                    />
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.text}>Street Address</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={COLORS.textTwo}
                        value={formData.streetAddress}
                        onChangeText={(text) => setFormData({ ...formData, streetAddress: text })}
                    />
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.text}>Street Address 2 (Optional)</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={COLORS.textTwo}
                        value={formData.streetAddress2}
                        onChangeText={(text) => setFormData({ ...formData, streetAddress2: text })}
                    />
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.text}>City</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={COLORS.textTwo}
                        value={formData.city}
                        onChangeText={(text) => setFormData({ ...formData, city: text })}
                    />
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.text}>State/Province/Region</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={COLORS.textTwo}
                        value={formData.state}
                        onChangeText={(text) => setFormData({ ...formData, state: text })}
                    />
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.text}>Zip Code</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={COLORS.textTwo}
                        value={formData.zipCode}
                        onChangeText={(text) => setFormData({ ...formData, zipCode: text })}
                    />
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.text}>Phone Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={COLORS.textTwo}
                        value={formData.phoneNumber}
                        onChangeText={(text) => setFormData({ ...formData, phoneNumber: text })}
                    />
                </View>

            </ScrollView>

            <View style={styles.addAddressView}>
                <TouchableOpacity
                    onPress={handleSubmit}
                    style={styles.addIconTouch}>
                    <Text style={styles.addIconText}>Add Address</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
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

export default AddAddress;
