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
import React, {useEffect, useState} from 'react';
import {TYPO} from '../assets/typo';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import {_category_data, _product_data, _store_data} from '../utils/data_';
import SmallHeader from '../components/SmallHeader';
import Swiper from 'react-native-swiper';
import {GET_BRAND_API} from '../service/API';
import MakeRequest from '../utils/axiosInstance';
import {Skeleton} from 'react-native-skeletons';

const AllStore = ({navigation}) => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBrand = async () => {
    setLoading(true);
    try {
      const data = await MakeRequest(GET_BRAND_API, {}, {}, 'application/json');

      // console.log(data)

      if (data.status == 1) {
        setBrands(data.response.brands);
      }
    } catch (error) {
      console.error('Error fetching Brand :', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBrand();
  }, []);

  console.log(brands);

  return (
    <SafeAreaView className="flex-1 bg-light">
      <SmallHeader name="All Store" />
      <ScrollView className="flex-1">
        {loading && (
          <View className="px-4">
            <Skeleton
              width={responsiveWidth(92)}
              height={responsiveHeight(18)}
            />
          </View>
        )}

        {brands.length > 0 && (
          <Swiper
            autoplay={true}
            height={responsiveHeight(18)}
            showsPagination={false}
            containerStyle={{marginTop: responsiveHeight(2)}}
            style={{}}>
            {brands.map((item, i) => {
              return (
                <Pressable
                  onPress={() =>
                    navigation.navigate('StoreDetail', {slug: item.slug})
                  }
                  key={i}
                  className="px-3">
                  <Image
                    source={{
                      uri: item.image,
                    }}
                    style={{height: responsiveHeight(18)}}
                    resizeMode="cover"
                    className="w-full rounded-md"
                  />
                </Pressable>
              );
            })}
          </Swiper>
        )}

        <View className="px-2 flex-row flex-wrap flex-start gap-5 mt-5">
          {loading && (
            <View className="flex-row justify-between flex-wrap gap-3 mt-8 px-2">
              <Skeleton
                count={9}
                width={responsiveWidth(27)}
                height={responsiveWidth(27)}
              />
            </View>
          )}
          {brands.length > 0 &&
            brands.map((item, i) => (
              <Pressable
                onPress={() =>
                  navigation.navigate('StoreDetail', {slug: item.slug})
                }
                key={i}
                className="mx-1  bg-gray-100 ">
                <Image
                  source={{uri: item.image}}
                  resizeMode="cover"
                  className="h-32 w-32"
                />
              </Pressable>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AllStore;
