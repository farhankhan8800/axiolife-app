import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {LogOut} from 'react-native-feather';
import Modal from 'react-native-modal';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {CommonActions, useNavigation} from '@react-navigation/native';

import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../reduxstore/slice/auth_slice';
import Toast from 'react-native-toast-message';

const LogoutScreen = ({setModalVisible}) => {
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);
  const {user, token, isAuthenticated} = useSelector(state => state.auth);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const logoutuser = () => {
    setIsLogoutVisible(false);
    setModalVisible(false);

    dispatch(logout());

    setTimeout(() => {
      // Toast.show({
      //   type: 'BasicToast',
      //   text1: 'Logged out successfully!',
      //   position: 'bottom',
      //   visibilityTime: 3000,
      // });

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Home'}],
        }),
      );
    }, 500);
  };

  return (
    <>
      <Pressable
        className=" px-4 flex-row justify-center gap-2  items-center"
        onPress={() => setIsLogoutVisible(true)}>
        <LogOut width={responsiveWidth(6)} color="#fff" />
        <Text className="text-base text-white uppercase font-mulish_bold">
          Logout
        </Text>
      </Pressable>
      <Modal
        style={{margin: 0}}
        avoidKeyboard={true}
        // onBackButtonPress={() => setIsLogoutVisible(false)}

        isVisible={isLogoutVisible}>
        <View className="flex-1 bg-[rgba(0,0,0,0.7)] p-3">
          <View
            style={{
              width: responsiveWidth(88),
              left: responsiveWidth(6),
            }}
            className="absolute top-[38%] p-8 justify-center items-center bg-white rounded-3xl">
            <Text className="text-2xl font-mulish_semibold text-center mb-6">
              Hi {user?.name || user.number}, Are you sure {'\n'} you want to
              log out?
            </Text>
            <View className="flex-row justify-around items-center gap-5 pt-4">
              <Pressable
                className="flex-row justify-center items-center px-6 py-2 rounded-md border-main border-[2px]"
                onPress={logoutuser}>
                <Text className="text-base text-main font-mulish_medium">
                  Log me out
                </Text>
              </Pressable>
              <Pressable
                className="flex-row justify-center bg-main items-center px-6 py-2 rounded-md border-main border-[2px]"
                onPress={() => setIsLogoutVisible(false)}>
                <Text className="text-base text-light font-mulish_medium">
                  Stay logged in
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default LogoutScreen;
