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
import {_product_data, _store_data, product_details} from '../utils/data_';
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
  const [product_, setProductDetails] = useState({
    main: {},
    details: {},
    variants: [],
    images: [],
  });
  
  const getProductdetails = async () => {
    setLoading(true);
    try {
      const data = await MakeRequest(
        PRODUCT_DETAIL_API,
        {product_slug: 'new-balance-new-striker-original-shoes'}, //slug
        {},
        'application/json',
      );

      if (data.status == 1) {
        if (data.response.product.variations.length > 0) {
          const show_product = data.response.product.variations[0];

          const updatedImages = [
            show_product.image,
            ...(data.response.product.more_images || []),
          ];

          setProductDetails({
            main: data.response.product,
            variants: data.response.product.variations,
            images: updatedImages,
            details: {
              title: data.response.product.title,
              id: data.response.product.id,
              brand: data.response.product.brand,
              ...show_product,
            },
          });
        } else {
          setProductDetails({
            main: data.response.product,
            variants: data.response.product.variations,
            images: data.response.product.more_images,
            details: {
              title: data.response.product.title,
              id: data.response.product.id,
              brand: data.response.product.brand,
            },
          });
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
  }, []);

  useEffect(() => {
    if (product_.images?.length > 0) {
      setShowImage(product_.images[0]);
    }
  }, [product_]);

  const getOtherProduct = variation_id => {
    const selectedVariant = product_.variants.find(
      variant => variant.variation_id === variation_id,
    );

    if (selectedVariant) {
      const updatedImages = [
        selectedVariant.image,
        ...(product_.main.more_images || []),
      ];

      setProductDetails(prevProduct => ({
        ...prevProduct,
        details: {
          ...prevProduct.details,
          ...selectedVariant,
        },
        images: updatedImages,
      }));
    } else {
      console.warn('Variant not found for ID:', variation_id);
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
            {product_.images.map((item, i) => {
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
            {product_.details?.title}
          </Text>
         <Wshlist product_={product_.details} />
        </View>
        <View className="flex-row px-4 mt-7 justify-start items-baseline">
          <Text className="text-2xl font-mulish_bold text-dark_blue leading-tight pr-3">
            ${product_.details?.offerPrice}/-
          </Text>
          <View className="relative">
            <View
              className="absolute bg-gray-500 top-3"
              style={{width: responsiveWidth(12), height: 2}}></View>
            <Text className="text-lg font-semibold text-dark leading-tight">
              ${product_.details?.price}/-
            </Text>
          </View>
        </View>
        <View className="flex-row px-4 mt-7 justify-start items-center gap-3">
          <View className="px-4 py-1 bg-gray-200 rounded-full">
            <Text className="text-base text-dark font-mulish_medium ">
              Left {product_details.stock}
            </Text>
          </View>
          <View className="px-4 py-1 bg-gray-200 rounded-full">
            <Text className="text-base text-dark font-mulish_medium ">
              Sold {product_details.sold_count}
            </Text>
          </View>
          <View className="px-4 py-1 bg-gray-200 rounded-full">
            <Text className="text-base text-dark font-mulish_medium ">
              <Icon
                name="star"
                color={'#ffde21'}
                size={responsiveFontSize(1.6)}
              />{' '}
              {product_details.star}{' '}
              <Text className="text-sm text-gray-700">
                ({product_details.reviews} Reviews)
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
              {product_.variants.map((item, i) => {
                return (
                  <Pressable
                    onPress={() => getOtherProduct(item.variation_id)}
                    key={i}
                    style={{
                      borderColor:
                        product_.details.variation_id == item.variation_id
                          ? TYPO.colors.main
                          : 'transparent',
                    }}
                    className="p-2 border-2  rounded-full">
                    <Image
                      src={item.image}
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
            <Pressable>
              <Text className="text-blue-400 text-sm font-mulish_medium">
                Size Chart
              </Text>
            </Pressable>
          </View>

          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            <View className="flex-row px-4 gap-6 mt-5">
              {product_.variants.map((item, i) => {
                return (
                  <Pressable
                    onPress={() => getOtherProduct(item.variation_id)}
                    key={i}
                    style={{
                      borderColor:
                        product_.details.variation_id == item.variation_id
                          ? TYPO.colors.main
                          : TYPO.colors.light_gray,
                    }}
                    className="w-14 h-14 justify-center items-center bg-gray-100 border-[1px] border-gray-500 rounded-full">
                    <Text className="text-lg text-dark_blue font-mulish_medium">
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
          <WebViewAutoAdjust description={product_details.details} />
        </View>
      </ScrollView>
      <AddDetailAction product_={product_} navigation={navigation} />
    </SafeAreaView>
  );
};

export default ProductDetail;
