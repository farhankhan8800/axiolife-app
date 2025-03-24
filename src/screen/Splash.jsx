import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  const {user, token, isAuthenticated} = useSelector(state => state.auth);
  // console.log(user, isAuthenticated, token);

  useEffect(() => {
    const checkAppState = async () => {
      const ON_BOARDING_ = await AsyncStorage.getItem('ON_BOARDING_HIDE');

      if (ON_BOARDING_ === null) {
        navigation.navigate('Onboarding');
      } else if (isAuthenticated == true) {
        if (user && user.name) {
          navigation.replace('Home');
        } else {
          navigation.replace('SignUp');
        }
      } else {
        navigation.replace('Home');
      }
    };

    const timer = setTimeout(() => {
      checkAppState();
    }, 4000);
    return () => clearTimeout(timer);
  }, [isAuthenticated, user, navigation]);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center items-center">
        <Image
          source={{
            uri: 'https://axioimages.blr1.cdn.digitaloceanspaces.com/logo/axio-black-logo.png',
          }}
          className="w-64 h-64 mr-2"
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  );
};

export default Splash;
