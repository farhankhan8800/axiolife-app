import React, {useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  Text,
  ActivityIndicator,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import MakeRequest from '../../utils/axiosInstance';
import {LOGIN_API} from '../../service/API';
import Toast from 'react-native-toast-message';
import Svg, {Path, Circle, Rect} from 'react-native-svg';

const PhoneIllustration = () => (
  <Svg width="100%" height="200" viewBox="0 0 300 200" fill="none">
    <Rect x="50" y="20" width="200" height="160" rx="20" fill="#F0F0F0" />
    <Circle cx="150" cy="40" r="10" fill="#D1D1D1" />
    <Rect
      x="70"
      y="60"
      width="160"
      height="100"
      rx="10"
      fill="white"
      stroke="#E0E0E0"
      strokeWidth="2"
    />
    <Path
      d="M100 170 Q150 190, 200 170"
      stroke="#E0E0E0"
      strokeWidth="4"
      fill="none"
    />
    <Circle cx="150" cy="110" r="30" fill="#E0E0E0" />
  </Svg>
);

const SignIn = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isValidPhoneNumber = number => {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(number);
  };

  const verifyUser = async () => {
    Keyboard.dismiss();
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
        {phone: phoneNumber},
        {},
        'application/json',
      );

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
        data.response.userType === 'banned' ||
        data.response.userType === 'deleted'
      ) {
        Toast.show({
          type: 'ErrorToast',
          text1: data.message,
          position: 'bottom',
          visibilityTime: 5000,
        });
      }

      if (data.status === 1) {
        Toast.show({
          type: 'GreenToast',
          text1: `${data.message} ${data.response.otp}`,
          position: 'bottom',
          visibilityTime: 5000,
        });
        navigation.navigate('EnterOTP', {number: phoneNumber});
        setPhoneNumber('');
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      Toast.show({
        type: 'ErrorToast',
        text1: 'Something went wrong. Please try again.',
        position: 'bottom',
        visibilityTime: 5000,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1, backgroundColor: '#fdfafa'}}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView className="flex-1">
          <View className="flex-1 bg-[#fdfafa] relative">
            {/* Skip Button */}
            <Pressable
              className="absolute top-3 right-3 p-1 z-10"
              onPress={() => navigation.goBack()}>
              <Text className="text-base text-slate-900 font-mulish_semibold underline">
                Skip
              </Text>
            </Pressable>

            {/* Illustration Container */}
            <View
              className="items-center mb-6"
              style={{marginTop: responsiveHeight(5)}}>
              <PhoneIllustration />
            </View>

            {/* Content Container */}
            <View className="px-6">
              <Text className="text-slate-900 text-3xl font-mulish_bold mb-4">
                Enter Mobile Number
              </Text>

              <Text className="text-gray-600 font-mulish_medium mb-6">
                We'll send a verification code to your mobile number
              </Text>
              <View className="bg-white rounded-2xl shadow-md p-1 border border-gray-200 flex-row items-center h-14">
                <View className="bg-[#fdfdfd] px-4 h-full flex justify-center items-center rounded-l-xl">
                  <Text className="text-lg font-mulish_medium text-black">
                    +91
                  </Text>
                </View>
                <View className="h-6 w-[1px] bg-gray-300"></View>
                <View className="flex-1 h-full flex justify-center">
                  <TextInput
                    className="w-full bg-[#fdfdfd] text-black mb-1 text-lg font-mulish_medium px-4 rounded-r-xl"
                    placeholder="8899888800"
                    placeholderTextColor="#A0A0A0"
                    keyboardType="phone-pad"
                    maxLength={10}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    returnKeyType="done"
                    onSubmitEditing={verifyUser}
                  />
                </View>
              </View>
            </View>

            {/* Continue Button */}
            <View className="p-6 mt-6">
              <Pressable
                onPress={verifyUser}
                className="bg-black p-4 rounded-2xl shadow-lg flex items-center"
                style={{elevation: 5}}>
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
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
