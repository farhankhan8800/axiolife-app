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
  import React, {useState} from 'react';
  
  import {
    responsiveFontSize,
    responsiveHeight,
  } from 'react-native-responsive-dimensions';
  import {ScreenProps} from '../../navigation/types';
 

  import SmallHeader from '../../components/SmallHeader';
 ;
  
  const EditProfile: React.FC<ScreenProps<'EditProfile'>> = ({
    navigation
  }) => {
   
  

    return (
      <SafeAreaView className="flex-1 bg-[#F6F6F6]">
        <SmallHeader name='Edit Profile' />
        <ScrollView className="flex-1">
          
          
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default EditProfile;
  