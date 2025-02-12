import {
  Button,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {
  _product_data,
  _store_data,
  coupon_code,
  product_details,
} from '../utils/data_';
import SmallHeader from '../components/SmallHeader';
import {ChevronDown, ChevronRight, MapPin, Search} from 'react-native-feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TYPO} from '../assets/typo';
import {responsiveFontSize, responsiveHeight} from 'react-native-responsive-dimensions';

const CartScreen = ({navigation}) => {
  const [showCoupponBox, setShowCoupponBox] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-[#fff]">
      <ScrollView className="w-full">
        <SmallHeader name="Cart" />
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
                  className="text-base text-dark font-mulish_semibold max-w-64">
                  JiMalioboro. Block z no.18 oboro. Block z no.18
                </Text>
              </View>
            </View>
            <Pressable>
              <ChevronDown
                width={responsiveFontSize(2.3)}
                color={TYPO.colors.dark}
              />
            </Pressable>
          </View>
        </View>
        <View className="mt-7 px-3">
          {_product_data.slice(0, 3).map((item, i) => {
            return (
              <View key={i} className="flex-row mb-5 gap-4">
                <View className="w-[30%] p-3  bg-gray-200 rounded-2xl overflow-hidden justify-center items-center">
                  <Image
                    source={{uri: item.image}}
                    resizeMode="contain"
                    className="h-20 w-24"
                  />
                </View>
                <View className="w-[65%] py-1 justify-between">
                  <Text
                    className="text-base font-mulish_medium text-dark_blue"
                    numberOfLines={2}>
                    {item.title}
                  </Text>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-xl font-mulish_bold text-dark_blue">
                      ${item.price}
                    </Text>
                    <View className="flex-row justify-between items-center bg-gray-200 rounded-full p-1">
                      <Pressable className="rounded-full bg-light p-[1px]">
                        <Entypo
                          name="minus"
                          color={TYPO.colors.main}
                          size={responsiveFontSize(2.4)}
                        />
                      </Pressable>
                      <Text className="text-base text-dark font-mulish_semibold w-8 text-center">
                        1
                      </Text>
                      <Pressable className="rounded-full bg-main p-[1px]">
                        <Entypo
                          name="plus"
                          color={TYPO.colors.light}
                          size={responsiveFontSize(2.4)}
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
        <View className="mt-5 px-3" style={{marginBottom:showCoupponBox ? 0 : responsiveHeight(10)}}>
          <View className="flex-row items-center ">
            <Text className="text-base font-mulish_medium mr-2 text-dark">
              Have a coupon code?
            </Text>
            <Pressable
              className=""
              onPress={() => {
                setShowCoupponBox(!showCoupponBox);
              }}>
              <Text className='text-base font-mulish_medium text-blue-500'>All coupon</Text>
            </Pressable>
          </View>
          <View className=" relative mt-3">
          <TextInput
                placeholder="Enter coupon code"
                placeholderTextColor="#6B7280"
                className="pl-4 pr-36 rounded-xl w-full bg-gray-100 px-4 py-2 text-base h-10 border border-gray-200"
              />
              <View className='absolute right-3 top-1'>
              {/* <Pressable
              className=""
              onPress={() => {
               
              }}>
              <Text className="text-blue-500 text-lg font-mulish_semibold  ">
                Apply
              </Text>
            </Pressable> */}
              <View className='flex-row justify-center items-center gap-1 pt-1'>
                <FontAwesome5 name='check-circle' size={responsiveFontSize(1.6)} color={TYPO.colors.main} />
                 <Text className='text-main text-base font-mulish_medium '>Available</Text>
              </View>
              </View>
           
          </View>
          {showCoupponBox && (
            <View className="border-[1px] border-gray-200 rounded-md my-6 p-4">
              <View className="flex-row flex-wrap gap-2 ">
                {coupon_code.map((code, index) => {
                  return (
                    <Pressable
                      className="bg-gray-200 py-1 px-2 rounded-full"
                      onPress={() => {
                        setShowCoupponBox(false);
                      }}>
                      <Text
                        key={index}
                        className="text-sm text-dark_blue font-mulish_medium ml-2">
                        {code.code}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          )}
        </View>
        <View className="mt-5 px-3 mb-24">
          <View className="flex-row justify-between items-center mb-1">
            <Text className="text-base font-mulish_semibold text-dark_blue">
              Sub Total
            </Text>
            <Text className="text-base font-mulish_bold text-dark_blue">
              $1200.00
            </Text>
          </View>
          <View className="flex-row justify-between items-center mb-1">
            <Text className="text-base font-mulish_semibold text-dark_blue">
              Delivery Fee
            </Text>
            <Text className="text-base font-mulish_bold text-dark_blue">
              $12.00
            </Text>
          </View>
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-base font-mulish_semibold text-dark_blue">
              Discount
            </Text>
            <Text className="text-base font-mulish_bold text-green-500">
              - $200.00
            </Text>
          </View>
          <View className="w-full border-b-[1px] border-dashed opacity-60" />
          <View className="flex-row justify-between items-center mt-4">
            <Text className="text-base font-mulish_bold text-dark_blue">
              Total
            </Text>
            <Text className="text-xl font-mulish_bold text-dark_blue">
              $120.00
            </Text>
          </View>
        </View>
      </ScrollView>
      <View className="px-4 py-2 pt-1 ">
        <Pressable className="border-[1px]  justify-center  items-center bg-main py-2 px-5 rounded-full border-main">
          <Text className="text-base text-center font-semibold text-light ">
            Checkout
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
