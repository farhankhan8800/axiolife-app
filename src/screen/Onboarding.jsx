import {
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import BackPressHandler from '../components/BackPressHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Onboarding = ({navigation}) => {
  const boardingclose = async () => {
    navigation.navigate('Home');
    AsyncStorage.setItem('ON_BOARDING_HIDE', 'true');
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <BackPressHandler />
      <View className="flex-1 bg-white p-4 pt-5 ">
        <View className="flex justify-start flex-row items-baseline">
          <Text className="text-dark_blue text-3xl font-mulish_exbold">
            A X I O
          </Text>
        </View>
        <View className="flex-1 justify-center items-center ">
          <Image
            source={require('../assets/image/onboard.png')}
            resizeMode="cover"
            className=""
            style={{height: responsiveHeight(65), width: responsiveWidth(100)}}
          />
          {/* <Image
            source={require('../assets/image/onboard.png')}
            className="absolute w-full h-auto"
            resizeMode="cover"
          /> */}
        </View>
        <View className="p-3 ">
          <Pressable
            onPress={boardingclose}
            className="mt-6 bg-black py-3 rounded-xl border border-black  flex items-center">
            <Text className="text-white text-lg font-mulish_semibold">
              Get Start
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Onboarding;
