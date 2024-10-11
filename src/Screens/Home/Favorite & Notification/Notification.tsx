import Icon from "@react-native-vector-icons/material-icons";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../constant/Colors";
import { FONTS } from "../../../constant/Fonts";
import { RootStackParamList } from "../../../../App";
import { useNavigation } from "@react-navigation/native";
import { Notificationdata } from "../../../data/data";
import React from "react";

const Notification:React.FC= () => {

   const Navigation: RootStackParamList = useNavigation();
   return (
      <SafeAreaView style={style.container}>
         <View style={style.SuperFlash}>
            <View style={style.backview}>
               <TouchableOpacity onPress={() => { Navigation.navigate('Home') }}>
                  <Icon name='arrow-back-ios-new' size={22} style={style.linkicon} />
               </TouchableOpacity>

               <Text style={style.linktext}>Notification</Text>
            </View>
         </View>

         <ScrollView
         bounces={false}
         showsVerticalScrollIndicator={false} 
          style={style.ScrollView}>
            <View style={style.notificationViews}>
               <TouchableOpacity
               onPress={()=>{Navigation.navigate('NotificationOffer')}}
               style={style.notificationTextView}>
               <View style={style.notificationTextView_view}>
                     <Icon name='local-offer' size={22} color={COLORS.buttonBackgrountColor} />
                     <Text style={style.linktext}>Offers</Text>
                  </View>
                  <View style={style.countview}>
                   
                     <Text style={style.counttext}>{Notificationdata.Offer.length}</Text>
                  </View>
               </TouchableOpacity>

               <TouchableOpacity
               onPress={()=>{Navigation.navigate('NotificationFeed')}}
               style={style.notificationTextView}>

                  <View style={style.notificationTextView_view}>
                     <Icon name='feed' size={22} color={COLORS.buttonBackgrountColor}  />
                     <Text style={style.linktext}>Feed</Text>
                  </View>
                  <View style={style.countview}>
                     <Text style={style.counttext}>{Notificationdata.Feed.length}</Text>
                  </View>

               </TouchableOpacity>

               <TouchableOpacity
               onPress={()=>{Navigation.navigate('NotificationActivity')}}
               style={style.notificationTextView}>
                  <View style={style.notificationTextView_view}>
                     <Icon name='notifications-none' size={22} color={COLORS.buttonBackgrountColor} />
                     <Text style={style.linktext}>Acivity</Text>
                  </View>
                  <View style={style.countview}>
                     <Text style={style.counttext}>{Notificationdata.Activity.length}</Text>
                  </View>
               </TouchableOpacity>
            </View>
         </ScrollView>
      </SafeAreaView>
   );
}
const style = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: COLORS.backgroundColor,
   },
   SuperFlash: {
      flex: 0.1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 30,
      borderBottomColor: COLORS.inputBorderColor,
      borderBottomWidth: 1
   },
   backview: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },

   linkicon: {
      color: COLORS.textTwo,
      fontWeight: 'bold',
   },
   linktext: {
      fontSize: FONTS.subheader,
      color: COLORS.text,
      fontWeight: 'bold',
      paddingHorizontal: 20
   },


   ScrollView: {
      flex: 0.9,
   },
   notificationViews: {},
   notificationTextView: {
      // flex:0.1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: 20,
      paddingHorizontal: 30,
   },

   notificationTextView_view: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
   },
   countview: {
      backgroundColor: COLORS.alert,
      paddingHorizontal: 8,
      paddingVertical: 1,
      borderRadius: 50,
   },
   counttext: {
      color: COLORS.backgroundColor,
      fontSize: FONTS.header,

   },
})

export default Notification