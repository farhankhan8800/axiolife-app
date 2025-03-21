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
import {_category_data, _product_data, _store_data} from '../utils/data_';
import ProductCard from '../components/ProductCard';
import SmallHeader from '../components/SmallHeader';
import MakeRequest from '../utils/axiosInstance';
import { GET_BRAND_DETAIL_API } from '../service/API';


const StoreDetail = ({
  navigation,
  route,
}) => {
  const slug = route.params.slug;


  const [brands, setBrands] = useState({});
  const [loading, setLoading] = useState(false);

  const getBrandDetail = async () => {
    setLoading(true);
    try {
      const data = await MakeRequest(GET_BRAND_DETAIL_API, {
        brand_id:slug,
      }, {}, 'application/json');

      console.log(data)

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
    getBrandDetail();
  }, [slug]);

  console.log(slug);

  return (
    <SafeAreaView className="flex-1 bg-[#F6F6F6]">
      <SmallHeader name={slug || 'Store Detail'} />
      <ScrollView className="flex-1">
        <View className="mt-7 flex justify-center items-center">
          <Image
            source={{
              uri: 'https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_750,h_400/http://assets.designhill.com/design-blog/wp-content/uploads/2019/04/10.png',
            }}
            resizeMode="cover"
            className="w-28 h-28 rounded-full"
          />
        </View>
        <View className="justify-start pt-7 flex-row flex-wrap px-2 items-start w-full gap-y-1 gap-x-[1%] mb-20">
          {_product_data.map((item, i) => {
            return <ProductCard key={i} item={item} navigation={navigation} />;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default StoreDetail;
