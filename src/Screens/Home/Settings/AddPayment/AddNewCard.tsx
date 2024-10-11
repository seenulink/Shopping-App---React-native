import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from '@react-native-vector-icons/material-icons';
import axios from 'axios'; // Import axios
import { COLORS } from '../../../../constant/Colors';
import { FONTS } from '../../../../constant/Fonts';
import { RootStackParamList } from '../../../../../App';
import { loginAndPersonalData } from '../../../../data/data';

interface FormData {
    CardNumber: string;
    ExpirationDate: string;
    SecurityCode: string;
    CardHolder: string;
    category: string;
}

const AddNewCard: React.FC = () => {
    const navigation = useNavigation<RootStackParamList>();

    const [formData, setFormData] = useState<FormData>({
        CardNumber: '',
        ExpirationDate: '',
        SecurityCode: '',
        CardHolder: '',
        category: 'card',
    });

    const handleSubmit = async () => {
        const requiredFields: Array<keyof FormData> = ['category', 'CardNumber', 'ExpirationDate', 'SecurityCode', 'CardHolder'];
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
            navigation.navigate('NewPayment');
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', 'Failed to add card. Please try again.');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.headerView}>
                <View style={styles.backview}>
                    <TouchableOpacity onPress={() => navigation.navigate('NewPayment')}>
                        <Icon name='arrow-back-ios-new' size={22} style={styles.linkicon} />
                    </TouchableOpacity>
                    <Text style={styles.linktext}>Add Card</Text>
                </View>
            </View>

            <View style={styles.cardContainer}>
                <View style={styles.inputView}>
                    <Text style={styles.text}>Card Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={COLORS.textTwo}
                        value={formData.CardNumber}
                        onChangeText={(text) => setFormData({ ...formData, CardNumber: text })}
                    />
                </View>

                <View style={styles.cardTwoContainer}>
                    <View style={styles.textinputTwoView}>
                        <View style={styles.inputView}>
                            <Text style={styles.text}>Expiration Date</Text>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor={COLORS.textTwo}
                                value={formData.ExpirationDate}
                                onChangeText={(text) => setFormData({ ...formData, ExpirationDate: text })}
                            />
                        </View>
                    </View>
                    <View style={styles.textinputTwoView}>
                        <View style={styles.inputView}>
                            <Text style={styles.text}>Security Code</Text>
                            <TextInput
                                style={styles.input}
                                placeholderTextColor={COLORS.textTwo}
                                value={formData.SecurityCode}
                                onChangeText={(text) => setFormData({ ...formData, SecurityCode: text })}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.inputView}>
                    <Text style={styles.text}>Card Holder</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor={COLORS.textTwo}
                        value={formData.CardHolder}
                        onChangeText={(text) => setFormData({ ...formData, CardHolder: text })}
                    />
                </View>
            </View>

            <View style={styles.addAddressView}>
                <TouchableOpacity onPress={handleSubmit} style={styles.addIconTouch}>
                    <Text style={styles.addIconText}>Add Card</Text>
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
        fontSize: FONTS.subheader,
        color: COLORS.text,
        fontWeight: 'bold',
        paddingHorizontal: 20,
    },
    inputView: {
        justifyContent: 'center',
        paddingVertical: 10,
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
    cardContainer: {
        flex: 1,
        marginHorizontal: 30,
        marginVertical: 10,
    },
    cardTwoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    textinputTwoView: {
        width: '45%',
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

export default AddNewCard;
