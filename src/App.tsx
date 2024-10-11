import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Screens
import Index from "./src/Screens/Index/Index";
import Login from "./src/Screens/Accounts/Login";
import Register from "./src/Screens/Accounts/Register";
import Home from "./src/Screens/Home/HomeScreen";
import ProductDetail from "./src/Screens/Home/Product Detail/ProductDetail";
import SuperFlashSale from "./src/Screens/Home/Sale/SuperFlashSale";
import SuperMegaSale from "./src/Screens/Home/Sale/SuperMegaSale";
import Notification from "./src/Screens/Home/Favorite & Notification/Notification";
import Favorite from "./src/Screens/Home/Favorite & Notification/Favorite";
import NotificationActivity from "./src/Screens/Home/Favorite & Notification/NotificationActivity";
import NotificationOffer from "./src/Screens/Home/Favorite & Notification/NotificationOffer";
import NotificationFeed from "./src/Screens/Home/Favorite & Notification/NotificationFeed";
import ReviewProduct from "./src/Screens/Home/Product Detail/ReviewProduct";
import WriteReview from "./src/Screens/Home/Product Detail/WriteReview";
import Cart from "./src/Screens/Home/Cart/Cart";
import ConformCart from "./src/Screens/Home/Cart/ConformCart";
import ShipTo from "./src/Screens/Home/Cart/ShipTo";
import Payment from "./src/Screens/Home/Cart/Payment";
import DebitCard from "./src/Screens/Home/Cart/DebitCard";
import Success from "./src/Screens/Home/Cart/Success";
import OrderDetailsScreen from "./src/Screens/Home/orders/OrderDetailsScreen";
import Profile from "./src/Screens/Home/Settings/Profile/Profile";
import ChangeName from "./src/Screens/Home/Settings/Profile/ChangeName";
import GenderSelection from "./src/Screens/Home/Settings/Profile/GenderSelection";
import Address from "./src/Screens/Home/Settings/Address/Address";
import AddAddress from "./src/Screens/Home/Settings/Address/AddAddress";
import NewPayment from "./src/Screens/Home/Settings/AddPayment/NewPayment";
import AddNewCard from "./src/Screens/Home/Settings/AddPayment/AddNewCard";
import EditAddress from "./src/Screens/Home/Settings/Address/EditAddress";
import SettingIndex from "./src/Screens/Home/Settings/SettingIndex";

import { COLORS } from "./src/constant/Colors";
import { FONTS } from "./src/constant/Fonts";
import Icon from '@react-native-vector-icons/material-icons';
import Explore from "./src/Screens/Home/Explore/Explore";
import orders from "./src/Screens/Home/orders/orders";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export type RootStackParamList = {
  navigate(arg0: string): unknown;
  Index: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  ProductDetail: undefined;
  SuperFlashSale: undefined;
  SuperMegaSale: undefined;
  Notification: undefined;
  Favorite: undefined;
  NotificationActivity: undefined;
  NotificationOffer: undefined;
  NotificationFeed: undefined;
  ShipTo: undefined;
  Payment: undefined;
  ConformCart: undefined;
  DebitCard: undefined;
  Success: undefined;
  OrderDetails: undefined;
  Profile: undefined;
  ChangeName: undefined;
  GenderSelection: undefined;
  Address: undefined;
  AddAddress: undefined;
  NewPayment: undefined;
  AddNewCard: undefined;
  SettingIndex: undefined;
  EditAddress: undefined;
};

const TabNavigator: React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => {
        let iconName: string = '';
        switch (route.name) {
          case 'Home':
            iconName = 'home';
            break;
          case 'Explore':
            iconName = 'search';
            break;
          case 'Cart':
            iconName = 'shopping-cart';
            break;
          case 'orders':
            iconName = 'shopping-bag';
            break;
          case 'Settings':
            iconName = 'settings';
            break;
        }
        return <Icon name={iconName} size={24} color={color} />;
      },
      tabBarActiveTintColor: COLORS.buttonBackgrountColor,
      tabBarInactiveTintColor: COLORS.textTwo,
      tabBarStyle: {
        backgroundColor: COLORS.backgroundColor,
        justifyContent: 'space-evenly',
        alignItems: 'center',
      },
      tabBarLabelStyle: {
        fontSize: FONTS.bodyTwo,
      },
    })}
  >
    <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
    <Tab.Screen name="Explore" component={Explore} options={{ headerShown: false }} />
    <Tab.Screen name="Cart" component={Cart} options={{ headerShown: false }} />
    <Tab.Screen name="orders" component={orders} options={{ headerShown: false }} />
    <Tab.Screen name="Settings" component={SettingIndex} options={{ headerShown: false }} />
  </Tab.Navigator>
);

const App = () => {
  const [initialRoute, setInitialRoute] = useState<keyof RootStackParamList | null>(null);

  useEffect(() => {
    const checkUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          setInitialRoute('Index');
        } else {
          setInitialRoute('Register');
        }
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
        setInitialRoute('Register');
      }
    };

    checkUserData();
  }, []);

  if (initialRoute === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={initialRoute}>
        <Stack.Screen name="Index" component={Index} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="SuperFlashSale" component={SuperFlashSale} options={{ headerShown: false }} />
        <Stack.Screen name="SuperMegaSale" component={SuperMegaSale} options={{ headerShown: false }} />
        <Stack.Screen name="Notification" component={Notification} options={{ headerShown: false }} />
        <Stack.Screen name="Favorite" component={Favorite} options={{ headerShown: false }} />
        <Stack.Screen name="NotificationActivity" component={NotificationActivity} options={{ headerShown: false }} />
        <Stack.Screen name="NotificationOffer" component={NotificationOffer} options={{ headerShown: false }} />
        <Stack.Screen name="NotificationFeed" component={NotificationFeed} options={{ headerShown: false }} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ headerShown: false }} />
        <Stack.Screen name="ReviewProduct" component={ReviewProduct} options={{ headerShown: false }} />
        <Stack.Screen name="WriteReview" component={WriteReview} options={{ headerShown: false }} />
        <Stack.Screen name="ConformCart" component={ConformCart} options={{ headerShown: false }} />
        <Stack.Screen name="ShipTo" component={ShipTo} options={{ headerShown: false }} />
        <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }} />
        <Stack.Screen name="DebitCard" component={DebitCard} options={{ headerShown: false }} />
        <Stack.Screen name="Success" component={Success} options={{ headerShown: false }} />
        <Stack.Screen name="OrderDetails" component={OrderDetailsScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        <Stack.Screen name="ChangeName" component={ChangeName} options={{ headerShown: false }} />
        <Stack.Screen name="GenderSelection" component={GenderSelection} options={{ headerShown: false }} />
        <Stack.Screen name="Address" component={Address} options={{ headerShown: false }} />
        <Stack.Screen name="AddAddress" component={AddAddress} options={{ headerShown: false }} />
        <Stack.Screen name="NewPayment" component={NewPayment} options={{ headerShown: false }} />
        <Stack.Screen name="AddNewCard" component={AddNewCard} options={{ headerShown: false }} />
        <Stack.Screen name="EditAddress" component={EditAddress} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
