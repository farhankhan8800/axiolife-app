import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {AlignLeft, ShoppingBag} from 'react-native-feather';
import {TYPO} from '../assets/typo';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/types';
import { gstyle } from '../assets/gstyle';

interface SHProps {
  name: string;
}

const SmallHeader: React.FC<SHProps> = ({name}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
        numberOfLines={1}>{name}</Text>

      {/* <Pressable style={gstyle.shadow_s} className="relative p-2 bg-gray-200 rounded-full">
        <Entypo
          name={'dots-three-vertical'}
          color={TYPO.colors.dark}
          size={responsiveFontSize(2.2)}
        />
      </Pressable> */}
      <View className='w-10'></View>
    </View>
  );
};

export default SmallHeader;
