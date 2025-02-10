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
import React from 'react';

import HomeHeader from '../components/HomeHeader';
import BottomTab from '../components/BottomTab';
import {ChevronRight, MapPin, Search} from 'react-native-feather';
import {TYPO} from '../assets/typo';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {ScreenProps} from '../navigation/types';
import {_category_data, _product_data, _store_data} from '../utils/data_';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';

const HomeScreen: React.FC<ScreenProps<'Home'>> = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1 bg-[#F6F6F6]">
      <HomeHeader />
      <BottomTab />
      <ScrollView className="flex-1">
        <View className="px-3 mt-3">
          <Pressable
            onPress={() => navigation.navigate('Search')}
            className="flex-row justify-start items-center bg-gray-100 px-5 py-3 rounded-full">
            <Search
              height={responsiveFontSize(2.2)}
              width={responsiveFontSize(2.2)}
              color={TYPO.colors.dark}
            />
            <Text className="text-base text-dark font-mulish_medium ml-2">
              What are you lokking for?
            </Text>
          </Pressable>
        </View>
        <View className="px-5 mt-2">
          <View className="flex-row justify-between items-center py-2">
            <View className="flex-row items-center ">
              <MapPin width={responsiveFontSize(2)} color={TYPO.colors.main} />
              <View className="flex-row items-center">
                <Text className="text-base text-dark font-mulish_medium ml-2 ">
                  Ship to{' '}
                </Text>{' '}
                <Text
                  numberOfLines={1}
                  className="text-base text-dark font-mulish_semibold max-w-72">
                  JiMalioboro. Block z no.18 oboro. Block z no.18
                </Text>
              </View>
            </View>
            <ChevronRight
              width={responsiveFontSize(2.3)}
              color={TYPO.colors.dark}
            />
          </View>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="mt-7">
          <View className="px-2 flex-row">
            {_store_data.map((item, i) => (
              <Pressable
                className="mx-1 rounded-full overflow-hidden "
                key={item.id}
                onPress={() => navigation.navigate('StoreDetail',{slug:'adidas'})}>
                <Image
                  source={{uri: item.image}}
                  resizeMode="cover"
                  className="h-28 w-28"
                />
              </Pressable>
            ))}
          </View>
        </ScrollView>
        <Pressable
          className="mx-3 mt-7"
          onPress={() => navigation.navigate('ProductDetail',{slug:''})}>
          <Image
            source={{
              uri: 'https://t3.ftcdn.net/jpg/03/16/37/64/360_F_316376413_nYL2jpLONPQPOsy31DE86n7FPpSxPIi3.jpg',
            }}
            resizeMode="cover"
            className="w-full h-36 rounded-2xl"
          />
        </Pressable>

        <View className="mt-7 mx-3">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-xl font-mulish_semibold text-dark_blue">
              Featured Products
            </Text>
            <Pressable
              onPress={() =>
                navigation.navigate('Product', {slug: 'Featured Products'})
              }>
              <Text className="text-sm font-mulish_medium text-main">
                See all
              </Text>
            </Pressable>
          </View>
          <View className="justify-start flex-row flex-wrap items-start w-full gap-y-5 gap-x-[4%] ">
            {_product_data.map((item, i) => {
              return (
                <ProductCard key={i} item={item} navigation={navigation} />
              );
            })}
          </View>
        </View>

        <View className="mt-7 ">
          <View className="flex-row mx-3 items-center justify-between mb-3">
            <Text className="text-xl font-mulish_semibold text-dark_blue">
              Category
            </Text>
            <Pressable
              onPress={() =>
                navigation.navigate('AllCategory')
              }>
              <Text className="text-sm font-mulish_medium text-main">
                See all
              </Text>
            </Pressable>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className="mt-7 pb-28">
            <View className="mx-3 flex-row gap-x-6">
              {_category_data.map((item, i) => {
                return (
                  <CategoryCard key={i} item={item} navigation={navigation} />
                );
              })}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
