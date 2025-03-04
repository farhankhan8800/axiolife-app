import { Pressable } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { TYPO } from '../assets/typo';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { WISHLIST_ADD_API, WISHLIST_REMOVE_API } from '../service/API';
import MakeRequest from '../utils/axiosInstance';
import { useSelector, useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';

import { useNavigation } from '@react-navigation/native';
import { addToWishlist, removeFromWishlist } from '../reduxstore/slice/wishlist_slice';

const Wishlist = ({ product_ }) => {
  const dispatch = useDispatch();


  

  const { isAuthenticated } = useSelector(state => state.auth);
  const wishlistItems = useSelector(state => state.wishlist.items);
  
  // Check if product is in wishlist
  const isLiked = wishlistItems.some(item => item.product_id === product_.product_id);

  const toggle_wishlist = async () => {
    if (!isAuthenticated) {
      Toast.show({
        type: 'BasicToast',
        text1: 'Login first',
        position: 'bottom',
        visibilityTime: 2000,
      });
      
      return
     
    }

    const API_URL = isLiked ? WISHLIST_REMOVE_API : WISHLIST_ADD_API;

    try {
      const data = await MakeRequest(
        API_URL,
        { product_id: product_.product_id },
        {},
        'application/json',
      );

      if (data.status === 1) {
        if (isLiked) {
          dispatch(removeFromWishlist(product_.product_id));
        } else {
          dispatch(addToWishlist(product_));
        }
      }
    } catch (error) {
      console.error(`Error in ${isLiked ? 'removing' : 'adding'} wishlist:`, error);
    }
  };

  return (
    <Pressable onPress={toggle_wishlist}>
      <Icon
        name={isLiked ? 'heart' : 'hearto'}
        color={isLiked ? TYPO.colors.main : 'gray'}
        size={responsiveFontSize(2.2)}
      />
    </Pressable>
  );
};

export default Wishlist;
