import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import Icon from 'react-native-vector-icons/AntDesign';
import {TYPO} from '../assets/typo';
import FastImage from 'react-native-fast-image';
export const CategoryCardHome = ({item, navigation}) => {
  console.log('item', item);
  return (
    <Pressable
      className=" w-[130px]"
      onPress={() => navigation.navigate('CategoryDetail', {slug: item.slug})}>
      <View className="w-full  relative rounded-3xl overflow-hidden shadow-white   justify-center items-center  bg-light ">
        <FastImage
          source={{
            uri: 'https://i.pinimg.com/originals/16/de/e0/16dee07755c2b841ea7c603fcd8f880c.gif',
          }}
          resizeMode="cover"
          style={{width: '100%', height: responsiveHeight(22)}}
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
