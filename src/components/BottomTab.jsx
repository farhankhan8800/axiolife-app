import {View, Pressable} from 'react-native';
import React from 'react';
import {TYPO} from '../assets/typo';
import {gstyle} from '../assets/gstyle';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {
  NavigationProp,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';
import { useSelector } from 'react-redux';

const BottomTab = () => {
  const navigation = useNavigation();

  const {user, token, isAuthenticated} = useSelector(state => state.auth);



  const currentRouteName = useNavigationState(
    state => state.routes[state.index]?.name,
  );

  return (
    <View
      style={{zIndex: 999}}
      className="absolute bottom-2 w-[76%] left-[12%] right-[12%]">
      <View
        style={gstyle.shadow_m}
        className="bg-dark px-4 py-5 flex-row w-full justify-around rounded-full">
        <Pressable onPress={() => navigation.navigate('Home')}>
          <Ionicons
            name={currentRouteName === 'Home' ? 'home' : 'home-outline'}
            color={TYPO.colors.light}
            size={responsiveFontSize(2.4)}
          />
        </Pressable>

        <Pressable onPress={() => navigation.navigate('AllStore')}>
          <Ionicons
            name={
              currentRouteName === 'AllStore'
                ? 'pricetags'
                : 'pricetags-outline'
            }
            color={TYPO.colors.light}
            size={responsiveFontSize(2.4)}
          />
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Search')}>
          <Ionicons
            name={'search'}
            color={TYPO.colors.light}
            size={responsiveFontSize(2.5)}
          />
        </Pressable>

        <Pressable onPress={() => navigation.navigate('Profile')}>
          <FontAwesome
            name={currentRouteName === 'Profile' ? 'user' : 'user-o'}
            color={TYPO.colors.light}
            size={responsiveFontSize(2.3)}
          />
        </Pressable>

        {/* Notifications Button */}
        <Pressable
          className=""
          onPress={() => navigation.navigate(isAuthenticated ? 'Notification':'SignIn')}>
          <FontAwesome
            name={currentRouteName === 'Notifications' ? 'bell' : 'bell-o'}
            color={TYPO.colors.light}
            size={responsiveFontSize(2.3)}
          />
        </Pressable>
      </View>
    </View>
  );
};

export default BottomTab;
