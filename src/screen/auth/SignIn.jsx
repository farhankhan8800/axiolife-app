import {
  Pressable,
  SafeAreaView,
  Text,
  ActivityIndicator,
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
  const [isLoading, setIsLoading] = useState(false);

  const isValidPhoneNumber = number => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(number);
  };

  const verifyUser = async () => {
    setIsLoading(true);
    if (!isValidPhoneNumber(phoneNumber)) {
      Toast.show({
        type: 'ErrorToastIcon',
        text1: 'Please enter a valid 10-digit mobile number.',
        position: 'bottom',
        visibilityTime: 5000,
      });
      setIsLoading(false);
      return;
    }

    try {
      const data = await MakeRequest(
        LOGIN_API,
        {
          phone: phoneNumber,
        },
        {},
        'application/json',
      );

      // console.log('Response data:', data);
      if (data.error === 'TOO_MANY_REQUESTS') {
        Toast.show({
          type: 'ErrorToast',
          text1: data.message,
          position: 'bottom',
          visibilityTime: 5000,
        });
        setIsLoading(false);
        return;
      }
      if (
        data.response.userType == 'banned' ||
        data.response.userType == 'deleted'
      ) {
        Toast.show({
          type: 'ErrorToast',
          text1: data.message,
          position: 'bottom',
          visibilityTime: 5000,
        });
      }

      if (data.status == 1) {
        Toast.show({
          type: 'GreenToast',
          text1: data.message + data.response.otp,
          position: 'bottom',
          visibilityTime: 5000,
        });
        navigation.navigate('EnterOTP', {number: phoneNumber});
        setPhoneNumber('');
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      // console.error('Verification failed:', error);
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
      <View className="flex-1 bg-[#fdfafa] relative">
        <Pressable
          className="absolute top-3 right-3 p-1"
          onPress={() => navigation.goBack()}>
          <Text className="text-base text-slate-900 font-mulish_semibold underline">
            Skip
          </Text>
        </Pressable>

        <View className="px-3 flex-1" style={{marginTop: responsiveHeight(15)}}>
          <Text className="text-slate-900 text-4xl font-mulish_bold">
            Mobile Number
          </Text>

          <View className="mt-10">
            <TextInput
              className="mt-2 bg-[#e4e8ea] text-black text-lg font-mulish_medium px-4 py-3 rounded-xl border border-gray-800"
              placeholder="+91 8899888800"
              placeholderTextColor="#000"
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
            className="bg-black p-3 rounded-xl border border-white flex items-center">
            {isLoading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-white text-lg font-mulish_semibold">
                Continue
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
