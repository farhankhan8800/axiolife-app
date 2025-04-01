import React, {useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
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
import {OtpInput} from 'react-native-otp-entry';
import Toast from 'react-native-toast-message';
import {useDispatch} from 'react-redux';

import BackPressHandler from '../../components/BackPressHandler';
import {LOGIN_API, VERIFY_AUTH_API} from '../../service/API';
import MakeRequest from '../../utils/axiosInstance';
import {login} from '../../reduxstore/slice/auth_slice';

const EnterOTP = ({navigation, route}) => {
  const [otp, setOtp] = useState('');
  const {number} = route.params;
  const dispatch = useDispatch();

  const OTPFilled = (otpText: string) => {
    setOtp(otpText);
  };

  const submitotp = async () => {
    if (otp.length === 4) {
      try {
        const data = await MakeRequest(
          VERIFY_AUTH_API,
          {
            phone: number,
            otp: otp,
          },
          {},
          'application/json',
        );

        if (data.status === 1) {
          const userData = {
            user: data.response.userinfo,
            token: data.token,
          };

          dispatch(login(userData));

          if (data.response.userinfo.name === null) {
            Toast.show({
              type: 'GreenToast',
              text1: 'Your account verified',
              position: 'bottom',
              visibilityTime: 5000,
            });
            navigation.navigate('SignUp');
          } else {
            Toast.show({
              type: 'GreenToast',
              text1: `Welcome back ${data.response.userinfo.name}`,
              position: 'bottom',
              visibilityTime: 5000,
            });
            navigation.navigate('Home');
          }
        }
      } catch (error) {
        Toast.show({
          type: 'ErrorToast',
          text1: error.response.data.message,
          position: 'bottom',
          visibilityTime: 5000,
        });
      }
    } else {
      Toast.show({
        type: 'ErrorToastIcon',
        text1: 'Please enter 4 digit OTP. We sent your Mobile',
        position: 'bottom',
        visibilityTime: 5000,
      });
    }
  };

  const resend_otp = async () => {
    try {
      const data = await MakeRequest(
        LOGIN_API,
        {
          phone: number,
        },
        {},
        'application/json',
      );

      if (data.status === 1) {
        Toast.show({
          type: 'GreenToast',
          text1: 'OTP Resend Success',
          position: 'bottom',
          visibilityTime: 5000,
        });
      }
    } catch (error) {
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
          <View className="flex-1 px-6 mt-20">
            <View className="mb-8">
              <Text className="text-4xl font-mulish_bold text-gray-900 tracking-tight">
                Verification Code
              </Text>
              <Text className="text-xl text-gray-600 font-mulish_medium mt-4">
                Enter the 4-digit verification code sent to
                <Text className="font-mulish_bold">
                  {' '}
                  +91 ******{number.slice(-4)}
                </Text>
              </Text>
            </View>

            <View className="items-center mt-12">
              <OtpInput
                numberOfDigits={4}
                focusColor="#1C242A"
                autoFocus={false}
                hideStick={true}
                placeholder="•"
                blurOnFilled={true}
                onFilled={OTPFilled}
                theme={{
                  containerStyle: styles.container,
                  pinCodeContainerStyle: styles.pinCodeContainer,
                  pinCodeTextStyle: styles.pinCodeText,
                  placeholderTextStyle: styles.placeholderText,
                }}
              />
            </View>

            <View className="flex-row justify-center items-center mt-12 space-x-2">
              <Text className="text-lg text-gray-700 font-mulish_medium">
                Didn't receive the code?
              </Text>
              <Pressable onPress={resend_otp}>
                <Text className="text-lg font-mulish_bold text-gray-900 underline">
                  Resend
                </Text>
              </Pressable>
            </View>

            <View className="flex-1 justify-end pb-8">
              <Pressable
                onPress={submitotp}
                className="bg-gray-900 py-4 rounded-2xl shadow-lg">
                <Text className="text-center text-white text-lg font-mulish_bold">
                  Verify
                </Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
  },
  pinCodeContainer: {
    width: 70,
    height: 70,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginHorizontal: 10,
    borderRadius: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pinCodeText: {
    fontSize: 24,
    fontFamily: 'Mulish-Bold',
    color: '#1C242A',
  },
  placeholderText: {
    fontSize: 24,
    fontFamily: 'Mulish-Medium',
    color: '#A0A0A0',
  },
});

export default EnterOTP;
