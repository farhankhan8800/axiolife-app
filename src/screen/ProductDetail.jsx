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
import React, {useRef, useState} from 'react';
import {_product_data, _store_data, product_details} from '../utils/data_';
import SmallHeader from '../components/SmallHeader';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {TYPO} from '../assets/typo';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { WebViewAutoAdjust } from '../components/WebViewAutoAdjust';


const ProductDetail = ({
  navigation,
}) => {
  const [showImage, setShowImage] = useState(product_details.image[0]);


  const  productFound = true;

  if(!productFound){
     return navigation.navigate('NotFound')
  }

  return (
    <SafeAreaView className="flex-1 bg-[#fff]">
      <ScrollView className="w-full">
        <View className="p-3">
          <View
            style={{height: responsiveHeight(50)}}
            className="flex-1 overflow-hidden bg-gray-200 pt-3 rounded-[30px]">
            <SmallHeader name="Sneakers Detail" />
            <View className="w-full h-auto p-5 overflow-hidden ">
              <Image
                source={{uri: showImage}}
                style={{width: '100%', height: responsiveHeight(37)}}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          className="mt-3">
          <View className="px-3 flex-row">
            {product_details.image.map((item, i) => {
              return (
                <Pressable
                  onPress={() => setShowImage(item)}
                  style={{
                    borderWidth: 2,
                    borderColor:
                      showImage === item ? TYPO.colors.main : 'transparent',
                  }}
                  className={`p-1 border-2  bg-gray-200 mx-2 overflow-hidden rounded-2xl`}
                  key={i}>
                  <Image
                    source={{uri: item}}
                    style={{
                      height: responsiveWidth(16),
                      width: responsiveWidth(16),
                    }}
                    resizeMode="contain"
                  />
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        <View className='flex-row px-4 mt-5 justify-between items-start'>
          <Text numberOfLines={2} style={{width:responsiveWidth(76)}} className='text-lg font-mulish_semibold'>{product_details.title}</Text>
          <Pressable className="">
            {product_details.like == 1 ? (
              <Icon
                name="heart"
                color={TYPO.colors.main}
                size={responsiveFontSize(2.2)}
              />
            ) : (
              <Icon
                name="hearto"
                color={'gray'}
                size={responsiveFontSize(2.2)}
              />
            )}
          </Pressable>
        </View>
        <View className='flex-row px-4 mt-7 justify-start items-baseline'>
          <Text className='text-2xl font-mulish_bold text-dark_blue leading-tight pr-3'>
            ${product_details.discount_price}/-
          </Text>
         <View className='relative'> 
          <View className='absolute bg-gray-500 top-3' style={{width:responsiveWidth(12), height:2}} ></View>
          <Text className='text-lg font-semibold text-dark leading-tight'>
            ${product_details.price}/-
          </Text>
         </View>
        </View>
        <View className='flex-row px-4 mt-7 justify-start items-center gap-3'>
          <View className='px-4 py-1 bg-gray-200 rounded-full'>
            <Text className='text-base text-dark font-mulish_medium '>Left {product_details.stock}</Text>
          </View>
          <View className='px-4 py-1 bg-gray-200 rounded-full'>
            <Text className='text-base text-dark font-mulish_medium '>Sold {product_details.sold_count}</Text>
          </View>
          <View className='px-4 py-1 bg-gray-200 rounded-full'>
            <Text className='text-base text-dark font-mulish_medium '> 
               <Icon
                name="star"
                color={'#ffde21'}
                size={responsiveFontSize(1.6)}
              /> {product_details.star}  <Text className='text-sm text-gray-700'>({product_details.reviews} Reviews)</Text></Text>
          </View>
        </View>

        <View className=' mt-7'>
          <Text className="text-xl px-4 font-mulish_semibold text-dark_blue">Color</Text>
         <ScrollView horizontal={true}
          showsHorizontalScrollIndicator={false}>
         <View className='flex-row px-4 gap-6 mt-5'>
          {
            product_details.color.map((item ,i)=>{
              return( <Pressable key={i} style={{borderColor:item}} className='p-2 border-[1px] rounded-full'>
                <View style={{backgroundColor:item}} className='h-4 w-4 rounded-full'></View>
              </Pressable>)
            })
          }
         
         </View>
         </ScrollView>
        </View>

        <View className=' mt-7 '>
          <View className='px-4 flex-row justify-between items-center'>
          <Text className="text-xl  font-mulish_semibold text-dark_blue">Select Size</Text>
          <Pressable>
           <Text className='text-blue-400 text-sm font-mulish_medium'>Size Chart</Text>
          </Pressable>
          </View>
         
         <ScrollView horizontal={true}
          showsHorizontalScrollIndicator={false}>
         <View className='flex-row px-4 gap-3 mt-5'>
          {
            product_details.size.map((item ,i)=>{
              return( <Pressable key={i} className='w-14 h-14 justify-center items-center bg-gray-100 border-[1px] border-gray-500 rounded-full'>
                <Text className='text-lg text-dark_blue font-mulish_medium'>{item}</Text>
              </Pressable>)
            })
          }
         
         </View>
         </ScrollView>
        </View>
        <View style={{marginBottom:responsiveHeight(8)}} className=' mt-7 px-4'>
         <Text className="text-xl  font-mulish_semibold text-dark_blue">More Deatil</Text>
         <WebViewAutoAdjust description={product_details.details} />
         
        
        </View>

      </ScrollView>
      <View className='flex-row justify-between items-center px-4 py-2 pt-1 '>
        <Pressable className=' border-[1px] justify-center  items-center p-2 rounded-full border-main'>
          <Ionicons
                name="chatbox-ellipses-outline"
                color={TYPO.colors.main}
                size={responsiveFontSize(2.4)}
              />
        </Pressable>
        <Pressable className='flex-row gap-3 border-[1px] w-[40%] justify-center  items-center py-2 px-5 rounded-full border-main'>
        <FontAwesome5
                name="shopping-basket"
                color={TYPO.colors.main}
                size={responsiveFontSize(2.2)}
              />
          <Text className="text-base font-semibold text-main ">Add to Cart</Text>
        </Pressable>
        <Pressable className='border-[1px] w-[45%] justify-center  items-center bg-main py-2 px-5 rounded-full border-main'>
          <Text className="text-base text-center font-semibold text-light ">Buy Now</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ProductDetail;
