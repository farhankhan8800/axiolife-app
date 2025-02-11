import { useEffect, useState } from "react";
import { BackHandler, ToastAndroid } from "react-native";
import Toast from "react-native-toast-message";

const BackPressHandler = () => {
  const [exitApp, setExitApp] = useState(false);

  useEffect(() => {
    const backAction = () => {
      if (exitApp) {
        BackHandler.exitApp(); 
      } else {
        Toast.show({
            type: 'ExitAppToast',
            text1: 'Press back again to exit',
            position: "bottom",  
            visibilityTime: 2000,
          });
        setExitApp(true);
        setTimeout(() => {
          setExitApp(false);
        }, 2000);
      }
      return true; 
    };

   
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => {
        backHandler.remove();
    };
  }, [exitApp]);

  return null; 
};

export default BackPressHandler;
