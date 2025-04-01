import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  Image,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import SmallHeader from '../../components/SmallHeader';
import {order_detail_data} from '../../utils/data_';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {TYPO} from '../../assets/typo';
import {
  responsiveFontSize,
  responsiveWidth,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import MakeRequest from '../../utils/axiosInstance';
import {ORDER_DETAILS_API} from '../../service/API';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

const OrderDetail = ({navigation, route}) => {
  const order_key = route.params;

  const [trackopen, setTrackopen] = useState(null);
  const [itemList, setItemList] = useState([]);
  const [orderSummary, setOrderSummary] = useState({});
  const [loading, setLoading] = useState(true);

  const getorderdetails = async () => {
    setLoading(true);
    try {
      const data = await MakeRequest(
        ORDER_DETAILS_API,
        {
          order_number: order_key.order_number,
        },
        {}, // Empty headers
        'application/json',
      );

      if (data.status == 1) {
        setItemList(data.response.items);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getorderdetails();
  }, []);

  useEffect(() => {
    if (Array.isArray(itemList) && itemList.length > 0) {
      setTrackopen(itemList[0]?.product_id);
    }
  }, [itemList]);

  const trackopenfunction = id => {
    setTrackopen(prev => (prev === id ? null : id));
  };

  const renderOrderStatusBadge = status => {
    let bgColor = 'bg-gray-200';
    let textColor = 'text-gray-700';

    switch (status) {
      case 'Delivered':
        bgColor = 'bg-green-100';
        textColor = 'text-green-700';
        break;
      case 'Shipped':
        bgColor = 'bg-blue-100';
        textColor = 'text-blue-700';
        break;
      case 'Processing':
        bgColor = 'bg-yellow-100';
        textColor = 'text-yellow-700';
        break;
      case 'cancelled':
        bgColor = 'bg-red-100';
        textColor = 'text-red-700';
        break;
      default:
        break;
    }

    return (
      <View className={`px-3 py-1 rounded-full ${bgColor}`}>
        <Text className={`text-sm font-mulish_bold ${textColor}`}>
          {status}
        </Text>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-white justify-center items-center">
        <ActivityIndicator size="large" color="#1e293b" />
        <Text className="mt-4 text-gray-600 font-mulish_medium">
          Loading order details...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <SmallHeader name="Order Details" />
      <ScrollView className="flex-1">
        <View className="pt-6 pb-2 bg-[#F6F6F6]">
          <View className="px-5">
            <View className="bg-white rounded-xl shadow-md py-5 px-6 border-l-4 border-[#1e293b]">
              <View className="flex-row justify-between items-center">
                <Text className="text-2xl text-[#1e293b] font-mulish_bold">
                  Order #{order_detail_data.order_id}
                </Text>
                <AntDesign
                  name="filetext1"
                  size={responsiveFontSize(3)}
                  color="#1e293b"
                />
              </View>
              <Text className="text-gray-500 font-mulish_medium mt-1">
                Placed on {order_detail_data.date || 'Apr 01, 2025'}
              </Text>
            </View>
          </View>
        </View>

        <View className="px-5 pt-6 pb-10">
          {/* Product Items Section */}
          <Text className="text-xl text-[#1e293b] font-mulish_bold mb-4">
            Order Items
          </Text>
          <View>
            {itemList.map((item, i) => (
              <View
                key={i}
                className="bg-white rounded-xl mb-5 shadow-sm overflow-hidden border border-gray-100">
                <Pressable
                  onPress={() =>
                    navigation.navigate('ProductDetail', {
                      slug: item.product_name,
                    })
                  }
                  className="p-5 border-b border-gray-100">
                  <View className="flex-row">
                    <View className="mr-4">
                      <Image
                        source={{uri: item.product_image}}
                        resizeMode="cover"
                        className="w-24 h-24 rounded-lg"
                      />
                    </View>
                    <View className="flex-1">
                      <Text className="text-lg text-[#1e293b] font-mulish_bold mb-1">
                        {item.product_name}
                      </Text>
                      <View className="flex-row items-center mt-1">
                        <Text className="text-base text-gray-600 font-mulish_medium">
                          Qty: {item.quantity}
                        </Text>
                        <Text className="mx-2 text-gray-400">•</Text>
                        <Text className="text-lg text-[#1e293b] font-mulish_bold">
                          ${item.price}
                        </Text>
                      </View>
                      <View className="mt-2">
                        {renderOrderStatusBadge(item.product_status)}
                      </View>
                    </View>
                  </View>
                </Pressable>

                <View className="bg-gray-50 px-5 py-3">
                  <View className="flex-row justify-between items-center">
                    <View className="flex-row">
                      <Pressable className="flex-row items-center mr-5">
                        <Ionicons
                          name="help-circle-outline"
                          size={responsiveFontSize(2.2)}
                          color="#1e293b"
                        />
                        <Text className="ml-1 text-base text-[#1e293b] font-mulish_semibold">
                          Help
                        </Text>
                      </Pressable>

                      <Pressable className="flex-row items-center">
                        <Ionicons
                          name="document-text-outline"
                          size={responsiveFontSize(2.2)}
                          color="#1e293b"
                        />
                        <Text className="ml-1 text-base text-[#1e293b] font-mulish_semibold">
                          Invoice
                        </Text>
                      </Pressable>
                    </View>

                    <Pressable
                      onPress={() => trackopenfunction(item.product_id)}
                      className="flex-row items-center">
                      <Text className="mr-2 text-base text-[#1e293b] font-mulish_semibold">
                        Track
                      </Text>
                      <Entypo
                        name={
                          item.product_id === trackopen
                            ? 'chevron-up'
                            : 'chevron-down'
                        }
                        color="#1e293b"
                        size={responsiveFontSize(2.2)}
                      />
                    </Pressable>
                  </View>
                </View>

                <View>
                  {item.product_id === trackopen && (
                    <OrderTracker item={item} />
                  )}
                </View>
              </View>
            ))}
          </View>

          {/* Shipping Details Section */}
          <View className="mt-8">
            <Text className="text-xl text-[#1e293b] font-mulish_bold mb-4">
              Shipping Details
            </Text>
            <View className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <View className="flex-row items-start">
                <Ionicons
                  name="location"
                  size={responsiveFontSize(2.5)}
                  color="#1e293b"
                />
                <View className="ml-3 flex-1">
                  <Text className="text-lg text-[#1e293b] font-mulish_bold">
                    {order_detail_data.customer.name}
                  </Text>
                  <Text className="text-base text-gray-600 font-mulish_medium mt-1">
                    {order_detail_data.customer.address.street}
                  </Text>
                  {order_detail_data.customer.address.landmark && (
                    <Text className="text-base text-gray-600 font-mulish_medium">
                      {order_detail_data.customer.address.landmark}
                    </Text>
                  )}
                  <Text className="text-base text-gray-600 font-mulish_medium">
                    {order_detail_data.customer.address.city},{' '}
                    {order_detail_data.customer.address.state} -{' '}
                    {order_detail_data.customer.address.pincode}
                  </Text>
                  <Text className="text-base text-gray-600 font-mulish_medium">
                    {order_detail_data.customer.address.country}
                  </Text>

                  <View className="flex-row items-center mt-4 pt-4 border-t border-gray-100">
                    <Ionicons
                      name="call"
                      size={responsiveFontSize(2)}
                      color="#1e293b"
                    />
                    <Text className="ml-2 text-base text-gray-700 font-mulish_semibold">
                      {order_detail_data.customer.phone}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Payment Section */}
          <View className="mt-8">
            <Text className="text-xl text-[#1e293b] font-mulish_bold mb-4">
              Payment Information
            </Text>
            <View className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-base text-gray-600 font-mulish_medium">
                  Payment Method
                </Text>
                <View className="flex-row items-center">
                  <AntDesign
                    name="creditcard"
                    size={responsiveFontSize(2)}
                    color="#1e293b"
                  />
                  <Text className="ml-2 text-base text-[#1e293b] font-mulish_bold">
                    {order_detail_data.payment.method}
                  </Text>
                </View>
              </View>

              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-base text-gray-600 font-mulish_medium">
                  Transaction ID
                </Text>
                <Text className="text-base text-[#1e293b] font-mulish_bold">
                  {order_detail_data.payment.transaction_id}
                </Text>
              </View>

              <View className="border-t border-gray-100 pt-4 mt-2">
                <Text className="text-lg text-[#1e293b] font-mulish_bold mb-3">
                  Order Summary
                </Text>

                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-base text-gray-600 font-mulish_medium">
                    Subtotal
                  </Text>
                  <Text className="text-base text-[#1e293b] font-mulish_semibold">
                    ${order_detail_data.summary.subtotal}
                  </Text>
                </View>

                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-base text-gray-600 font-mulish_medium">
                    Discount
                  </Text>
                  <Text className="text-base text-green-600 font-mulish_semibold">
                    -${order_detail_data.summary.discount}
                  </Text>
                </View>

                <View className="flex-row justify-between items-center mb-2">
                  <Text className="text-base text-gray-600 font-mulish_medium">
                    Shipping Fee
                  </Text>
                  <Text className="text-base text-[#1e293b] font-mulish_semibold">
                    ${order_detail_data.summary.shipping_fee}
                  </Text>
                </View>

                <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-base text-gray-600 font-mulish_medium">
                    Tax
                  </Text>
                  <Text className="text-base text-[#1e293b] font-mulish_semibold">
                    ${order_detail_data.summary.tax}
                  </Text>
                </View>

                <View className="border-t border-gray-200 pt-3 mt-1">
                  <View className="flex-row justify-between items-center">
                    <Text className="text-lg text-[#1e293b] font-mulish_bold">
                      Total
                    </Text>
                    <Text className="text-xl text-[#1e293b] font-mulish_bold">
                      ${order_detail_data.summary.total}
                    </Text>
                  </View>

                  <View className="mt-3 bg-gray-50 px-4 py-2 rounded-lg">
                    <View className="flex-row justify-between items-center">
                      <Text className="text-base text-gray-600 font-mulish_medium">
                        Payment Status
                      </Text>
                      <View className="px-3 py-1 bg-green-100 rounded-full">
                        <Text className="text-sm text-green-700 font-mulish_bold">
                          {order_detail_data.summary.payment_status}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetail;

const steps = [
  {label: 'Order Placed', icon: 'clipboard-text-outline', date: '20-Dec-2019'},
  {label: 'Processing', icon: 'progress-clock', date: '21-Dec-2019'},
  {label: 'Shipped', icon: 'truck-outline', date: '22-Dec-2019'},
  {label: 'Out for Delivery', icon: 'bike-fast', date: '23-Dec-2019'},
  {label: 'Delivered', icon: 'check-circle-outline', date: '24-Dec-2019'},
];

const OrderTracker = ({item}) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (item?.product_status) {
      switch (item.product_status) {
        case 'Order Placed':
          setCurrentStep(0);
          break;
        case 'Processing':
          setCurrentStep(1);
          break;
        case 'Shipped':
          setCurrentStep(2);
          break;
        case 'Out for Delivery':
          setCurrentStep(3);
          break;
        case 'Delivered':
          setCurrentStep(4);
          break;
        case 'cancelled':
          setCurrentStep(-1);
          break;
        default:
          setCurrentStep(0);
      }
    }
  }, [item?.status]);

  return (
    <View className="bg-gray-50 px-4 py-6">
      <Text className="text-lg text-[#1e293b] font-mulish_bold mb-6 px-2">
        Tracking Status
      </Text>
      {steps.map((step, index) => {
        const isActive = index <= currentStep;
        const isCurrentStep = index === currentStep;

        return (
          <View key={index}>
            <View className="flex-row items-center">
              <View
                className={`h-20 w-20 justify-center items-center rounded-full ${
                  isActive
                    ? isCurrentStep
                      ? 'bg-[#1e293b]'
                      : 'bg-green-500'
                    : 'bg-gray-200'
                } shadow-sm`}>
                <MaterialCommunityIcons
                  name={step.icon}
                  color={isActive ? 'white' : '#888888'}
                  size={responsiveFontSize(3.8)}
                />
              </View>

              <View
                style={{left: responsiveWidth(5), width: responsiveWidth(60)}}>
                <Text
                  className={`text-lg mb-1 font-mulish_bold ${
                    isActive
                      ? isCurrentStep
                        ? 'text-[#1e293b]'
                        : 'text-green-600'
                      : 'text-gray-500'
                  }`}>
                  {step.label}
                </Text>
                <Text
                  className={`text-sm ${
                    isActive ? 'text-gray-700' : 'text-gray-400'
                  } font-mulish_medium`}>
                  {isActive ? 'Updated on ' : ''}
                  {step.date}
                </Text>
              </View>
            </View>

            {index < steps.length - 1 && (
              <View
                style={{left: responsiveWidth(8)}}
                className={`h-16 w-3 ${
                  index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`}></View>
            )}
          </View>
        );
      })}
    </View>
  );
};
