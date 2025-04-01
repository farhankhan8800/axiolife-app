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
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import SmallHeader from '../../components/SmallHeader';
import {_product_data} from '../../utils/data_';
import ProductCard from '../../components/ProductCard';
import {useSelector} from 'react-redux';
const UserFavorite = ({navigation}) => {
  const wishlistItems = useSelector(state => state.wishlist.items);

  // console.log(wishlistItems)

  return (
    <SafeAreaView className="flex-1 bg-white">
      <SmallHeader name="Your Favorite" />
      <ScrollView className="flex-1">
        <View className="justify-start pt-6 flex-row flex-wrap px-2 items-start w-full gap-y-5 gap-x-[2%] mb-20">
          {wishlistItems.length > 0 &&
            wishlistItems?.map((item, i) => {
              return (
                <ProductCard key={i} item={item} navigation={navigation} />
              );
            })}
          {wishlistItems.length == 0 && (
            <View className="flex-1 justify-center items-center py-10">
              <Image
                source={require('../../assets/image/like_image.png')}
                resizeMode="contain"
                style={{
                  height: responsiveWidth(16),
                  width: responsiveWidth(16),
                  marginBottom: responsiveHeight(3),
                }}
                // className="h-20 w-20"
              />
              <Text className="text-center text-lg text-dark_blue font-mulish_semibold ">
                No favourite
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserFavorite;
