import React, {useState, useEffect} from 'react';
import {DeviceEventEmitter} from 'react-native';
import UnauthorizedModal from './UnauthorizedModal';
import { useSelector } from 'react-redux';
// import NetInfo from '@react-native-community/netinfo';
// import NoInternet from './NoInternet';

const WithValidation = WrappedComponent => {
  return props => {
    const [isConnected, setIsConnected] = useState(true);
    const [unauthorized, setUnauthorized] = useState(false);

    const {user, token, isAuthenticated} = useSelector(state => state.auth);

    // console.log('NetInfo', NetInfo);

    // useEffect(() => {
    //   const unsubscribe = NetInfo.addEventListener(state => {
    //     console.log('Connection type ', state.type);
    //     console.log('Is connected ?', state.isConnected);
    //     setIsConnected(state.isConnected);
    //   });

    //   return () => unsubscribe();
    // }, []);

    useEffect(() => {
      const subscription = DeviceEventEmitter.addListener(
        'unauthorizedEvent',
        data => {
          console.log('Unauthorized event triggered:', data);
          setUnauthorized(true);
        },
      );

      return () => {
        subscription.remove();
      };
    }, []);

    if (isAuthenticated && unauthorized) {
      return <UnauthorizedModal setUnauthorized={setUnauthorized} unauthorized={unauthorized} />;
    }

    if (!isConnected) {
      return <NoInternet />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default WithValidation;
