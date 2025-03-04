import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {AlignLeft, ShoppingBag} from 'react-native-feather';
import {TYPO} from '../assets/typo';
import Deawer from './drawer';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {responsiveFontSize} from 'react-native-responsive-dimensions';
import { useSelector } from 'react-redux';

const HomeHeader = () => {
  const navigation = useNavigation();
  const {user, token, isAuthenticated} = useSelector(state => state.auth);

  const cart = useSelector(state => state.cart.cart); 




  return (
    <View className="px-3 pt-5 pb-2 flex-row  justify-between items-center">
      <Deawer />
      <View className="flex justify-center flex-row items-baseline">
        <Text className="text-slate-950 text-2xl tracking-widest font-mulish_exbold">
          AXIO{' '}
        </Text>
        <Text className="text-dark_blue -tracking-wide text-base font-mulish_medium">
          Life
        </Text>
      </View>

      <Pressable
        className="relative pr-3"
        onPress={() => navigation.navigate(isAuthenticated ? 'Cart': 'SignIn')}>
        <ShoppingBag color={TYPO.colors.dark_blue} />
        {
          cart && cart.length > 0 && <View className="absolute -top-2 right-1 bg-green-300  justify-center items-center h-6 w-6 rounded-full">
          <Text className="text-dark_blue text-sm">{cart.length}</Text>
        </View>
        }
        
      </Pressable>
    </View>
  );
};

export default HomeHeader;
