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
import {emptyCart} from '../reduxstore/slice/cart_slice';
import LinearGradient from 'react-native-linear-gradient';

const OrderProcessModal = ({primaryAddress}) => {
  const navigation = useNavigation();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [cartItem, setCartItem] = useState([]);

  const handleEmptyCart = () => {
    dispatch(emptyCart());
  };

  const toggleModal = useCallback(() => {
    if (primaryAddress == null) {
      return Toast.show({
        type: 'BasicToast',
        text1: 'Please select a delivery address first',
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
    setLoading(true);
    try {
      const data = await MakeRequest(GET_CART_API, {}, {}, 'application/json');

      if (data.status == 1) {
        setCartItem(data.response.cartitems.cartitems);
      }
    } catch (error) {
      console.error('Cart fetch failed:', error);
      Toast.show({
        type: 'BasicToast',
        text1: 'Unable to fetch cart items. Please try again.',
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

  const create_cod_order = async () => {
    setLoading(true);
    const formattedCart = cartItem.map(item => ({
      product_id: item.product_id,
      product_variation_id: item.product_variation_id,
      quantity: item.quantity,
      price: item.price,
    }));

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
        setTimeout(() => {
          setIsModalVisible(false);
          handleEmptyCart();
          navigation.navigate('OrderSuccess', {
            orderId: data.response.order_id,
            order_number: data.response.order_number,
          });
        }, 1000);
      }
    } catch (error) {
      console.error('Order creation failed:', error);
      Toast.show({
        type: 'BasicToast',
        text1: 'Unable to place your order. Please try again.',
        position: 'bottom',
        visibilityTime: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const PaymentOption = ({type, title, icon, onPress, selected}) => (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row p-5 border rounded-xl mb-5 items-center ${
        selected ? 'border-gray-700 bg-gray-50' : 'border-gray-200'
      }`}
      style={{
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 5,
        elevation: 1,
      }}>
      <View
        className={`w-6 h-6 rounded-full border-2 justify-center items-center ${
          selected ? 'border-gray-700' : 'border-gray-300'
        }`}>
        {selected && <View className="w-3 h-3 rounded-full bg-gray-700" />}
      </View>

      <View className="flex-1 flex-row justify-between items-center ml-4">
        <Text className="text-lg font-mulish_medium text-gray-800">
          {title}
        </Text>
        {icon}
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <LinearGradient
        colors={['#202020', '#000000']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        className="rounded-full overflow-hidden">
        <TouchableOpacity
          onPress={toggleModal}
          className="justify-center items-center py-4 px-8">
          <Text className="text-lg text-center font-mulish_bold text-white">
            Proceed to Checkout
          </Text>
        </TouchableOpacity>
      </LinearGradient>

      <Modal
        style={{margin: 0}}
        onBackButtonPress={toggleModal}
        useNativeDriver
        hideModalContentWhileAnimating
        avoidKeyboard
        statusBarTranslucent
        backdropOpacity={0.6}
        isVisible={isModalVisible}>
        <View className="flex-1 justify-end">
          <View
            style={{
              width: responsiveWidth(100),
              minHeight: responsiveHeight(40),
            }}
            className="bg-white rounded-t-3xl pt-16 pb-10 px-6">
            <Pressable
              onPress={toggleModal}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 justify-center items-center">
              <AntDesign
                name="close"
                color={TYPO.colors.dark}
                size={responsiveFontSize(2.4)}
              />
            </Pressable>

            <Text className="text-2xl text-gray-800 font-mulish_bold mb-2">
              Payment Method
            </Text>

            <Text className="text-base text-gray-500 font-mulish_regular mb-8">
              Select your preferred payment option
            </Text>

            <PaymentOption
              type="COD"
              title="Cash on Delivery"
              onPress={() => handlePaymentSelection('COD')}
              selected={paymentMethod === 'COD'}
            />

            <PaymentOption
              type="ONLINE"
              title="Online Payment"
              icon={
                <Image
                  className="h-8 w-40"
                  resizeMode="contain"
                  source={require('../assets/image/upi_logo.png')}
                />
              }
              onPress={() => handlePaymentSelection('ONLINE')}
              selected={paymentMethod === 'ONLINE'}
            />

            {loading && (
              <View className="mt-4 items-center">
                <Text className="font-mulish_medium text-gray-600">
                  Processing your request...
                </Text>
              </View>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

export default OrderProcessModal;
