import {Pressable, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useEffect} from 'react';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const SignUp= ({navigation}) => {
  

  return (
    <SafeAreaView className="flex-1">
          <View className="flex-1 bg-[#0D1318]">
            <View className="px-3 flex-1" style={{marginTop: responsiveHeight(15)}}>
              <Text className="text-light text-4xl font-mulish_bold">Sign Up</Text>
    
              <View className="mt-10">
                <Text className="text-white text-base font-mulish_medium capitalize ">
                  Name
                </Text>
                <TextInput
                  className="mt-2 bg-[#1C242A] text-white text-lg font-mulish_medium px-4 py-3 rounded-xl border border-gray-800"
                  placeholder="Name"
                  placeholderTextColor="#A0A5A8"
                 
                />
              </View>
              <View className="mt-5">
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
                  Submit
                </Text>
              </Pressable>
            </View>
    
           
            <View className="flex-row justify-center items-center p-5 gap-1">
              <Text className="text-base text-light font-mulish_semibold">
                I have account?
              </Text>
              <Pressable onPress={()=>navigation.navigate('SignIn')}>
                <Text className="text-base underline text-main font-mulish_semibold">
                  Sign In
                </Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
  );
};

export default SignUp;
