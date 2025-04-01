import {View, Text, Pressable, Image, StatusBar} from 'react-native';
import React from 'react';
import {AlignLeft, ShoppingBag} from 'react-native-feather';
import {TYPO} from '../assets/typo';
import Drawer from './Drawer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {useSelector} from 'react-redux';

const HomeHeader = () => {
  const navigation = useNavigation();
  const {user, token, isAuthenticated} = useSelector(state => state.auth);
  const cart = useSelector(state => state.cart.cart);

  return (
    <>
      {/* <StatusBar barStyle="light-content" backgroundColor="#000" /> */}
      <View
        style={{backgroundColor: TYPO.colors.axiocolor}}
        className="relative px-3 pt-20 pb-2 flex-row justify-between items-center">
        <Drawer />
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
          onPress={() => navigation.push(isAuthenticated ? 'Cart' : 'SignIn')}>
          <ShoppingBag color={TYPO.colors.light} />
          {cart && cart.length > 0 && (
            <View className="absolute -top-2 right-1 bg-white justify-center items-center h-6 w-6 rounded-full">
              <Text className="text-black text-sm">{cart.length}</Text>
            </View>
          )}
        </Pressable>
      </View>
    </>
  );
};

export default HomeHeader;
