import React, { useState } from 'react';
import { Dimensions, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import Icon from '@react-native-vector-icons/material-icons';
import StarIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { COLORS } from '../../../constant/Colors';
import { FONTS } from '../../../constant/Fonts';
import { cartData, productColors, productSize } from '../../../data/data';
import { IMAGE } from '../../../constant/Image';
import { RootStackParamList } from '../../../../App';

const { width: screenWidth } = Dimensions.get('window');

interface Product {
  id: number;
  title: string;
  price: number;
  discountPercentage: number;
  rating: number;
  thumbnail: string;
  brand: string;
  images: string[];
  weight: string;
  sku: string;
  reviews: any[];
  warrantyInformation: string;
  description: string;
  shippingInformation: string;
}

const ProductDetail: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const navigation = useNavigation<RootStackParamList>();
  const route = useRoute();
  const { productDetaildata } = route.params as { productDetaildata: Product };

  const renderCarouselItem = ({ item }: { item: { image1: any } }) => (
    <View style={styles.carouselItem}>
      <Image source={{ uri: item.image1 }} style={styles.carouselImage} />
    </View>
  );

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <StarIcon
          key={i}
          name="star"
          size={16}
          color={i <= rating ? 'gold' : 'grey'}
          style={styles.star}
        />
      );
    }
    return stars;
  };

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(cartData, {
        productId: productDetaildata.id,
        quantity: 1,
        images: productDetaildata.thumbnail,
        price: productDetaildata.price,
        product_name: productDetaildata.title,
      });

      if (response.status === 201) {
        setIsAddedToCart(true);
        Alert.alert('Success', 'Product added to cart');
      } else {
        Alert.alert('Error', 'Failed to add product to cart');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name='arrow-back-ios-new' size={22} style={styles.linkIcon} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{productDetaildata.title}</Text>
        <TouchableOpacity style={styles.searchView}>
          <Icon name='search' size={22} style={styles.linkIcon} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} bounces={false} showsVerticalScrollIndicator={false}>
        <View style={styles.carouselContainer}>
          <Carousel
            data={productDetaildata.images.map(image => ({ image1: image }))}
            renderItem={renderCarouselItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
            loop
            onSnapToItem={(index) => setActiveSlide(index)}
          />
          <Pagination
            dotsLength={productDetaildata.images.length}
            activeDotIndex={activeSlide}
            containerStyle={styles.paginationContainer}
            dotStyle={styles.activeDot}
            inactiveDotStyle={styles.inactiveDot}
            inactiveDotOpacity={0.6}
            inactiveDotScale={0.6}
          />
        </View>

        <View style={styles.productDetails}>

          <Text style={styles.title}>{productDetaildata.title}</Text>


          <View style={styles.productHeader}>
            <View style={styles.ratingPriceView}>
              <View style={styles.ratingView}>
                {renderStars(productDetaildata.rating)}
              </View>
              <Text style={styles.price}>$ {productDetaildata.price}</Text>
            </View>
            <TouchableOpacity>
              <Icon name='favorite-border' size={24} style={styles.favoriteIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.sizeSection}>
            <Text style={styles.sectionHeader}>Select Size</Text>
            <View style={styles.sizeView}>
              {productSize.map((size) => (
                <TouchableOpacity
                  style={styles.size}
                  key={size.id}
                >
                  <Text style={styles.sizeText}>{size.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.colorSection}>
            <Text style={styles.sectionHeader}>Select Colors</Text>
            <View style={styles.colorView}>
              {productColors.map((color) => (
                <TouchableOpacity
                  style={[styles.colorOption, { backgroundColor: color.name }]}
                  key={color.id}
                />
              ))}
            </View>
          </View>

          <View style={styles.specificationSection}>
            <Text style={styles.sectionHeader}>Specification</Text>
            <View style={styles.specificationtext}>
              <Text style={styles.spectext}>Brand</Text>
              <Text style={styles.spectext}>{productDetaildata.brand}</Text>
            </View>
            <View style={styles.specificationtext}>
              <Text style={styles.spectext}>Weight</Text>
              <Text style={styles.spectext}>{productDetaildata.weight}</Text>
            </View>
            <View style={styles.specificationtext}>
              <Text style={styles.spectext}>SKU</Text>
              <Text style={styles.spectext}>{productDetaildata.sku}</Text>
            </View>
            <View style={styles.specificationtext}>
              <Text style={styles.spectext}>Warranty Information</Text>
              <Text style={styles.spectext}>{productDetaildata.warrantyInformation}</Text>
            </View>
            <View style={styles.specificationtext}>
              <Text style={styles.spectext}>Shipping Information</Text>
              <Text style={styles.spectext}>{productDetaildata.shippingInformation}</Text>
            </View>
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.sectionHeader}>Description</Text>
            <Text style={styles.spectext}>{productDetaildata.description}</Text>
          </View>

          <View style={styles.reviewProductSection}>
            <View style={styles.reviewProductLink}>
              <Text style={styles.sectionHeader}>Review Product</Text>
              <TouchableOpacity>
                <Text style={styles.sectionHeaderlink}>See More</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.reviewProductrateing}>
              <View style={styles.ratingView}>
                {renderStars(productDetaildata.rating)}
              </View>
              <Text style={styles.ratingtext}>{productDetaildata.rating} ({productDetaildata.reviews.length})</Text>
            </View>

            {productDetaildata.reviews.length > 0 && (
              <View style={styles.ratingReViewperson}>
                <View style={styles.ratingReViewView}>
                  <Image
                    source={IMAGE.recomendedImage}
                    style={styles.reviewprofile} />
                  <View>
                    <Text style={styles.reviewprofiletext}>{productDetaildata.reviews[0].reviewerName}</Text>
                    <View style={styles.reviewprofilestars}>
                      {renderStars(productDetaildata.reviews[0].rating)}
                    </View>
                  </View>
                </View>
                <View>
                  <Text style={styles.spectext}>
                    {productDetaildata.reviews[0].comment}
                  </Text>
                  <Text style={styles.spectext}>
                    {productDetaildata.reviews[0].date}
                  </Text>
                </View>
              </View>
            )}
          </View>

          <View>
            <TouchableOpacity
              onPress={isAddedToCart ? () => navigation.navigate('Cart') : handleAddToCart}
              style={styles.button}
            >
              <Text style={styles.buttotext}>
                {isAddedToCart ? 'Go to Cart' : 'Add to Cart'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundColor,
  },
  header: {
    flex: 0.1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomColor: COLORS.inputBorderColor,
    borderBottomWidth: 1,
  },
  linkIcon: {
    color: COLORS.text,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: FONTS.subheader,
    color: COLORS.text,
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
  searchView: {

  },
  scrollView: {
    flex: 1,
  },
  carouselContainer: {
    marginBottom: 15,
  },
  carouselItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: '100%',
    height: 200,
  },
  paginationContainer: {
    paddingVertical: 8,
  },
  activeDot: {
    backgroundColor: COLORS.buttonBackgrountColor,
  },
  inactiveDot: {
    backgroundColor: COLORS.text,
  },
  productDetails: {
    marginHorizontal: 25,
    marginVertical: 15,
  },
  productHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: FONTS.main,
    color: COLORS.text,
    fontWeight: 'bold',
  },
  favoriteIcon: {
    color: COLORS.text,
  },
  ratingPriceView: {
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  ratingView: {
    flexDirection: 'row',
    paddingVertical: 5
  },
  price: {
    color: COLORS.buttonBackgrountColor,
    fontSize: FONTS.main,
    fontWeight: 'bold',
    paddingVertical: 5
  },
  sizeSection: {
    marginVertical: 10,
  },
  sectionHeader: {
    fontSize: FONTS.subheader,
    color: COLORS.text,
    fontWeight: 'bold',
    marginVertical: 5
  },
  sizeView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  size: {
    width: '15%',
    height: '15%',
    aspectRatio: 1,
    borderRadius: 50,
    marginHorizontal: 2,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: COLORS.buttonBackgrountColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeText: {
    fontSize: FONTS.body,
    color: COLORS.buttonBackgrountColor,
    textAlign: 'center',
  },
  colorSection: {
    marginVertical: 10,
  },
  colorView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',

  },
  colorOption: {
    width: '15%',
    height: '15%',
    aspectRatio: 1,
    borderRadius: 50,
    marginHorizontal: 2,
    marginVertical: 5,
  },
  specificationSection: {
    marginVertical: 10,
  },
  star: {
    marginHorizontal: 3,
  },


  specificationtext: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inputBorderColor,
  },
  spectext: {
    fontSize: FONTS.subheader,
    color: COLORS.textTwo,
    paddingVertical: 10
  },
  descriptionSection: {
    marginVertical: 10,
  },

  reviewProductSection: {
    marginVertical: 10,
  },
  reviewProductLink: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionHeaderlink: {
    fontSize: FONTS.subheader,
    color: COLORS.buttonBackgrountColor,
    fontWeight: 'bold',
  },

  reviewProductrateing: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
  },
  ratingtext: {
    fontSize: FONTS.subheader,
    color: COLORS.textTwo,
    paddingHorizontal: 10
  },
  reviewprofile: {
    width: '15%',
    height: '15%',
    aspectRatio: 1,
    borderRadius: 50,
    marginHorizontal: 2,
    marginVertical: 5,
  },
  reviewprofiletext: {
    fontSize: FONTS.subheader,
    color: COLORS.text,
    fontWeight: 'bold',
    paddingHorizontal: 20
  },
  ratingReViewperson: {
    paddingHorizontal: 10,
    marginVertical: 10

  },
  ratingReViewView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewprofilestars: {
    flexDirection: 'row',
    paddingHorizontal: 20
  },
  button: {
    backgroundColor: COLORS.buttonBackgrountColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttotext: {
    color: COLORS.buttonTextColor,
    paddingVertical: 15,

    fontSize: FONTS.header,
    fontWeight: 'bold',
  }
});

export default ProductDetail;
