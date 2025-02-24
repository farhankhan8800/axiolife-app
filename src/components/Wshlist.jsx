import {Pressable} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {TYPO} from '../assets/typo';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {WISHLIST_ADD_API, WISHLIST_REMOVE_API} from '../service/API';
import MakeRequest from '../utils/axiosInstance';
import {useSelector} from 'react-redux';
import Toast from 'react-native-toast-message';

const Wishlist = ({product_}) => {
  const {isAuthenticated} = useSelector(state => state.auth);
  const [liked, setLiked] = useState(product_.like === 1);

  const toggle_wishlist = async () => {
    if (!isAuthenticated) {
      Toast.show({
        type: 'BasicToast',
        text1: 'Login first',
        position: 'bottom',
        visibilityTime: 2000,
      });
      return;
    }

    const API_URL = liked ? WISHLIST_REMOVE_API : WISHLIST_ADD_API; 

    try {
      const data = await MakeRequest(
        API_URL,
        {product_id: product_.product_id},
        {},
        'application/json',
      );

      if (data.status == 1) {
        setLiked(prev => !prev); 
      }
    } catch (error) {
      console.error(`Error in ${liked ? 'removing' : 'adding'} wishlist:`, error);
    }
  };

  return (
    <Pressable onPress={toggle_wishlist}>
      <Icon
        name={liked ? 'heart' : 'hearto'}
        color={liked ? TYPO.colors.main : 'gray'}
        size={responsiveFontSize(2.2)}
      />
    </Pressable>
  );
};

export default Wishlist;
