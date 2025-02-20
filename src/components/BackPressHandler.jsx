import React, {useState, useCallback} from 'react';
import {BackHandler} from 'react-native';
import Toast from 'react-native-toast-message';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const BackPressHandler = ({navigateTo}) => {
  const [exitApp, setExitApp] = useState(false);
  const navigation = useNavigation();

  const backAction = useCallback(() => {
    if (navigateTo) {
      navigation.navigate(navigateTo);
      return true;
    }

    if (exitApp) {
      BackHandler.exitApp();
      return true;
    } 

    Toast.show({
      type: 'BasicToast',
      text1: 'Press back again to exit',
      position: 'bottom',
      visibilityTime: 2000,
    });

    setExitApp(true);

    const timer = setTimeout(() => {
      setExitApp(false);
    }, 2000);

    return () => clearTimeout(timer)

  }, [exitApp, navigateTo, navigation]);



  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => {
        backHandler.remove()
      };
    }, [backAction]),
  );

  return null;
};

export default BackPressHandler;
