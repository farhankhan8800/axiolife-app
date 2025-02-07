import {
  Button,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';

import HomeHeader from '../components/HomeHeader';
import BottomTab from '../components/BottomTab';
import {ChevronRight, MapPin, Search} from 'react-native-feather';
import {TYPO} from '../assets/typo';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {ScreenProps} from '../navigation/types';
import {_product_data, _store_data} from '../utils/data_';


const StoreScreen: React.FC<ScreenProps<'Store'>> = ({navigation}) => {

  return (
    <SafeAreaView className="flex-1 bg-[#F6F6F6]">
      <HomeHeader />
      <BottomTab />
      <ScrollView className="flex-1">
       


      </ScrollView>
    </SafeAreaView>
  );
};

export default StoreScreen;
