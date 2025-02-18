import React from 'react';
import {View, Text} from 'react-native';

import {TYPO} from '../assets/typo';
import Entypo from 'react-native-vector-icons/Entypo';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

const CustomToast = {
  BasicToast: ({text1}) => (
    <View
      style={{backgroundColor: 'rgba(0, 0, 0, 0.7)', maxWidth: 250}}
      className="py-2 px-5 rounded-full items-center mb-20">
      {text1 && (
        <Text className="text-sm text-light font-mulish_medium text-center">
          {text1}
        </Text>
      )}
    </View>
  ),
  GreenToast: ({text1}) => (
    <View
      style={{ maxWidth: 300}}
      className="py-2 px-5 rounded-full bg-green-100 items-center mb-20">
      {text1 && (
        <Text className="text-sm capitalize  text-green-600 font-mulish_medium text-center">
          {text1}
        </Text>
      )}
    </View>
  ),


  
  ErrorToastIcon: ({text1}) => (
    <View
      style={{maxWidth: 250}}
      className="py-2 px-4 bg-red-100 rounded-md items-center mb-20">
      {text1 && (
        <View className='flex-row gap-2 ml-2 justify-between items-center'>
          <Entypo
            name={'circle-with-cross'}
            color="red"
            size={responsiveFontSize(2.7)}
          />
          <Text
            style={{lineHeight: 16}}
            className="text-sm text-red-600 capitalize font-mulish_medium text-left">
            {text1}
          </Text>
        </View>
      )}
    </View>
  ),
  ErrorToast: ({text1}) => (
    <View
      style={{maxWidth: 250}}
      className="py-2 px-4  bg-red-100 rounded-full items-center mb-20">
      {text1 && (
        <Text
        style={{lineHeight: 16}}
        className="text-sm text-red-600 font-mulish_medium text-center">
        {text1}
      </Text>
      )}
    </View>
  ),
  WarringToast: ({text1}) => (
    <View
      style={{maxWidth: 250}}
      className="py-2 px-4  bg-yellow-100 rounded-full items-center mb-20">
      {text1 && (
        <Text
        style={{lineHeight: 16}}
        className="text-sm text-yellow-600 font-mulish_medium text-center">
        {text1}
      </Text>
      )}
    </View>
  ),
};

export default CustomToast;
