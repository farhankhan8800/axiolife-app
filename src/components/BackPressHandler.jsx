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

    setTimeout(() => {
      setExitApp(false);
    }, 2000);

    return true;
  }, [exitApp, navigateTo, navigation]);

  useFocusEffect(
    useCallback(() => {
      // ✅ Correct way to add listener in RN 0.71+
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => {
        // ✅ Correct way to remove listener
        subscription.remove();
      };
    }, [backAction]),
  );

  return null;
};

export default BackPressHandler;
