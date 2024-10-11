import Icon from "@react-native-vector-icons/material-icons";
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../../constant/Colors";
import { FONTS } from "../../../constant/Fonts";
import { RootStackParamList } from "../../../../App";
import { useNavigation } from "@react-navigation/native";
import { Notificationdata } from "../../../data/data";
import { IMAGE } from "../../../constant/Image";
import React from "react";

const NotificationFeed:React.FC = () => {

    const Navigation: RootStackParamList = useNavigation();
    return (
        <SafeAreaView style={style.container}>
            <View style={style.SuperFlash}>
                <View style={style.backview}>
                    <TouchableOpacity onPress={() => { Navigation.navigate('Notification') }}>
                        <Icon name='arrow-back-ios-new' size={22} style={style.linkicon} />
                    </TouchableOpacity>

                    <Text style={style.linktext}>Notification Feed</Text>
                </View>
            </View>

            <ScrollView 
            bounces={false}
            showsVerticalScrollIndicator={false}
             style={style.ScrollView}>

                <View>
                    {Notificationdata.Feed.map((data) => (
                        <TouchableOpacity
                            style={style.mapingContainer}
                            key={data.id}>
                            <View style={style.image}>
                                <Image source={IMAGE.indexIcon} />
                            </View>
                            <View style={style.mapingContainer_textView}>
                                <Text style={style.textTitle}>{data.title}</Text>
                                <Text style={style.textTitle2}>{data.description}</Text>
                                <Text style={style.textTitle3}>{data.date}</Text>
                            </View>

                        </TouchableOpacity>
                    ))}
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
        marginHorizontal: 10
    },

    mapingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        marginVertical: 5,
    },
    mapingContainer_textView: {
        marginHorizontal: 10,
        width: '80%'
    },
    textTitle: {
        fontSize: FONTS.subheader,
        color: COLORS.text,
        fontWeight: 'bold',
        paddingVertical: 5,
    },
    textTitle2: {
        fontSize: FONTS.body,
        color: COLORS.text,
    },
    textTitle3: {
        fontSize: FONTS.body,
        color: COLORS.text,
        fontWeight: 'bold',
        paddingVertical: 5,
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        width: '20%'
    }
})
export default NotificationFeed