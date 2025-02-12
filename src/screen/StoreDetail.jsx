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
import {TYPO} from '../assets/typo';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

import {_category_data, _product_data, _store_data} from '../utils/data_';
import {gstyle} from '../assets/gstyle';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import ProductCard from '../components/ProductCard';
import SmallHeader from '../components/SmallHeader';
import CategoryCard from '../components/CategoryCard';

const StoreDetail = ({
  navigation,
  route,
}) => {
  const slug = route.params.slug;


  return (
    <SafeAreaView className="flex-1 bg-[#F6F6F6]">
      <SmallHeader name={slug || 'Store Detail'} />
      <ScrollView className="flex-1">
        <View className="mt-7 flex justify-center items-center">
          <Image
            source={{
              uri: 'https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_750,h_400/http://assets.designhill.com/design-blog/wp-content/uploads/2019/04/10.png',
            }}
            resizeMode="cover"
            className="w-28 h-28 rounded-full"
          />
        </View>
        <View className="justify-start pt-7 flex-row flex-wrap px-3 items-start w-full gap-y-5 gap-x-[4%] mb-20">
          {_product_data.map((item, i) => {
            return <ProductCard key={i} item={item} navigation={navigation} />;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StoreDetail;
