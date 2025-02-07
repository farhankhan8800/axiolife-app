import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'react-native-feather';
import SmallHeader from '../components/SmallHeader';

import { debounce } from '../utils/debounce'; 
import { TYPO } from '../assets/typo';


const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedSearch = useRef(
    debounce(async (searchTerm) => {
      if (!searchTerm) {
        setSearchResults([]);
        return;
      }
      setLoading(true);
      try {
       

      //  fatch api 


       
      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    }, 500) 
  ).current;

  useEffect(() => {
    debouncedSearch(query);
  }, [query]);




  return (
    <SafeAreaView className="flex-1 bg-[#F6F6F6]">
      <SmallHeader name="Search" />
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

          {loading && <ActivityIndicator size="large" color={TYPO.colors.main} className="mt-4" />}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
