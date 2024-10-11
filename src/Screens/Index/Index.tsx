import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
import { COLORS } from "../../constant/Colors";
import { IMAGE } from "../../constant/Image";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootStackParamList } from "../../../App";

// Define type for navigation
type NavigationProp = StackNavigationProp<RootStackParamList>;

const Index: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const checkDataAndNavigate = async () => {
      try {
        const data = await AsyncStorage.getItem('userData'); 
        if (data) {
          navigation.navigate('Home');
        } else {
          navigation.navigate('Login');
        }
      } catch (error) {
        console.error('Failed to fetch data from AsyncStorage:', error);
        navigation.navigate('Login'); 
      }
    };

    const timer = setTimeout(() => {
      checkDataAndNavigate();
    }, Math.floor(Math.random() * 800) + 800); 

    return () => clearTimeout(timer);

  }, [navigation]);

  return (
    <View style={styles.container}>
      <View>
        <Image
          source={IMAGE.indexIcon}
          style={styles.icon}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    borderRadius: 10
  }
});

export default Index;
