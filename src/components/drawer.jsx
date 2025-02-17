import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {AlignLeft, ChevronLeft, LogOut, Menu, X} from 'react-native-feather';
import {TYPO} from '../assets/typo';
import Modal from 'react-native-modal';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {getRandomColor} from '../utils/utils';

const Deawer = () => {
  const [isModalVisible, setModalVisible] = useState(false);

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
                <Text className="text-light text-3xl font-mulish_bold">G</Text>
              </View>
              <View>
                <Text className="text-xl text-light font-bold mb-2">
                  Welcome Guest
                </Text>
                <Pressable
                  onPress={() => navigation.navigate('SignIn')}
                  className="py-2 px-4 rounded-xl bg-gray-200">
                  <Text className="text-[14px] text-gray-600 text-center uppercase font-mulish_bold">
                    Login/Sign UP
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
            <Pressable
              className=" px-4 flex-row justify-center gap-2 items-center"
              onPress={() => navigation.navigate('SignIn')}>
              <LogOut width={responsiveWidth(6)} color="#d30c0c" />
              <Text className="text-base text-[#d30c0c] uppercase font-mulish_bold">
                Logout
              </Text>
            </Pressable>
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
