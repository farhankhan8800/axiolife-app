import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getFirstLetter} from '../../utils/utils';
import {useSelector} from 'react-redux';
import {TYPO} from '../../assets/typo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LogoutScreen from '../../components/LogoutScreen';

const ProfileScreen = ({navigation}) => {
  const {user, isAuthenticated} = useSelector(state => state.auth);

  const renderMenuItem = ({
    icon,
    title,
    rightContent,
    onPress,
    iconType = 'Feather',
  }) => (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center px-4 py-4">
      <View className="w-12 h-12 bg-gray-100 rounded-full items-center justify-center mr-4">
        {iconType === 'Feather' ? (
          <Ionicons name={icon} size={24} color="#1e293b" />
        ) : (
          <MaterialIcon name={icon} size={24} color="#1e293b" />
        )}
      </View>
      <Text className="flex-1 text-lg text-[#1e293b] font-medium">{title}</Text>
      {rightContent || (
        <Ionicons name="arrow-forward-outline" size={24} color="#1e293b" />
      )}
    </TouchableOpacity>
  );

  // Not logged in screen with just login button
  if (!isAuthenticated) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50">
        <StatusBar backgroundColor="#f9fafb" barStyle="dark-content" />

        {/* Header */}
        <View className="flex-row items-center px-4 py-2">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back-outline" size={28} color="#1e293b" />
          </TouchableOpacity>
        </View>

        {/* Login CTA Container */}
        <View className="flex-1 justify-center items-center px-6">
          <View className="w-24 h-24 bg-[#1e293b] rounded-full items-center justify-center mb-6">
            <Ionicons name="lock-closed-outline" size={40} color="#ffffff" />
          </View>

          <Text className="text-xl text-[#1e293b] font-bold text-center mb-4">
            Create your account or login
          </Text>

          <Text className="text-base text-gray-500 text-center mb-8">
            Sign in to access your personal information, connect email accounts,
            and manage your preferences
          </Text>

          <TouchableOpacity
            style={{backgroundColor: TYPO.colors.axiocolor}}
            className="w-full  py-4 rounded-full items-center justify-center"
            onPress={() => navigation.navigate('SignIn')}>
            <Text className="text-white text-lg font-medium">
              Sign in or Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Logged in user view - showing full profile
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <StatusBar backgroundColor="#f9fafb" barStyle="dark-content" />

      {/* Header */}
      <View className="flex-row items-center px-4 py-2">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={28} color="#1e293b" />
        </TouchableOpacity>
      </View>

      <ScrollView className="flex-1">
        {/* Profile Section */}
        <View className="bg-white mx-4 my-4 rounded-3xl p-6">
          <View className="flex-row items-center">
            {user?.profileImage ? (
              <Image
                source={{uri: user.profileImage}}
                className="w-16 h-16 rounded-full border border-gray-200"
              />
            ) : (
              <View className="w-16 h-16 bg-[#1e293b] rounded-full items-center justify-center">
                <Text className="text-white text-2xl font-bold">
                  {getFirstLetter(user?.name || user?.email || 'U')}
                </Text>
              </View>
            )}
            <View className="ml-4 flex-1">
              <View className="flex-row items-center">
                <Text className="text-lg text-[#1e293b] font-medium">
                  {user.name}
                </Text>
                <TouchableOpacity className="ml-2">
                  <Ionicons name="checkmark-circle" size={18} color="#1e293b" />
                </TouchableOpacity>
              </View>
              <Text className="text-lg text-[#1e293b]">{user.phone}</Text>
            </View>
          </View>
        </View>
        <View className="bg-white mx-4 my-2 rounded-3xl overflow-hidden">
          {renderMenuItem({
            icon: 'person',
            title: 'Personal information',
            onPress: () => navigation.navigate('EditProfile'),
          })}
          {renderMenuItem({
            icon: 'settings',
            title: 'App settings',
            onPress: () => navigation.navigate('Profile'),
          })}
        </View>
        {/* Menu Sections */}
        <View className="bg-white mx-4 my-2 rounded-3xl overflow-hidden">
          {renderMenuItem({
            icon: 'grid',
            title: 'My Orders',
            onPress: () => navigation.navigate('UserOrder'),
          })}
          {renderMenuItem({
            icon: 'notifications',
            title: 'Notifications',
            onPress: () => navigation.navigate('Notification'),
          })}
          {renderMenuItem({
            icon: 'cart',
            title: 'Cart',
            onPress: () => navigation.navigate('Cart'),
          })}

          {renderMenuItem({
            icon: 'airplane',
            title: 'Addresses',
            onPress: () => navigation.navigate('AddAddress'),
          })}

          {renderMenuItem({
            icon: 'heart',
            title: 'Wishlist',
            onPress: () => navigation.navigate('UserFavorite'),
          })}
        </View>

        {/* orders */}

        {/* Support Section */}
        <View className="bg-white mx-4 my-2 rounded-3xl overflow-hidden">
          <View className="px-4 pt-4 pb-2">
            <Text className="text-xl text-[#1e293b] font-bold">Support</Text>
          </View>

          {renderMenuItem({
            icon: 'information-circle',
            title: 'Help Desk',
            onPress: () => navigation.navigate('HelpDesk'),
          })}
          {renderMenuItem({
            icon: 'call',
            title: 'Contact Us',
            onPress: () => navigation.navigate('ContactUs'),
          })}
          {renderMenuItem({
            icon: 'document-text',
            title: 'Terms & conditions',
            onPress: () => navigation.navigate('PrivacyTc'),
          })}
          {renderMenuItem({
            icon: 'document-lock',
            title: 'Privacy & Policy',
            onPress: () => navigation.navigate('PrivacyTc'),
          })}
        </View>

        {/* Support Us Section */}
        <View className="bg-white mx-4 my-2 rounded-3xl overflow-hidden">
          <View className="px-4 pt-4 pb-2">
            <Text className="text-xl text-[#1e293b] font-bold">Support us</Text>
          </View>

          {renderMenuItem({
            icon: 'star-half-outline',
            title: 'Rate us on App Store',
            onPress: () => navigation.navigate('RateUs'),
          })}
        </View>

        {/* Logout Button */}
        {isAuthenticated && (
          <LogoutScreen setModalVisible={null} option="profile" />
        )}

        {/* Footer Security Info */}
        <View className="flex-row justify-around items-center my-4 mb-8">
          <View className="items-center">
            <Ionicons name="lock-closed-outline" size={24} color="#1e293b" />
            <Text className="text-xs text-gray-500 mt-1">256-bit</Text>
            <Text className="text-xs text-gray-500">Encrypted</Text>
          </View>
          <View className="items-center">
            <Ionicons name="finger-print-outline" size={24} color="#1e293b" />
            <Text className="text-xs text-gray-500 mt-1">100%</Text>
            <Text className="text-xs text-gray-500">Secured</Text>
          </View>
          <View className="items-center">
            <Ionicons name="cloud-done-outline" size={24} color="#1e293b" />

            <Text className="text-xs text-gray-500 mt-1">27001</Text>
            <Text className="text-xs text-gray-500">Certified</Text>
          </View>
        </View>

        {/* App Version */}
        <Text className="text-center text-gray-500 mb-6">v. 2.3.0 (314)</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
