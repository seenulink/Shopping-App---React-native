import React from 'react'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../../../constant/Colors';
import Icon from '@react-native-vector-icons/material-icons';
import { RootStackParamList } from '../../../../App';
import { useNavigation } from '@react-navigation/native';
import { FONTS } from '../../../constant/Fonts';

const Success: React.FC = () => {
    const navigation: RootStackParamList = useNavigation();
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.textView}>
                <Text style={styles.textOne}>Success</Text>
                <Text style={styles.textTwo}>thank you for shopping using lafyuu</Text>
            </View>
            <View style={styles.checkOuView}>
                <TouchableOpacity
                    onPress={() => { navigation.navigate('Home') }}
                    style={styles.checkOutTouch}>
                    <Text style={styles.checkOutText}>Back To Order</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
        justifyContent: 'center',
    },

    textView:{
        flex:0.15,
        justifyContent:'space-evenly',
        alignItems:'center',
    },
    textOne:{
        color:COLORS.text,
        fontSize:FONTS.main,
        fontWeight:'bold',
    },
    textTwo:{
        color:COLORS.textTwo,
        fontSize:FONTS.subheader,
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
        fontWeight:'bold',
        fontSize: FONTS.subheader,
    },
    
})

export default Success