import React, { useEffect } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigator from './src/navigation/MainNavigator';
import './global.css';
import './gesture-handler';
import {Provider, useDispatch} from 'react-redux';
import {store_redux} from './src/reduxstore/store';


const App: React.FC = () => {

  return (
    <NavigationContainer>
      <Provider store={store_redux}>
        <MainNavigator />
      </Provider>
    </NavigationContainer>
  );
};

export default App;
