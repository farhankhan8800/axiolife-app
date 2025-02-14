import {
  FlatList,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {Search} from 'react-native-feather';
import SmallHeader from '../../components/SmallHeader';
import Entypo from 'react-native-vector-icons/Entypo';
import {TYPO} from '../../assets/typo';
import {faqdata} from '../../utils/data_';
import {responsiveFontSize} from 'react-native-responsive-dimensions';

const PrivacyTc = () => {
  const [openTab, setOpenTab] = useState('PRIVACY'); // TREAM

  useEffect(() => {}, []);

  return (
    <SafeAreaView className="flex-1 bg-[#F6F6F6]">
      <SmallHeader
        name="Privacy Policy / Terms Conditions"
        showSearch={false}
      />
      <ScrollView className="flex-1">
        <View className="px-4 pt-5">
          <View className="flex-row justify-around gap-2 ">
            <Pressable onPress={() => setOpenTab('PRIVACY')} className="px-2">
              <Text
                className={`text-lg ${
                  openTab == 'PRIVACY' ? 'text-blue-500' : 'text-gray-600'
                } `}>
                Privacy and Policy
              </Text>
            </Pressable>
            <Pressable onPress={() => setOpenTab('TREAM')} className="px-2">
              <Text
                className={`text-lg ${
                  openTab == 'TREAM' ? 'text-blue-500' : 'text-gray-600'
                } `}>
                Terms and Conditions
              </Text>
            </Pressable>
          </View>
          {openTab == 'PRIVACY' && <PRIVACY />}
          {openTab == 'TREAM' && <TREAM />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyTc;

const PRIVACY = () => {
  return (
    <View className="mt-6">
      <Text className="text-2xl pb-3 font-mulish_semibold">
        We’re here to help you with anything and everyting on  Privacy and Policy
      </Text>
      <Text className="text-sm font-mulish_regular">
        At Viral Pitch we expect at a day’s start is you, better and happier
        than yesterday. We have got you covered share your concern or check our
        frequently asked questions listed below.
      </Text>
    </View>
  );
};

const TREAM = () => {
  return (
    <View className="mt-6">
      <Text className="text-2xl pb-3 font-mulish_semibold">
        We’re here to help you with anything and everyting on Terms and Conditions
      </Text>
      <Text className="text-sm font-mulish_regular">
        At Viral Pitch we expect at a day’s start is you, better and happier
        than yesterday. We have got you covered share your concern or check our
        frequently asked questions listed below.
      </Text>
    </View>
  );
};