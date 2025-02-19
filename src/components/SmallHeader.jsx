import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {AlignLeft, ShoppingBag} from 'react-native-feather';
import {TYPO} from '../assets/typo';
// import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {
  NavigationProp,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';
import {gstyle} from '../assets/gstyle';

const SmallHeader = ({name, showSearch = true}) => {
  const navigation = useNavigation();

  return (
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
        className="text-dark_blue text-lg font-medium capitalize"
        numberOfLines={1}>
        {name}
      </Text>

      {showSearch ? (
        <Pressable
          onPress={() => navigation.navigate('Search')}
          className="relative p-2 ">
          <Ionicons
            name={'search'}
            color={TYPO.colors.dark}
            size={responsiveFontSize(2.4)}
          />
        </Pressable>
      ) : (
        <View className="w-[14px]"></View>
      )}
    </View>
  );
};

export default SmallHeader;
