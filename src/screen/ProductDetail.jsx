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
          className="flex-1 overflow-hidden bg-[#EAEEEF] pt-3">
          <SmallHeader name="Sneakers Detail" />
          <View className="w-full h-auto p-5 overflow-hidden ">
            <Image
              source={{uri: showImage}}
              style={{width: '100%', height: responsiveHeight(37)}}
              resizeMode="contain"
            />
          </View>
        </View>
        {/* </View> */}
        <View className="pt-3 rounded-[30px] bg-white bottom-8">
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            className="mt-3">
            <View className="px-3 flex-row">
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
                      className={`p-1 border-2  bg-gray-200 mx-2 overflow-hidden rounded-2xl`}
                      key={i}>
                      <Image
                        source={{uri: item}}
                        style={{
                          height: responsiveWidth(16),
                          width: responsiveWidth(16),
                        }}
                        resizeMode="contain"
                      />
                    </Pressable>
                  );
                })}
            </View>
          </ScrollView>

          <View className="flex-row px-4 mt-5 justify-between items-start">
            <Text
              numberOfLines={2}
              style={{width: responsiveWidth(76)}}
              className="text-lg font-mulish_semibold">
              {product_?.title}
            </Text>
            <Wshlist product_={product_} />
          </View>
          <View className="flex-row px-4 mt-7 justify-start items-baseline">
            <Text className="text-2xl font-mulish_bold text-dark_blue leading-tight pr-3">
              ₹{product_?.selected_variation?.price}
            </Text>
            <View className="relative">
              <View
                className="absolute bg-gray-500 top-3"
                style={{width: responsiveWidth(12), height: 2}}></View>
              <Text className="text-lg font-semibold text-dark leading-tight">
                ₹{product_?.selected_variation?.price}
              </Text>
            </View>
          </View>
          <View className="flex-row px-4 mt-7 justify-start items-center gap-3 flex-wrap">
            <View className="px-4 py-1 bg-gray-200 rounded-full">
              <Text className="text-xs text-black font-mulish_italic ">
                Brand: {product_?.brand}
              </Text>
            </View>
            <View className="px-4 py-1 bg-gray-200 rounded-full">
              <Text className="text-xs text-dark font-mulish_italic ">
                Left {product_?.selected_variation?.stock}
              </Text>
            </View>
            <View className="px-4 py-1 bg-gray-200 rounded-full">
              <Text className="text-xs text-dark font-mulish_italic ">
                Sold {product_?.selected_variation?.sold_count}
              </Text>
            </View>
          </View>

          <View className=" mt-7">
            <Text className="text-xl px-4 font-mulish_semibold text-dark_blue">
              Color
            </Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View className="flex-row px-4 gap-6 mt-5">
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
                        className="p-2 border-2  rounded-full">
                        <Image
                          style={{aspectRatio: 1}}
                          src={item.image_url}
                          resizeMode="contain"
                          className="h-12 w-12 rounded-md"
                        />
                      </Pressable>
                    );
                  })}
              </View>
            </ScrollView>
          </View>

          <View className=" mt-7 ">
            <View className="px-4 flex-row justify-between items-center">
              <Text className="text-xl  font-mulish_semibold text-dark_blue">
                Select Size
              </Text>
              <Pressable>
                <Text className="text-blue-400 text-sm font-mulish_medium">
                  Size Chart
                </Text>
              </Pressable>
            </View>

            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View className="flex-row px-4 gap-6 mt-5">
                {product_.hasOwnProperty('size_variations') &&
                  product_.size_variations.map((item, i) => {
                    return (
                      <Pressable
                        style={{}}
                        onPress={
                          item.stock == 0 ? null : () => setAddSize(item.size)
                        }
                        key={i}
                        className={`w-14 h-14 justify-center items-center  border-gray-700 border-[1px] ${
                          item.size == product_?.selected_variation.size
                            ? 'bg-black '
                            : 'bg-white'
                        } rounded-full ${item.stock == 0 && 'opacity-20'}`}>
                        <Text
                          className={`text-lg ${
                            item.size == product_?.selected_variation.size
                              ? 'text-light text-xl'
                              : 'text-black'
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
            className=" mt-7 px-4">
            <Text className="text-xl  font-mulish_semibold text-dark_blue">
              More Deatil
            </Text>
            <WebViewAutoAdjust description={product_.description} />
          </View>
        </View>
      </ScrollView>
      <AddDetailAction product_={product_} navigation={navigation} />
    </SafeAreaView>
  );
};

export default ProductDetail;
