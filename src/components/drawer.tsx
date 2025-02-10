import {View, Text, Pressable} from 'react-native';
import React, {useState} from 'react';
import {AlignLeft, Menu, X} from 'react-native-feather';
import {TYPO} from '../assets/typo';
import Modal from 'react-native-modal';
import { responsiveFontSize } from 'react-native-responsive-dimensions';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';


const Deawer= () => {
  const [isModalVisible, setModalVisible] = useState(false);

   const navigation = useNavigation<NavigationProp<RootStackParamList>>();



  return (
    <>
      <Pressable className="" onPress={() => setModalVisible(true)}>
        <AlignLeft color={TYPO.colors.dark_blue}  />
      </Pressable>
      <Modal
        style={{margin: 0}}
        animationIn="slideInLeft"
        animationOut="slideOutLeft"
        avoidKeyboard={true}
        isVisible={isModalVisible}>
        <View className="bg-white flex-1 max-w-[80%] px-2 py-4">
            <View className="justify-between flex-row">
              <View className="flex justify-center flex-row items-baseline">
                <Text className="text-dark_blue text-2xl font-mulish_exbold">
                  AXIO
                </Text>
                <Text className="text-dark_blue text-lg font-mulish_medium">
                  Life
                </Text>
              </View>
              <Pressable onPress={() => setModalVisible(false)}>
                <X color={TYPO.colors.dark_blue} />
              </Pressable>
            </View>
            <View>
               <Pressable onPress={()=>navigation.navigate('NoInternet')}>
                <Text>No Internet</Text>
               </Pressable>
  
            </View>
          </View>
      </Modal>
    </>
  );
};

export default Deawer;
