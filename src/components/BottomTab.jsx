import {View, Pressable, Text} from 'react-native';
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
import {useSelector} from 'react-redux';

const BottomTab = () => {
  const navigation = useNavigation();

  const {user, token, isAuthenticated} = useSelector(state => state.auth);

  const currentRouteName = useNavigationState(
    state => state.routes[state.index]?.name,
  );

  return (
    <View style={{zIndex: 999}} className="absolute bottom-0 w-full">
      <View
        style={{backgroundColor: TYPO.colors.axiocolor}}
        className=" px-6  py-5 flex-row w-[96%] justify-around mx-2 rounded-full">
        <Pressable
          onPress={() => navigation.navigate('Home')}
          className={`px-5 py-2 rounded-full flex-row items-center ${
            currentRouteName === 'Home' ? 'bg-white' : ''
          }`}>
          <Ionicons
            name={currentRouteName === 'Home' ? 'home' : 'home-outline'}
            color={currentRouteName === 'Home' ? TYPO.colors.slate900 : 'white'}
            size={responsiveFontSize(2.4)}
          />
          {currentRouteName === 'Home' && (
            <Text className="text-black ml-2">Home</Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('AllStore')}
          className={`px-5 py-2 rounded-full flex-row items-center ${
            currentRouteName === 'AllStore' ? 'bg-white' : ''
          }`}>
          <Ionicons
            name={
              currentRouteName === 'AllStore'
                ? 'pricetags'
                : 'pricetags-outline'
            }
            color={
              currentRouteName === 'AllStore' ? TYPO.colors.slate900 : 'white'
            }
            size={responsiveFontSize(2.4)}
          />
          {currentRouteName === 'AllStore' && (
            <Text className="text-black ml-2">Store</Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Search')}
          className={`px-5 py-2 rounded-full flex-row items-center ${
            currentRouteName === 'Search' ? 'bg-white' : ''
          }`}>
          <Ionicons
            name={'search'}
            color={
              currentRouteName === 'Search' ? TYPO.colors.slate900 : 'white'
            }
            size={responsiveFontSize(2.5)}
          />
          {currentRouteName === 'Search' && (
            <Text className="text-black ml-2">Search</Text>
          )}
        </Pressable>

        <Pressable
          onPress={() => navigation.navigate('Profile')}
          className={`px-5 py-2 rounded-full flex-row items-center ${
            currentRouteName === 'Profile' ? 'bg-white' : ''
          }`}>
          <FontAwesome
            name={currentRouteName === 'Profile' ? 'user' : 'user-o'}
            color={
              currentRouteName === 'Profile' ? TYPO.colors.slate900 : 'white'
            }
            size={responsiveFontSize(2.3)}
          />
          {currentRouteName === 'Profile' && (
            <Text className="text-black ml-2">Profile</Text>
          )}
        </Pressable>

        <Pressable
          onPress={() =>
            navigation.navigate(isAuthenticated ? 'Notification' : 'SignIn')
          }
          className={`px-5 py-2 rounded-full flex-row items-center ${
            currentRouteName === 'Notification' ||
            currentRouteName === 'Notifications'
              ? 'bg-white'
              : ''
          }`}>
          <FontAwesome
            name={
              currentRouteName === 'Notification' ||
              currentRouteName === 'Notifications'
                ? 'bell'
                : 'bell-o'
            }
            color={
              currentRouteName === 'Notification'
                ? TYPO.colors.slate900
                : 'white'
            }
            size={responsiveFontSize(2.3)}
          />
          {(currentRouteName === 'Notification' ||
            currentRouteName === 'Notifications') && (
            <Text className="text-black ml-2">Alerts</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

export default BottomTab;
