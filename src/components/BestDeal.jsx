import {Image, Pressable, Text, View, Animated} from 'react-native';
import React, {useRef, useState} from 'react';
import {TYPO} from '../assets/typo';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';

import {_category_data, _product_data, _store_data} from '../utils/data_';

import Carousel from 'react-native-reanimated-carousel';
import {width} from '../utils/dimension';
import {useSharedValue} from 'react-native-reanimated';
import FastImage from 'react-native-fast-image';
const BestDeal = ({navigation, products = []}) => {
  // console.log(products)

  const ref = React.useRef(null);
  const progress = useSharedValue(0);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = slug => {
    Animated.spring(scaleAnim, {
      toValue: 1, // Reset scale
      friction: 4,
      useNativeDriver: true,
    }).start();
    navigation.navigate('ProductDetail', {
      slug: slug,
    });
  };

  if (!products || !Array.isArray(products) || products.length !== 0) {
    return (
      <Carousel
        width={width}
        height={responsiveHeight(48)}
        mode="parallax"
        loop={true}
        onConfigurePanGesture={gestureChain => (
          gestureChain.activeOffsetX([-10, 10])
        )}
      
        // autoPlay={true}
        scrollEnabled={true} 
     
        autoPlayInterval={2000}
        data={products || []}
        onProgressChange={progress}
        renderItem={({index, item}) => {
          return (
            <View key={index} className="">
              <View className=" justify-center items-center">
                <FastImage
                  source={{
                    uri: item.featured_image,
                  }}
                  resizeMode="cover"
                  style={{width: '100%', height: responsiveHeight(23)}}
                />
              </View>

              <View className="items-center mt-6 ">
                <Text
                  className="text-xl text-dark_blue font-mulish_semibold "
                  numberOfLines={1}>
                  {item.title}
                </Text>
                <Text className="text-lg text-dark_blue font-mulish_medium pt-2 ">
                  ₹ {item.offer_price}
                </Text>
              </View>
              <View className="pt-8">
                <Pressable
                  onPressIn={handlePressIn}
                  onPressOut={() => handlePressOut(item.slug)}
                  className="px-10">
                  <Animated.View style={{transform: [{scale: scaleAnim}]}}>
                    <Image
                      source={require('../assets/image/copnowbutton.jpg')}
                      resizeMode="cover"
                      style={{height: responsiveHeight(10)}}
                      className="w-full"
                    />
                  </Animated.View>
                </Pressable>
              </View>
            </View>
          );
        }}
      />
    );
  }
};

export default BestDeal;
