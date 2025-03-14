import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import SmallHeader from '../components/SmallHeader';
import {_category_data} from '../utils/data_';
import FastImage from 'react-native-fast-image';

const AllCategory = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1 bg-[#fff]">
      <SmallHeader name="All Category" />
      <ScrollView className="flex-1">
        <View className="pt-5 flex-row flex-wrap w-full px-3 gap-y-8 gap-x-3 pb-28">
          {_category_data.map((item, index) => {
            const isBigItem = index % 6 === 0 || index % 6 === 5;

            if (isBigItem) {
              return (
                <View className="w-[46%]">
                  <Pressable
                    key={index + 1}
                    className="w-full justify-center items-center rounded-lg"
                    style={{height: responsiveHeight(36)}}
                    onPress={() =>
                      navigation.navigate('CategoryDetail', {slug: item.slug})
                    }>
                    <View className="w-full relative rounded-3xl overflow-hidden shadow-lg bg-white items-center">
                      <FastImage
                        source={{
                          uri: 'https://cdn.mos.cms.futurecdn.net/whowhatwear/posts/267743/zara-outfits-267743-1666989738327-square.gif',
                        }}
                        resizeMode="cover"
                        className="w-full rounded-md"
                        style={{width: '100%', height: responsiveHeight(34)}}
                      />

                      <View
                        className="w-full absolute top-0 left-0 bg-[rgba(0,0,0,0.2)]"
                        style={{height: responsiveHeight(34)}}
                      />
                    </View>
                    <Text className="text-lg text-dark_blue font-mulish_semibold text-center mt-1">
                      {item.name}
                    </Text>
                  </Pressable>
                </View>
              );
            }

            if (index % 6 === 1 || index % 6 === 3) {
              return (
                <View key={index} className="w-[46%] justify-between">
                  <Pressable
                    className="w-full  justify-center items-center rounded-lg mb-2"
                    style={{height: responsiveHeight(17)}}
                    onPress={() =>
                      navigation.navigate('CategoryDetail', {slug: item.slug})
                    }>
                    <View className="w-full relative rounded-3xl overflow-hidden shadow-lg bg-white items-center">
                      <FastImage
                        source={{
                          uri: 'https://i.pinimg.com/originals/16/de/e0/16dee07755c2b841ea7c603fcd8f880c.gif',
                        }}
                        resizeMode="cover"
                        className="w-full rounded-md"
                        style={{width: '100%', height: responsiveHeight(15)}}
                      />
                      <View
                        className="w-full absolute top-0 left-0 bg-[rgba(0,0,0,0.2)]"
                        style={{height: responsiveHeight(15)}}
                      />
                    </View>
                    <Text className="text-lg text-dark_blue font-mulish_semibold text-center mt-1">
                      {item.name}
                    </Text>
                  </Pressable>

                  {index + 1 < _category_data.length && (
                    <Pressable
                      key={index + 1}
                      className="w-full  justify-center items-center rounded-lg"
                      style={{height: responsiveHeight(17)}}
                      onPress={() =>
                        navigation.navigate('CategoryDetail', {
                          slug: _category_data[index + 1].slug,
                        })
                      }>
                      <View className="w-full relative rounded-3xl overflow-hidden shadow-lg bg-white items-center">
                        <FastImage
                          source={{
                            uri: 'https://i.gifer.com/4KDr.gif',
                          }}
                          resizeMode="cover"
                          className="w-full rounded-md"
                          style={{width: '100%', height: responsiveHeight(15)}}
                        />
                        <View
                          className="w-full absolute top-0 left-0 bg-[rgba(0,0,0,0.2)]"
                          style={{height: responsiveHeight(15)}}
                        />
                      </View>
                      <Text className="text-lg text-dark_blue font-mulish_semibold text-center mt-1">
                        {_category_data[index + 1].name}
                      </Text>
                    </Pressable>
                  )}
                </View>
              );
            }
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllCategory;
