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


import SmallHeader from '../../components/SmallHeader';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {TYPO} from '../../assets/typo';
import MakeRequest from '../../utils/axiosInstance';
import {GET_ORDER_API} from '../../service/API';

const UserOrder = ({navigation}) => {
  const [orderList, setOrderList] = useState([]);

  const getOrderItem = async () => {
    try {
      const data = await MakeRequest(GET_ORDER_API, {}, {}, 'application/json');

      if (data.status == 1) {
      
        setOrderList(data.response.orders);
      }
    } catch (error) {
      console.error('get order failed:', error);
      Toast.show({
        type: 'BasicToast',
        text1: 'Something went wrong. Please try again.',
        position: 'bottom',
        visibilityTime: 5000,
      });
    } finally {
    }
  };

  useEffect(() => {
    getOrderItem();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#F6F6F6]">
      <SmallHeader name="My Orders" />
      <ScrollView className="flex-1">
        <View className="px-3 pt-5">
          {orderList.length > 0 &&
            orderList.map((item, i) => {
              return (
                <Pressable
                  onPress={() =>
                    navigation.navigate('OrderDetail', {
                      order_id: item.order_id, order_number:item.order_number
                    })
                  }
                  key={i}
                  className="p-2 border-[1px] border-gray-200 bg-white rounded-xl mb-4">
                  <View className=" border-b-[1px] border-gray-100 pb-2">
                    <Text className="text-base text-dark_blue font-mulish_semibold pb-1">
                      Order: #{item.order_number}
                    </Text>
                    <View className="flex-row gap-2 items-center">
                      <Text className="text-sm text-light_gray font-mulish_medium">
                        {'\u20B9'}
                        {item.billing_amount}
                      </Text>
                      <View className="w-1 h-1 bg-gray-500 rounded-full" />
                      <Text className="text-sm text-light_gray font-mulish_medium">
                        {item.created_at}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row  border-b-[1px] border-gray-100 gap-4 items-start py-2">
                    {item.product_images.map((url, ie) => {
                      return (
                        <Image
                          key={ie}
                          source={{uri: url}}
                          resizeMode="contain"
                          width={responsiveWidth(15)}
                          height={responsiveWidth(15)}
                        />
                      );
                    })}
                  </View>

                  <View className="flex-row py-1 justify-around items-center">
                    <Text className="text-sm text-dark font-mulish_semibold">
                      {item.payment_method}
                    </Text>
                    <View className='h-4 border-r-[1px] border-gray-200' />

                    <Text
                      style={{
                        color:
                          item.order_status == 'Delivered'
                            ? 'orange'
                            : item.order_status == 'Order Placed'
                            ? 'green'
                            : TYPO.colors.light_gray,
                      }}
                      className={`text-base font-mulish_medium`}>
                      {item.order_status}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserOrder;
