import Icon from '@react-native-vector-icons/material-icons';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../../../../App';
import { COLORS } from '../../../../constant/Colors';
import { FONTS } from '../../../../constant/Fonts';

const NewPayment: React.FC = () => {
    const navigation: RootStackParamList = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerView}>
                <View style={styles.backview}>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('SettingIndex'); }}>
                        <Icon name='arrow-back-ios-new' size={22} style={styles.linkicon} />
                    </TouchableOpacity>
                    <Text style={styles.linktext}>Payment Methods</Text>
                </View>
            </View>

            <TouchableOpacity
            onPress={()=>{navigation.navigate('AddNewCard')}}
                style={styles.paymentsView}>
                <Icon name='credit-card' size={22} style={styles.paymentsIcon} />
                <Text style={styles.text}>Credit Card Or Debit</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.paymentsView}>
                <Icon name='account-balance' size={22} style={styles.paymentsIcon} />
                <Text style={styles.text}>Bank Transfer</Text>
            </TouchableOpacity>
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
    paymentsView: {
        flex: 0.1,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.inputBorderColor,
        flexDirection: 'row',
        alignItems: 'center',
    },
    paymentsIcon: {
        color: COLORS.buttonBackgrountColor,
        fontSize: FONTS.header,
        paddingHorizontal: 20,
    },
    text: {
        fontSize: FONTS.subheader,
        color: COLORS.textTwo,
    },
});

export default NewPayment;
