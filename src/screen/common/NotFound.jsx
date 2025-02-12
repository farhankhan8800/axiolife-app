import {Image, Pressable, SafeAreaView, Text, View} from 'react-native';
import React, {useEffect} from 'react';

import {responsiveHeight} from 'react-native-responsive-dimensions';

const NotFound = ({navigation}) => {

  


  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center ">
        <Image
          source={require('../../assets/image/not_found.gif')}
          resizeMode="contain"
          style={{width: '90%', height: responsiveHeight(55)}}
        />
      </View>
      <View className="mb-10 flex-row justify-center">
        <Pressable onPress={()=>navigation.navigate('Home')} className=" w-[50%]  bg-main py-3 rounded-xl border border-main  flex items-center">
          <Text className="text-white text-lg font-mulish_semibold">
            Go Home
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default NotFound;
