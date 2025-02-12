import {
    FlatList,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    View,
    ActivityIndicator,
  } from 'react-native';
  import React, { useState, useEffect, useRef } from 'react';
  import { Search } from 'react-native-feather';
  import SmallHeader from '../../components/SmallHeader';
import { order_detail_data } from '../../utils/data_';
  

  
  const OrderDetail = ({navigation, route}) => {

    const order_id = route.params.order_id;

  
  
  
  
    return (
      <SafeAreaView className="flex-1 bg-[#F6F6F6]">
        <SmallHeader name="Track Order" />
        <ScrollView className="flex-1">
            <View className='px-3 pt-5 pb-10'>
                <View>
                    <Text>Order#: {order_detail_data.order_id}</Text>
                    <View>
                        <View>
                            
                        </View>
                    </View>
                </View>

            </View>
         
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default OrderDetail;
  