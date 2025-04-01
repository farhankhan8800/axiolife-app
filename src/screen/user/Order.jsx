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
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {TYPO} from '../../assets/typo';
import MakeRequest from '../../utils/axiosInstance';
import {GET_ORDER_API} from '../../service/API';
import {Skeleton} from 'react-native-skeletons';
import Toast from 'react-native-toast-message';

const UserOrder = ({navigation}) => {
  const [orderList, setOrderList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOrderItem = async () => {
    setLoading(true);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrderItem();
  }, []);

  const renderEmptyState = () => (
    <View className="flex-1 justify-center items-center py-16">
      <Image
        source={require('../../assets/image/order_empty.png')}
        resizeMode="contain"
        style={{
          height: responsiveWidth(28),
          width: responsiveWidth(24),
          marginBottom: responsiveHeight(4),
        }}
      />

      <Text className="text-center text-base text-light_gray font-mulish_medium mt-2 px-8">
        Your order history will appear here once you make a purchase
      </Text>
    </View>
  );

  const renderOrderItem = (item, index) => (
    <Pressable
      onPress={() =>
        navigation.navigate('OrderDetail', {
          order_id: item.order_id,
          order_number: item.order_number,
        })
      }
      key={index}
      className="p-4 border-[1px] border-gray-200 bg-white rounded-xl mb-5 shadow-sm">
      <View className="border-b-[1px] border-gray-100 pb-3">
        <Text className="text-lg text-dark_blue font-mulish_bold pb-1">
          Order #{item.order_number}
        </Text>
        <View className="flex-row gap-3 items-center">
          <Text className="text-base text-light_gray font-mulish_medium">
            {'\u20B9'}
            {item.billing_amount}
          </Text>
          <View className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
          <Text className="text-base text-light_gray font-mulish_medium">
            {item.created_at}
          </Text>
        </View>
      </View>

      <View className="flex-row border-b-[1px] border-gray-100 gap-5 items-center py-4">
        {item.product_images.map((url, ie) => (
          <Image
            key={ie}
            source={{uri: url}}
            resizeMode="contain"
            width={responsiveWidth(18)}
            height={responsiveWidth(18)}
            className="rounded-md"
          />
        ))}
      </View>

      <View className="flex-row py-3 justify-around items-center">
        <Text className="text-base text-dark font-mulish_semibold">
          {item.payment_method}
        </Text>
        <View className="h-6 border-r-[1px] border-gray-200" />

        <Text
          style={{
            color:
              item.order_status == 'Delivered'
                ? '#FF8C00'
                : item.order_status == 'Order Placed'
                ? '#00A36C'
                : TYPO.colors.light_gray,
            fontSize: 16,
            fontFamily: 'Mulish-SemiBold',
          }}>
          {item.order_status}
        </Text>
      </View>
    </Pressable>
  );

  const renderSkeletons = () => (
    <View className="mb-4">
      <Skeleton
        count={2}
        borderRadius={14}
        width={responsiveWidth(94)}
        height={responsiveWidth(48)}
        gap={16}
      />
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FC]">
      <SmallHeader name="My Orders" />
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingHorizontal: 14,
          paddingTop: 16,
          paddingBottom: 20,
        }}>
        {loading && renderSkeletons()}

        {!loading && orderList.length === 0 && renderEmptyState()}

        {!loading && orderList.length > 0 && orderList.map(renderOrderItem)}
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserOrder;
