import React, { useState } from 'react'
import { Alert, Modal, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS } from '../../../constant/Colors';
import { FONTS } from '../../../constant/Fonts';
import Icon from '@react-native-vector-icons/material-icons';
import { RootStackParamList } from '../../../../App';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const SettingIndex: React.FC = () => {
    const navigation: RootStackParamList = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
      setModalVisible(!modalVisible);
    };
    const handleLogout = async () => {
      await AsyncStorage.removeItem('apiToken');
      delete axios.defaults.headers.common['Authorization'];
      Alert.alert('Success', 'Logged out successfully');
      navigation.navigate('Login')
  };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.text}>Setting</Text>
            </View>

            <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
                style={styles.linkViews}>
                <TouchableOpacity >
                    <Icon name='person-outline' size={24} style={styles.icons} />
                </TouchableOpacity>
                <Text style={styles.linkViewsText}>Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity
             onPress={() => navigation.navigate('Address')}
            style={styles.linkViews}>
                <TouchableOpacity>
                    <Icon name='location-on' size={24} style={styles.icons} />
                </TouchableOpacity>
                <Text style={styles.linkViewsText}>Address</Text>
            </TouchableOpacity>

            <TouchableOpacity 
            onPress={() => navigation.navigate('NewPayment')}
            style={styles.linkViews}>
                <TouchableOpacity>
                    <Icon name='credit-card' size={24} style={styles.icons} />
                </TouchableOpacity>
                <Text style={styles.linkViewsText}>Payment</Text>
            </TouchableOpacity>

            <TouchableOpacity 
             onPress={toggleModal}
            style={styles.linkViews}>
                <TouchableOpacity>
                    <Icon name='logout' size={24} style={styles.icons} />
                </TouchableOpacity>
                <Text style={styles.linkViewsText}>Log out</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={toggleModal}
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalText}>Are you sure you want to logout?</Text>
                    <TouchableOpacity style={styles.cancelButton} onPress={toggleModal}>
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.logoutConfirmButton} onPress={handleLogout}>
                      <Text style={styles.logoutConfirmButtonText}>Log Out</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </Modal> 
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
    },
    header: {
        flex: 0.1,
        justifyContent: 'center',
        paddingHorizontal: 30,
        borderBottomWidth: 1,
        borderColor: COLORS.inputBorderColor,
    },
    text: {
        fontSize: FONTS.header,
        color: COLORS.text,
    },
    icons: {
        color: COLORS.buttonBackgrountColor,
    },
    linkViews: {
        flex: 0.1,
        flexDirection: 'row',
        paddingHorizontal: 30,
        alignItems: 'center',
    },
    linkViewsText: {
        fontSize: FONTS.header,
        color: COLORS.text,
        paddingHorizontal: 15,
    },

    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContent: {
        padding: 20,
        backgroundColor: COLORS.backgroundColor,
        borderRadius: 10,
        alignItems: 'center',
      },
      modalText: {
        fontSize: FONTS.subheader,
        marginBottom: 20,
        textAlign: 'center',
        color: COLORS.text,
      },
      cancelButton: {
    
        borderRadius: 50,
        backgroundColor:COLORS.buttonBackgrountColor,
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 80,
        paddingVertical: 10,
        marginVertical:10,
      },
      cancelButtonText: {
        color: COLORS.buttonTextColor,
        fontSize: FONTS.header,
        fontWeight: '600',
      },
      logoutConfirmButton: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 80,
        paddingVertical: 10,
        marginVertical:10,
      },
      logoutConfirmButtonText: {
        color: COLORS.text,
        fontSize: FONTS.subheader,
        fontWeight: '600',
      },
    
})

export default SettingIndex;