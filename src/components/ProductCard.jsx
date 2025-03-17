import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import Icon from 'react-native-vector-icons/AntDesign';
import {TYPO} from '../assets/typo';
import Wishlist from './Wshlist';

const ProductCard = ({item, navigation}) => {
  return (
    <Pressable
      className="bg-[#f5f7f8fc] w-[49%] h-80 relative rounded-sm shadow-white"
      onPress={() => navigation.navigate('ProductDetail', {slug: item.slug})}>
      <View className="w-full relative justify-center items-center h-48  mb-0 ">
        <View className="justify-center items-center px-4 py-[2px]  absolute z-10 left-1 bg-white top-1 rounded-md">
          <Text className="text-sm text-black font-mulish_italic">
            Trending
          </Text>
        </View>
        <View className="absolute top-2 right-3 z-10 p-[6px] left  rounded-full">
          <Wishlist product_={item} />
        </View>
        <Image
          source={{uri: item?.image}}
          resizeMode="contain"
          className="w-[90%] h-44"
        />
      </View>
      <View className="w-full p-3 pt-0">
        <View className="mb-2 flex flex-col gap-1 items-start ">
          <Text className="min-w-20 -mt-5 bg-white text-lg  text-black font-mulish_semibold tracking-wider py-[2px] px-2 ">
            {'\u20B9'} {item.offer_price}
          </Text>
          <Text className="px-2 line-through text-base bg-white text-slate-600 font-mulish_thin tracking-wider">
            {'\u20B9'} {item.price}.00
          </Text>
        </View>
        <Text
          numberOfLines={2}
          className="text-xs uppercase text-slate-900 font-mulish_exbold tracking-wide">
          {item.title}
        </Text>

        <Text className="text-sm font-mulish_regular text-gray-600 mt-2">
          {item.brand_name}
        </Text>
      </View>
    </Pressable>
  );
};

export default ProductCard;
