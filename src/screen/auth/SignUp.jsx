import {Pressable, SafeAreaView, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {TYPO} from '../../assets/typo';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';

import MakeRequest from '../../utils/axiosInstance';
import {login} from '../../reduxstore/slice/auth_slice';
import { UPDATE_PROFILE_API } from '../../service/API';

const SignUp = ({navigation}) => {
  const [user_agreement, setUser_agreement] = useState(false);
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();

  const submitname = async () => {
    if (!username.trim()) {
      Toast.show({
        type: 'ErrorToast',
        text1: 'Please enter your name',
        position: 'bottom',
        visibilityTime: 5000,
      });
      return;
    }

    if (!user_agreement) {
      Toast.show({
        type: 'ErrorToast',
        text1: 'You must agree to the Terms and Conditions',
        position: 'bottom',
        visibilityTime: 5000,
      });
      return;
    }

    try {
      const {data} = await MakeRequest(
        UPDATE_PROFILE_API,
        {
          name: username,
        },
        {},
        'application/json',
      );

      if (data.status == 1) {

        console.log(data)
        const userData = {
          user: data.response.userinfo,
          token: data.token,
        };

        dispatch(login(userData));

        Toast.show({
          type: 'GreenToast',
          text1: data.message,
          position: 'bottom',
          visibilityTime: 5000,
        });
        // navigation.navigate('Home');
      }
    } catch (error) {
      console.log(error)
      Toast.show({
        type: 'ErrorToast',
        text1: error.response.data.message,
        position: 'bottom',
        visibilityTime: 5000,
      });
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 bg-[#0D1318]">
        <View className="px-3 flex-1" style={{marginTop: responsiveHeight(15)}}>
          <Text className="text-light text-4xl font-mulish_bold">
            Your name
          </Text>

          <View className="mt-10">
            <TextInput
              className="mt-2 bg-[#1C242A] text-white text-lg font-mulish_medium px-4 py-3 rounded-xl border border-gray-800"
              placeholder="Name"
              placeholderTextColor="#A0A5A8"
              value={username}
              onChangeText={setUsername}
            />
          </View>

          <View className="mt-10 flex-row items-center px-3 w-full">
            <View style={{width: responsiveWidth(9)}}>
              <Pressable onPress={() => setUser_agreement(!user_agreement)}>
                {user_agreement ? (
                  <Fontisto
                    name="checkbox-active"
                    color={TYPO.colors.main}
                    size={responsiveFontSize(2)}
                  />
                ) : (
                  <Fontisto
                    name="checkbox-passive"
                    color={TYPO.colors.light_gray}
                    size={responsiveFontSize(2)}
                  />
                )}
              </Pressable>
            </View>

            <Text
              style={{width: '80%'}}
              className="text-sm text-white font-mulish_medium ">
              I have read and agree to your{' '}
              <Text
                onPress={() => navigation.navigate('PrivacyTc')}
                className="text-blue-500 underline">
                Terms and Conditions
              </Text>{' '}
              and{' '}
              <Text
                className="text-blue-500 underline"
                onPress={() => navigation.navigate('PrivacyTc')}>
                Privacy Policy
              </Text>
            </Text>
          </View>
        </View>

        <View className="p-3 ">
          <Pressable
            onPress={submitname}
            className="mt-6 bg-main py-3 rounded-xl border border-main  flex items-center">
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
