import {Pressable, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, { useState } from 'react';

import {responsiveHeight} from 'react-native-responsive-dimensions';
import {OtpInput} from 'react-native-otp-entry';
import { TYPO } from '../../assets/typo';
import BackPressHandler from '../../components/BackPressHandler';

const EnterOTP = ({navigation}) => {

  const mobile_number = '8768686864';
  const [otp, setOtp] = useState('');


  const OTPFilled = (otpText) => {
    // console.log(`OTP is ${otpText}`)
    setOtp(otpText)
  }

  const newuser = true



  const submitotp = ()=>{
    if(otp.length == 4 && newuser){
     console.log('new user')

      navigation.navigate('SignUp');
    } else if(otp.length == 4){
      console.log('old user user')
      navigation.navigate('Home');
    }else{
      console.log('add otp')
      
    }
  }



  return (
    <SafeAreaView className="flex-1">
      <BackPressHandler />
      <View className="flex-1 bg-[#0D1318]">
        <View className="px-3 flex-1" style={{marginTop: responsiveHeight(15)}}>
          <Text className="text-light text-4xl font-mulish_bold">
            Verification
          </Text>
          <Text className="text-white text-base font-mulish_medium mt-8">
            Enter the 4 digits code that you recived on your mobile number +91
            ******{mobile_number.slice(-4)}
          </Text>
          <View className="mt-16 px-10">
          
            <OtpInput
              numberOfDigits={4}
              focusColor="green"
              autoFocus={false}
              hideStick={true}
              placeholder="0000"
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
          <Pressable onPress={submitotp} className="mt-6 bg-main py-3 rounded-xl border border-main  flex items-center">
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


const styles = StyleSheet.create({
  container: {
   
  },
  pinCodeContainer: {
    height: 50,
    width: 70,
    borderWidth: 1,
    borderColor: '#1C242A',
    borderRadius: 12,
    backgroundColor:'#1C242A',
  },
  pinCodeText: {
    fontSize: 16,
    fontFamily:TYPO.fontfamily.mulish_medium,
    color: TYPO.colors.light,
  },
  placeholderText:{
    fontSize: 16,
    fontFamily:TYPO.fontfamily.mulish_medium,
    color: TYPO.colors.light_gray,
  },
  activePinCodeContainer:{
    borderColor:TYPO.colors.main
  }
})
