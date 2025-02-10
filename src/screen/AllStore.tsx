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
import React, {useState} from 'react';
import {TYPO} from '../assets/typo';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import {ScreenProps} from '../navigation/types';
import {_category_data, _product_data, _store_data} from '../utils/data_';
import SmallHeader from '../components/SmallHeader';
import Swiper from 'react-native-swiper'



const AllStore: React.FC<ScreenProps<'AllStore'>> = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1 bg-[#F6F6F6]">
      <SmallHeader name="All Store" />
      <ScrollView className="flex-1">
      <Swiper autoplay={true} height={responsiveHeight(18)} showsPagination={false} containerStyle={{marginTop:responsiveHeight(2)}} style={{}}>
        {
          _store_data.map((item, i)=>{
            return(
              <Pressable key={i} className='px-3'>
              <Image
                  source={{
                    uri: 'https://t3.ftcdn.net/jpg/03/16/37/64/360_F_316376413_nYL2jpLONPQPOsy31DE86n7FPpSxPIi3.jpg',
                  }}
                  resizeMode="cover"
                  className="w-full h-40 rounded-md"
                />
              </Pressable>
            )
          })
        }
       
      </Swiper>
       
         <View className="px-2 flex-row flex-wrap flex-start gap-5 mt-5">
                    {_store_data.map((item, i) => (
                      <Pressable
                        className="mx-1 "
                        key={item.id}
                        onPress={() => navigation.navigate('AllStore')}>
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
