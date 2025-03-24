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
import Icon from 'react-native-vector-icons/Feather'; // Using vector-icons instead of react-native-feather
import {debounce} from '../utils/debounce';
import {TYPO} from '../assets/typo';
import MakeRequest from '../utils/axiosInstance';
import {SEARCH_API} from '../service/API';
import ProductCard from '../components/ProductCard';

// Domain icons component to avoid displayName errors
const DomainIcon = ({name}) => {
  switch (name) {
    case 'Shopping':
      return <Icon name="shopping-bag" size={22} color="#404040" />;
    case 'Food & Grocery':
      return <Icon name="coffee" size={22} color="#404040" />;
    case 'Entertainment':
      return <Icon name="film" size={22} color="#404040" />;
    case 'Travel':
      return <Icon name="plane" size={22} color="#404040" />;
    case 'Utility':
      return <Icon name="credit-card" size={22} color="#404040" />;
    case 'Finance':
      return <Icon name="dollar-sign" size={22} color="#404040" />;
    default:
      return <Icon name="circle" size={22} color="#404040" />;
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
    {id: 1, name: 'AJIO', logo: null}, // Use null since we're handling the case where there's no logo
    // Add more brands as needed
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

  // Render AJIO logo instead of using an image that might not exist
  const renderAjioLogo = () => {
    return (
      <View className="w-16 h-16 rounded-full bg-gray-900 items-center justify-center">
        <Text className="font-bold text-lg text-white">AJIO</Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />

      {/* Search Header */}
      <View className="px-5 pt-4 pb-4">
        <View className="relative flex-row items-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="pr-2">
            <Icon name="chevron-left" size={24} color="#404040" />
          </TouchableOpacity>

          <View className="flex-1 relative">
            <View className="absolute left-3 top-3 z-10">
              <Icon name="search" size={18} color="#6B7280" />
            </View>
            <TextInput
              placeholder="K"
              placeholderTextColor="#404040"
              className="bg-white rounded-full pl-10 pr-10 py-2.5 text-base font-medium text-gray-800 w-full shadow-sm"
              value={query}
              onChangeText={handleSearch}
            />
            {query.length > 0 && (
              <TouchableOpacity
                className="absolute right-3 top-3 z-10"
                onPress={clearSearch}>
                <Icon name="x" size={18} color="#6B7280" />
              </TouchableOpacity>
            )}
          </View>

          <TouchableOpacity onPress={clearSearch} className="pl-2">
            <Icon name="x" size={24} color="#404040" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Categories Section */}
        <View className="bg-white rounded-3xl mx-4 mb-4 p-5 shadow-sm">
          {/* Top Brands */}
          <View className="mb-6">
            <Text className="text-xl font-bold text-gray-800 mb-4">
              Search by Top Brands
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row">
                {topBrands.map(brand => (
                  <TouchableOpacity
                    key={brand.id}
                    className="mr-3 items-center"
                    onPress={() =>
                      navigation.navigate('BrandProducts', {brandId: brand.id})
                    }>
                    {renderAjioLogo()}
                    <Text className="text-sm font-medium text-gray-800 mt-1">
                      {brand.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Domains/Categories */}
          <View>
            <Text className="text-xl font-bold text-gray-800 mb-4">
              Search by Domain
            </Text>
            <View className="flex-row flex-wrap justify-between">
              {domains.map(domain => (
                <TouchableOpacity
                  key={domain.id}
                  className="bg-gray-50 rounded-full px-4 py-3 mb-3 items-center flex-row w-[48%]"
                  onPress={() =>
                    navigation.navigate('DomainProducts', {domainId: domain.id})
                  }>
                  <View className="mr-2">
                    <DomainIcon name={domain.name} />
                  </View>
                  <Text className="text-gray-800 font-medium">
                    {domain.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Search Results - Only show if there's a query */}
        {query.length > 0 && (
          <View className="px-4 pt-2">
            {searchResults?.products?.length > 0 && (
              <View className="mb-8">
                <Text className="text-xl font-bold text-gray-800 mb-4">
                  Products
                </Text>
                <View className="flex-row flex-wrap justify-between">
                  {searchResults.products.map((item, i) => (
                    <ProductCard key={i} item={item} navigation={navigation} />
                  ))}
                </View>
              </View>
            )}

            {searchResults?.brands?.length > 0 && (
              <View className="mb-8">
                <Text className="text-xl font-bold text-gray-800 mb-4">
                  Brands
                </Text>
                <View className="flex-row flex-wrap justify-between">
                  {searchResults.brands.map(item => (
                    <TouchableOpacity
                      key={item.id}
                      className="w-[48%] bg-white mb-4 rounded-lg overflow-hidden shadow-sm"
                      onPress={() =>
                        navigation.navigate('BrandProducts', {brandId: item.id})
                      }>
                      {item.image ? (
                        <Image
                          source={{uri: item.image}}
                          className="h-32 w-full"
                          resizeMode="cover"
                        />
                      ) : (
                        <View className="h-32 w-full bg-gray-200 items-center justify-center">
                          <Text className="text-gray-500 font-semibold">
                            {item.name}
                          </Text>
                        </View>
                      )}
                      <View className="p-3 items-center">
                        <Text className="text-gray-800 font-semibold">
                          {item.name}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {searchResults?.products?.length === 0 &&
              searchResults?.brands?.length === 0 &&
              !loading && (
                <View className="items-center py-12">
                  <Text className="text-gray-700 text-lg font-semibold">
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
