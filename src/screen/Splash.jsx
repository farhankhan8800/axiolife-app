import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  let ON_BOARDING_HIDE = 'ON_BOARDING_HIDE';

  const {user, token, isAuthenticated} = useSelector(state => state.auth);
  console.log(user, isAuthenticated, token);

  useEffect(() => {
    const checkAppState = async () => {
      const ON_BOARDING_ = await AsyncStorage.getItem(ON_BOARDING_HIDE);

      if (ON_BOARDING_ === null) {
        AsyncStorage.setItem(ON_BOARDING_HIDE, 'true');
        navigation.navigate('Onboarding');
      } else if(isAuthenticated == true) {
        if (user && user.name) {
          navigation.navigate('Home');
        } else {
          navigation.navigate('SignUp');
        }
      }else{
        navigation.navigate('Home');
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
        <Text className="text-3xl text-dark_blue">Splash</Text>
      </View>
    </SafeAreaView>
  );
};

export default Splash;
