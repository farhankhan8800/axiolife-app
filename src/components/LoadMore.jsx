//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TYPO} from '../assets/typo';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

// create a component
const LoadMore = () => {
  return (
    <View className="justify-center items-center pt-8">
      <Pressable className="bg-white rounded-full px-8 border-2 border-main py-2">
        <Text className="text-black text-base font-mulish_semibold">
          Load More
        </Text>
      </Pressable>
      <Ionicons
        name="chevron-down-outline"
        color={TYPO.colors.slate900}
        size={responsiveFontSize(2.4)}
      />
    </View>
  );
};

export default LoadMore;
