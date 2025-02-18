import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {AlignLeft, ChevronLeft, LogOut, Menu, X} from 'react-native-feather';
import {TYPO} from '../assets/typo';
import Modal from 'react-native-modal';
import {responsiveHeight, responsiveWidth} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {getFirstLetter, getRandomColor} from '../utils/utils';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../reduxstore/slice/auth_slice';
import Toast from 'react-native-toast-message';

const LogoutScreen = () => {
 
  const {user, token, isAuthenticated} = useSelector(state => state.auth);
  const navigation = useNavigation();
  

  const dispatch = useDispatch()

  const logoutuser = () => {
    dispatch(logout());
    Toast.show({
      type: 'BasicToast',
      text1: 'Logged out successfully!',
      position: 'bottom',
      visibilityTime: 3000,
    });
    navigation.navigate('SignIn');
  };

  const handleLogoutPress = () => {
    
  };

  return (
    <>
      <Modal
        style={{margin: 0}}
        avoidKeyboard={true}
        isVisible={true}>
        <View className="flex-1 bg-red-400 p-3">
         <View style={{width:responsiveWidth(100), minHeight:responsiveHeight(30),backgroundColor:'red'}} className='absolute bottom-0 left-0 right-0' >

         </View>
        </View>
      </Modal>
    </>
  );
};

export default LogoutScreen;
