import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';

const Splash = ({navigation}) => {

  const next_screen = async () => {
    navigation.replace('Home');
    // navigation.replace('Onboarding');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      next_screen();
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 justify-center items-center">
        <Text className="text-3xl text-dark_blue">Splash</Text>
      </View>
    </SafeAreaView>
  );
};

export default Splash;
