import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import FastImage from 'react-native-fast-image';
const OrderSuccess = ({navigation}) => {
  const {user, token, isAuthenticated} = useSelector(state => state.auth);
  // console.log(user, isAuthenticated, token);

  useEffect(() => {}, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center bg-white">
        <FastImage
          source={require('../assets/image/order_success_gif.gif')}
          style={{height: responsiveWidth(80), width: responsiveWidth(80)}}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <View className='flex-row justify-around gap-4 px-2 py-1 border-t-[1px] border-gray-300'>
        <Pressable className='py-3 px-8' onPress={()=>navigation.navigate('Home')}>
          <Text className='text-base font-mulish_semibold text-dark_blue'>Home</Text>
        </Pressable>
        {/* <View className='w-[3px] bg-gray-500' /> */}
        <Pressable className='py-3 px-8'>
          <Text className='text-base font-mulish_semibold text-dark_blue'>View Order</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default OrderSuccess;
