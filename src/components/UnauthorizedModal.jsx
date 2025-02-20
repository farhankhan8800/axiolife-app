import {View, Text, Pressable} from 'react-native';
import React from 'react';

import Modal from 'react-native-modal';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';

import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../reduxstore/slice/auth_slice';
import Toast from 'react-native-toast-message';

const UnauthorizedModal = ({setUnauthorized, unauthorized}) => {
  const {user, token, isAuthenticated} = useSelector(state => state.auth);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const logoutuser = () => {
    setTimeout(() => {
      dispatch(logout());
      Toast.show({
        type: 'BasicToast',
        text1: 'Logged out successfully!',
        position: 'bottom',
        visibilityTime: 3000,
      });
      setUnauthorized(false);
      navigation.push('SignIn');
    }, 1000);
  };

  return (
    <>
      <Modal
        style={{margin: 0}}
        onBackButtonPress={() => setUnauthorized(false)}
        useNativeDriver
        hideModalContentWhileAnimating
        avoidKeyboard={true}
        isVisible={unauthorized}>
        <View className="flex-1 bg-[rgba(0,0,0,0.7)]">
          <View
            style={{
              width: responsiveWidth(100),
              left: responsiveWidth(0),
            }}
            className="absolute bottom-0 p-8 justify-center items-center bg-white rounded-t-3xl">
            <Text className="text-xl font-mulish_semibold text-center mb-2">
              Hi {user?.name || user?.number}, Your session has expired
            </Text>
            <Text className="text-base text-gray-500 font-mulish_medium text-center mb-6">
              Please login to continue using the app
            </Text>
            <View className="flex-row justify-center items-center gap-5 pt-4">
              <Pressable
                className="flex-row justify-center items-center px-8 py-2 rounded-md border-main border-[2px]"
                onPress={logoutuser}>
                <Text className="text-base text-main font-mulish_medium">
                  Log in
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default UnauthorizedModal;
