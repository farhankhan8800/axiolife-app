import {Pressable, SafeAreaView, ScrollView, Text, View} from 'react-native';
import React, {useState} from 'react';

import SmallHeader from '../../components/SmallHeader';
import {user_address} from '../../utils/data_';
import {TYPO} from '../../assets/typo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

const UserAddress = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1 bg-[#F6F6F6]">
      <SmallHeader name="Your Address" />
      <ScrollView className="flex-1">
        <View className="px-3 pt-7">
          {user_address.map((item, i) => {
            return (
              <View
                style={{
                  borderColor: item.isDefault
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
                    <Pressable>
                      <AntDesign
                        name={'delete'}
                        color={TYPO.colors.dark}
                        size={responsiveFontSize(2.2)}
                      />
                    </Pressable>
                    {item.isDefault ? (
                      <Pressable>
                        <AntDesign
                          name={'checksquare'}
                          color={TYPO.colors.main}
                          size={responsiveFontSize(2.2)}
                        />
                      </Pressable>
                    ) : (
                      <Pressable>
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
                    {item.name}
                  </Text>
                  <Text className="text-base text-dark_blue font-mulish_medium ">
                    {item.phone}
                  </Text>
                  <Text className="text-base text-dark_blue font-mulish_medium ">
                    {item.address}
                  </Text>
                  <Text className="text-base text-dark_blue font-mulish_medium ">
                    {item.landmark}
                  </Text>
                  <Text className="text-base text-dark_blue font-mulish_medium ">
                    {item.city}
                  </Text>
                  <Text className="text-base text-dark_blue font-mulish_medium ">
                    {item.state}
                  </Text>
                  <Text className="text-base text-dark_blue font-mulish_medium ">
                    {item.country} - {item.pincode}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
      <View className="px-3 my-3">
        <Pressable onPress={()=>navigation.navigate('AddAddress')} className=" bg-main py-3 rounded-xl border border-main  flex items-center">
          <Text className="text-white text-lg font-mulish_semibold">
            Add New Address
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default UserAddress;
