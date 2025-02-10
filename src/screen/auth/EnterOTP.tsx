import {Pressable, SafeAreaView, Text, TextInput, View} from 'react-native';
import React from 'react';
import {ScreenProps} from '../../navigation/types';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import { OtpInput } from "react-native-otp-entry";


const EnterOTP: React.FC<ScreenProps<'EnterOTP'>> = ({navigation}) => {
  const mobile_number = '8768686864';

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-[#0D1318]">
        <View className="px-3 flex-1" style={{marginTop: responsiveHeight(15)}}>
          <Text className="text-light text-4xl font-mulish_bold">
            Verification
          </Text>
          <Text className="text-white text-base font-mulish_medium mt-8">
            Enter the 4 digits code that you recived on your mobile number +91
            ******{mobile_number.slice(-4)}
          </Text>
          <View className="mt-16">
            {/* <TextInput
              className="mt-2 bg-[#1C242A] text-white text-lg font-mulish_medium px-4 py-3 rounded-xl border border-gray-800"
              placeholder="+91 8899888800"
              placeholderTextColor="#A0A5A8"
              keyboardType="phone-pad"
            /> */}

<OtpInput
  numberOfDigits={4}
  focusColor="green"
  autoFocus={false}
  hideStick={true}
  placeholder="******"
  blurOnFilled={true}
  disabled={false}
  type="numeric"
  secureTextEntry={false}
  focusStickBlinkingDuration={500}
  onFocus={() => console.log("Focused")}
  onBlur={() => console.log("Blurred")}
  onTextChange={(text) => console.log(text)}
  onFilled={(text) => console.log(`OTP is ${text}`)}
  textInputProps={{
    accessibilityLabel: "One-Time Password",
  }}
//   theme={{
//     containerStyle: styles.container,
//     pinCodeContainerStyle: styles.pinCodeContainer,
//     pinCodeTextStyle: styles.pinCodeText,
//     focusStickStyle: styles.focusStick,
//     focusedPinCodeContainerStyle: styles.activePinCodeContainer,
//     placeholderTextStyle: styles.placeholderText,
//     filledPinCodeContainerStyle: styles.filledPinCodeContainer,
//     disabledPinCodeContainerStyle: styles.disabledPinCodeContainer,
//   }}
/>
          </View>
          <View className="flex-row justify-center items-center  gap-1 pt-10">
            <Text className="text-base text-light font-mulish_semibold">
              Didn't recive the OTP?
            </Text>
            <Pressable onPress={() => navigation.navigate('SignUp')}>
              <Text className="text-base underline text-main font-mulish_semibold">
                Reseand OTP
              </Text>
            </Pressable>
          </View>
        </View>

        <View className="px-3 mb-10" style={{marginTop: responsiveHeight(10)}}>
          <Pressable className="mt-6 bg-main py-3 rounded-xl border border-main  flex items-center">
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

// https://dribbble.com/shots/22809076-Mobile-App-Login-Screen-Dark-Theme
