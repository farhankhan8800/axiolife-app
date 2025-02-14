import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import Icon from 'react-native-vector-icons/AntDesign';
import {TYPO} from '../assets/typo';

export const CategoryCardHome = ({item, navigation}) => {
  return (
    <Pressable
      className=" w-[130px]"
      onPress={() => navigation.navigate('CategoryDetail', {slug: item.slug})}>
      <View className="w-full  relative rounded-3xl overflow-hidden shadow-white   justify-center items-center  bg-light ">
        <Image
          source={{
            uri: 'https://www.teach-this.com/images/images-ideas/first-day-of-class-activities.png',
          }}
          resizeMode="cover"
          style={{width: '100%', height: responsiveHeight(15)}}
          className="rounded-md"
        />

        <View
          style={{height: responsiveHeight(15)}}
          className="w-full h-28 absolute top-0 left-0 bg-[rgba(0,0,0,.2)]"></View>
      </View>
      <Text className="text-lg  text-dark_blue font-mulish_semibold text-center mt-2">
        {item.name}
      </Text>
    </Pressable>
  );
};


