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
import React from 'react';

import HomeHeader from '../../components/HomeHeader';
import BottomTab from '../../components/BottomTab';
import {gstyle} from '../../assets/gstyle';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {TYPO} from '../../assets/typo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getFirstLetter, getRandomColor} from '../../utils/utils';
import {useSelector} from 'react-redux';

let link_ = [
  {
    id: 1,
    name: 'Address',
    icon: 'source-commit-next-local',
    route: 'Address',
  },
  {
    id: 2,
    name: 'My Favourites',
    icon: 'heart-outline',
    route: 'UserFavorite',
  },
  {
    id: 3,
    name: 'Notification',
    icon: 'message-badge-outline',
    route: 'Notification',
  },
  {
    id: 4,
    name: 'My Orders',
    icon: 'alpha-o-circle-outline',
    route: 'UserOrder',
  },
];

const Profile = ({navigation}) => {


  const {user, token, isAuthenticated} = useSelector(state => state.auth);

  return (
    <SafeAreaView className="flex-1 bg-[#F6F6F6]">
      <View className="px-3 pt-4 pb-2 flex-row  justify-between items-center">
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
          My Profile
        </Text>
        {isAuthenticated ? (
          <Pressable
            onPress={() => navigation.navigate('EditProfile')}
            style={gstyle.shadow_s}
            className="">
            <Text className="text-dark_blue text-base capitalize font-mulish_regular underline max-w-64">
              Edit
            </Text>
          </Pressable>
        ) : (
          <View className='w-16'></View>
        )}
      </View>
      <ScrollView className="flex-1">
        <View className="px-3 pt-7">
          <View className="px-3 flex-row justify-start items-center gap-3">
            <View
              style={{backgroundColor: getRandomColor(9)}}
              className="h-14 w-14 rounded-full justify-center items-center">
              <Text className="text-light uppercase text-3xl font-mulish_bold">
                {
                  isAuthenticated ? <>{getFirstLetter(user.name || user.phone)}</> :"G"
                }
                
              </Text>
            </View>
            <View>
              <Text className="text-xl text-dark_blue upp font-bold mb-2">
                Welcome {
                  isAuthenticated? (
                    user?.name || user.phone
                  ) : 'Guest'
                } 
              </Text>

              <Pressable
                onPress={() => {
                  !isAuthenticated && navigation.navigate('SignIn');
                }}
                className="py-2 px-4 rounded-xl bg-gray-200">
                <Text className="text-[14px] text-gray-600 text-center uppercase font-mulish_bold">
                  {isAuthenticated ? user.phone : 'Login/Sign UP'}
                </Text>
              </Pressable>
            </View>
          </View>
          <View className="mt-7 px-1">
            {link_.map((item, i) => {
              return (
                <Pressable
                  key={item.id}
                  onPress={() =>
                    navigation.navigate(
                      isAuthenticated
                        ? {
                            name: item.route,
                          }
                        : 'SignIn',
                    )
                  }
                  style={{opacity:isAuthenticated ? 1:.5} }
                  className={`py-4 px-1 border-b-[1px]  border-gray-200 flex-row justify-between items-center mb-1`}>
                  <View className="flex-row justify-start items-center gap-3">
                    <MaterialCommunityIcons
                      name={item.icon}
                      color={TYPO.colors.dark}
                      size={responsiveFontSize(2.1)}
                    />
                    <Text className="text-base text-dark_blue font-mulish_semibold">
                      {item.name}
                    </Text>
                  </View>
                  <View>
                    <FontAwesome6
                      name={'angle-right'}
                      color={TYPO.colors.light_gray}
                      size={responsiveFontSize(1.6)}
                    />
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
