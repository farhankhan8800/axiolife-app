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
import React, {useState} from 'react';

import {order_list} from '../../utils/data_';

import SmallHeader from '../../components/SmallHeader';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {TYPO} from '../../assets/typo';

const UserOrder = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1 bg-[#F6F6F6]">
      <SmallHeader name="My Orders" />
      <ScrollView className="flex-1">
        <View className="px-3 pt-5">
          {order_list.map((item, i) => {
            return (
              <Pressable
                onPress={()=>navigation.navigate('OrderDetail',{order_id: item.order_id})}
                key={i}
                className="py-5 px-7 border-2 border-gray-200 rounded-3xl mb-4">
                <View className="flex-row justify-between items-start pb-3">
                  <View>
                    <Text className="text-lg text-dark_blue font-mulish_bold pb-1">
                      Order#: {item.order_id}
                    </Text>
                    <Text className="text-base text-light_gray font-mulish_medium">
                      {item.order_date}
                    </Text>
                  </View>
                  <Image
                    source={{uri: item.itemimage}}
                    resizeMode="contain"
                    width={responsiveWidth(15)}
                    height={responsiveWidth(12)}
                  />
                </View>
                <View className="flex-row justify-between items-center mt-2">
                  <Text
                    style={{
                      color:
                        item.status == 'Delivered'
                          ? 'orange'
                          : item.status == 'In Progress'
                          ? 'green'
                          : TYPO.colors.light_gray,
                      width: responsiveWidth(55),
                    }}
                    className={`text-sm font-mulish_medium`}
                    numberOfLines={1}>
                    {item.order_status}
                  </Text>

                  <Text className="text-lg text-dark font-mulish_semibold">
                    {'\u20B9'} {item.total_amount}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserOrder;
