//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';

// create a component
const LoadMore = () => {
  return (
    <View className="justify-center items-center pt-8">
      <Pressable className="bg-main rounded-full px-8 border-2 border-main py-2">
        <Text className="text-black text-base font-mulish_semibold">
          View More
        </Text>
      </Pressable>
    </View>
  );
};

export default LoadMore;
