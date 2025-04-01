import {
  Button,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';

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

import WithValidation from '../components/WithValidation';
import MakeRequest from '../utils/axiosInstance';
import {
  GET_ADDRESS_API,
  GET_CART_API,
  HOME_API,
  WISHLIST_GET_API,
} from '../service/API';
import {useDispatch, useSelector} from 'react-redux';
import {setWishlist} from '../reduxstore/slice/wishlist_slice';
import {setCart} from '../reduxstore/slice/cart_slice';
import {useFocusEffect} from '@react-navigation/native';
import {Skeleton} from 'react-native-skeletons';
import LoadMore from '../components/LoadMore';
import StackDesigne from '../components/TopPicks';
import BannerSwiper from '../components/MultipleBanners';

const HomeScreen = ({navigation}) => {
  const searchItems = [
    'formal shoes',
    'sports shoes',
    'jeans',
    'belt',
    'perfumes',
    'sunglasses',
    'watches',
  ];
  const [homeData, setHomeData] = useState({
    banners: [],
    categories: [],
    best_deals: [],
    products: [],
    toppicks: [],
    stores: [],
  });
  const [loading, setLoading] = useState(false);
  const {user, token, isAuthenticated} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [primaryAddress, setPrimaryAddress] = useState(null);
  const [placeholder, setPlaceholder] = useState(searchItems[0]);
  const gethomedata = async () => {
    setLoading(true);
    try {
      const data = await MakeRequest(HOME_API, {}, {}, 'application/json');

      if (data.status == 1) {
        // console.log('data.response', data.response);
        setHomeData({
          banners: data.response.banners,
          categories: data.response.categories,
          best_deals: data.response.products,
          products: data.response.products,
          stores: data.response.brands,
          toppicks: data.response.toppicks,
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

  const getWishlistdata = async () => {
    try {
      const data = await MakeRequest(
        WISHLIST_GET_API,
        {},
        {},
        'application/json',
      );
      // console.log(data)
      if (data.status == 1) {
        dispatch(setWishlist(data.response.wishlist));
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

  const getCartItem = async () => {
    try {
      const data = await MakeRequest(GET_CART_API, {}, {}, 'application/json');

      if (data.status == 1) {
        dispatch(setCart(data.response.cartitems.cartitems));
      }
    } catch (error) {
      console.error('Verification failed:', error);
    }
  };

  const get_primary_address = async () => {
    try {
      const data = await MakeRequest(
        GET_ADDRESS_API,
        {},
        {},
        'application/json',
      );

      if (data.status == 1) {
        const primaryAddr = data.response.addresses.find(
          address => address.primary_address == 1,
        );

        if (primaryAddr) {
          setPrimaryAddress(primaryAddr);
        }
      }
    } catch (error) {
      console.error('address get failed:', error);
      Toast.show({
        type: 'BasicToast',
        text1: 'Something went wrong. Please try again.',
        position: 'bottom',
        visibilityTime: 5000,
      });
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (isAuthenticated) {
        setTimeout(() => {
          getWishlistdata();
          getCartItem();
          get_primary_address();
        }, 2000);
      }
      gethomedata();
    }, [isAuthenticated]),
  );
  useEffect(() => {
    const interval = setInterval(() => {
      const randomItem =
        searchItems[Math.floor(Math.random() * searchItems.length)];
      setPlaceholder(randomItem);
    }, 3000); // Har 3 second me update hoga

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  return (
    <View className="flex-1">
      <BottomTab />
      {/* <BackPressHandler /> */}
      <ScrollView className="flex-1 bg-white">
        <HomeHeader />
        <View
          style={{backgroundColor: TYPO.colors.axiocolor}}
          className="flex-1 rounded-b-3xl">
          <View className="px-4 my-5">
            <Pressable
              onPress={() => navigation.navigate('Search')}
              className="flex-row justify-start items-center bg-white px-6 py-4 rounded-full shadow-md border border-gray-200">
              <Search
                height={responsiveFontSize(3)}
                width={responsiveFontSize(3)}
                color="#454545"
              />
              <Text className="text-lg text-gray-700 font-mulish_medium ml-3">
                What are you looking for
              </Text>
              <Text className="text-lg font-mulish_bold ml-2 text-gray-900">
                {placeholder}
              </Text>
            </Pressable>
          </View>
          {isAuthenticated && (
            <View className="px-5 mt-2">
              <View className="flex-row justify-between items-center py-2">
                <View className="flex-row items-center ">
                  <MapPin
                    width={responsiveFontSize(2)}
                    color={TYPO.colors.light}
                  />
                  <View className="flex-row items-center">
                    <Text className="text-base text-white font-mulish_medium mx-2 ">
                      Ship to:
                    </Text>
                    <Text
                      numberOfLines={1}
                      className="text-base text-white font-mulish_semibold max-w-72">
                      {/* JiMalioboro. Block z no.18 oboro. Block z no.18 */}
                      {primaryAddress ? (
                        <>
                          {primaryAddress.address_line1}{' '}
                          {primaryAddress.address_line2} {primaryAddress.city}{' '}
                          {primaryAddress.postal_code}
                        </>
                      ) : (
                        ' Add and set your primary address'
                      )}
                    </Text>
                  </View>
                </View>
                <Pressable onPress={() => navigation.navigate('Address')}>
                  <ChevronRight
                    width={responsiveFontSize(2.3)}
                    color={TYPO.colors.light}
                  />
                </Pressable>
              </View>
            </View>
          )}

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className="mt-7">
            <View className="px-2 flex-row">
              {loading && (
                <View className="flex-row gap-5 px-3">
                  <Skeleton
                    circle
                    count={4}
                    width={responsiveWidth(20)}
                    height={responsiveWidth(20)}
                  />
                </View>
              )}
              {homeData.stores?.length > 0 &&
                homeData.stores?.map((item, i) => {
                  return (
                    <Pressable
                      className="mx-2 items-start mb-2"
                      key={i}
                      onPress={() =>
                        navigation.navigate('StoreDetail', {slug: item.slug})
                      }>
                      <View
                        className="bg-white rounded-full shadow-md "
                        style={{
                          elevation: 3,
                          shadowColor: '#000',
                          shadowOffset: {width: 0, height: 2},
                          shadowOpacity: 0.1,
                          shadowRadius: 4,
                        }}>
                        <Image
                          source={{uri: item.image}}
                          resizeMode="cover"
                          style={{
                            height: responsiveWidth(16),
                            width: responsiveWidth(16),
                            borderRadius: responsiveWidth(10),
                          }}
                        />
                      </View>
                    </Pressable>
                  );
                })}
            </View>
          </ScrollView>
          {loading && (
            <View className="justify-center items-center flex-col gap-5 px-3 my-6">
              <Skeleton
                borderRadius={16}
                width={responsiveWidth(90)}
                height={responsiveWidth(45)}
              />
            </View>
          )}
          <BannerSwiper
            banners={homeData.banners}
            onBannerPress={(banner, index) => {
              // Handle banner press, e.g. navigate or open URL
              console.log(`Banner ${index} pressed:`, banner);
            }}
            // Optional: customize height or autoplayTimeout
            // height={responsiveHeight(30)}
            // autoplayTimeout={7}
          />
        </View>

        {/* <Banner navigation={navigation} /> */}

        {loading && (
          <View className="justify-center items-center flex-col gap-5 px-3 my-6">
            {/* <Image
          source={require('../assets/image/placeholder_image.png')}
          resizeMode="cover"
          className="w-full h-64 rounded-xl opacity-30 "
        /> */}

            <Skeleton
              borderRadius={10}
              width={responsiveWidth(90)}
              height={responsiveWidth(45)}
            />
          </View>
        )}

        <View>
          {homeData.best_deals?.length > 0 && (
            <BestDeal navigation={navigation} products={homeData.best_deals} />
          )}
        </View>

        <View className="mx-3">
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-xl font-mulish_semibold text-dark_blue">
              Featured Products
            </Text>
            <Pressable
              onPress={() =>
                navigation.navigate('Product', {slug: 'Featured Products'})
              }>
              <Text className="text-sm font-mulish_semibold text-slate-900">
                See All
              </Text>
            </Pressable>
          </View>

          <View className="justify-start flex-row flex-wrap items-start w-full gap-y-2 gap-x-[2%] ">
            {homeData.products?.length > 0 &&
              homeData.products.map((item, i) => {
                return (
                  <ProductCard key={i} item={item} navigation={navigation} />
                );
              })}

            {loading && (
              <View className="justify-start items-center flex-row flex-wrap gap-2 ">
                <Skeleton
                  borderRadius={4}
                  count={7}
                  width={responsiveWidth(46)}
                  height={responsiveWidth(58)}
                />
              </View>
            )}
          </View>
          {homeData.products?.length > 0 && <LoadMore />}
        </View>

        {homeData.best_deals?.length > 0 && (
          <StackDesigne navigation={navigation} products={homeData.toppicks} />
        )}

        <View className="mt-14">
          <View className="flex-row mx-3 items-center justify-between mb-3">
            <Text className="text-xl font-mulisrh_semibold text-dark_blue">
              Category
            </Text>
            <Pressable onPress={() => navigation.navigate('AllCategory')}>
              <Text className="text-sm font-mulish_semibold text-slate-900">
                See All
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
    </View>
  );
};

export default WithValidation(HomeScreen);
