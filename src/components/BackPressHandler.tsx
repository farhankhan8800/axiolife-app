import React, { useState, useCallback } from "react";
import { BackHandler } from "react-native";
import Toast from "react-native-toast-message";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

const BackPressHandler = ({ navigateTo }: { navigateTo?: string }) => {
  const [exitApp, setExitApp] = useState(false);
  const navigation = useNavigation();

 
  const backAction = useCallback(() => {
    if (navigateTo) {
      navigation.navigate(navigateTo as never);
      return true;
    }

    if (exitApp) {
      BackHandler.exitApp();
    } else {
      Toast.show({
        type: "ExitAppToast",
        text1: "Press back again to exit",
        position: "bottom",
        visibilityTime: 2000,
      });

      setExitApp(true);

      setTimeout(() => {
        setExitApp(false);
      }, 2000);
    }
    return true;
  }, [exitApp, navigateTo, navigation]); 
  useFocusEffect(
    useCallback(() => {
      const backHandler =  BackHandler.addEventListener("hardwareBackPress", backAction);

      return () => {
        backHandler.remove()
      };
    }, [backAction]) 
  );

  return null;
};

export default BackPressHandler;
