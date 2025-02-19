import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import Icon from 'react-native-vector-icons/AntDesign';
import {TYPO} from '../assets/typo';

const ProductCard = ({item, navigation}) => {
  return (
    <Pressable
      className="bg-gray-50 w-[48%] relative rounded-sm shadow-white"
      onPress={() => navigation.navigate('ProductDetail', {slug: item.slug})}>
      <View className="w-full relative justify-center items-center h-48  mb-0 ">
        <View className="justify-center items-center px-3 py-[1px] absolute z-10 left-1 bg-[rgba(0,0,0,0.3)] top-1 rounded-none">
          <Text className="text-sm text-dark_blue font-mulish_medium">New</Text>
        </View>

        <Pressable className="absolute top-3 right-3 z-10 p-[6px] left bg-light rounded-full">
          {item.like == 1 ? (
            <Icon
              name="heart"
              color={TYPO.colors.main}
              size={responsiveFontSize(2.2)}
            />
          ) : (
            <Icon
              name="hearto"
              color={TYPO.colors.dark_blue}
              size={responsiveFontSize(2.2)}
            />
          )}
        </Pressable>
        <Image
          source={{uri: item.image}}
          resizeMode="cover"
          className="w-[90%] h-44"
        />
      </View>
      <View className="w-full p-3 pt-1">
        <View className="mb-1 flex-row justify-start items-center gap-3">
          <Text className="-mt-2 ml-2 text-base text-dark font-mulish_medium line-through ">
            {'\u20B9'} {item.price}
          </Text>
          <Text className="-mt-6 min-w-20 bg-white text-lg text-red-500 font-mulish_regular tracking-wide py-[2px] px-2 ">
            {'\u20B9'} {item.price}
          </Text>
        </View>
        <Text
          numberOfLines={3}
          className="text-lg uppercase text-dark_blue font-mulish_bold tracking-wide">
          {item.title}
        </Text>
      </View>
    </Pressable>
  );
};

export default ProductCard;
