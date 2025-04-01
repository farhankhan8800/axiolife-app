import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {ChevronDown, MapPin} from 'react-native-feather';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {TYPO} from '../assets/typo';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Toast from 'react-native-toast-message';
import {CART_ACTION_API, GET_ADDRESS_API, GET_CART_API} from '../service/API';
import MakeRequest from '../utils/axiosInstance';
import {addToCart, decreaseQuantity} from '../reduxstore/slice/cart_slice';
import {useDispatch} from 'react-redux';
import OrderProcessModal from '../components/OrderProcess';
import {Skeleton} from 'react-native-skeletons';
import SmallHeader from '../components/SmallHeader';
import {coupon_code} from '../utils/data_';
import LinearGradient from 'react-native-linear-gradient';

const CartScreen = ({navigation}) => {
  const [showCouponBox, setShowCouponBox] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [cartSummary, setCartSummary] = useState({});
  const [primaryAddress, setPrimaryAddress] = useState(null);
  const [cartState, setCartState] = useState('LOADING'); // LOADING, NODATA, HAVEINDATA
  const [couponCode, setCouponCode] = useState('');

  const dispatch = useDispatch();

  const getCartItem = async () => {
    try {
      const data = await MakeRequest(GET_CART_API, {}, {}, 'application/json');
      if (data.status == 1) {
        if (data.response.cartitems.cartitems.length > 0) {
          setCartItem(data.response.cartitems.cartitems);
          setCartSummary(data.response.cartitems.cartSummary);
          setCartState('HAVEINDATA');
        } else {
          setCartState('NODATA');
        }
      }
    } catch (error) {
      console.error('Cart fetch failed:', error);
      setCartState('NODATA');
      Toast.show({
        type: 'BasicToast',
        text1: 'Unable to fetch cart items. Please try again.',
        position: 'bottom',
        visibilityTime: 5000,
      });
    }
  };

  const get_primary_address = async () => {
    try {
      const data = await MakeRequest(
        GET_ADDRESS_API,
        {},
        {},
        'application/json',
      );

      if (data.status == 1) {
        const primaryAddr = data.response.addresses.find(
          address => address.primary_address == 1,
        );

        if (primaryAddr) {
          setPrimaryAddress(primaryAddr);
        }
      }
    } catch (error) {
      console.error('Address fetch failed:', error);
      Toast.show({
        type: 'BasicToast',
        text1: 'Unable to fetch delivery address. Please try again.',
        position: 'bottom',
        visibilityTime: 5000,
      });
    }
  };

  useEffect(() => {
    getCartItem();
    get_primary_address();
  }, []);

  const manage_product = async (item, action) => {
    try {
      const data = await MakeRequest(
        CART_ACTION_API,
        {
          product_id: item.product_id,
          product_variation_id: item.product_variation_id,
          option: action,
        },
        {},
        'application/json',
      );

      if (data.status == 1) {
        if (action == 'plus') {
          dispatch(addToCart(item));
        }
        if (action == 'minus') {
          dispatch(
            decreaseQuantity({
              product_id: item.product_id,
              variation_id: item.product_variation_id,
            }),
          );
        }
        getCartItem();
      }
    } catch (error) {
      console.error('Cart update failed:', error);
      Toast.show({
        type: 'BasicToast',
        text1: 'Unable to update cart. Please try again.',
        position: 'bottom',
        visibilityTime: 5000,
      });
    }
  };

  const renderCartItem = (item, index) => (
    <View key={index} className="mb-7 bg-white rounded-2xl p-4 shadow-sm">
      <View className="flex-row gap-5">
        <View className="w-[35%] p-4 bg-gray-50 rounded-xl overflow-hidden justify-center items-center">
          <Image
            source={{uri: item.featured_image}}
            resizeMode="contain"
            className="h-28 w-28"
            style={{marginVertical: 4}}
          />
        </View>
        <View className="w-[60%] py-2 justify-between">
          <Text
            className="text-lg font-mulish_semibold text-gray-800"
            numberOfLines={2}>
            {item.title}
          </Text>

          <View className="mt-4 flex-row justify-between items-center">
            <Text className="text-2xl font-mulish_bold text-gray-900">
              ${item.price}
            </Text>
            <View className="flex-row justify-between items-center bg-gray-100 rounded-full p-1.5">
              <Pressable
                onPress={() => manage_product(item, 'minus')}
                className="rounded-full bg-white p-1.5 shadow-sm">
                <Entypo
                  name="minus"
                  color={TYPO.colors.slate900}
                  size={responsiveFontSize(2.2)}
                />
              </Pressable>
              <Text className="text-lg text-gray-800 font-mulish_bold w-10 text-center">
                {item.quantity}
              </Text>
              <Pressable
                onPress={() => manage_product(item, 'plus')}
                className="rounded-full bg-gray-900 p-1.5 shadow-sm">
                <Entypo
                  name="plus"
                  color={TYPO.colors.light}
                  size={responsiveFontSize(2.2)}
                />
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );

  const renderAddressBar = () => (
    <TouchableOpacity
      onPress={() => navigation.navigate('Address')}
      className="flex-row justify-between items-center bg-gray-50 p-4 rounded-xl mt-4 mb-6">
      <View className="flex-row items-center">
        <MapPin
          width={responsiveFontSize(2.2)}
          color={TYPO.colors.slate900}
          className="mr-2"
        />
        <View>
          <Text className="text-base text-gray-500 font-mulish_medium mb-1">
            Deliver to:
          </Text>
          <Text
            numberOfLines={1}
            className="text-base text-gray-800 font-mulish_semibold max-w-64">
            {primaryAddress ? (
              <>
                {primaryAddress.address_line1} {primaryAddress.address_line2},{' '}
                {primaryAddress.city} {primaryAddress.postal_code}
              </>
            ) : (
              'Add your delivery address'
            )}
          </Text>
        </View>
      </View>
      <ChevronDown width={responsiveFontSize(2.3)} color={TYPO.colors.dark} />
    </TouchableOpacity>
  );

  const renderSummaryItem = (
    label,
    value,
    isHighlighted = false,
    isDiscount = false,
  ) => (
    <View className="flex-row justify-between items-center py-2.5">
      <Text
        className={`text-base font-mulish_medium ${
          isHighlighted ? 'text-gray-900' : 'text-gray-600'
        }`}>
        {label}
      </Text>
      <Text
        className={`text-base font-mulish_bold ${
          isDiscount
            ? 'text-green-600'
            : isHighlighted
            ? 'text-gray-900'
            : 'text-gray-700'
        }`}>
        {isDiscount ? '- ' : ''}
        {value}
      </Text>
    </View>
  );

  const renderOrderSummary = () => (
    <View className="bg-white rounded-2xl p-6 shadow-sm mt-6 mb-8">
      <Text className="text-xl font-mulish_bold text-gray-900 mb-4">
        Order Summary
      </Text>

      {renderSummaryItem('Subtotal', cartSummary?.total_price)}
      {renderSummaryItem('Items', cartSummary?.total_items)}
      {renderSummaryItem('Platform Fee', cartSummary?.platform_charge)}
      {renderSummaryItem('Service Fee', cartSummary?.service_fee)}
      {renderSummaryItem('Discount', '$200.00', false, true)}
      {renderSummaryItem('Delivery', cartSummary?.delivery_charge)}

      <View className="border-t border-gray-200 my-3" />

      <View className="flex-row justify-between items-center mt-2">
        <Text className="text-lg font-mulish_bold text-gray-900">Total</Text>
        <Text className="text-2xl font-mulish_bold text-gray-900">
          {cartSummary?.final_price}
        </Text>
      </View>
    </View>
  );

  const renderCouponSection = () => (
    <View className="bg-white rounded-2xl p-6 shadow-sm">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-lg font-mulish_bold text-gray-900">
          Apply Coupon
        </Text>
        <TouchableOpacity onPress={() => setShowCouponBox(!showCouponBox)}>
          <Text className="text-base font-mulish_medium text-blue-600">
            {showCouponBox ? 'Hide coupons' : 'View all'}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="relative">
        <TextInput
          value={couponCode}
          onChangeText={setCouponCode}
          placeholder="Enter coupon code"
          placeholderTextColor="#6B7280"
          className="pl-4 pr-24 rounded-xl w-full bg-gray-50 px-4 py-3 text-base border border-gray-200"
        />
        <View className="absolute right-4 top-2.5">
          <View className="flex-row items-center gap-1.5">
            <FontAwesome5
              name="check-circle"
              size={responsiveFontSize(1.6)}
              color="#22C55E"
            />
            <Text className="text-green-600 text-base font-mulish_medium">
              Available
            </Text>
          </View>
        </View>
      </View>

      {showCouponBox && (
        <View className="mt-5">
          <Text className="text-base font-mulish_medium text-gray-600 mb-3">
            Available coupons:
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {coupon_code.map((code, index) => (
              <TouchableOpacity
                key={index}
                className="bg-gray-50 py-2 px-4 rounded-full border border-gray-200"
                onPress={() => {
                  setCouponCode(code.code);
                  setShowCouponBox(false);
                }}>
                <Text className="text-base text-gray-800 font-mulish_medium">
                  {code.code}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
    </View>
  );

  const renderLoading = () => (
    <View className="px-5 py-6">
      <Skeleton
        borderRadius={16}
        count={1}
        width={responsiveWidth(90)}
        height={responsiveWidth(25)}
        gap={16}
      />
      <View className="h-6" />
      <Skeleton
        borderRadius={16}
        count={2}
        width={responsiveWidth(90)}
        height={responsiveWidth(30)}
        gap={16}
      />
    </View>
  );

  const renderEmptyCart = () => (
    <View
      style={{height: responsiveHeight(70)}}
      className="flex-1 justify-center items-center">
      <Image
        source={require('../assets/image/empty_cart.webp')}
        resizeMode="contain"
        className="h-56 w-56"
      />
      <Text className="text-2xl font-mulish_bold text-gray-800 mt-6 mb-2">
        Your cart is empty
      </Text>
      <Text className="text-base font-mulish_medium text-gray-500 text-center px-12 mb-8">
        Looks like you haven't added anything to your cart yet
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <SmallHeader name="Shopping Cart" />

      <ScrollView
        className="flex-1"
        contentContainerStyle={{paddingHorizontal: 16, paddingBottom: 100}}>
        {renderAddressBar()}

        {cartState === 'LOADING' && renderLoading()}

        {cartState === 'NODATA' && renderEmptyCart()}

        {cartState === 'HAVEINDATA' && (
          <>
            <View>{cartItem.map(renderCartItem)}</View>

            {renderCouponSection()}
            {renderOrderSummary()}
          </>
        )}
      </ScrollView>

      <View className="absolute bottom-0 left-0 right-0 px-5 py-4 bg-white border-t border-gray-100 shadow-lg">
        {cartState === 'HAVEINDATA' ? (
          <OrderProcessModal primaryAddress={primaryAddress} />
        ) : (
          <LinearGradient
            colors={['#202020', '#000000']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            className="rounded-full overflow-hidden">
            <TouchableOpacity
              onPress={() => navigation.navigate('Product')}
              className="justify-center items-center py-4">
              <Text className="text-lg text-center font-mulish_bold text-white">
                Discover Products
              </Text>
            </TouchableOpacity>
          </LinearGradient>
        )}
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
