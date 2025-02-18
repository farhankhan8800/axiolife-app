import {
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import MakeRequest from '../../utils/axiosInstance';
import {LOGIN_API} from '../../service/API';
import Toast from 'react-native-toast-message';

const SignIn = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const isValidPhoneNumber = number => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(number);
  };

  const verifyUser = async () => {
    if (!isValidPhoneNumber(phoneNumber)) {
        Toast.show({
              type: 'ErrorToastIcon',
              text1: 'Please enter a valid 10-digit mobile number.',
              position: 'bottom',
              visibilityTime: 5000,
            });
      return;
    }

    try {
      
      const {data} = await MakeRequest(
        LOGIN_API,
        {
          phone: phoneNumber
        },
        {},
        'application/json',
      );

      console.log('Response data:', data);
      if(data.response.userType=='banned' || data.response.userType=='deleted'){
        Toast.show({
          type: 'ErrorToast',
          text1: data.message,
          position: 'bottom',
          visibilityTime: 5000,
        });
      }

      if(data.status == 1){
        Toast.show({
          type: 'GreenToast',
          text1: data.message,
          position: 'bottom',
          visibilityTime: 5000,
        });
        navigation.navigate('EnterOTP',{number:phoneNumber});
        setPhoneNumber('')
      }

    } catch (error) {
      console.error('Verification failed:', error);
      Toast.show({
        type: 'ErrorToast',
        text1: 'Something went wrong. Please try again.',
        position: 'bottom',
        visibilityTime: 5000,
      });
   
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-[#0D1318] relative">
        <Pressable
          className="absolute top-3 right-3 p-1"
          onPress={() => navigation.goBack()}>
          <Text className="text-base text-white font-mulish_semibold underline">
            Skip
          </Text>
        </Pressable>

        <View className="px-3 flex-1" style={{marginTop: responsiveHeight(15)}}>
          <Text className="text-light text-4xl font-mulish_bold">
            Mobile Number
          </Text>

          <View className="mt-10">
            <TextInput
              className="mt-2 bg-[#1C242A] text-white text-lg font-mulish_medium px-4 py-3 rounded-xl border border-gray-800"
              placeholder="+91 8899888800"
              placeholderTextColor="#A0A5A8"
              keyboardType="phone-pad"
              maxLength={10}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>
        </View>

        <View className="p-3">
          <Pressable
            onPress={verifyUser}
            className="bg-main p-3 rounded-xl border border-main flex items-center">
            <Text className="text-white text-lg font-mulish_semibold">
              Continue
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
