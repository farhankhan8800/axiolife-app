import {Image, Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import SmallHeader from '../../components/SmallHeader';
import {user_address} from '../../utils/data_';
import {TYPO} from '../../assets/typo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {
  DELETE_ADDRESS_API,
  GET_ADDRESS_API,
  SET_PRIMARY_ADDRESS_API,
} from '../../service/API';
import MakeRequest from '../../utils/axiosInstance';
import Toast from 'react-native-toast-message';
import {Skeleton} from 'react-native-skeletons';

const UserAddress = ({navigation}) => {
  const [addressList, setAddressList] = useState([]);
  const [loading, setLoading] = useState(false);

  const get_address = async () => {
    addressList.length == 0 && setLoading(true);

    try {
      const data = await MakeRequest(
        GET_ADDRESS_API,
        {},
        {},
        'application/json',
      );

      if (data.status == 1) {
        console.log(data.response.addresses);
        setAddressList(data.response.addresses);
      }
    } catch (error) {
      console.error('address get failed:', error);
      Toast.show({
        type: 'BasicToast',
        text1: 'Something went wrong. Please try again.',
        position: 'bottom',
        visibilityTime: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    get_address();
  }, []);

  const make_primary_address = async value => {
    try {
      const data = await MakeRequest(
        SET_PRIMARY_ADDRESS_API,
        {address_id: value},
        {},
        'application/json',
      );

      if (data.status == 1) {
        Toast.show({
          type: 'GreenToast',
          text1: 'Make Address primary successfull',
          position: 'bottom',
          visibilityTime: 2000,
        });
        get_address();
      }
    } catch (error) {
      console.error('address get failed:', error);
      Toast.show({
        type: 'BasicToast',
        text1: 'Something went wrong. Please try again.',
        position: 'bottom',
        visibilityTime: 5000,
      });
    }
  };

  const delete_address = async value => {
    try {
      const data = await MakeRequest(
        DELETE_ADDRESS_API,
        {address_id: value},
        {},
        'application/json',
      );

      if (data.status == 1) {
        Toast.show({
          type: 'GreenToast',
          text1: ' Address delete success',
          position: 'bottom',
          visibilityTime: 2000,
        });
        get_address();
      }
    } catch (error) {
      console.error('address get failed:', error);
      Toast.show({
        type: 'BasicToast',
        text1: 'Something went wrong. Please try again.',
        position: 'bottom',
        visibilityTime: 5000,
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F6F6F6]">
      <SmallHeader name="Your Address" />
      <ScrollView className="flex-1">
        <View className="px-3 pt-7">
          {loading && (
            <View className="gap-5">
              <Skeleton
                count={2}
                width={responsiveWidth(93)}
                height={responsiveWidth(40)}
              />
            </View>
          )}
          {addressList.length == 0 && !loading && (
            <View className="flex-1 justify-center items-center py-10">
              <Image
                source={require('../../assets/image/map-pin.png')}
                resizeMode="contain"
                style={{
                  height: responsiveWidth(16),
                  width: responsiveWidth(16),
                  marginBottom: responsiveHeight(3),
                }}
                // className="h-20 w-20"
              />
              <Text className="text-center text-lg text-dark_blue font-mulish_semibold ">
                No Address found
              </Text>
            </View>
          )}
          {addressList.map((item, i) => {
            return (
              <View
                style={{
                  borderColor:
                    item.primary_address == 1
                      ? TYPO.colors.light_gray
                      : 'transparent',
                }}
                className="p-5 rounded-lg border-[2px]  bg-light mb-5"
                key={i}>
                <View className="pb-3 flex-row justify-between items-center">
                  <Text className="text-xl text-gray-600 font-mulish_semibold uppercase">
                    {item.type}
                  </Text>
                  <View className="flex-row gap-6">
                    <Pressable onPress={() => delete_address(item.id)}>
                      <AntDesign
                        name={'delete'}
                        color={TYPO.colors.dark}
                        size={responsiveFontSize(2.2)}
                      />
                    </Pressable>
                    {item.primary_address == 1 ? (
                      <Pressable>
                        <AntDesign
                          name={'checksquare'}
                          color={TYPO.colors.axiocolor}
                          size={responsiveFontSize(2.2)}
                        />
                      </Pressable>
                    ) : (
                      <Pressable onPress={() => make_primary_address(item.id)}>
                        <AntDesign
                          name={'checksquareo'}
                          color={TYPO.colors.dark}
                          size={responsiveFontSize(2.2)}
                        />
                      </Pressable>
                    )}
                  </View>
                </View>
                <View>
                  <Text className="text-lg text-dark_blue font-mulish_medium mb-1">
                    {item.address_line1}
                  </Text>
                  <Text className="text-base text-dark_blue font-mulish_medium ">
                    {item.address_line2}
                  </Text>

                  <Text className="text-base text-dark_blue font-mulish_medium ">
                    {item.city}
                  </Text>
                  <Text className="text-base text-dark_blue font-mulish_medium ">
                    {item.state}
                  </Text>
                  <Text className="text-base text-dark_blue font-mulish_medium ">
                    {item.country} - {item.postal_code}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View className="px-3 my-3">
        <Pressable
          onPress={() => navigation.navigate('AddAddress')}
          className=" bg-main py-3 rounded-xl border border-main  flex items-center">
          <Text className="text-white text-lg font-mulish_semibold">
            Add New Address
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default UserAddress;
