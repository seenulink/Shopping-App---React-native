import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, TextInput } from 'react-native';
import { COLORS } from '../../../../constant/Colors';
import { FONTS } from '../../../../constant/Fonts';
import Icon from '@react-native-vector-icons/material-icons';
import { RootStackParamList } from '../../../../../App';
import { useNavigation } from '@react-navigation/native';

const ChangeName:React.FC = () => {
    const navigation: RootStackParamList = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerView}>
                <View style={styles.backview}>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('Profile'); }}>
                        <Icon name='arrow-back-ios-new' size={22} style={styles.linkicon} />
                    </TouchableOpacity>
                    <Text style={styles.linktext}>Change Name</Text>
                </View>
            </View>
            <View style={styles.inputViewsFull}>
                <View style={styles.inputViews}>
                    <Text style={styles.inputLable}>First Name</Text>
                    <TextInput
                        placeholder='ender your name'
                        style={styles.input}
                        placeholderTextColor={COLORS.textTwo}
                    />
                </View>
                <View style={styles.inputViews}>
                    <Text style={styles.inputLable}>First Name</Text>
                    <TextInput
                        placeholder='ender your name'
                        style={styles.input}
                        placeholderTextColor={COLORS.textTwo}
                    />
                </View>
            </View>

            <View style={styles.notifyButtonView}>
        <TouchableOpacity style={styles.notifyButton}>
          <Text style={styles.notifyButtonText}>Conform </Text>
        </TouchableOpacity>
      </View>

        </SafeAreaView>
    )
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

    inputViewsFull:{
        flex:0.8,
    },
    inputViews: {
        // flex: 0.1,
        marginHorizontal: 30,
        marginVertical: 20,
    },
    inputLable: {
        fontSize: FONTS.header,
        color: COLORS.text,
        fontWeight: 'bold',
    },
    input: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: COLORS.inputBorderColor,
        marginVertical: 10,
        fontSize: FONTS.subheader,
        borderRadius: 10,
    },

    notifyButtonView: {
        flex: 0.1,
        justifyContent: 'center',
        marginHorizontal: 20,
      },
      notifyButton: {
    
        backgroundColor: COLORS.buttonBackgrountColor,
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: 'center',
      },
      notifyButtonText: {
        color: COLORS.backgroundColor,
        fontSize: FONTS.subheader,
        fontWeight: 'bold',
      },
});

export default ChangeName