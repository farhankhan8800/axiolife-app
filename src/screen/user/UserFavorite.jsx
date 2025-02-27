import {
  Button,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

import SmallHeader from '../../components/SmallHeader';
import {_product_data} from '../../utils/data_';
import ProductCard from '../../components/ProductCard';
import { useSelector } from 'react-redux';
const UserFavorite = ({navigation}) => {


  const wishlistItems = useSelector(state => state.wishlist.items);

console.log(wishlistItems)


  return (
    <SafeAreaView className="flex-1 bg-[#F6F6F6]">
      <SmallHeader name="Your Favorite" />
      <ScrollView className="flex-1">
        <View className="justify-start pt-7 flex-row flex-wrap px-3 items-start w-full gap-y-5 gap-x-[4%] mb-20">
          {wishlistItems.length > 0 && wishlistItems?.map((item, i) => {
            return (
              <ProductCard key={i} item={item} navigation={navigation} />
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserFavorite;
