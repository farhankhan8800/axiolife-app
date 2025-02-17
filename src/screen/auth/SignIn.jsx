import { Pressable, SafeAreaView, Text, TextInput, View, Alert } from 'react-native';
import React, { useState } from 'react';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import MakeRequest from '../../utils/axiosInstance';
import { LOGIN_API } from '../../service/API';


const SignIn = ({ navigation }) => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const isValidPhoneNumber = (number) => {
    const phoneRegex = /^[6-9]\d{9}$/; 
    return phoneRegex.test(number);
  };

  const verifyUser = async () => {
    if (!isValidPhoneNumber(phoneNumber)) {
      Alert.alert('Invalid Number', 'Please enter a valid 10-digit mobile number.');
      return;
    }

    try {

      const {data} = await MakeRequest(LOGIN_API, { 'phone': phoneNumber});

      console.log('data ', data)

    } catch (error) {
      console.error('Verification failed:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-[#0D1318] relative">
        <Pressable
          className="absolute top-3 right-3 p-1"
          onPress={() => navigation.navigate('Home')}>
          <Text className="text-base text-white font-mulish_semibold underline">
            Skip
          </Text>
        </Pressable>

        <View className="px-3 flex-1" style={{ marginTop: responsiveHeight(15) }}>
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
