import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {AlignLeft, ChevronLeft, LogOut, Menu, X} from 'react-native-feather';
import {TYPO} from '../assets/typo';
import Modal from 'react-native-modal';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {getFirstLetter, getRandomColor} from '../utils/utils';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../reduxstore/slice/auth_slice';
import Toast from 'react-native-toast-message';
import LogoutScreen from './LogoutScreen';

const Deawer = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const {user, token, isAuthenticated} = useSelector(state => state.auth);
  const navigation = useNavigation();

  return (
    <>
      <Pressable className="" onPress={() => setModalVisible(true)}>
        <AlignLeft color={TYPO.colors.dark_blue} />
      </Pressable>
      <Modal
        style={{margin: 0}}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        avoidKeyboard={true}
        isVisible={isModalVisible}>
        <View className="bg-[#040303] flex-1 max-w-[88%] px-2 py-4 pt-10">
          <View className="justify-between flex-row px-1">
            <View className=" flex-row justify-start items-center gap-6">
              <View
                style={{backgroundColor: getRandomColor(9)}}
                className="h-14 w-14 rounded-full justify-center items-center">
                <Text className="text-light text-3xl font-mulish_bold">
                  {isAuthenticated ? (
                    <>{getFirstLetter(user.name || user.phone)}</>
                  ) : (
                    'G'
                  )}
                </Text>
              </View>
              <View>
                <Text className="text-xl text-light font-bold mb-2">
                  Welcome {isAuthenticated ? user?.name || user.phone : 'Guest'}
                </Text>
                <Pressable
                  onPress={() => {
                    !isAuthenticated
                      ? navigation.navigate('SignIn')
                      : navigation.navigate('Profile');
                  }}
                  className="py-2 px-4 rounded-xl bg-gray-200">
                  <Text className="text-[14px] text-gray-600 text-center uppercase font-mulish_bold">
                    {isAuthenticated ? user.phone : 'Login/Sign UP'}
                  </Text>
                </Pressable>
              </View>
            </View>
            <Pressable className="p-1" onPress={() => setModalVisible(false)}>
              <ChevronLeft
                width={responsiveWidth(8)}
                color={TYPO.colors.light}
              />
            </Pressable>
          </View>
          <View className="px-1 mt-8 border-t-[1px] pt-7 border-gray-600 flex-1">
            <Pressable
              className="py-1 mb-1"
              onPress={() => navigation.navigate('AllStore')}>
              <Text className="text-light text-lg font-mulish_medium capitalize">
                All Store
              </Text>
            </Pressable>
            <Pressable
              className="py-1 mb-1"
              onPress={() => navigation.navigate('AllCategory')}>
              <Text className="text-light text-lg font-mulish_medium capitalize">
                All Category
              </Text>
            </Pressable>

            <View>
              <Pressable
                className="py-1 mb-1"
                onPress={() => navigation.navigate('Profile')}>
                <Text className="text-light text-lg font-mulish_medium capitalize">
                  Profile
                </Text>
              </Pressable>
              <Pressable
                className="py-1 mb-1"
                onPress={() => navigation.navigate('Notification')}>
                <Text className="text-light text-lg font-mulish_medium capitalize">
                  Notification
                </Text>
              </Pressable>
              <Pressable
                className="py-1 mb-1"
                onPress={() => navigation.navigate('Cart')}>
                <Text className="text-light text-lg font-mulish_medium capitalize">
                  Cart
                </Text>
              </Pressable>
              <Pressable
                className="py-1 mb-1"
                onPress={() => navigation.navigate('HelpDesk')}>
                <Text className="text-light text-lg font-mulish_medium capitalize">
                  Help Desk
                </Text>
              </Pressable>
              <Pressable
                className="py-1 mb-1"
                onPress={() => navigation.navigate('ContactUs')}>
                <Text className="text-light text-lg font-mulish_medium capitalize">
                  Contact Us
                </Text>
              </Pressable>
              <Pressable
                className="py-1 mb-1"
                onPress={() => navigation.navigate('PrivacyTc')}>
                <Text className="text-light text-lg font-mulish_medium capitalize">
                  Privacy Policy / Terms and Conditions
                </Text>
              </Pressable>
            </View>
          </View>
          <View className="flex-row justify-between items-center pb-3">
            {isAuthenticated && <LogoutScreen />}

            <Text className="text-[12px] text-white text-center  font-mulish_light">
              App version - V0.1
            </Text>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Deawer;
