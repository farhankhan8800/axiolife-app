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
import { ScreenProps } from '../../navigation/types';
import HomeHeader from '../../components/HomeHeader';
import BottomTab from '../../components/BottomTab';


const Profile: React.FC<ScreenProps<'Profile'>> = ({navigation}) => {

  return (
    <SafeAreaView className="flex-1 bg-[#F6F6F6]">
      <HomeHeader />
      <BottomTab />
      <ScrollView className="flex-1">
       


      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
