import {View, Text, Pressable, Image, TouchableOpacity} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';

import Modal from 'react-native-modal';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';

import {useDispatch} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TYPO} from '../assets/typo';
import MakeRequest from '../utils/axiosInstance';
import {GET_CART_API, MAKE_ORDER_API} from '../service/API';
import Toast from 'react-native-toast-message';
import BackPressHandler from './BackPressHandler';
import { emptyCart } from '../reduxstore/slice/cart_slice';

const OrderProcessModal = ({primaryAddress}) => {
  const navigation = useNavigation();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const [cartItem, setCartItem] = useState([]);




  const handleEmptyCart = () => {
    dispatch(emptyCart());
  };



  const toggleModal = useCallback(() => {

    if(primaryAddress == null) {
      return  Toast.show({
        type: 'BasicToast',
        text1: 'Select your address first',
        position: 'bottom',
        visibilityTime: 5000,
      });
    }

    setIsModalVisible(prev => !prev);
    setPaymentMethod('');
  }, [primaryAddress]);

  const handlePaymentSelection = useCallback(
    value => {
      if (!paymentMethod) setPaymentMethod(value);
      if (value === 'COD') {
        create_cod_order();
      }
    },
    [paymentMethod, primaryAddress],
  );

  const getCartItem = async () => {
    try {
      const data = await MakeRequest(GET_CART_API, {}, {}, 'application/json');

      if (data.status == 1) {
        setCartItem(data.response.cartitems.cartitems);
      }
    } catch (error) {
      console.error('Verification failed:', error);
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
    getCartItem();
  }, []);

    // console.log(cartItem)

  const create_cod_order = async () => {

    const formattedCart = cartItem.map(item => ({
        product_id: item.product_id,
        product_variation_id: item.product_variation_id,  
        quantity: item.quantity,  
        price: item.price 
      }));

// console.log('formattedCart', formattedCart)

    try {
      const data = await MakeRequest(
        MAKE_ORDER_API,
        {
          promo_id: null,
          order_items: formattedCart,
          payment_method: paymentMethod,
          shipping_address_id: primaryAddress.id,
        },
        {},
        'application/json',
      );

      if (data.status == 1) {
        setTimeout(()=>{
          setIsModalVisible(false);
          handleEmptyCart()
          navigation.navigate('OrderSuccess', {orderId: data.response.order_id, order_number:data.response.order_number});
        },1000)
      }
    } catch (error) {
      console.error('create order faild:', error);
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
      
      <TouchableOpacity
        onPress={toggleModal}
        className="border border-black justify-center items-center bg-black py-2 px-5 rounded-full">
        <Text className="text-base text-center font-semibold text-light">
          Checkout
        </Text>
      </TouchableOpacity>

      <Modal
        style={{margin: 0}}
        onBackButtonPress={toggleModal}
        useNativeDriver
        hideModalContentWhileAnimating
        avoidKeyboard
        isVisible={isModalVisible}>
        <View className="flex-1 bg-[rgba(0,0,0,0.5)]">
          <View
            style={{
              width: responsiveWidth(100),
              minHeight: responsiveHeight(30),
            }}
            className="absolute bottom-0 p-8 bg-white rounded-t-3xl pt-14">
            <Pressable onPress={toggleModal} className="absolute top-5 right-5">
              <AntDesign
                name="close"
                color={TYPO.colors.dark}
                size={responsiveFontSize(2.4)}
              />
            </Pressable>

            <Text className="text-lg text-dark font-mulish_semibold mb-6">
              How would you like to pay?
            </Text>

            <TouchableOpacity
              onPress={() => handlePaymentSelection('COD')}
              className="relative flex-row p-3 border border-gray-300 justify-start gap-3 items-center mb-4">
              <View
                className={`w-4 h-4 rounded-full border border-gray-300 ${
                  paymentMethod === 'COD' ? 'bg-gray-300' : ''
                }`}
              />
              <Text>Cash on delivery (COD)</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handlePaymentSelection('ONLINE')}
              className="relative flex-row p-3 border border-gray-300 justify-start gap-3 items-center mb-4">
              <View
                className={`w-4 h-4 rounded-full border border-gray-300 ${
                  paymentMethod === 'ONLINE' ? 'bg-gray-300' : ''
                }`}
              />
              <Text>Online (UPI & Bank)</Text>
              <Image
                className="h-7 w-36"
                resizeMode="contain"
                source={require('../assets/image/upi_logo.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default OrderProcessModal;
