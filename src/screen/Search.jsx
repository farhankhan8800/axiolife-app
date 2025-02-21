import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Pressable,
  Image,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {Search} from 'react-native-feather';
import SmallHeader from '../components/SmallHeader';

import {debounce} from '../utils/debounce';
import {TYPO} from '../assets/typo';
import MakeRequest from '../utils/axiosInstance';
import {SEARCH_API} from '../service/API';
import ProductCard from '../components/ProductCard';

const SearchScreen = ({navigation}) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState({
    brands: [],
    products: [],
  });
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useRef(
    debounce(async searchTerm => {
      if (!searchTerm) {
        setSearchResults({
          brands: [],
          products: [],
        });
        return;
      }
      setLoading(true);
      try {
        const data = await MakeRequest(
          SEARCH_API,
          {
            query: searchTerm,
          },
          {},
          'application/json',
        );

        console.log('data.response', data.response);
        if (data.status == 1) {
          setSearchResults({
            brands: data.response.brands,
            products: data.response.products,
          });
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    }, 500),
  ).current;

  useEffect(() => {
    debouncedSearch(query);
  }, [query]);

  return (
    <SafeAreaView className="flex-1 bg-[#F6F6F6]">
      <SmallHeader name="Search" showSearch={false} />
      <ScrollView className="flex-1">
        <View className="px-3 pt-5">
          <View className="relative">
            <TextInput
              placeholder="Search what you want"
              placeholderTextColor="#6B7280"
              className="pl-12 pr-4 rounded-xl w-full bg-gray-100 px-4 py-2 text-lg border border-gray-300"
              value={query}
              onChangeText={setQuery}
            />
            <View className="absolute left-4 top-3">
              <Search stroke="#6B7280" width={20} height={20} />
            </View>
          </View>

          {loading && (
            <ActivityIndicator
              size="large"
              color={TYPO.colors.main}
              className="mt-4"
            />
          )}

          <View className='pt-6'>
            {searchResults.products.length > 0 && (
              <View className='mt-4'>
                <Text className="text-xl font-mulish_semibold text-dark_blue">
                  Products
                </Text>
                <View className="justify-start flex-row flex-wrap mt-3 items-start w-full gap-y-5 gap-x-[4%] ">
                  {searchResults.products.map((item, i) => {
                    return  <ProductCard key={i} item={item} navigation={navigation} />
                  })}
                </View>
              </View>
            )}

            {searchResults.brands.length > 0 && (
              <View className='mt-8'>
                <Text className="text-xl font-mulish_semibold text-dark_blue">
                  Brands
                </Text>
                <View className="flex-row flex-wrap flex-start gap-5 mt-5">
                  {searchResults.brands.map((item, i) => {
                    return  <Pressable
                    className="mx-1 bg-gray-100 "
                    key={item.id}
                    onPress={() => navigation.navigate('AllStore')}>
                    <Image
                      source={{uri: item.image}}
                      resizeMode="cover"
                      className="h-32 w-32"
                    />
                  </Pressable>
                  })}
                </View>
              </View>
            )}





          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
