import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {responsiveHeight} from 'react-native-responsive-dimensions';

const SignUp = ({navigation}) => {


  const submitname = () => {
    navigation.navigate('Home');
  }


  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-[#0D1318]">
        <View className="px-3 flex-1" style={{marginTop: responsiveHeight(15)}}>
          <Text className="text-light text-4xl font-mulish_bold">
            Your name
          </Text>

          <View className="mt-10">
            {/* <Text className="text-white text-base font-mulish_medium capitalize ">
              Name
            </Text> */}
            <TextInput
              className="mt-2 bg-[#1C242A] text-white text-lg font-mulish_medium px-4 py-3 rounded-xl border border-gray-800"
              placeholder="Name"
              placeholderTextColor="#A0A5A8"
            />
          </View>
        </View>

        <View className="p-3 " >
          <Pressable onPress={submitname} className="mt-6 bg-main py-3 rounded-xl border border-main  flex items-center">
            <Text className="text-white text-lg font-mulish_semibold">
              Done
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
