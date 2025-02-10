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
  import {gstyle} from '../assets/gstyle';
  import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
  import Octicons from 'react-native-vector-icons/Octicons';
  import ProductCard from '../components/ProductCard';
import SmallHeader from '../components/SmallHeader';
import CategoryCard from '../components/CategoryCard';
  
  const AllCategory: React.FC<ScreenProps<'AllCategory'>> = ({
    navigation
  }) => {
    

  
    return (
      <SafeAreaView className="flex-1 bg-[#F6F6F6]">
       <SmallHeader name='All Category'/>
        <ScrollView className="flex-1">
          <View className="justify-around pt-5 flex-row flex-wrap items-start w-full px-3 gap-y-5 gap-x-3 pb-28">
            {_category_data.map((item, i) => {
              return <CategoryCard key={i} item={item} navigation={navigation} />;
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default AllCategory;
  