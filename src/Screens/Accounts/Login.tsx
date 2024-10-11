import React, { useState } from "react";
import { Alert, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constant/Colors";
import { IMAGE } from "../../constant/Image";
import { FONTS } from "../../constant/Fonts";
import Icon from "@react-native-vector-icons/material-icons";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootStackParamList } from "../../../App";

const Login: React.FC = () => {
    const Navigation:RootStackParamList = useNavigation();

    const [isFocused, setIsFocused] = useState({
        Focused1: false,
        Focused2: false,
    });

    const [data, setData] = useState({
        mobilenumber: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        mobilenumber: false,
        password: false,
    });

    const handleFocus = (field: string) => {
        setIsFocused((prevState) => ({
            ...prevState,
            [field]: true,
        }));
        setErrors((prevState) => ({
            ...prevState,
            [field]: false,
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
            mobilenumber: data.mobilenumber.trim().length !== 10,
            password: data.password.trim().length < 8,
        };
    
        setErrors(newErrors);
    
        if (!newErrors.mobilenumber && !newErrors.password) {
            try {
                const response = await axios.get('https://65cb4c92efec34d9ed8732bd.mockapi.io/login');
                const users = response.data;
    
                const user = users.find((user: { mobilenumber: string, password: string }) =>
                    user.mobilenumber === data.mobilenumber && user.password === data.password
                );
    
                if (user) {
                    // Store user data in AsyncStorage
                    await AsyncStorage.setItem('user', JSON.stringify(user));
    
                    // Navigate to Home screen
                    Navigation.navigate('Home');
                } else {
                    Alert.alert('Mobile number or password is incorrect');
                }
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
                        style={style.headicon} />
                    <Text style={style.icon_text1}>Welcome to E-com</Text>
                    <Text style={style.icon_text2}>Sign in to continue</Text>
                </View>

                <View style={style.input_content}>
                    <View style={[style.inputview, isFocused.Focused1 && style.focusedInput, errors.mobilenumber && style.errorInput]}>
                        <Icon name="phone" size={20} style={style.icon} />
                        <TextInput
                            style={style.input}
                            placeholder="Your Mobile Number"
                            placeholderTextColor={COLORS.textTwo}
                            onFocus={() => handleFocus('Focused1')}
                            onBlur={() => handleBlur('Focused1')}
                            onChangeText={(text) => setData({ ...data, mobilenumber: text })}
                            value={data.mobilenumber}
                        />
                    </View>
                    {errors.mobilenumber && (
                        <Text style={style.errorText}>Mobile Number must be exactly 10 digits</Text>
                    )}

                    <View style={[style.inputview, isFocused.Focused2 && style.focusedInput, errors.password && style.errorInput]}>
                        <Icon name="lock" size={20} style={style.icon} />
                        <TextInput
                            style={style.input}
                            placeholder="Password"
                            placeholderTextColor={COLORS.textTwo}
                            onFocus={() => handleFocus('Focused2')}
                            onBlur={() => handleBlur('Focused2')}
                            secureTextEntry={true}
                            onChangeText={(text) => setData({ ...data, password: text })}
                            value={data.password}
                        />
                    </View>
                    {errors.password && (
                        <Text style={style.errorText}>Password must be at least 8 characters</Text>
                    )}

                    <TouchableOpacity
                        onPress={handleClick}
                        style={style.sign_view}>
                        <Text style={style.sign_text}>Sign In</Text>
                    </TouchableOpacity>
                </View>

                <View style={style.social_view}>
                    <TouchableOpacity>
                        <Text style={style.Forgot_text}>Forgot Password?</Text>
                    </TouchableOpacity>

                    <View style={style.social_line}>
                        <Text style={style.Sign_text}>Don't have an account?</Text>
                        <TouchableOpacity
                            onPress={() => Navigation.navigate('Register')}>
                            <Text style={style.Forgot_text}>Sign Up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={style.link_content} />
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

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

export default Login;
