import React, { useState } from "react";
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constant/Colors";
import { IMAGE } from "../../constant/Image";
import { FONTS } from "../../constant/Fonts";
import Icon from "@react-native-vector-icons/material-icons";
import axios from 'axios';
import { RootStackParamList } from "../../../App";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register: React.FC = () => {

    const Navigation = useNavigation<RootStackParamList>();
    const [isFocused, setIsFocused] = useState({
        Focused1: false,
        Focused2: false,
        Focused3: false,
        Focused4: false,
    });

    const [data, setData] = useState({
        fullName: '',
        mobilenumber: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({
        fullName: false,
        mobilenumber: false,
        password: false,
        confirmPassword: false
    });

    const handleFocus = (field: string) => {
        setIsFocused((prevState) => ({
            ...prevState,
            [field]: true,
        }));
        setErrors((prevState) => ({
            ...prevState,
            [field]: false
        }));
    };

    const handleBlur = (field: string) => {
        setIsFocused((prevState) => ({
            ...prevState,
            [field]: false,
        }));
    };

    const handleClick = async () => {
        const newErrors = {
            fullName: data.fullName.trim() === '',
            mobilenumber: data.mobilenumber.trim().length !== 10,
            password: data.password.trim().length < 8,
            confirmPassword: data.confirmPassword.trim() === '' || data.confirmPassword !== data.password,
        };
    
        setErrors(newErrors);
    
        if (!newErrors.fullName && !newErrors.mobilenumber && !newErrors.password && !newErrors.confirmPassword) {
            try {
                const response = await axios.post('https://65cb4c92efec34d9ed8732bd.mockapi.io/login', {
                    fullName: data.fullName,
                    mobilenumber: data.mobilenumber,
                    password: data.password,
                    category:'createAccount',
                });
    
                // Save the response data to AsyncStorage
                await AsyncStorage.setItem('userData', JSON.stringify(response.data));
    
                console.log('Success:', response.data);
                Navigation.navigate('Login');
            } catch (error) {
                console.error('Error:', error);
                Alert.alert('An error occurred. Please try again.');
            }
        } else {
            Alert.alert('Please fix the errors in the form');
        }
    };
    

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={style.container}
        >
            <ScrollView
                contentContainerStyle={style.scrollViewContent}
                keyboardShouldPersistTaps="handled"
            >
                <View style={style.icon_content}>
                    <Image
                        source={IMAGE.loginIcon}
                        style={style.headicon}
                    />
                    <Text style={style.icon_text1}>Let’s Get Started</Text>
                    <Text style={style.icon_text2}>Create a new account</Text>
                </View>

                <View style={style.input_content}>
                    <View style={[style.inputview, isFocused.Focused1 && style.focusedInput, errors.fullName && style.errorInput]}>
                        <Icon name="person-outline" size={20} color="#000" style={style.icon} />
                        <TextInput
                            style={style.input}
                            placeholder="Full Name"
                            placeholderTextColor={COLORS.textTwo}
                            onFocus={() => handleFocus('fullName')}
                            onBlur={() => handleBlur('fullName')}
                            onChangeText={(text) => setData({ ...data, fullName: text })}
                            value={data.fullName}
                        />
                    </View>
                    {errors.fullName && (
                        <Text style={style.errorText}>Full Name is required</Text>
                    )}

                    <View style={[style.inputview, isFocused.Focused2 && style.focusedInput, errors.mobilenumber && style.errorInput]}>
                        <Icon name="phone" size={20} style={style.icon} />
                        <TextInput
                            style={style.input}
                            placeholder="Your Mobile Number"
                            placeholderTextColor={COLORS.textTwo}
                            onFocus={() => handleFocus('mobilenumber')}
                            onBlur={() => handleBlur('mobilenumber')}
                            onChangeText={(text) => setData({ ...data, mobilenumber: text })}
                            value={data.mobilenumber}
                        />
                    </View>
                    {errors.mobilenumber && (
                        <Text style={style.errorText}>Mobile Number is required</Text>
                    )}

                    <View style={[style.inputview, isFocused.Focused3 && style.focusedInput, errors.password && style.errorInput]}>
                        <Icon name="lock" size={20} style={style.icon} />
                        <TextInput
                            style={style.input}
                            placeholder="Password"
                            placeholderTextColor={COLORS.textTwo}
                            onFocus={() => handleFocus('password')}
                            onBlur={() => handleBlur('password')}
                            secureTextEntry={true}
                            onChangeText={(text) => setData({ ...data, password: text })}
                            value={data.password}
                        />
                    </View>
                    {errors.password && (
                        <Text style={style.errorText}>Password is required</Text>
                    )}

                    <View style={[style.inputview, isFocused.Focused4 && style.focusedInput, errors.confirmPassword && style.errorInput]}>
                        <Icon name="lock" size={20} style={style.icon} />
                        <TextInput
                            style={style.input}
                            placeholder="Confirm Password"
                            placeholderTextColor={COLORS.textTwo}
                            onFocus={() => handleFocus('confirmPassword')}
                            onBlur={() => handleBlur('confirmPassword')}
                            secureTextEntry={true}
                            onChangeText={(text) => setData({ ...data, confirmPassword: text })}
                            value={data.confirmPassword}
                        />
                    </View>
                    {errors.confirmPassword && (
                        <Text style={style.errorText}>
                            {data.confirmPassword !== data.password ? 'Passwords do not match' : 'Confirm Password is required'}
                        </Text>
                    )}

                    <TouchableOpacity
                        onPress={handleClick}
                        style={style.sign_view}
                    >
                        <Text style={style.sign_text}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.social_view}>
                    <View style={style.social_line}>
                        <Text style={style.Sign_text}>Have an account? </Text>
                        <TouchableOpacity onPress={()=>(Navigation.navigate('Login'))}>
                            <Text style={style.Forgot_text}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={style.link_content}></View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: COLORS.backgroundColor,
    },
    scrollViewContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    icon_content: {
        flex: 0.2,
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    input_content: {
        flex: 0.3,
        justifyContent: 'space-evenly',
        paddingHorizontal: 20,
    },
    link_content: {
        flex: 0.2,
    },
    headicon: {
        borderRadius: 20,
    },
    icon_text1: {
        fontSize: FONTS.header,
        fontWeight: '800',
        color: COLORS.text,
    },
    icon_text2: {
        fontSize: FONTS.subheader,
        color: COLORS.textTwo,
        fontWeight: '500',
    },
    inputview: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: COLORS.inputBorderColor,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    focusedInput: {
        borderColor: COLORS.buttonBackgrountColor,
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        fontSize: FONTS.body,
        color: COLORS.textTwo,
    },
    icon: {
        color: COLORS.textTwo,
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        marginTop: 5,
    },
    sign_view: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.buttonBackgrountColor,
        borderRadius: 5,
        paddingVertical: 15,
    },
    sign_text: {
        color: COLORS.buttonTextColor,
        fontSize: FONTS.subheader,
    },
    social_view: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    Forgot_text: {
        color: COLORS.buttonBackgrountColor,
        fontSize: FONTS.body,
    },
    Sign_text: {
        color: COLORS.textTwo,
        fontSize: FONTS.body,
        paddingHorizontal: 10,
    },
    social_line: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 10,
    },
});

export default Register;
