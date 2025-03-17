import {View, Text, Pressable, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {AlignLeft, ChevronLeft, LogOut, Menu, X} from 'react-native-feather';
import {TYPO} from '../assets/typo';
import Modal from 'react-native-modal';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {getFirstLetter, getRandomColor} from '../utils/utils';
import {useDispatch, useSelector} from 'react-redux';
import {BlurView} from '@react-native-community/blur';

import LogoutScreen from './LogoutScreen';

const Drawer = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const {user, token, isAuthenticated} = useSelector(state => state.auth);
  const [greeting, setGreeting] = useState('Welcome');
  const navigation = useNavigation();
  useEffect(() => {
    // Get current hour
    const updateGreeting = () => {
      const currentHour = new Date().getHours();

      // Set greeting based on time of day
      if (currentHour >= 5 && currentHour < 12) {
        setGreeting('Good Morning,');
      } else if (currentHour >= 12 && currentHour < 17) {
        setGreeting('Good Afternoon,');
      } else if (currentHour >= 17 && currentHour < 21) {
        setGreeting('Good Evening,');
      } else {
        setGreeting('Good Night');
      }
    };

    // Set initial greeting
    updateGreeting();

    // Optional: Update greeting if component stays mounted across time boundaries
    const intervalId = setInterval(updateGreeting, 60000); // Check every minute

    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <Pressable onPress={() => setModalVisible(true)}>
        <AlignLeft color={TYPO.colors.slate900} />
      </Pressable>

      <Modal
        style={{margin: 0}}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}
        useNativeDriver={true}
        backdropOpacity={0.3}
        avoidKeyboard={true}
        isVisible={isModalVisible}>
        {/* Container for the drawer with BlurView as background */}
        <View style={styles.drawerContainer}>
          {/* BlurView as background - positioned correctly */}
          <BlurView
            style={styles.absolute}
            blurType="dark"
            blurAmount={20}
            reducedTransparencyFallbackColor="rgb(15, 15, 4,0.5)"
          />

          {/* Content overlaid on the blur */}
          <View style={styles.contentContainer}>
            <View className="justify-between flex-row px-1">
              <View className="flex-row justify-start items-center gap-6">
                <View
                  style={{backgroundColor: 'black'}}
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
                  <Text className="text-xl text-light tracking-widest font-thin mb-1">
                    {greeting}
                  </Text>

                  <Text className="text-lg text-light tracking-wider font-mulish_regular mb-2">
                    {isAuthenticated ? user?.name || user.phone : 'Guest'}
                  </Text>

                  {!isAuthenticated && (
                    <Pressable
                      onPress={() => navigation.navigate('SignIn')}
                      className="py-2 px-4 rounded-xl bg-gray-200">
                      <Text className="text-[14px] text-gray-600 text-center uppercase font-mulish_bold">
                        Login/Sign UP
                      </Text>
                    </Pressable>
                  )}
                </View>
              </View>
              <Pressable className="p-1" onPress={() => setModalVisible(false)}>
                <ChevronLeft width={responsiveWidth(8)} color="#FFFFFF" />
              </Pressable>
            </View>
            <View className="px-1 mt-8 border-t-[1px] pt-7 border-white flex-1">
              <Pressable
                className="py-1 mb-2"
                onPress={() => {
                  navigation.navigate('AllStore');
                  setModalVisible(false);
                }}>
                <Text className="text-light text-xl font-thin capitalize">
                  All Store
                </Text>
              </Pressable>
              <View className="w-full h-[0.6]  rounded-full bg-gray-300 my-1" />
              <Pressable
                className="py-1 mb-2"
                onPress={() => {
                  navigation.navigate('AllCategory');
                  setModalVisible(false);
                }}>
                <Text className="text-light text-xl font-thin capitalize">
                  All Category
                </Text>
              </Pressable>
              <View className="w-full h-[0.8]  rounded-full bg-gray-300 my-1" />

              <View>
                <Pressable
                  className="py-1 mb-2"
                  onPress={() => {
                    navigation.navigate('Profile');
                    setModalVisible(false);
                  }}>
                  <Text className="text-light text-xl font-thin capitalize">
                    Profile
                  </Text>
                </Pressable>
                <View className="w-full h-[0.8]  rounded-full bg-gray-300 my-1" />
                <Pressable
                  className="py-1 mb-2"
                  onPress={() => {
                    navigation.navigate('Notification');
                    setModalVisible(false);
                  }}>
                  <Text className="text-light text-xl font-thin capitalize">
                    Notifications
                  </Text>
                </Pressable>
                <View className="w-full h-[0.8]  rounded-full bg-gray-300 my-1" />
                <Pressable
                  className="py-1 mb-2"
                  onPress={() => {
                    navigation.navigate('Cart');
                    setModalVisible(false);
                  }}>
                  <Text className="text-light text-xl font-thin capitalize">
                    Cart
                  </Text>
                </Pressable>
                <View className="w-full h-[0.8]  rounded-full bg-gray-300 my-1" />
                <Pressable
                  className="py-1 mb-2"
                  onPress={() => {
                    navigation.navigate('HelpDesk');
                    setModalVisible(false);
                  }}>
                  <Text className="text-light text-xl font-thin capitalize">
                    Help Desk
                  </Text>
                </Pressable>
                <View className="w-full h-[0.8]  rounded-full bg-gray-300 my-1" />
                <Pressable
                  className="py-1 mb-2"
                  onPress={() => {
                    navigation.navigate('ContactUs');
                    setModalVisible(false);
                  }}>
                  <Text className="text-light text-xl font-thin capitalize">
                    Contact Us
                  </Text>
                </Pressable>
                <View className="w-full h-[0.8]  rounded-full bg-gray-300 my-1" />
                <Pressable
                  className="py-1 mb-2"
                  onPress={() => {
                    navigation.navigate('PrivacyTc');
                    setModalVisible(false);
                  }}>
                  <Text className="text-light text-xl font-thin capitalize">
                    Privacy Policy / Terms and Conditions
                  </Text>
                </Pressable>
              </View>
            </View>
            <View className="flex-row justify-between items-center pb-3">
              {isAuthenticated && (
                <LogoutScreen setModalVisible={setModalVisible} />
              )}

              <Text className="text-[12px] font-thin  text-white text-center font-mulish_light">
                App version - v0.1.1
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default Drawer;

const styles = StyleSheet.create({
  drawerContainer: {
    position: 'relative',
    height: '100%',
    maxWidth: '88%',
    overflow: 'hidden',
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
    paddingTop: 40,
    backgroundColor: 'rgb(0, 0, 0,0.8)', // Semi-transparent overlay on the blur
  },
});
