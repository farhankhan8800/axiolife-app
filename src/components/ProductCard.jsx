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
      className="bg-[##EAEEEF] w-[48%] h-76 relative rounded-sm shadow-white"
      onPress={() => navigation.navigate('ProductDetail', {slug: item.slug})}>
      <View className="w-full relative justify-center items-center h-48  mb-0 ">
        <View className="justify-center items-center px-2 py-[1px] absolute z-10 left-1 bg-[rgba(0,0,0,0.3)] top-1 rounded-none">
          <Text className="text-sm text-dark_blue font-mulish_medium">New</Text>
        </View>

        <View className="absolute top-3 right-3 z-10 p-[6px] left bg-light rounded-full">
           <Wishlist product_={item} />
        </View>
        <Image
          source={{uri: item.image}}
          resizeMode="cover"
          className="w-[90%] h-44"
        />
      </View>
      <View className="w-full  mt-4 p-3 pt-1">
        <View className="mb-2 bg-white w-30 h-8 flex-row  justify-start items-center gap-3">
          <Text className="mx-1 text-sm text-red-500 font-mulish_semibold tracking-wide">
            {'\u20B9'} {item.price}.00
          </Text>

          <Text className="-mt-6 min-w-20 bg-white text-lg text-red-500 font-mulish_regular tracking-wide py-[2px] px-2 ">
            {'\u20B9'} {item.offer_price}
          </Text>
        </View>
        <Text
          numberOfLines={2}
          className="text-xs uppercase text-slate-900 font-mulish_exbold tracking-wide">
          {item.title}
        </Text>
      </View>
    </Pressable>
  );
};

export default ProductCard;
