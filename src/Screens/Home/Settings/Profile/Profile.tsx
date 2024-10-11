import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import { COLORS } from '../../../../constant/Colors';
import { FONTS } from '../../../../constant/Fonts';
import Icon from '@react-native-vector-icons/material-icons';
import { RootStackParamList } from '../../../../../App';
import { useNavigation } from '@react-navigation/native';

const Profile: React.FC = () => {
    const navigation: RootStackParamList = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerView}>
                <View style={styles.backview}>
                    <TouchableOpacity
                        onPress={() => { navigation.navigate('SettingIndex'); }}>
                        <Icon name='arrow-back-ios-new' size={22} style={styles.linkicon} />
                    </TouchableOpacity>
                    <Text style={styles.linktext}>Profile</Text>
                </View>
            </View>

            <View style={styles.profileViews}>
                <View style={styles.profileImageContainer}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: 'https://your-image-url-here' }}
                            style={styles.profileImage}
                        />
                    </View>
                    <TouchableOpacity 
                    onPress={()=>navigation.navigate('ChangeName')}
                    style={styles.imageTextContainer}>
                        <Text style={styles.name}>Dominic Ovo</Text>
                        <Text style={styles.username}>@dominic_ovo</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.infoContainer}>
                    <TouchableOpacity 
                    onPress={()=>navigation.navigate('GenderSelection')}
                    style={styles.infoRow}>
                        <View style={styles.infoRow1} >
                            <TouchableOpacity>
                                <Icon name='female' size={18} style={styles.icons} />
                            </TouchableOpacity>
                            <Text style={styles.label}>Gender</Text>
                        </View>
                        <View style={styles.infoRow1}>
                            <Text style={styles.value}>Male</Text>
                            <TouchableOpacity>
                                <Icon name='arrow-forward-ios' size={18} style={styles.arrowicon} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                    onPress={()=>navigation.navigate('GenderSelection')}
                     style={styles.infoRow}>
                        <View style={styles.infoRow1} >
                            <TouchableOpacity>
                                <Icon name='card-giftcard' size={18} style={styles.icons} />
                            </TouchableOpacity>
                            <Text style={styles.label}>Birthday</Text>
                        </View>
                        <View style={styles.infoRow1}>
                            <Text style={styles.value}>12-12-2000</Text>
                            <TouchableOpacity>
                                <Icon name='arrow-forward-ios' size={18} style={styles.arrowicon} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.infoRow}>
                        <View style={styles.infoRow1} >
                            <TouchableOpacity>
                                <Icon name='markunread' size={18} style={styles.icons} />
                            </TouchableOpacity>
                            <Text style={styles.label}>Email</Text>
                        </View>
                        <View style={styles.infoRow1}>
                            <Text style={styles.value}>rex4dom@gmail.com</Text>
                            <TouchableOpacity>
                                <Icon name='arrow-forward-ios' size={18} style={styles.arrowicon} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.infoRow}>
                        <View style={styles.infoRow1} >
                            <TouchableOpacity>
                                <Icon name='smartphone' size={18} style={styles.icons} />
                            </TouchableOpacity>
                            <Text style={styles.label}>Phone Number</Text>
                        </View>
                        <View style={styles.infoRow1}>
                            <Text style={styles.value}>(307) 555-0133</Text>
                            <TouchableOpacity>
                                <Icon name='arrow-forward-ios' size={18} style={styles.arrowicon} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.infoRow}>
                        <View style={styles.infoRow1} >
                            <TouchableOpacity>
                                <Icon name='lock-outline' size={18} style={styles.icons} />
                            </TouchableOpacity>
                            <Text style={styles.label}>Change Password</Text>
                        </View>
                        <View style={styles.infoRow1}>
                            <Text style={styles.value}>••••••••••</Text>
                            <TouchableOpacity>
                                <Icon name='arrow-forward-ios' size={18} style={styles.arrowicon} />
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </View>
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
    text: {
        fontSize: FONTS.header,
        color: COLORS.text,
    },

    profileViews: {
        flex: 0.9,
        paddingHorizontal: 10,
    },

    profileImageContainer: {
        width: '100%',
        flex: 0.5,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
    },
    imageContainer: {
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageTextContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: '75%',
        height: '55%',
        borderRadius: 100,
        borderWidth: 1,
        borderColor: COLORS.inputBorderColor,
        backgroundColor: COLORS.inputBorderColor,
    },
    name: {
        fontSize: FONTS.main,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    username: {
        fontSize: FONTS.subheader,
        color: COLORS.textTwo,
        fontWeight: 'bold',
    },
    infoContainer: {
        marginVertical: 10,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
    },
    infoRow1: {
        flexDirection: 'row',
        alignItems: "center",
    },
    icons: {
        paddingHorizontal: 15,
        color: COLORS.buttonBackgrountColor,
    },
    arrowicon: {
        paddingHorizontal: 15,
        color:COLORS.text,
    },
    label: {
        fontSize: FONTS.subheader,
        color: COLORS.text,
        fontWeight: 'bold',
    },
    value: {
        fontSize: FONTS.subheader,
        color: COLORS.textTwo,
        fontWeight: 'bold',
    },
});

export default Profile;
