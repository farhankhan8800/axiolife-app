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
} from 'react-native-responsive-dimensions';
import MakeRequest from '../../utils/axiosInstance';
import { ORDER_DETAILS_API } from '../../service/API';

const OrderDetail = ({navigation, route}) => {

const order_key = route.params

const [trackopen, setTrackopen] = useState(null);
const [itemList, setItemList] = useState([])
const [orderSummary, setOrderSummary] = useState({})

const getorderdetails = async () => {
  
  try {
    const data = await MakeRequest(
      ORDER_DETAILS_API,
      {
        order_number: order_key.order_number
      },
      {}, // Empty headers
      'application/json',
    );
   
    if (data.status == 1) {
      // console.log('order details', data.response);
      setItemList(data.response.items)
    }
  } catch (error) {
    console.error('Error fetching order details:', error);
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

const trackopenfunction = (id) => {
  setTrackopen(prev => (prev === id ? null : id));
};

console.log(itemList?.[0]);

  return (
    <SafeAreaView className="flex-1 bg-[#F6F6F6]">
      <SmallHeader name="Track Order" />
      <ScrollView className="flex-1">
        <View className="px-3 pt-5 pb-10">
          <View className="py-4 px-5 rounded-md border-[1px] border-gray-200">
            <Text className="text-base text-gray-800 font-mulish_semibold leading-tight">
              Order#: {order_detail_data.order_id}
            </Text>
          </View>
          <View>
            {itemList.map((item, i) => {
              return (
                <View
                  key={i}
                  className="py-4 px-5 rounded-md mt-5 border-[1px] border-gray-200">
                  <Pressable
                    onPress={() =>
                      navigation.navigate('ProductDetail', {slug: item.product_name})
                    }
                    className="mb-4  pb-6 border-b-[1px] border-gray-200">
                    <Text className="text-base text-gray-700 font-mulish_medium leading-tight">
                      Product: {item.product_name}
                    </Text>

                    <View className="flex-row justify-between items-start">
                      <View className="pr-2">
                        <Text className="text-base text-gray-600 font-mulish_regular">
                          Quantity: {item.quantity}
                        </Text>
                        
                        <Text className="text-base text-gray-600 font-mulish_regular">
                          Price: {item.price}
                        </Text>
                        <Text className="text-base text-gray-600 font-mulish_regular">
                          Status: {item.product_status}
                        </Text>
                      </View>
                      <View>
                        <Image
                          source={{uri: item.product_image}}
                          resizeMode="contin"
                          className="w-20 h-20"
                        />
                      </View>
                    </View>
                  </Pressable>
                  <View>
                    <View className="flex-row justify-between pb-6">
                      <Pressable className="px-3">
                        <Text className="text-base text-dark_blue font-mulish_medium">
                          Help?
                        </Text>
                      </Pressable>
                      <Pressable className="px-3">
                        <Text className="text-base text-dark_blue font-mulish_medium">
                          Invoice
                        </Text>
                      </Pressable>
                      <Pressable className="px-3">
                        <Text className="text-base text-red-500 font-mulish_medium">
                          
                        </Text>
                      </Pressable>
                    </View>

                    <View className="flex-row justify-between py-1">
                      <Text className="text-xl text-gray-700 font-mulish_semibold leading-6">
                        Track
                      </Text>
                      <Pressable
                        onPress={() =>
                          trackopenfunction(item.product_id)
                        }
                        className="px-8">
                        <Entypo
                          name={
                            item.product_id === trackopen
                              ? 'chevron-up'
                              : 'chevron-down'
                          }
                          color={TYPO.colors.dark}
                          size={responsiveFontSize(2.5)}
                        />
                      </Pressable>
                    </View>

                    <View>
                      {item.product_id === trackopen && (
                        <OrderTracker item={item} />
                      )}
                    </View>
                  </View>
                </View>
              );
            })}
          </View>


          <View className="py-4 px-5 mt-10 rounded-md border-[1px] border-gray-200">
            <Text className="text-xl text-gray-700 font-mulish_semibold leading-6 mb-1">Shipping Details </Text>
            <Text className="text-lg text-gray-600 font-mulish_regular">
             {order_detail_data.customer.name}
            </Text>
            <Text className="text-base text-gray-600 font-mulish_regular">
              {order_detail_data.customer.address.street}
            </Text>
            <Text className="text-base text-gray-600 font-mulish_regular">
              {order_detail_data.customer.address.landmark}
            </Text>
            <Text className="text-base text-gray-600 font-mulish_regular">
              {order_detail_data.customer.address.city}
            </Text>
            <Text className="text-base text-gray-600 font-mulish_regular">
              {order_detail_data.customer.address.state} - {order_detail_data.customer.address.pincode}
            </Text>
            <Text className="text-base text-gray-600 font-mulish_regular">
              {order_detail_data.customer.address.country}
            </Text>
            <Text className="text-base text-gray-600 font-mulish_regular">
             Phone number {order_detail_data.customer.phone} 
            </Text>

            
          </View>

          <View className="py-4 px-5 mt-10 rounded-md border-[1px] border-gray-200">
            <Text className="text-xl text-gray-700 font-mulish_semibold leading-6 mb-1">Pyment</Text>
            <Text className="text-base text-gray-600 font-mulish_regular">
              Method: {order_detail_data.payment.method}
            </Text>
            <Text className="text-base text-gray-600 font-mulish_regular">
              Transaction Id: {order_detail_data.payment.transaction_id}
            </Text>

            <View className="w-full border-b-[1px] border-gray-200 my-3"></View>
            <Text className="text-xl text-gray-700 font-mulish_semibold leading-6 mb-1">Summary</Text>
            <Text className="text-base text-gray-600 font-mulish_regular">
              Sbu Total: {order_detail_data.summary.subtotal}
            </Text>
            <Text className="text-base text-gray-600 font-mulish_regular">
              Discount: {order_detail_data.summary.discount}
            </Text>
            <Text className="text-base text-gray-600 font-mulish_regular">
              Shipping Fee: {order_detail_data.summary.shipping_fee}
            </Text>

            <Text className="text-base text-gray-600 font-mulish_regular">
              Tax: {order_detail_data.summary.tax}
            </Text>
            <Text className="text-base text-gray-600 font-mulish_regular">
              Total: {order_detail_data.summary.total}
            </Text>
            <Text className="text-base text-gray-600 font-mulish_regular">
              Payment status: {order_detail_data.summary.payment_status}
            </Text>
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
    <View className="my-5 pt-5 relative">
      {steps.map((step, index) => {
        return (
          <View key={index}>
            <View className="flex-row items-center">
              <View
                className={`h-16 w-16 justify-center items-center rounded-full ${
                  index <= currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`}>
                <MaterialCommunityIcons
                  name={step.icon}
                  color={index <= currentStep ? 'white' : 'black'}
                  size={responsiveFontSize(3)}
                />
              </View>

              <View
                style={{left: responsiveWidth(5), width: responsiveWidth(50)}}>
                <Text
                  className={`text-base mb-[1px] font-mulish_semibold ${
                    index <= currentStep ? 'text-green-500' : 'text-gray-500'
                  }`}>
                  {step.label}
                </Text>
                {/* <Text className="text-sm text-light_gray font-mulish_light">
                  We received your order on {step.date}
                </Text> */}
              </View>
            </View>

            {index < steps.length - 1 && (
              <View
                style={{left: responsiveWidth(6)}}
                className={`h-20 w-2  ${
                  index < currentStep ? 'bg-green-500' : 'bg-gray-200'
                }`}></View>
            )}
          </View>
        );
      })}
    </View>
  );
};
