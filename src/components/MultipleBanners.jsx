import React from 'react';
import {View, Pressable, Image} from 'react-native';
import Swiper from 'react-native-swiper';
import {responsiveHeight} from 'react-native-responsive-dimensions';

const BannerSwiper = ({
  banners = [],
  onBannerPress,
  height = responsiveHeight(26),
  autoplayTimeout = 5,
}) => {
  if (!banners || banners.length === 0) {
    return null;
  }

  return (
    <Swiper
      autoplay={true}
      autoplayTimeout={autoplayTimeout}
      loop={true}
      horizontal={true}
      height={height}
      showsPagination={true}
      paginationStyle={{bottom: 20}}
      dotStyle={{
        backgroundColor: 'rgba(255,255,255,0.4)',
        width: 8,
        height: 8,
        borderRadius: 4,
        margin: 4,
      }}
      activeDotStyle={{
        backgroundColor: '#ffffff',
        width: 10,
        height: 10,
        borderRadius: 5,
        margin: 4,
      }}
      containerStyle={{
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(-1),
      }}>
      {banners.map((item, i) => (
        <View key={i} className="w-full px-3">
          <Pressable
            onPress={() => onBannerPress && onBannerPress(item, i)}
            style={{
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.1,
              shadowRadius: 8,
              elevation: 4,
            }}>
            <Image
              source={{
                uri: item.mobileImage,
              }}
              resizeMode="cover"
              className="w-full h-56 rounded-2xl"
              style={{
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.05)',
              }}
            />
          </Pressable>
        </View>
      ))}
    </Swiper>
  );
};

export default BannerSwiper;
