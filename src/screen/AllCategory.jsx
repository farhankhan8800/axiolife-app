import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import SmallHeader from '../components/SmallHeader';

import FastImage from 'react-native-fast-image';
import MakeRequest from '../utils/axiosInstance';
import {GET_CATEGORY_API} from '../service/API';
import {Skeleton} from 'react-native-skeletons';

const AllCategory = ({navigation}) => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCategory = async () => {
    setLoading(true);
    try {
      const data = await MakeRequest(
        GET_CATEGORY_API,
        {},
        {},
        'application/json',
      );

      if (data.status == 1) {
        setCategory(data.response.category);
      }
    } catch (error) {
      console.error('Error fetching category :', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#fff]">
      <SmallHeader name="All Category" />
      <ScrollView className="flex-1">
        <View className="pt-5 flex-row flex-wrap w-full px-3 gap-y-8 gap-x-3 pb-28">
          {loading && (
            <View className="flex-row justify-between gap-3 flex-wrap ">
              <Skeleton
                count={6}
                borderRadius={6}
                width={responsiveWidth(45)}
                height={responsiveHeight(30)}
              />
            </View>
          )}

          {category.length > 0 &&
            category.map((item, index) => {
              const isBigItem = index % 6 === 0 || index % 6 === 5;

              if (isBigItem) {
                return (
                  <View className="w-[46%]">
                    <Pressable
                      key={index + 1}
                      className="w-full justify-center items-center rounded-lg"
                      style={{height: responsiveHeight(36)}}
                      onPress={() =>
                        navigation.navigate('CategoryDetail', {
                          slug: item.category_id,
                        })
                      }>
                      <View className="w-full relative rounded-3xl overflow-hidden shadow-lg bg-white items-center">
                        <FastImage
                          source={{
                            uri: item.image,
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
                        navigation.navigate('CategoryDetail', {
                          slug: item.category_id,
                        })
                      }>
                      <View className="w-full relative rounded-3xl overflow-hidden shadow-lg bg-white items-center">
                        <FastImage
                          source={{
                            uri: item.image,
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

                    {index + 1 < category.length && (
                      <Pressable
                        key={index + 1}
                        className="w-full  justify-center items-center rounded-lg"
                        style={{height: responsiveHeight(17)}}
                        onPress={() =>
                          navigation.navigate('CategoryDetail', {
                            slug: category[index + 1].category_id,
                          })
                        }>
                        <View className="w-full relative rounded-3xl overflow-hidden shadow-lg bg-white items-center">
                          <FastImage
                            source={{
                              uri: category[index + 1].image,
                            }}
                            resizeMode="cover"
                            className="w-full rounded-md"
                            style={{
                              width: '100%',
                              height: responsiveHeight(15),
                            }}
                          />
                          <View
                            className="w-full absolute top-0 left-0 bg-[rgba(0,0,0,0.2)]"
                            style={{height: responsiveHeight(15)}}
                          />
                        </View>
                        <Text className="text-lg text-dark_blue font-mulish_semibold text-center mt-1">
                          {category[index + 1].name}
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
