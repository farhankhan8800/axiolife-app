import {Pressable, SafeAreaView, Text, TextInput, View} from 'react-native';
import React from 'react';
import {ScreenProps} from '../../navigation/types';
import {responsiveHeight} from 'react-native-responsive-dimensions';

const SignIn: React.FC<ScreenProps<'SignIn'>> = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-[#0D1318]">
        <View className="px-3 flex-1" style={{marginTop: responsiveHeight(15)}}>
          <Text className="text-light text-4xl font-mulish_bold">Sign In</Text>

          <View className="mt-10">
            <Text className="text-white text-base font-mulish_medium capitalize ">
              Mobile Number
            </Text>
            <TextInput
              className="mt-2 bg-[#1C242A] text-white text-lg font-mulish_medium px-4 py-3 rounded-xl border border-gray-800"
              placeholder="+91 8899888800"
              placeholderTextColor="#A0A5A8"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        <View className="px-3 mb-10" style={{marginTop: responsiveHeight(10)}}>
          <Pressable className="mt-6 bg-main py-3 rounded-xl border border-main  flex items-center">
            <Text className="text-white text-lg font-mulish_semibold">
              Sign In
            </Text>
          </Pressable>
        </View>

        <View className="flex-row justify-center items-center p-5 gap-1">
          <Text className="text-base text-light font-mulish_semibold">
            Don't have an account?
          </Text>
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <Text className="text-base underline text-main font-mulish_semibold">
              Sign Up
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

// https://dribbble.com/shots/22809076-Mobile-App-Login-Screen-Dark-Theme
