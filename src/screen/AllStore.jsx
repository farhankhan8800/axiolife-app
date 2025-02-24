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
import React, {useEffect, useState} from 'react';
import {TYPO} from '../assets/typo';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

import {_category_data, _product_data, _store_data} from '../utils/data_';
import SmallHeader from '../components/SmallHeader';
import Swiper from 'react-native-swiper';
import { GET_BRAND_API } from '../service/API';

const AllStore = ({navigation}) => {

  const getBrand = async ()=>{
    try {
      const data = await MakeRequest(
        GET_BRAND_API,
        {},
        {},
        'application/json',
      );

      if (data.status == 1) {
       
      }
    } catch (error) {
      console.error('Error fetching Brand :', error);
    } 
  }

useEffect(()=>{
  getBrand()
},[])





  return (
    <SafeAreaView className="flex-1 bg-light">
      <SmallHeader name="All Store" />
      <ScrollView className="flex-1">
        <Swiper
          autoplay={true}
          height={responsiveHeight(18)}
          showsPagination={false}
          containerStyle={{marginTop: responsiveHeight(2)}}
          style={{}}>
          {_store_data.map((item, i) => {
            return (
              <Pressable key={i} className="px-3">
                <Image
                  source={{
                    uri: 'https://t3.ftcdn.net/jpg/03/16/37/64/360_F_316376413_nYL2jpLONPQPOsy31DE86n7FPpSxPIi3.jpg',
                  }}
                  resizeMode="cover"
                  className="w-full h-40 rounded-md"
                />
              </Pressable>
            );
          })}
        </Swiper>

        <View className="px-2 flex-row flex-wrap flex-start gap-5 mt-5">
          {_store_data.map((item, i) => (
            <Pressable
              className="mx-1 bg-gray-100 "
              key={item.id}
              onPress={() => navigation.navigate('AllStore')}>
              <Image
                source={{uri: item.image}}
                resizeMode="cover"
                className="h-32 w-32"
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllStore;
