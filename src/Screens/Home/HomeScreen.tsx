
import React, { useEffect, useState } from "react";
import { Alert, Dimensions, Image, ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constant/Colors";
import { FONTS } from "../../constant/Fonts";
import Icon from 'react-native-vector-icons/Ionicons';
import axios from "axios";
import StarIcon from 'react-native-vector-icons/FontAwesome';
import FlashSale from "./Sale/FlashSale";
import MegaSale from "./Sale/MegaSale";
import { carouseImage, IMAGE } from "../../constant/Image";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Api_Data } from "../../data/data";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../App";

const { width: screenWidth } = Dimensions.get('window');

interface Product {
    id: number;
    title: string;
    price: number;
    discountPercentage: number;
    rating: number; // Changed to number for simplicity
    thumbnail: string;
}

const Home: React.FC = () => {
    const [data, setData] = useState<Product[]>([]);
    const [isFocused, setIsFocused] = useState(false);
    const [activeSlide, setActiveSlide] = useState(0);

    const Navigation:RootStackParamList = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(Api_Data);
                const products = response.data.products;
                const randomProducts = products.sort(() => 0.5 - Math.random()).slice(0, 12);
                setData(randomProducts);
            } catch {
                Alert.alert("Error fetching product data:");
            }
        }
        fetchData();
    }, []);

    const renderStars = (rating: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <StarIcon
                    key={i}
                    name="star"
                    size={12}
                    color={i <= rating ? 'gold' : 'grey'}
                    style={style.star}
                />
            );
        }
        return stars;
    };

    const renderCarouselItem = ({ item }: { item: typeof carouseImage[0] }) => (
        <View style={style.carouselItem}>
            <Image source={item.image1} style={style.carouselImage} />
        </View>
    );


    const handleEdit = (item: Product) => {
        Navigation.navigate('ProductDetail', { productDetaildata: item });
    };


    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={style.container}
        >
            <SafeAreaView style={style.safeArea}>
                <View style={style.header}>
                    <View style={style.input_container}>
                        <View style={[style.inputview, isFocused && style.focusedInput]}>
                            <Icon name="search" size={24} color={COLORS.buttonBackgrountColor} />
                            <TextInput
                                style={style.input}
                                placeholder="Search"
                                placeholderTextColor={COLORS.textTwo}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                            />
                        </View>
                    </View>
                    <View style={style.Icons_view}>
                        <TouchableOpacity onPress={() => Navigation.navigate('Favorite')}>
                            <Icon name="heart-outline" size={24} style={style.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => Navigation.navigate('Notification')}>
                            <Icon name="notifications-outline" size={24} style={style.icon} />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={style.scrollViewContent}
                    keyboardShouldPersistTaps="handled"
                    bounces={false}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={style.productview}>
                        <Carousel
                            data={carouseImage}
                            renderItem={renderCarouselItem}
                            sliderWidth={screenWidth}
                            itemWidth={screenWidth - 20}
                            loop
                            onSnapToItem={(index) => setActiveSlide(index)}
                        />
                        <Pagination
                            dotsLength={carouseImage.length}
                            activeDotIndex={activeSlide}
                            containerStyle={style.paginationContainer}
                            dotStyle={style.activeDot}
                            inactiveDotStyle={style.inactiveDot}
                            inactiveDotOpacity={0.6}
                            inactiveDotScale={0.6}
                        />
                    </View>
                    <FlashSale />
                    <MegaSale />

                    <TouchableOpacity style={style.recomended}>
                        <ImageBackground
                            source={IMAGE.recomendedImage}
                            style={style.recomended_image}
                        >
                            <View style={style.recomended_text_view}>
                                <Text style={style.recomended_text}>Recommended </Text>
                                <Text style={style.recomended_text}>for you</Text>
                                <Text style={style.recomended_text2}>We recommend the best for you</Text>
                            </View>
                        </ImageBackground>
                    </TouchableOpacity>

                    <View style={style.product_view}>
                        {data.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                onPress={() => handleEdit(item)}
                                style={style.product_card}
                            >
                                <Image
                                    source={{ uri: item.thumbnail }}
                                    style={style.image}
                                    resizeMode="cover"
                                />
                                <Text style={style.title}>{item.title}</Text>
                                <View style={style.rating}>
                                    {renderStars(item.rating)}
                                </View>
                                <Text style={style.price}>${item.price.toFixed(2)}</Text>
                                <Text style={style.discount}>{item.discountPercentage}% off</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </KeyboardAvoidingView>
    );
};

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.backgroundColor,
    },
    safeArea: {
        flex: 1,
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    header: {
        flexDirection: 'row',
        borderBottomColor: COLORS.inputBorderColor,
        borderBottomWidth: 1,
        paddingVertical: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
    },
    input_container: {
        flex: 3,
        justifyContent: 'center',
    },
    inputview: {
        flexDirection: 'row',
        borderColor: COLORS.inputBorderColor,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    focusedInput: {
        borderColor: COLORS.buttonBackgrountColor,
    },
    input: {
        flex: 1,
        paddingHorizontal: 10,
        fontSize: FONTS.body,
        color: COLORS.textTwo,
    },
    icon: {
        color: COLORS.textTwo,
    },
    Icons_view: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    productview: {
        marginVertical: 10,
    },
    carouselItem: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    paginationContainer: {
        paddingVertical: 8,
    },
    activeDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.buttonBackgrountColor,
    },
    inactiveDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: COLORS.text,
    },
    recomended: {
        marginHorizontal: 20,
        marginVertical: 20,
        height: 150,
        justifyContent: 'center',
    },
    recomended_image: {
        flex: 1,
        borderRadius: 5,
    },
    recomended_text_view: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    recomended_text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.buttonTextColor,
    },
    recomended_text2: {
        fontSize: FONTS.body,
        color: COLORS.buttonTextColor,
        marginTop: 10,
    },
    product_view: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
    },

    product_card: {
        width: '43%',
        // height: '16%',
        marginHorizontal: 10,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: COLORS.inputBorderColor,
        borderRadius: 5,
        padding: 10,
    },
    image: {
        width: '100%',
        height: 150,
        resizeMode: 'contain',
    },
    title: {
        fontSize: FONTS.body,
        fontWeight: 'bold',
        color: COLORS.text,
        marginVertical: 5,
    },
    rating: {
        flexDirection: 'row',
        marginVertical: 5,
    },
    star: {
        marginHorizontal: 1,
    },
    price: {
        fontSize: FONTS.body,
        fontWeight: 'bold',
        color: COLORS.buttonBackgrountColor,
        marginVertical: 5,
    },
    discount: {
        fontSize: FONTS.body,
        color: COLORS.alert,
        marginVertical: 5,
    },
});

export default Home;
