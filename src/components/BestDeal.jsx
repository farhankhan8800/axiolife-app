import {
  Image,
  Pressable,
  Text,
  View,
  Animated,
} from 'react-native';
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

const BestDeal = ({navigation}) => {
  const ref = React.useRef(null);
  const progress = useSharedValue(0);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1, // Reset scale
      friction: 4,
      useNativeDriver: true,
    }).start();
    // navigation.navigate('ProductDetail', {
    //   product_id: _product_data[index].id,
    // });
  };

  return (
    <Carousel
      ref={ref}
      width={width}
      height={responsiveHeight(48)}
      mode="parallax"
      loop={true}
      // autoPlay={true}
      autoPlayInterval={2000}
      data={_store_data}
      onProgressChange={progress}
      renderItem={({index}) => {
        console.log(index);
        return (
          <View key={index} className="=">
            <View className=" justify-center items-center">
              <Image
                source={{
                  uri: 'https://www.zoomshoes.in/cdn/shop/products/9_1.jpg?v=1619594466',
                }}
                resizeMode="cover"
                style={{
                  height: responsiveHeight(25),
                }}
                className="w-full "
              />
            </View>

            <View className="items-center mt-10 ">
              <Text
                className="text-xl text-dark_blue font-mulish_semibold "
                numberOfLines={1}>
                Yeezy Boost 350 V2 Beluga Reflective
              </Text>
              <Text className="text-lg text-dark_blue font-mulish_medium pt-2 ">
                ₹ 11880
              </Text>
            </View>
            <View className="pt-16">
              <Pressable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
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
};

export default BestDeal;
