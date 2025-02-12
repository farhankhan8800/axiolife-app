import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {responsiveFontSize, responsiveWidth} from 'react-native-responsive-dimensions';

import Icon from 'react-native-vector-icons/AntDesign'
import { TYPO } from '../assets/typo';
import { NavigationProp } from "@react-navigation/native";


 

const ProductCard = ({item, navigation}) => {
  return (
    <Pressable className=" w-[48%]" onPress={()=> navigation.navigate('ProductDetail',{slug:item.slug})}>
      <View className="w-full relative rounded-3xl shadow-white   justify-center items-center h-44 bg-light mb-0 ">
        <Pressable className='absolute top-3 right-3 z-10 p-[6px] bg-gray-200 rounded-full'>
          {
            item.like == 1 ? <Icon name='heart' color={TYPO.colors.main} size={responsiveFontSize(2.2)} /> :  <Icon name='hearto' color={TYPO.colors.dark_blue} size={responsiveFontSize(2.2)} />
          }  
           
        </Pressable>
        <Image
          source={{uri: item.image}}
          resizeMode="cover"
          className="w-32 h-32"
        />
      </View>
      <View className="w-full p-2">
        <Text
          numberOfLines={2}
          className="text-base text-dark_blue font-mulish_regular">
          {item.title}
        </Text>
        <Text className="text-xl text-dark font-mulish_bold mt-1">
          {'\u20B9'} {item.price}
        </Text>
      </View>
    </Pressable>
  );
};

export default ProductCard;
