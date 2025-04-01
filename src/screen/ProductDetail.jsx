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
import React, {useEffect, useRef, useState} from 'react';
import {_product_data, _store_data} from '../utils/data_';
import SmallHeader from '../components/SmallHeader';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {TYPO} from '../assets/typo';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {WebViewAutoAdjust} from '../components/WebViewAutoAdjust';
import MakeRequest from '../utils/axiosInstance';
import {PRODUCT_DETAIL_API} from '../service/API';
import NotFound from '../components/NotFound';
import Wshlist from '../components/Wshlist';
import AddDetailAction from '../components/AddDetailAction';
import {Skeleton} from 'react-native-skeletons';

const ProductDetail = ({navigation, route}) => {
  const [showImage, setShowImage] = useState(
    'https://skala.or.id/wp-content/uploads/2024/01/dummy-post-square-1-1.jpg',
  );

  const {slug} = route.params;
  const [loading, setLoading] = useState(true);
  const [product_, setProductDetails] = useState({});
  const [addColor, setAddColor] = useState('');
  const [addSize, setAddSize] = useState('');

  const getProductdetails = async () => {
    setLoading(true);
    try {
      const data = await MakeRequest(
        PRODUCT_DETAIL_API,
        {
          product_slug: 'new-balance-new-striker-original-shoes',
          color: addColor,
          size: addSize,
        },
        {}, // Empty headers
        'application/json',
      );
      console.log('dataColor', data.response);
      if (data.status == 1) {
        if (addColor === '' && addSize === '') {
          setProductDetails(data.response);
        } else {
          setProductDetails(prev => ({
            ...prev,
            ...data.response,
          }));
        }
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductdetails();
  }, [addColor, addSize]);

  useEffect(() => {
    if (product_?.more_images?.length > 0) {
      setShowImage(product_?.more_images[0]);
    }
  }, [product_]);

  return (
    <SafeAreaView className="flex-1 bg-[#fff]">
      <ScrollView className="w-full">
        <View
          style={{height: responsiveHeight(50)}}
          className="flex-1 overflow-hidden bg-[#F7F9FA] pt-5 shadow-lg rounded-b-[35px]">
          <SmallHeader name="Premium Sneakers" />
          <View className="w-full h-auto p-5 overflow-hidden">
            <Image
              source={{uri: showImage}}
              style={{width: '100%', height: responsiveHeight(37)}}
              resizeMode="contain"
              className="rounded-xl"
            />
          </View>
        </View>

        <View className="pt-5 -mt-5 rounded-t-[30px] bg-white">
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className="mt-3">
            <View className="px-5 flex-row">
              {loading && (
                <View className="flex-row gap-x-5">
                  <Skeleton
                    count={3}
                    width={responsiveWidth(20)}
                    height={responsiveWidth(20)}
                  />
                </View>
              )}
              {product_.hasOwnProperty('more_images') &&
                product_.more_images.map((item, i) => {
                  return (
                    <Pressable
                      onPress={() => setShowImage(item)}
                      style={{
                        borderWidth: 2,
                        borderColor:
                          showImage === item
                            ? TYPO.colors.slate900
                            : 'transparent',
                      }}
                      className={`p-2 border-2 shadow-sm bg-[#EAEEEF] mx-2 overflow-hidden rounded-2xl`}
                      key={i}>
                      <Image
                        source={{uri: item}}
                        style={{
                          height: responsiveWidth(16),
                          width: responsiveWidth(16),
                        }}
                        resizeMode="contain"
                        className="rounded-xl"
                      />
                    </Pressable>
                  );
                })}
            </View>
          </ScrollView>

          <View className="flex-row px-5 mt-6 justify-between items-start">
            {loading && (
              <View className="flex-row gap-x-5">
                <Skeleton
                  count={1}
                  width={responsiveWidth(70)}
                  height={responsiveWidth(7)}
                />
              </View>
            )}
            <Text
              numberOfLines={2}
              style={{width: responsiveWidth(76)}}
              className="text-xl font-mulish_semibold text-[#1A1D1F] leading-tight">
              {product_?.title}
            </Text>
            <Wshlist product_={product_} />
          </View>

          <View className="flex-row px-5 mt-6 justify-start items-baseline">
            {loading && (
              <View className="flex-row gap-x-5">
                <Skeleton
                  count={1}
                  width={responsiveWidth(40)}
                  height={responsiveWidth(8)}
                />
              </View>
            )}
            <Text className="text-2xl font-mulish_bold text-[#0F3460] leading-tight pr-4">
              ₹{product_?.selected_variation?.price}
            </Text>
            <View className="relative">
              <View
                className="absolute bg-gray-400 top-3"
                style={{width: responsiveWidth(12), height: 1}}></View>
              <Text className="text-lg font-semibold text-gray-500 leading-tight">
                ₹{product_?.selected_variation?.price}
              </Text>
            </View>
          </View>

          <View className="flex-row px-5 mt-6 justify-start items-center gap-3 flex-wrap">
            {loading && (
              <View className="flex-row gap-x-5">
                <Skeleton
                  count={3}
                  style={{borderRadius: 30}}
                  width={responsiveWidth(20)}
                  height={responsiveWidth(6)}
                />
              </View>
            )}
            <View className="px-5 py-2 bg-[#F4F5F6] rounded-full shadow-sm">
              <Text className="text-sm text-[#33383F] font-mulish_italic">
                Brand: {product_?.brand}
              </Text>
            </View>
            <View className="px-5 py-2 bg-[#F4F5F6] rounded-full shadow-sm">
              <Text className="text-sm text-[#33383F] font-mulish_italic">
                Left {product_?.selected_variation?.stock}
              </Text>
            </View>
            <View className="px-5 py-2 bg-[#F4F5F6] rounded-full shadow-sm">
              <Text className="text-sm text-[#33383F] font-mulish_italic">
                Sold {product_?.selected_variation?.sold_count}
              </Text>
            </View>
          </View>

          <View className="mt-8 px-5">
            <Text className="text-xl font-mulish_semibold text-[#0F3460]">
              Color
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              className="mt-4">
              <View className="flex-row gap-6">
                {loading && (
                  <View className="flex-row gap-x-5">
                    <Skeleton
                      count={4}
                      style={{borderRadius: 50}}
                      width={responsiveWidth(15)}
                      height={responsiveWidth(15)}
                    />
                  </View>
                )}
                {product_.hasOwnProperty('colors') &&
                  product_.colors.map((item, i) => {
                    return (
                      <Pressable
                        onPress={() => {
                          setAddColor(item.color);
                          setAddSize('');
                        }}
                        key={i}
                        style={{
                          borderColor:
                            product_?.selected_variation.color == item.color
                              ? TYPO.colors.slate900
                              : 'transparent',
                        }}
                        className="p-2 border-2 shadow-sm rounded-full">
                        <Image
                          style={{aspectRatio: 1}}
                          src={item.image_url}
                          resizeMode="contain"
                          className="h-14 w-14 rounded-full"
                        />
                      </Pressable>
                    );
                  })}
              </View>
            </ScrollView>
          </View>

          <View className="mt-8 px-5">
            <View className="flex-row justify-between items-center">
              <Text className="text-xl font-mulish_semibold text-[#0F3460]">
                Select Size
              </Text>
              <Pressable>
                <Text className="text-blue-500 text-sm font-mulish_medium">
                  Size Chart
                </Text>
              </Pressable>
            </View>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              className="mt-4">
              <View className="flex-row gap-5">
                {product_.hasOwnProperty('size_variations') &&
                  product_.size_variations.map((item, i) => {
                    return (
                      <Pressable
                        onPress={
                          item.stock == 0 ? null : () => setAddSize(item.size)
                        }
                        key={i}
                        className={`w-16 h-16 justify-center items-center shadow-sm border-[#E6E8EC] border-[1px] ${
                          item.size == product_?.selected_variation.size
                            ? 'bg-[#1A1D1F]'
                            : 'bg-white'
                        } rounded-full ${item.stock == 0 && 'opacity-30'}`}>
                        <Text
                          className={`text-lg ${
                            item.size == product_?.selected_variation.size
                              ? 'text-white text-xl'
                              : 'text-[#1A1D1F]'
                          } font-mulish_medium`}>
                          {item.size}
                        </Text>
                      </Pressable>
                    );
                  })}
              </View>
            </ScrollView>
          </View>

          <View
            style={{marginBottom: responsiveHeight(8)}}
            className="mt-8 px-5">
            <Text className="text-xl font-mulish_semibold text-[#0F3460] mb-4">
              Product Details
            </Text>
            <View className="bg-[#F7F9FA] p-4 rounded-xl">
              <WebViewAutoAdjust description={product_.description} />
            </View>
          </View>
        </View>
      </ScrollView>
      <AddDetailAction product_={product_} navigation={navigation} />
    </SafeAreaView>
  );
};

export default ProductDetail;
