import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../../constant/Colors';
import { FONTS } from '../../../../constant/Fonts';
import Icon from '@react-native-vector-icons/material-icons';
import { RootStackParamList } from '../../../../../App';
import { useNavigation } from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';

const genders = ['Male', 'Female', 'Other'];

const GenderSelection: React.FC = () => {
    const navigation = useNavigation<{
        navigate: (screen: keyof RootStackParamList) => void;
    }>();

    const [selectedGender, setSelectedGender] = useState<string | null>(null);

    const handleSelect = (gender: string) => {
        setSelectedGender(gender);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerView}>
                <View style={styles.backview}>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('Profile'); }}>
                        <Icon name='arrow-back-ios-new' size={22} style={styles.linkicon} />
                    </TouchableOpacity>
                    <Text style={styles.linktext}>Choose Gender</Text>
                </View>
            </View>

            <View style={styles.contentContainer}>
                {genders.map(gender => (
                    <View key={gender} style={styles.checkboxContainer}>
                        <CheckBox
                            value={selectedGender === gender}
                            onValueChange={() => handleSelect(gender)}
                            style={styles.checkbox}
                        />
                        <Text style={styles.label}>{gender}</Text>
                    </View>
                ))}
            </View>
        </View>
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
        borderBottomWidth: 1,
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
    contentContainer: {
        flex: 1,
    },
    checkboxContainer: {
        flex:0.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent:'flex-start',
        paddingHorizontal:30,
    },
    checkbox: {
        paddingHorizontal:10,
        paddingVertical:10,
        alignSelf: 'center',
        borderWidth:1,
        borderColor:COLORS.buttonBackgrountColor,
    },
    label: {
        fontSize: FONTS.body,
        color: COLORS.text,
        marginHorizontal:10,
    },
});

export default GenderSelection;
