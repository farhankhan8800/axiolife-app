import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './src/navigation/MainNavigator';
import './global.css';
import './gesture-handler';
import {Provider, useDispatch} from 'react-redux';
import {store_redux} from './src/reduxstore/store';
import Toast from 'react-native-toast-message';
import CustomToast from './src/components/CustomToast';

const App = () => {

  return (
    <>
     <NavigationContainer>
      <Provider store={store_redux}>
        <MainNavigator />
      </Provider>
      
    </NavigationContainer>
    <Toast config={CustomToast} />
    </>
   
  );
};

export default App;
