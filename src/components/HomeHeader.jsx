import {View, Text, Pressable, Image} from 'react-native';
import React from 'react';
import {AlignLeft, ShoppingBag} from 'react-native-feather';
import {TYPO} from '../assets/typo';
import Deawer from './drawer';
import {NavigationProp, useNavigation} from '@react-navigation/native';

import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {useSelector} from 'react-redux';

const HomeHeader = () => {
  const navigation = useNavigation();
  const {user, token, isAuthenticated} = useSelector(state => state.auth);

  const cart = useSelector(state => state.cart.cart);

  return (
    <View className="relative px-3 pt-5 pb-2 flex-row  justify-between items-center">
      <Deawer />
      <View className="flex justify-center flex-row">
        <Image
          source={{
            uri: 'https://axioimages.blr1.cdn.digitaloceanspaces.com/logo/logo.png',
          }}
          className="absolute bottom-1 w-64 h-64 mr-2"
          resizeMode="contain"
        />
      </View>

      <Pressable
        className="relative pr-3"
        onPress={() =>
          navigation.navigate(isAuthenticated ? 'Cart' : 'SignIn')
        }>
        <ShoppingBag color={TYPO.colors.slate900} />
        {cart && cart.length > 0 && (
          <View className="absolute -top-2 right-1 bg-slate-900  justify-center items-center h-6 w-6 rounded-full">
            <Text className="text-white text-sm">{cart.length}</Text>
          </View>
        )}
      </Pressable>
    </View>
  );
};

export default HomeHeader;
