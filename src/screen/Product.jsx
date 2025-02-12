import {
  BackHandler,
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

import {_product_data, _store_data} from '../utils/data_';
import {gstyle} from '../assets/gstyle';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import ProductCard from '../components/ProductCard';
import Modal from 'react-native-modal';
import {AlignLeft, Menu, X} from 'react-native-feather';
import Swiper from 'react-native-swiper';

const ProductScreen = ({
  navigation,
  route,
}) => {
  const {slug} = route.params || {};

  const [showFilter, setShowFilter] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-[#F6F6F6]">
      <View className="px-3 pt-4 pb-2 flex-row  justify-between items-center">
        <View className="flex-row items-center">
          <Pressable
            style={gstyle.shadow_s}
            onPress={() => navigation.goBack()}
            className="p-2 bg-gray-200 rounded-full">
            <FontAwesome6
              name={'arrow-left-long'}
              color={TYPO.colors.dark}
              size={responsiveFontSize(2.2)}
            />
          </Pressable>

          <Text
            style={{paddingLeft: 15}}
            className="text-dark_blue text-lg capitalize font-medium max-w-64 "
            numberOfLines={1}>
            {slug || 'All Product'}
          </Text>
        </View>

        <Pressable
          onPress={() => setShowFilter(!showFilter)}
          style={gstyle.shadow_s}
          className="relative p-2">
          <Octicons
            name={'filter'}
            color={TYPO.colors.dark}
            size={responsiveFontSize(2.4)}
          />
        </Pressable>
      </View>
      <ScrollView className="flex-1">
        <Swiper
          autoplay={true}
          height={responsiveHeight(18)}
          showsPagination={false}
          containerStyle={{marginTop: responsiveHeight(2)}}
          style={{}}>
          {_product_data.map((item, i) => {
            return (
              <Pressable key={i} className="px-3 ">
                <Image
                  source={{
                    uri: item.image,
                  }}
                  resizeMode="cover"
                  className="w-full h-40 rounded-md "
                />
              </Pressable>
            );
          })}
        </Swiper>

        <View className="justify-start pt-5 px-3 flex-row flex-wrap items-start w-full gap-y-5 gap-x-[4%] pb-28">
          {_product_data.map((item, i) => {
            return <ProductCard key={i} item={item} navigation={navigation} />;
          })}
        </View>
      </ScrollView>
      {showFilter && (
        <FilterModel showFilter={showFilter} setShowFilter={setShowFilter} />
      )}
    </SafeAreaView>
  );
};

export default ProductScreen;

const FilterModel = ({showFilter, setShowFilter}) => {
  useEffect(() => {
    const backAction = () => {
      if (showFilter) {
        setShowFilter(false);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [showFilter]);

  return (
    <Modal style={{margin: 0}} avoidKeyboard={true} isVisible={showFilter}>
      <View
        className="bg-white absolute px-2 py-4"
        style={{
          height: responsiveHeight(50),
          bottom: 0,
          width: responsiveWidth(100),
        }}>
        <View className="justify-between flex-row">
          <View className="flex justify-center flex-row gap-2 items-baseline">
            <Text className="text-dark_blue text-2xl font-mulish_exbold">
              Product
            </Text>
            <Text className="text-dark_blue text-lg font-mulish_medium">
              Filter
            </Text>
          </View>
          <Pressable onPress={() => setShowFilter(false)}>
            <X color={TYPO.colors.dark_blue} />
          </Pressable>
        </View>
        <View></View>
      </View>
    </Modal>
  );
};
