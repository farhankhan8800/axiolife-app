import React, {useState, useEffect} from 'react';
import NetInfo from '@react-native-community/netinfo';
import NoInternet from './NoInternet';

const WithValidation = WrappedComponent => {
  return props => {
    const [isConnected, setIsConnected] = useState(true);

    console.log('NetInfo', NetInfo);

    useEffect(() => {
      const unsubscribe = NetInfo.addEventListener(state => {
        console.log('Connection type ', state.type);
        console.log('Is connected ?', state.isConnected);
        setIsConnected(state.isConnected);
      });

      return () => unsubscribe();
    }, []);

    if (!isConnected) {
      return <NoInternet />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default WithValidation;
