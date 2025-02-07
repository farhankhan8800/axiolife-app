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
import {_product_data, _store_data} from '../utils/data_';
import {gstyle} from '../assets/gstyle';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import ProductCard from '../components/ProductCard';

const ProductScreen: React.FC<ScreenProps<'Product'>> = ({
  navigation,
  route,
}) => {
  const {slug} = route.params || {};

  const [showFilter, setShowFilter] = useState<boolean>(false);

  console.log(showFilter);

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
        {showFilter && (
          <View className="my-5">
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View className="px-3 ">
                <View>
                  <Text>Category</Text>
                  <View style={{flexDirection: 'row', gap: 10}}>
                    <Pressable className="p-2 bg-gray-200 rounded-full">
                      <Text>All</Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        )}
        <View className="justify-start flex-row flex-wrap items-start w-full gap-y-5 gap-x-[4%] pb-28">
          {_product_data.map((item, i) => {
            return <ProductCard key={i} item={item} navigation={navigation} />;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductScreen;
