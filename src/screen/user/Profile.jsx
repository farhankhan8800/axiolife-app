import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {getFirstLetter} from '../../utils/utils';

// Profile menu items
const menuItems = [
  {
    id: 1,
    name: 'Account information',
    icon: 'person-outline',
    iconType: 'Ionicons',
    route: 'EditProfile',
  },
  {
    id: 2,
    name: 'Order',
    icon: 'account-group-outline',
    iconType: 'MaterialCommunityIcons',
    route: 'UserOrder',
  },
  {
    id: 3,
    name: 'Login activity',
    icon: 'login',
    iconType: 'MaterialCommunityIcons',
    route: 'LoginActivity',
  },
  {
    id: 4,
    name: 'Application settings',
    icon: 'cog-outline',
    iconType: 'MaterialCommunityIcons',
    route: 'Settings',
  },
  {
    id: 5,
    name: 'Support center',
    icon: 'headset',
    iconType: 'MaterialCommunityIcons',
    route: 'Support',
  },
  {
    id: 6,
    name: 'Terms and conditions',
    icon: 'file-document-outline',
    iconType: 'MaterialCommunityIcons',
    route: 'Terms',
  },
  {
    id: 7,
    name: 'Privacy and policy',
    icon: 'shield-check-outline',
    iconType: 'MaterialCommunityIcons',
    route: 'Privacy',
  },
];

const Profile = ({navigation}) => {
  const {user, isAuthenticated} = useSelector(state => state.auth);

  const renderIcon = item => {
    const iconStyle = {
      backgroundColor: '#f2f2f2',
      width: 32,
      height: 32,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    };

    return (
      <View style={iconStyle}>
        {item.iconType === 'Ionicons' ? (
          <Ionicons name={item.icon} size={18} color="#333" />
        ) : (
          <MaterialCommunityIcons name={item.icon} size={18} color="#333" />
        )}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 bg-white">
        {/* Profile Header */}
        <View className="items-center pt-8 pb-4 px-5">
          <View className="relative mb-3">
            {isAuthenticated && user?.profileImage ? (
              <Image
                source={{uri: user.profileImage}}
                className="w-16 h-16 rounded-full border border-gray-200"
              />
            ) : (
              <View className="w-16 h-16 rounded-full bg-gray-100 justify-center items-center border border-gray-200">
                <Text className="text-gray-500 text-2xl font-bold">
                  {isAuthenticated
                    ? getFirstLetter(user?.name || user?.email || 'U')
                    : 'G'}
                </Text>
              </View>
            )}
            {
              isAuthenticated &&  <Pressable
              className="absolute right-0 bottom-0 bg-black rounded-full w-6 h-6 justify-center items-center border border-white"
              onPress={() => navigation.navigate('EditProfile')}>
              <FontAwesome6 name="pen" size={10} color="#fff" />
            </Pressable>
            }
           
          </View>
          <Text className="text-lg font-bold text-gray-800 mb-1">
            {isAuthenticated ? user?.name || 'User Name' : 'Guest User'}
          </Text>
          {isAuthenticated ? (
            <Text className="text-xs text-gray-500">
              {user?.email || 'example@email.com'}
            </Text>
          ) : (
            <Pressable
              className="bg-gray-100 py-2 px-4 rounded-xl mt-2"
              onPress={() => navigation.navigate('SignIn')}>
              <Text className="text-gray-800 text-sm font-medium">
                Login / Sign up
              </Text>
            </Pressable>
          )}
        </View>

        {/* Menu Items */}
        <View className="px-5 pt-2 pb-20">
          {menuItems.map((item, index) => (
            <Pressable
              key={item.id}
              className={`flex-row justify-between items-center py-3.5 ${
                index < menuItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
              onPress={() => navigation.navigate(item.route)}>
              <View className="flex-row items-center">
                {renderIcon(item)}
                <Text className="text-sm text-gray-700 ml-3">{item.name}</Text>
              </View>
              <FontAwesome6 name="chevron-right" size={12} color="#ccc" />
            </Pressable>
          ))}

          {isAuthenticated && (
            <Pressable
              className="flex-row items-center mt-8 py-3.5 border-t border-gray-100"
              onPress={() => console.log('Logout')}>
              <View className="bg-gray-100 w-8 h-8 rounded-lg justify-center items-center">
                <Ionicons name="log-out-outline" size={18} color="#333" />
              </View>
              <Text className="text-gray-700 ml-3 text-sm font-medium">
                Log out account
              </Text>
            </Pressable>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
