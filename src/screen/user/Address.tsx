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

import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {ScreenProps} from '../../navigation/types';

import SmallHeader from '../../components/SmallHeader';
import {user_address} from '../../utils/data_';
import { TYPO } from '../../assets/typo';
const UserAddress: React.FC<ScreenProps<'Address'>> = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1 bg-[#F6F6F6]">
      <SmallHeader name="Your Address" />
      <ScrollView className="flex-1">
        <View className="px-3 pt-7">
          {user_address.map((item,i) => {
            return (
              <View style={{borderColor:item.isDefault ? TYPO.colors.light_gray: 'transparent'}} className='p-5 rounded-lg border-[1px]  bg-light mb-5'>
                <View >
                  <Text className='text-xl font-mulish_semibold'>{item.type}</Text>
                </View>
                <View>
                  <Text>123 Main St</Text>
                  <Text>Apt 4B, New York</Text>
                  <Text>USA</Text>
                  <Text>10001</Text>
                </View>
              </View>
            );
          })}
          <View></View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserAddress;
