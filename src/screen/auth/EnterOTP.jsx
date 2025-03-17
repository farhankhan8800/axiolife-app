import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {responsiveHeight} from 'react-native-responsive-dimensions';
import {OtpInput} from 'react-native-otp-entry';
import {TYPO} from '../../assets/typo';
import BackPressHandler from '../../components/BackPressHandler';
import Toast from 'react-native-toast-message';
import {LOGIN_API, VERIFY_AUTH_API} from '../../service/API';
import MakeRequest from '../../utils/axiosInstance';
import {useDispatch} from 'react-redux';
import {login} from '../../reduxstore/slice/auth_slice';

const EnterOTP = ({navigation, route}) => {
  const [otp, setOtp] = useState('');
  const {number} = route.params;

  const dispatch = useDispatch();

  const OTPFilled = otpText => {
    setOtp(otpText);
  };

  const submitotp = async () => {
    if (otp.length == 4) {
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
        console.log('data', data);
        if (data.status == 1) {
          const userData = {
            user: data.response.userinfo,
            token: data.token,
          };

          dispatch(login(userData));

          if (data.response.userinfo.name == null) {
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

      console.log('data=', data);

      if (data.status == 1) {
        Toast.show({
          type: 'GreenToast',
          text1: 'OTP Resend Success',
          position: 'bottom',
          visibilityTime: 5000,
        });
      }
    } catch (error) {
      console.log(error);
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
      <BackPressHandler />
      <View className="flex-1 bg-[#fdfafa]">
        <View className="px-3 flex-1" style={{marginTop: responsiveHeight(15)}}>
          <Text className="text-black text-4xl font-mulish_bold">
            Verification
          </Text>
          <Text className="text-black text-lg font-mulish_medium mt-8">
            Enter the 4 digits code that you recived on your mobile number +91
            ******{number.slice(-4)}
          </Text>
          <View className="mt-16 px-10">
            <OtpInput
              numberOfDigits={4}
              focusColor="black"
              autoFocus={false}
              hideStick={true}
              placeholder="000"
              blurOnFilled={true}
              disabled={false}
              type="numeric"
              secureTextEntry={false}
              focusStickBlinkingDuration={500}
              // onFocus={() => console.log('Focused')}
              // onBlur={() => console.log('Blurred')}
              onTextChange={text => console.log(text)}
              onFilled={text => OTPFilled(text)}
              textInputProps={{
                accessibilityLabel: 'One-Time Password',
              }}
              theme={{
                containerStyle: styles.container,
                pinCodeContainerStyle: styles.pinCodeContainer,
                pinCodeTextStyle: styles.pinCodeText,
                placeholderTextStyle: styles.placeholderText,
              }}
            />
          </View>
          <View className="flex-row justify-center items-center  gap-1 pt-10">
            <Text className="text-lg text-black font-mulish_semibold">
              Didn't recieve the OTP?
            </Text>
            <Pressable onPress={resend_otp}>
              <Text className="text-base underline text-slate-800 font-mulish_semibold">
                Resend OTP
              </Text>
            </Pressable>
          </View>
        </View>

        <View className="px-3 mb-10" style={{marginTop: responsiveHeight(10)}}>
          <Pressable
            onPress={submitotp}
            className="mt-6 bg-black py-3 rounded-xl border border-main  flex items-center">
            <Text className="text-white text-lg font-mulish_semibold">
              Submit
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EnterOTP;

const styles = StyleSheet.create({
  container: {},
  pinCodeContainer: {
    height: 50,
    width: 70,
    borderWidth: 1,
    borderColor: '#1C242A',
    borderRadius: 12,
    backgroundColor: '#fdfafa',
  },
  pinCodeText: {
    fontSize: 16,
    fontFamily: TYPO.fontfamily.mulish_medium,
    color: TYPO.colors.slate900,
  },
  placeholderText: {
    fontSize: 16,
    fontFamily: TYPO.fontfamily.mulish_medium,
    color: TYPO.colors.light_gray,
  },
  activePinCodeContainer: {
    borderColor: TYPO.colors.main,
  },
});
