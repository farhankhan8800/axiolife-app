import React from 'react';
import {View, Image, Pressable} from 'react-native';

const Banner = ({navigation}) => {
  return (
    <View>
      <Pressable
        className="mx-3 mt-7"
        onPress={() => navigation.navigate('ProductDetail', {slug: ''})}>
        <Image
          source={{
            uri: 'https://t3.ftcdn.net/jpg/03/16/37/64/360_F_316376413_nYL2jpLONPQPOsy31DE86n7FPpSxPIi3.jpg',
          }}
          resizeMode="cover"
          className="w-full h-40 rounded-2xl"
        />
      </Pressable>
    </View>
  );
};

export default Banner;
