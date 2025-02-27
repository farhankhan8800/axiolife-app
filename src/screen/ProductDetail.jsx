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

  const getProductdetails = async () => {
    setLoading(true);
    try {
      const data = await MakeRequest(
        PRODUCT_DETAIL_API,
        {product_slug: 'new-balance-new-striker-original-shoes'}, //slug
        {},
        'application/json',
      );

      // console.log(data)

      if (data.status == 1) {
        setProductDetails(data.response.product);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductdetails();
  }, []);

  useEffect(() => {
    if (product_?.more_images?.length > 0) {
      setShowImage(product_?.more_images[0]);
    }
  }, [product_]);

  const getProductVariation = async product_color => {
    try {
      const data = await MakeRequest(
        PRODUCT_DETAIL_VARIATION_API,
        {product_id: product_?.product_id, color: product_color},
        {},
        'application/json',
      );

      if (data.status == 1) {
        setProductDetails(data.response.product);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#fff]">
      <ScrollView className="w-full">
        <View className="p-3">
          <View
            style={{height: responsiveHeight(50)}}
            className="flex-1 overflow-hidden bg-gray-200 pt-3 rounded-[30px]">
            <SmallHeader name="Sneakers Detail" />
            <View className="w-full h-auto p-5 overflow-hidden ">
              <Image
                source={{uri: showImage}}
                style={{width: '100%', height: responsiveHeight(37)}}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

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
                        showImage === item ? TYPO.colors.main : 'transparent',
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
            ${product_?.top_variation?.offerPrice}/-
          </Text>
          <View className="relative">
            <View
              className="absolute bg-gray-500 top-3"
              style={{width: responsiveWidth(12), height: 2}}></View>
            <Text className="text-lg font-semibold text-dark leading-tight">
              ${product_?.top_variation?.price}/-
            </Text>
          </View>
        </View>
        <View className="flex-row px-4 mt-7 justify-start items-center gap-3 flex-wrap">
          <View className="px-4 py-1 bg-gray-200 rounded-full">
            <Text className="text-base text-dark font-mulish_medium ">
              Brand: {product_?.brand}
            </Text>
          </View>
          <View className="px-4 py-1 bg-gray-200 rounded-full">
            <Text className="text-base text-dark font-mulish_medium ">
              Left {product_?.top_variation?.stock}
            </Text>
          </View>
          <View className="px-4 py-1 bg-gray-200 rounded-full">
            <Text className="text-base text-dark font-mulish_medium ">
              Sold {product_?.sold_count}
            </Text>
          </View>
          <View className="px-4 py-1 bg-gray-200 rounded-full">
            <Text className="text-base text-dark font-mulish_medium ">
              <Icon
                name="star"
                color={'#ffde21'}
                size={responsiveFontSize(1.6)}
              />{' '}
              {/* {product_details.star}{' '} */}
              <Text className="text-sm text-gray-700">
                ({product_?.top_variation?.reviews} Reviews)
              </Text>
            </Text>
          </View>
        </View>

        <View className=" mt-7">
          <Text className="text-xl px-4 font-mulish_semibold text-dark_blue">
            Color
          </Text>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className="flex-row px-4 gap-6 mt-5">
              {product_.hasOwnProperty('colors') &&
                product_.colors.map((item, i) => {
                  return (
                    <Pressable
                      onPress={() => getProductVariation(item.color)}
                      key={i}
                      style={{
                        borderColor:
                          product_?.top_variation.color == item.color
                            ? TYPO.colors.main
                            : 'transparent',
                      }}
                      className="p-2 border-2  rounded-full">
                      <Image
                        src={item.image_url}
                        resizeMode="cover"
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
            {/* <Pressable>
              <Text className="text-blue-400 text-sm font-mulish_medium">
                Size Chart
              </Text>
            </Pressable> */}
          </View>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className="flex-row px-4 gap-6 mt-5">
              {product_.hasOwnProperty('first_color_sizes') &&
                product_.first_color_sizes.map((item, i) => {
                  return (
                    <Pressable
                      style={{}}
                      key={i}
                      className={`w-14 h-14 justify-center items-center bg-gray-100 border-[1px] ${
                        item == product_?.top_variation.size
                          ? 'border-gray-700'
                          : 'border-gray-300'
                      } rounded-full`}>
                      <Text className="text-lg text-dark_blue font-mulish_medium">
                        {item}
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
      </ScrollView>
      <AddDetailAction product_={product_} navigation={navigation} />
    </SafeAreaView>
  );
};

export default ProductDetail;
