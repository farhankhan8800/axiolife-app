import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import Icon from 'react-native-vector-icons/AntDesign';
import {TYPO} from '../assets/typo';
import {NavigationProp} from '@react-navigation/native';

interface CategoryItem {
  id: Number;
  image: string;
  name: string;
  slug: string;
}

interface CategoryCardProps {
  item: CategoryItem;
  navigation: NavigationProp<any>;
}

const CategoryCard: React.FC<CategoryCardProps> = ({item, navigation}) => {
  return (
    <Pressable
      className=" w-[40%] max-w-36"
      onPress={() => navigation.navigate('CategoryDetail', {slug: item.slug})}>
      <View className="w-full relative rounded-3xl shadow-white   justify-center items-center  p-4 bg-light ">
        <Image
          source={{uri: item.image}}
          resizeMode="contain"
          style={{width: '100%', height: responsiveHeight(11)}}
          className="w-28 h-28"
        />
      </View>
      <Text className='text-lg text-dark_blue font-mulish_semibold text-center mt-2'>{item.name}</Text>
    </Pressable>
  );
};

export default CategoryCard;
