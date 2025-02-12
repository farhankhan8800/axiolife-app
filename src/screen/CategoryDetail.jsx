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
  import React from 'react';
  


  import {_product_data, _store_data} from '../utils/data_';
import SmallHeader from '../components/SmallHeader';
import ProductCard from '../components/ProductCard';
  
  
  const CategoryDetail = ({navigation, route}) => {
    const slug = route.params.slug;


    return (
      <SafeAreaView className="flex-1 bg-[#F6F6F6]">
        <SmallHeader name={slug || 'Category Detail'} />
        <ScrollView className="flex-1">
          <View className="mt-7 flex justify-center items-center">
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/8893/8893666.png',
              }}
              resizeMode="cover"
              className="w-28 h-28 rounded-full"
            />
          </View>
          <View className="justify-start pt-7 flex-row flex-wrap px-3 items-start w-full gap-y-5 gap-x-[4%] mb-20">
            {_product_data.map((item, i) => {
              return <ProductCard key={i} item={item} navigation={navigation} />;
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  
  export default CategoryDetail;
  