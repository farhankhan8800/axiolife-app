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
import React, { useEffect, useState } from 'react';

import HomeHeader from '../components/HomeHeader';
import BottomTab from '../components/BottomTab';
import {ChevronRight, MapPin, Search} from 'react-native-feather';
import {TYPO} from '../assets/typo';
import {responsiveFontSize} from 'react-native-responsive-dimensions';


import SmallHeader from '../components/SmallHeader';
import { formatFullReadableTime, getRandomColor } from '../utils/utils';
import { NOTIFICATION_API } from '../service/API';
import MakeRequest from '../utils/axiosInstance';

const NotificationScreen = ({
  navigation,
}) => {
 const   [notification_data, setNotification_data]= useState([])


  const getNotification = async ()=>{
    try {
      const data = await MakeRequest(
        NOTIFICATION_API,
        {},
        {},
        'application/json',
      );

      console.log(data)

      if (data.status == 1) {
       setNotification_data(data.response.notifications)
      }
    } catch (error) {
      console.error('Error fetching Notification :', error);
    } 
  }

  useEffect(()=>{
    getNotification()
  },[])


  return (
    <SafeAreaView className="flex-1 bg-[#F6F6F6]">
      <SmallHeader name="Notifications" />
      <ScrollView className="flex-1">
        <View className="px-3 pt-5">
          {notification_data && notification_data.length > 0 && notification_data.map((item, i) => {
            return (
              <Pressable
               style={{opacity:item.status == 'read' ? 0.5:1}}
                key={i}
                className="flex-row  items-start justify-start gap-3 py-1 mb-4  ">
                <View
                  style={{backgroundColor: getRandomColor(6)}}
                  className="h-7 w-7 rounded-full justify-center items-center">
                  <Text className="text-light text-sm font-mulish_medium">
                    {item.title[0]}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text
                    numberOfLines={1}
                    className="text-lg mb-1 text-dark_blue font-mulish_semibold ">
                    {item.title}
                  </Text>
                  <Text className="text-base mb-1 text-dark_blue font-mulish_regular ">
                    {item.message}
                  </Text>
                  <View className='flex-row justify-start items-center gap-1'>
                    <View
                      style={{backgroundColor: getRandomColor(6)}}
                      className="w-2 h-2 rounded-full"></View>{' '}
                    <Text className="text-sm font-mulish_regular ">
                      {formatFullReadableTime(item.created_at)}
                    </Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
          
        </View>
        {
            notification_data.length == 0 && (
              <View className="flex-1 justify-center items-center py-10">
                <Text className="text-center text-lg text-dark_blue font-mulish_semibold ">
                  No Notifications
                </Text>
              </View>
            )
          }
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationScreen;
