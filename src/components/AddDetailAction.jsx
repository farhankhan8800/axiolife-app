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

const AddDetailAction = ({product_, navigation}) => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const isInCart = cart.some(item => item.product_id === product_.product_id);

  const add_cart_function = () => {
    if (isInCart) {
      Toast.show({
        type: 'BasicToast',
        text1: 'Product already added',
        position: 'bottom',
        visibilityTime: 5000,
      });
      return;
    }

    dispatch(addToCart(product_));
    Toast.show({
      type: 'BasicToast',
      text1: 'Product added successfully',
      position: 'bottom',
      visibilityTime: 5000,
    });
  };

  return (
    <>
      <View className="flex-row justify-between items-center px-4 py-2 pt-1 ">
        <Pressable
          onPress={add_cart_function}
          className="flex-row gap-3 border-[1px] w-[40%] justify-center  items-center py-2 px-5 rounded-full border-main">
          <FontAwesome5
            name="shopping-basket"
            color={TYPO.colors.main}
            size={responsiveFontSize(2.2)}
          />
          <Text className="text-base font-semibold text-main ">
            Add to Cart
          </Text>
        </Pressable>
        <Pressable
          style={{width: '56%'}}
          className="border-[1px] justify-center  items-center bg-main py-2 px-5 rounded-full border-main">
          <Text className="text-base text-center font-semibold text-light ">
            Buy Now
          </Text>
        </Pressable>
      </View>
      {isInCart && (
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
      )}
    </>
  );
};

export default AddDetailAction;

const styles = StyleSheet.create({});
