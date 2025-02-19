import {Image, Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import BackPressHandler from '../components/BackPressHandler';
import AsyncStorage from '@react-native-async-storage/async-storage';



const Onboarding = ({navigation}) => {

  const boardingclose = async ()=>{
    navigation.navigate('Home')
    AsyncStorage.setItem("ON_BOARDING_HIDE", 'true');
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <BackPressHandler />
      <View className="flex-1 bg-white p-4 pt-5 ">
        <View className="flex justify-start flex-row items-baseline">
          <Text className="text-dark_blue text-3xl font-mulish_exbold">
            AXIO
          </Text>
          <Text className="text-dark_blue text-lg font-mulish_medium">
            Life
          </Text>
        </View>
        <View className="flex-1 justify-center items-center ">
          <Image
            source={{
              uri: 'https://img.freepik.com/premium-vector/woman-walking-with-shopping-bags-her-hand-sophisticated-pop-art-creative-elements_1060459-9824.jpg?semt=ais_hybrid',
            }}
            resizeMode="contain"
            className=""
            style={{height: responsiveHeight(50), width: responsiveWidth(90)}}
          />
        </View>
        <View className="p-3 " >
          <Pressable
            onPress={boardingclose}
            className="mt-6 bg-main py-3 rounded-xl border border-main  flex items-center">
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
