import {
  BackHandler,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Octicons from 'react-native-vector-icons/Octicons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProductCard from '../components/ProductCard';
import Modal from 'react-native-modal';
import {X} from 'react-native-feather';
import Swiper from 'react-native-swiper';
import MakeRequest from '../utils/axiosInstance';
import {ALL_PRODUCTS_API} from '../service/API';
import {TYPO} from '../assets/typo';

const ProductScreen = ({navigation, route}) => {
  const {slug} = route.params || {};
  const scrollRef = useRef(null);

  const [showFilter, setShowFilter] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState({});
  const [brands, setBrands] = useState([]);
  const [selectBrands, setSelectBrands] = useState([]);
  const [page, setPage] = useState(1);

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const data = await MakeRequest(
        ALL_PRODUCTS_API,
        {
          group_id: selectedTags.group_id,
          brand_id: selectBrands,
          page:page
        },
        {},
        'application/json',
      );

      console.log('data', data)

      if (data.status == 1) {
        setAllProducts(data.response.products);
        setBrands(data.response.brands);
        setTags(data.response.tags);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProducts();
    return () => {
      // Cleanup
    };
  }, [selectedTags, selectBrands, page]);

  const renderHeaderBar = () => {
    return (
      <View className="px-4 py-1.5  bg-gray-50/95">
        <View className="flex-row items-center justify-between">
          <Pressable
            className="p-2 rounded-xl shadow bg-gray-100"
            onPress={() => navigation.goBack()}>
            <FontAwesome6
              name={'arrow-left-long'}
              color={TYPO.colors.dark}
              size={20}
            />
          </Pressable>

          <Text
            className="flex-1 text-lg font-semibold ml-3 capitalize text-slate-800"
            numberOfLines={1}>
            {slug || 'Curated Collection'}
          </Text>

          <View className="flex-row items-center">
            <Pressable
              className="p-2 ml-2 rounded-xl shadow bg-gray-100"
              onPress={() => navigation.navigate('SearchScreen')}>
              <Ionicons
                name="search-outline"
                color={TYPO.colors.dark}
                size={22}
              />
            </Pressable>

            <Pressable
              className="p-2 ml-2 rounded-xl shadow bg-gray-100"
              onPress={() => setShowFilter(!showFilter)}>
              <Octicons name="filter" color={TYPO.colors.dark} size={20} />
            </Pressable>
          </View>
        </View>
      </View>
    );
  };

  const renderTagsBar = () => {
    return (
      <View className="mt-1 mb-1">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="px-4 py-1">
          {tags.map((tag, index) => (
            <Pressable
              key={index}
              className={`px-4 py-1 mr-2 rounded-lg ${
                selectedTags?.slug === tag.slug ? 'bg-slate-800' : 'bg-gray-100'
              }`}
              onPress={() => setSelectedTags(tag)}>
              <Text
                className={`text-sm font-medium ${
                  selectedTags?.slug === tag.slug
                    ? 'text-white font-semibold'
                    : 'text-slate-500'
                }`}>
                {tag.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    );
  };

  const renderFeaturedSlider = () => {
    if (allProducts.length === 0) return null;

    return (
      <View className="mt-4 mb-2">
        <Swiper
          autoplay={true}
          height={250}
          loop={true}
          autoplayTimeout={5}
          showsPagination={true}
          paginationStyle={{bottom: 10}}
          dotStyle={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.4)',
            marginHorizontal: 4,
          }}
          activeDotStyle={{
            width: 16,
            height: 8,
            borderRadius: 4,
            backgroundColor: '#000',
            marginHorizontal: 4,
          }}>
          {allProducts.slice(0, 5).map((item, i) => (
            <Pressable
              key={i}
              className="mx-4 rounded-2xl overflow-hidden h-full relative">
              <Image
                source={{
                  uri: item.featured_image,
                }}
                className="w-full h-full"
                resizeMode="cover"
              />
              <View className="absolute bottom-0 left-0 right-0 bg-black/50 px-4 py-1.5">
                <Text className="text-white text-xl font-bold mb-0.5">
                  {item.name}
                </Text>
                <Text className="text-white text-lg font-semibold">
                  ₹ {item.price}
                </Text>
              </View>
            </Pressable>
          ))}
        </Swiper>
      </View>
    );
  };

  const renderProductGrid = () => {
    if (loading) {
      return (
        <View className="h-32 justify-center items-center">
          <ActivityIndicator size="large" color="#334155" />
        </View>
      );
    }

    return (
      <View className="px-4">
        <Text className="text-lg font-bold text-slate-800 mb-2">
          {Object.keys(selectedTags).length === 0
            ? 'Our Collection'
            : selectedTags.name}
        </Text>
        <View className="flex-row flex-wrap justify-between">
          {allProducts.map((item, i) => (
            <ProductCard
              key={i}
              item={item}
              navigation={navigation}
              className="w-[48%] mb-2"
            />
          ))}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {renderHeaderBar()}
      <ScrollView ref={scrollRef} scrollEventThrottle={16} className="pb-10">
        {renderTagsBar()}
        {renderFeaturedSlider()}
        {renderProductGrid()}
        {!loading && (
          <View className="flex justify-center items-center p-8">
            <Pressable
              className="bg-black py-3 rounded-full shadow-lg px-16 flex items-center"
              onPress={() => setPage(page + 1)}>
              <Text className="text-white text-base font-mulish_medium">
                Loading
              </Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
      <FilterModal
        showFilter={showFilter}
        setShowFilter={setShowFilter}
        brands={brands}
        setSelectBrands={setSelectBrands}
      />
    </SafeAreaView>
  );
};

const FilterModal = ({showFilter, setShowFilter, brands, setSelectBrands}) => {
  const [selectedBrandsF, setSelectedBrandsF] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const closeFilter = () => {
    setShowFilter(false);

    setTimeout(() => setExpanded(false), 300);
  };

  const toggleBrand = brand => {
    const isSelected = selectedBrandsF.includes(brand.brand_id);

    if (isSelected) {
      setSelectedBrandsF(selectedBrandsF.filter(id => id !== brand.brand_id));
    } else {
      setSelectedBrandsF([...selectedBrandsF, brand.brand_id]);
    }
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <Modal
      style={{margin: 0, justifyContent: 'flex-end'}}
      avoidKeyboard={true}
      isVisible={showFilter}
      onBackdropPress={closeFilter}
      onSwipeComplete={closeFilter}
      swipeDirection="down"
      propagateSwipe={true}
      backdropOpacity={0.5}
      animationIn="slideInUp"
      animationOut="slideOutDown">
      <View
        className={`bg-white rounded-t-3xl ${expanded ? 'h-2/4' : 'h-4/5'}`}>
        {/* Handle for dragging */}
        <View className="items-center pt-2 pb-4">
          <Pressable onPress={toggleExpand}>
            <View className="w-16 h-1 bg-gray-300 rounded-full my-1" />
          </Pressable>
        </View>

        <View className="flex-row justify-between items-center px-6 border-b border-slate-100 pb-2">
          <View className="flex-row items-baseline">
            <Text className="text-xl font-bold text-slate-800 mr-2">
              Refine
            </Text>
            <Text className="text-base text-slate-500">Selection</Text>
          </View>
          <Pressable onPress={closeFilter} className="p-2">
            <X color="#1e293b" size={24} />
          </Pressable>
        </View>

        <ScrollView className="px-6 py-2">
          <View className="mb-3">
            <Text className="text-base font-semibold text-slate-800 mb-1.5">
              Brands
            </Text>
            <View className="flex-row flex-wrap">
              {brands.map((brand, index) => {
                const isSelected = selectedBrandsF.includes(brand.brand_id);
                return (
                  <Pressable
                    key={index}
                    className={`px-4 py-1 mr-2.5 mb-1.5 rounded-lg border ${
                      isSelected
                        ? 'bg-slate-800 border-slate-800'
                        : 'bg-slate-100 border-slate-200'
                    }`}
                    onPress={() => toggleBrand(brand)}>
                    <Text
                      className={`text-sm ${
                        isSelected ? 'text-white' : 'text-slate-500'
                      }`}>
                      {brand.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        </ScrollView>

        <View className="flex-row justify-between px-6 py-2 border-t border-slate-100">
          <Pressable
            onPress={() => setSelectedBrandsF([])}
            className="px-6 py-1.5 rounded-lg border border-slate-800 w-[48%] items-center">
            <Text className="text-base font-medium text-slate-800">Reset</Text>
          </Pressable>
          <Pressable
            onPress={() => setSelectBrands([...selectedBrandsF])}
            className="px-6 py-1.5 rounded-lg bg-slate-800 w-[48%] items-center">
            <Text className="text-base font-medium text-white">Apply</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ProductScreen;
