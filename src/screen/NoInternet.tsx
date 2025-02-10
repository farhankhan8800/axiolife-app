import {Image, SafeAreaView, View} from 'react-native';
import React, {useEffect} from 'react';
import {ScreenProps} from '../navigation/types';
import { responsiveHeight } from 'react-native-responsive-dimensions';

const NoInternet: React.FC<ScreenProps<'NoInternet'>> = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center bg-black">
        <Image
          source={require('../assets/image/no-internet.jpg')}
          resizeMode='contain'
          style={{width: '90%', height: responsiveHeight(50)}}
        />
      </View>
    </SafeAreaView>
  );
};

export default NoInternet;
