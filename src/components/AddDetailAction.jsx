import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TYPO} from '../assets/typo';
import {
  responsiveFontSize,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart} from '../reduxstore/slice/cart_slice';
import Toast from 'react-native-toast-message';
import MakeRequest from '../utils/axiosInstance';
import {ADD_CART_API, CART_ACTION_API} from '../service/API';

const AddDetailAction = ({product_, navigation}) => {
  console.log('product_', product_);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const isInCart = cart.some(
    item =>
      item.product_id === product_.product_id &&
      item.selected_variation?.variation_id ===
        product_.selected_variation?.variation_id,
  );
  const {user, token, isAuthenticated} = useSelector(state => state.auth);

  // console.log(product_)

  const add_cart_function = async () => {
    if (!isAuthenticated) {
      Toast.show({
        type: 'BasicToast',
        text1: 'Login First then add Product.',
        position: 'bottom',
        visibilityTime: 5000,
      });
      return;
    }

    if (isInCart) {
      Toast.show({
        type: 'BasicToast',
        text1: 'Product already added',
        position: 'bottom',
        visibilityTime: 5000,
      });
      return;
    }

    try {
      const data = await MakeRequest(
        ADD_CART_API,
        {
          product_id: product_.product_id,
          product_variation_id: product_.selected_variation.variation_id,
        },
        {},
        'application/json',
      );
      if (data.status == 1) {
        dispatch(addToCart(product_));
        Toast.show({
          type: 'BasicToast',
          text1: 'Product added successfully',
          position: 'bottom',
          visibilityTime: 5000,
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
    }

    //
  };

  const buy_now_function = async () => {
    if (!isAuthenticated) {
      Toast.show({
        type: 'BasicToast',
        text1: 'Login First then add Product.',
        position: 'bottom',
        visibilityTime: 5000,
      });
      return;
    }

    if (isInCart) {
      return navigation.navigate('Cart');
    }

    try {
      const data = await MakeRequest(
        ADD_CART_API,
        {
          product_id: product_.product_id,
          product_variation_id: product_.selected_variation.variation_id,
        },
        {},
        'application/json',
      );
      if (data.status == 1) {
        dispatch(addToCart(product_));
        Toast.show({
          type: 'BasicToast',
          text1: 'Product added successfully',
          position: 'bottom',
          visibilityTime: 5000,
        });
        navigation.navigate('Cart');
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

  return (
    <>
      <View className="flex-row justify-between items-center px-4 py-2 pt-1 ">
        <Pressable
          onPress={add_cart_function}
          className="flex-row gap-3 border-[1px] w-[40%] justify-center  items-center py-2 px-5 rounded-full border-black">
          <FontAwesome5
            name={isInCart ? 'check' : 'shopping-basket'}
            color={TYPO.colors.slate900}
            size={responsiveFontSize(2.2)}
          />

          <Text className="text-base font-semibold text-slate-900 ">
            Add to Cart
          </Text>
        </Pressable>
        <Pressable
          style={{width: '56%'}}
          onPress={buy_now_function}
          className="border-[1px] justify-center  items-center bg-black py-2 px-5 rounded-full border-black">
          <Text className="text-base text-center font-semibold text-light ">
            Buy Now
          </Text>
        </Pressable>
      </View>
      {/* {isInCart && (
        <Pressable
          onPress={() => navigation.navigate('Cart')}
          style={{backgroundColor: TYPO.colors.darkblack}}
          className="mt-2 gap-3 flex-row justify-center items-center py-3 ">
          <Text className="text-lg text-white font-mulish_semibold">
            Check Out
          </Text>
          <FontAwesome
            name="chevron-circle-right"
            color={TYPO.colors.light}
            size={responsiveFontSize(3)}
          />
        </Pressable>
      )} */}
    </>
  );
};

export default AddDetailAction;

const styles = StyleSheet.create({});
