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
import React, { useEffect, useState } from 'react';

import {_product_data, _store_data} from '../utils/data_';
import SmallHeader from '../components/SmallHeader';
import ProductCard from '../components/ProductCard';
import {GET_CATEGORY_DETAILS_API} from '../service/API';
import MakeRequest from '../utils/axiosInstance';

const CategoryDetail = ({navigation, route}) => {
  const slug = route.params.slug;

  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCategoryDetail = async () => {
    setLoading(true);
    try {
      const data = await MakeRequest(
        GET_CATEGORY_DETAILS_API,
        {
          category_id: slug,
        },
        {},
        'application/json',
      );

      // console.log(data);

      if (data.status == 1) {
        setProducts(data.response.products);
      }
    } catch (error) {
      console.error('Error fetching Brand :', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategoryDetail();
  }, [slug]);

  // console.log(slug);

  return (
    <SafeAreaView className="flex-1 bg-[#F6F6F6]">
      <SmallHeader name={slug || 'Category Detail'} />
      <ScrollView className="flex-1">
        <View className="justify-start pt-7 flex-row flex-wrap px-3 items-start w-full gap-y-5 gap-x-[4%] mb-20">
          {product.length > 0 &&
            product.map((item, i) => {
              return (
                <ProductCard key={i} item={item} navigation={navigation} />
              );
            })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CategoryDetail;
