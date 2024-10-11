import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { FONTS } from '../../../constant/Fonts';
import { COLORS } from '../../../constant/Colors';
import { RootStackParamList } from '../../../../App';
import { useNavigation } from '@react-navigation/native';
import Icon from '@react-native-vector-icons/material-icons';

const OrderDetailsScreen:React.FC = () => {
  const navigation: RootStackParamList = useNavigation();
  return (


    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <View style={styles.backview}>
          <TouchableOpacity
            onPress={() => { navigation.navigate('orders'); }}>
            <Icon name='arrow-back-ios-new' size={22} style={styles.linkicon} />
          </TouchableOpacity>
          <Text style={styles.linktext}>Order Details</Text>
        </View>
      </View>


      <ScrollView
        style={styles.scrollView}
        bounces={false}
        showsVerticalScrollIndicator={false}>


        {/* Order Progress */}
        <View style={styles.orderProgress}>
          <View style={styles.dotsView}>

            <View style={styles.progressItem}>
              <View style={styles.progressDot} />
            </View>

            <View style={styles.progressLine} />
            <View style={styles.progressItem}>
              <View style={styles.progressDot} />
            </View>

            <View style={styles.progressLine} />
            <View style={styles.progressItem}>
              <View style={styles.progressDot} />
            </View>

            <View style={styles.progressLine} />
            <View style={styles.progressItem}>
              <View style={[styles.progressDot, { backgroundColor: '#e0e0e0' }]} />
            </View>

          </View>

          <View style={styles.dotsView}>
            <Text style={styles.progressLabel}>Packing</Text>

            <Text style={styles.progressLabel}>Shipping</Text>

            <Text style={styles.progressLabel}>Arriving</Text>

            <Text style={styles.progressLabel}>Success</Text>
          </View>
        </View>

        {/* Product Details */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Product</Text>
          <View style={styles.productItem}>
            <Image
              source={{ uri: 'https://via.placeholder.com/100' }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>Nike Air Zoom Pegasus 36 Miami</Text>
              <Text style={styles.productPrice}>$299.43</Text>
            </View>
            <TouchableOpacity>
            <Icon name='favorite-outline' size={22} />
            </TouchableOpacity>
          </View>
          <View style={styles.productItem}>
            <Image
              source={{ uri: 'https://via.placeholder.com/100' }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>Nike Air Zoom Pegasus 36 Miami</Text>
              <Text style={styles.productPrice}>$299.43</Text>
            </View>
            <TouchableOpacity>
            <Icon name='favorite-outline' size={22} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Shipping Details */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Shipping Details</Text>
          <Text style={styles.shippingDetail}>Date Shipping: January 16, 2020</Text>
          <Text style={styles.shippingDetail}>Shipping: POS Regular</Text>
          <Text style={styles.shippingDetail}>No. Resi: 000192848573</Text>
          <Text style={styles.shippingDetail}>Address: 2372 New Owerri, Owerri, Imo State 78410</Text>
        </View>

        {/* Payment Details */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Payment Details</Text>
          <View style={styles.paymentDetailRow}>
            <Text style={styles.paymentDetailLabel}>Items (3)</Text>
            <Text style={styles.paymentDetailValue}>$598.86</Text>
          </View>
          <View style={styles.paymentDetailRow}>
            <Text style={styles.paymentDetailLabel}>Shipping</Text>
            <Text style={styles.paymentDetailValue}>$40.00</Text>
          </View>
          <View style={styles.paymentDetailRow}>
            <Text style={styles.paymentDetailLabel}>Import Charges</Text>
            <Text style={styles.paymentDetailValue}>$128.00</Text>
          </View>
          <View style={styles.paymentDetailRow}>
            <Text style={styles.paymentDetailLabel}>Total Price</Text>
            <Text style={styles.totalPrice}>$766.86</Text>
          </View>
        </View>


      </ScrollView>
      {/* Notify Button */}
      <View style={styles.notifyButtonView}>
        <TouchableOpacity style={styles.notifyButton}>
          <Text style={styles.notifyButtonText}>Notify Me</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
    fontSize: FONTS.subheader,
    color: COLORS.text,
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },


  scrollView: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
    flexGrow: 1,
    paddingHorizontal: 20,
  },

  dotsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    alignItems: 'center',
  },

  orderProgress: {
    paddingVertical: 20,
  },

  progressItem: {
    alignItems: 'center',
  },
  progressLabel: {
    fontSize: FONTS.body,
    color: COLORS.text,
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressDot: {
    padding: 10,
    borderRadius: 50,
    backgroundColor: COLORS.buttonBackgrountColor,
  },
  progressLine: {
    flex: 1,
    height: 2,
    backgroundColor: COLORS.buttonBackgrountColor,
    marginHorizontal: 5,
  },


  card: {
    marginVertical:5,
  },
  sectionTitle: {
    fontSize: FONTS.header,
    fontWeight: 'bold',
    paddingVertical:5,
  },
  productItem: {
    flexDirection: 'row',
    alignItems: 'center',
   justifyContent:'space-evenly',
   paddingVertical:10
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  productInfo: {
   paddingHorizontal:10,
  },
  productName: {
    fontSize:  FONTS.subheader,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize:  FONTS.subheader,
    color:  COLORS.buttonBackgrountColor,
  },
 
  shippingDetail: {
    fontSize:  FONTS.subheader,
    color: COLORS.textTwo,
    paddingVertical:5,
  },
  paymentDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical:5,
  },
  paymentDetailLabel: {
    fontSize: FONTS.subheader,
    color: COLORS.textTwo,
  },
  paymentDetailValue: {
    fontSize: FONTS.subheader,
    color: COLORS.textTwo,
  },
  totalPrice: {
    fontSize: FONTS.header,
    fontWeight: 'bold',
    color: COLORS.buttonBackgrountColor,
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

export default OrderDetailsScreen;
