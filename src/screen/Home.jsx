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

import HomeHeader from '../components/HomeHeader';
import BottomTab from '../components/BottomTab';
import {ChevronRight, MapPin, Search} from 'react-native-feather';
import {TYPO} from '../assets/typo';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {_category_data, _product_data, _store_data} from '../utils/data_';
import ProductCard from '../components/ProductCard';
import {CategoryCardHome} from '../components/CategoryCard';
import BackPressHandler from '../components/BackPressHandler';
import Swiper from 'react-native-swiper';
import BestDeal from '../components/BestDeal';
import WithValidation from '../components/WithValidation'
import MakeRequest from '../utils/axiosInstance';
import {HOME_API, WISHLIST_GET_API} from '../service/API';
import { useDispatch, useSelector } from 'react-redux';
import { setWishlist } from '../reduxstore/slice/wishlist_slice';


const HomeScreen = ({navigation}) => {
  const [homeData, setHomeData] = useState({
    banners: [],
    categories: [],
    best_deals: [],
    products: [],
    stores: [],
  });
  const [loading, setLoading] = useState(false);
  const {user, token, isAuthenticated} = useSelector(state => state.auth);
  const dispatch = useDispatch()


  const gethomedata = async () => {
    setLoading(true);
    try {
      const data = await MakeRequest(HOME_API, {}, {}, 'application/json');

  
      if (data.status == 1) {
        setHomeData({
          banners: data.response.banners,
          categories: data.response.categories,
          best_deals: data.response.products,
          products: data.response.products,
          stores: data.response.brands,
        });
      }
    } catch (error) {
      console.error('Verification failed:', error);
      Toast.show({
        type: 'BasicToast',
        text1: 'Something went wrong. Please try again.',
        position: 'bottom',
        visibilityTime: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    gethomedata();
  }, []);


  const getWishlistdata = async () => {
    
    try {
      const data = await MakeRequest(WISHLIST_GET_API, {}, {}, 'application/json');

  
      // console.log(data)
      if (data.status == 1) {
        dispatch(setWishlist(data.response.wishlist))
      }
    } catch (error) {
      console.error('Verification failed:', error);
      Toast.show({
        type: 'BasicToast',
        text1: 'Something went wrong. Please try again.',
        position: 'bottom',
        visibilityTime: 5000,
      });
    } 
  };


useEffect(()=>{
  if(isAuthenticated){
    setTimeout(()=>{
      getWishlistdata()
    },2000)
  }
},[isAuthenticated])



 

  return (
    <SafeAreaView className="flex-1 bg-light">
      <HomeHeader />
      <BottomTab />
      {/* <BackPressHandler /> */}
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
                  Ship top
                </Text>
                <Text
                  numberOfLines={1}
                  className="text-base text-dark font-mulish_semibold max-w-72">
                  JiMalioboro. Block z no.18 oboro. Block z no.18
                </Text>
              </View>
            </View>
            <Pressable onPress={() => navigation.navigate('Address')}>
              <ChevronRight
                width={responsiveFontSize(2.3)}
                color={TYPO.colors.dark}
              />
            </Pressable>
          </View>
        </View>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="mt-7">
          <View className="px-2 flex-row">
            {homeData.stores?.length > 0 && homeData.stores?.map((item, i) => {
              return (
                <Pressable
                  className="mx-1 rounded-full overflow-hidden"
                  key={i}
                  onPress={() =>
                    navigation.navigate('StoreDetail', {slug: item.slug})
                  }>
                  <Image
                    source={{uri: item.image}}
                    resizeMode="cover"
                    style={{
                      height: responsiveWidth(20),
                      width: responsiveWidth(20),
                    }}
                    // className="h-20 w-20"
                  />
                </Pressable>
              );
            })}
          </View>
        </ScrollView>
        <Swiper
          autoplay={true}
          height={responsiveHeight(18)}
          showsPagination={false}
          containerStyle={{marginTop: responsiveHeight(2)}}
          style={{}}>
          {homeData.banners?.length > 0 && homeData.banners.map((item, i) => {
            return (
              <Pressable key={i} className="px-3">
                <Image
                  source={{
                    uri: item.image,
                  }}
                  resizeMode="cover"
                  className="w-full h-40 rounded-md"
                />
              </Pressable>
            );
          })}
        </Swiper>

        {/* <Banner navigation={navigation} /> */}

        {homeData.best_deals?.length > 0 && (
          <BestDeal navigation={navigation} products={homeData.best_deals} />
        )}

        <View className="-my-8 mx-3">
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
            {homeData.products?.length > 0 && homeData.products.map((item, i) => {

              return (
                <ProductCard key={i} item={item} navigation={navigation} />
              );
            })}
          </View>
        </View>

        <View className="mt-14">
          <View className="flex-row mx-3 items-center justify-between mb-3">
            <Text className="text-xl font-mulish_semibold text-dark_blue">
              Category
            </Text>
            <Pressable onPress={() => navigation.navigate('AllCategory')}>
              <Text className="text-sm font-mulish_medium text-main">
                See all
              </Text>
            </Pressable>
          </View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className="mt-2 pb-28">
            <View className="px-3 flex-row gap-x-5">
              {_category_data.map((item, i) => {
                return (
                  <CategoryCardHome
                    key={i}
                    item={item}
                    navigation={navigation}
                  />
                );
              })}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WithValidation(HomeScreen);
