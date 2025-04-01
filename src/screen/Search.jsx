import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';

import {debounce} from '../utils/debounce';
import {TYPO} from '../assets/typo';
import MakeRequest from '../utils/axiosInstance';
import {SEARCH_API} from '../service/API';
import ProductCard from '../components/ProductCard';
import Icon from 'react-native-vector-icons/Ionicons';

// Domain icons component to avoid displayName errors
const DomainIcon = ({name}) => {
  switch (name) {
    case 'Shopping':
      return <Icon name="bag-outline" size={26} color="#404040" />;
    case 'Food & Grocery':
      return <Icon name="cafe-outline" size={26} color="#404040" />;
    case 'Entertainment':
      return <Icon name="videocam-outline" size={26} color="#404040" />;
    case 'Travel':
      return <Icon name="train-outline" size={26} color="#404040" />;
    case 'Utility':
      return <Icon name="card-outline" size={26} color="#404040" />;
    case 'Finance':
      return <Icon name="cash-outline" size={26} color="#404040" />;
    default:
      return <Icon name="refresh-outline" size={26} color="#404040" />;
  }
};

const SearchScreen = ({navigation}) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState({
    brands: [],
    products: [],
  });
  const [loading, setLoading] = useState(false);

  // Top brands data
  const topBrands = [
    {id: 1, name: 'NIKE', logo: null},
    {id: 2, name: 'ADIDAS', logo: null},
    {id: 3, name: 'PUMA', logo: null},
    {id: 4, name: 'LEVIS', logo: null},
  ];

  // Domain categories
  const domains = [
    {id: 1, name: 'Shopping'},
    {id: 2, name: 'Food & Grocery'},
    {id: 3, name: 'Entertainment'},
    {id: 4, name: 'Travel'},
    {id: 5, name: 'Utility'},
    {id: 6, name: 'Finance'},
  ];

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

        if (data.status == 1) {
          setSearchResults({
            brands: data.response.brands || [],
            products: data.response.products || [],
          });
        }
      } catch (error) {
        console.error('Error fetching search results:', error);
        setSearchResults({
          brands: [],
          products: [],
        });
      } finally {
        setLoading(false);
      }
    }, 500),
  ).current;

  const handleSearch = text => {
    setQuery(text);
  };

  const clearSearch = () => {
    setQuery('');
    setSearchResults({
      brands: [],
      products: [],
    });
  };

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  // Render brand logo with enhanced styling
  const renderBrandLogo = name => {
    return (
      <View
        className="w-20 h-20 rounded-full bg-gray-800 items-center justify-center shadow-lg elevation-5"
        style={{
          borderWidth: 1.5,
          borderColor: '#f0f0f0',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 4},
          shadowOpacity: 0.15,
          shadowRadius: 6,
        }}>
        <Text className="font-bold text-xl text-white">{name}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Search Header with centered elements */}
      <View className="px-5 pt-6 pb-6 bg-white">
        <View className="flex-row items-center justify-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="pr-4">
            <Icon name="arrow-back-outline" size={28} color="#333333" />
          </TouchableOpacity>

          <View className="flex-1 relative">
            {/* Centered search input with elegant styling */}
            <View className="flex-row items-center bg-gray-50 rounded-full py-4 px-6 shadow-sm">
              <Icon name="search-outline" size={22} color="#555555" />
              <TextInput
                placeholder="Search for brands and products"
                placeholderTextColor="#555555"
                className="flex-1 text-lg ml-3 text-gray-800"
                value={query}
                onChangeText={handleSearch}
              />
              {query.length > 0 && (
                <TouchableOpacity onPress={clearSearch}>
                  <Icon name="close-circle" size={22} color="#555555" />
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Categories Section - Only show when no query */}
        {query.length === 0 && (
          <View className="px-5 pt-2">
            {/* Top Brands Section with enhanced styling */}
            <View
              className="mb-8 p-5 rounded-xl"
              style={{
                backgroundColor: '#ffffff',
                borderWidth: 1,
                borderColor: '#f0f0f0',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3,
              }}>
              <Text className="text-2xl font-bold text-gray-800 mb-5">
                Top Brands
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View className="flex-row">
                  {topBrands.map(brand => (
                    <TouchableOpacity
                      key={brand.id}
                      className="mr-5 items-center"
                      onPress={() =>
                        navigation.navigate('BrandProducts', {
                          brandId: brand.id,
                        })
                      }>
                      {renderBrandLogo(brand.name)}
                      <Text className="text-base font-medium text-gray-800 mt-3">
                        {brand.name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>

            {/* Domains/Categories Section with enhanced styling */}
            <View
              className="mb-6 p-5 rounded-xl"
              style={{
                backgroundColor: '#ffffff',
                borderWidth: 1,
                borderColor: '#f0f0f0',
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3,
              }}>
              <Text className="text-2xl font-bold text-gray-800 mb-5">
                Categories
              </Text>
              <View className="flex-row flex-wrap justify-between">
                {domains.map(domain => (
                  <TouchableOpacity
                    key={domain.id}
                    className="bg-gray-50 rounded-xl px-5 py-4 mb-4 flex-row items-center justify-center w-[48%]"
                    style={{
                      borderWidth: 1,
                      borderColor: '#f0f0f0',
                      shadowColor: '#000',
                      shadowOffset: {width: 0, height: 2},
                      shadowOpacity: 0.1,
                      shadowRadius: 4,
                      elevation: 2,
                    }}
                    onPress={() =>
                      navigation.navigate('DomainProducts', {
                        domainId: domain.id,
                      })
                    }>
                    <DomainIcon name={domain.name} />
                    <Text className="text-gray-800 font-medium text-base ml-3">
                      {domain.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}

        {/* Search Results - Only show if there's a query */}
        {query.length > 0 && (
          <View className="px-5 pt-2">
            {/* Loading indicator */}
            {loading && (
              <View className="items-center py-8">
                <Text className="text-gray-500 text-lg">Searching...</Text>
              </View>
            )}

            {/* Products section */}
            {searchResults?.products?.length > 0 && (
              <View className="mb-8">
                <Text className="text-2xl font-bold text-gray-800 mb-5">
                  Products
                </Text>
                <View className="flex-row flex-wrap justify-between">
                  {searchResults.products.map((item, i) => (
                    <ProductCard key={i} item={item} navigation={navigation} />
                  ))}
                </View>
              </View>
            )}

            {/* Brands section */}
            {searchResults?.brands?.length > 0 && (
              <View className="mb-8">
                <Text className="text-2xl font-bold text-gray-800 mb-5">
                  Brands
                </Text>
                <View className="flex-row flex-wrap justify-between">
                  {searchResults.brands.map(item => (
                    <TouchableOpacity
                      key={item.id}
                      className="w-[48%] bg-white mb-5 rounded-xl overflow-hidden shadow-sm"
                      onPress={() =>
                        navigation.navigate('BrandProducts', {brandId: item.id})
                      }>
                      {item.image ? (
                        <Image
                          source={{uri: item.image}}
                          className="h-36 w-full"
                          resizeMode="cover"
                        />
                      ) : (
                        <View className="h-36 w-full bg-gray-100 items-center justify-center">
                          <Text className="text-gray-500 font-semibold text-lg">
                            {item.name}
                          </Text>
                        </View>
                      )}
                      <View className="p-4 items-center">
                        <Text className="text-gray-800 font-semibold text-lg">
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* No results message */}
            {searchResults?.products?.length === 0 &&
              searchResults?.brands?.length === 0 &&
              !loading && (
                <View className="items-center py-16">
                  <Icon name="search-outline" size={50} color="#DDDDDD" />
                  <Text className="text-gray-700 text-xl font-semibold mt-4">
                    No results found for "{query}"
                  </Text>
                  <Text className="text-gray-500 text-base mt-2 text-center px-8">
                    Try checking your spelling or using different keywords
                  </Text>
                </View>
              )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
