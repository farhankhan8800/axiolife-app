import React, {useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
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
import {UPDATE_PROFILE_API} from '../../service/API';

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
      const data = await MakeRequest(
        UPDATE_PROFILE_API,
        {
          name: username,
        },
        {},
        'application/json',
      );

      if (data.status == 1) {
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
        navigation.navigate('Home');
      }
    } catch (error) {
      Toast.show({
        type: 'ErrorToast',
        text1: error.response.data.message,
        position: 'bottom',
        visibilityTime: 5000,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-[#fdfafa]">
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <SafeAreaView className="flex-1">
          <View className="px-5 mt-12 flex-1 justify-between">
            {/* Top Content */}
            <View>
              <Text className="text-slate-900 text-4xl font-mulish_bold mt-10">
                Your name
              </Text>

              <View className="mt-8">
                <TextInput
                  className="bg-white text-slate-900 text-lg font-mulish_medium px-4 py-4 rounded-2xl shadow-md elevation-2"
                  placeholder="Enter your name"
                  placeholderTextColor="#64748b"
                  value={username}
                  onChangeText={setUsername}
                  style={{
                    shadowColor: '#000',
                    shadowOffset: {width: 0, height: 2},
                    shadowOpacity: 0.1,
                    shadowRadius: 4,
                  }}
                />
              </View>

              <View className="mt-8 flex-row items-center px-1">
                <View style={{width: responsiveWidth(9)}}>
                  <Pressable onPress={() => setUser_agreement(!user_agreement)}>
                    {user_agreement ? (
                      <Fontisto
                        name="checkbox-active"
                        color={TYPO.colors.slate900}
                        size={responsiveFontSize(2.5)}
                      />
                    ) : (
                      <Fontisto
                        name="checkbox-passive"
                        color={TYPO.colors.light_gray}
                        size={responsiveFontSize(2.5)}
                      />
                    )}
                  </Pressable>
                </View>

                <Text
                  style={{width: '85%', marginLeft: 10}}
                  className="text-sm text-slate-900 font-mulish_medium">
                  I have read and agree to your{' '}
                  <Text
                    onPress={() => navigation.navigate('PrivacyTc')}
                    className="text-slate-800 underline">
                    Terms and Conditions
                  </Text>{' '}
                  and{' '}
                  <Text
                    className="text-slate-800 underline"
                    onPress={() => navigation.navigate('PrivacyTc')}>
                    Privacy Policy
                  </Text>
                </Text>
              </View>
            </View>

            {/* Submit Button */}
            <View className="mb-6">
              <Pressable
                onPress={submitname}
                className="bg-black py-4 rounded-2xl shadow-lg elevation-4 transform active:scale-[0.98] transition-transform duration-100">
                <Text className="text-white text-lg font-mulish_semibold text-center">
                  Done
                </Text>
              </Pressable>
            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
