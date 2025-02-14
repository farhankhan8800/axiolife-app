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

const HelpDesk = () => {
  const [query, setQuery] = useState('');
  const [openanswer, setOpenAnswer] = useState(faqdata[0].id);

  useEffect(() => {}, []);

  const slected_quetion = id => {
    if (openanswer == id) {
      setOpenAnswer(null);
    } else {
      setOpenAnswer(id);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F6F6F6]">
      <SmallHeader name="Help Desk" showSearch={false} />
      <ScrollView className="flex-1">
        <View className="px-5 pt-5 mb-20">
          <View>
            <Text className="text-2xl pb-3 font-mulish_semibold">
              We’re here to help you with anything and everyting on ViralPitch
            </Text>
            <Text className="text-sm font-mulish_regular">
              At Viral Pitch we expect at a day’s start is you, better and
              happier than yesterday. We have got you covered share your concern
              or check our frequently asked questions listed below.
            </Text>
          </View>
          <View className="px-5 pt-10">
            <View className="relative">
              <TextInput
                placeholder="Search Help?"
                placeholderTextColor="#6B7280"
                className="pl-12 pr-4 rounded-full w-full bg-gray-100 px-4 py-2 text-lg border border-gray-300"
                value={query}
                onChangeText={setQuery}
              />
              <View className="absolute left-4 top-3">
                <Search stroke="#6B7280" width={20} height={20} />
              </View>
            </View>
          </View>
          <View className="mt-8">
            <Text className="text-lg font-mulish_semibold text-dark_blue">
              Frequently Asked Questions
            </Text>

            {faqdata.map((item, i) => {
              return (
                <View
                  key={item.id}
                  className="px-1 py-5 border-b border-gray-200">
                  <Pressable
                    onPress={() => slected_quetion(item.id)}
                    className="flex-row gap-5 justify-between items-start">
                    <View className="flex-row gap-1 max-w-[90%]">
                      <Text className=" text-dark text-base font-mulish_medium">
                        {item.id}.
                      </Text>
                      <Text className="w-[92%] text-dark text-base font-mulish_medium">
                        {item.question}
                      </Text>
                    </View>
                    <Entypo
                      name={openanswer == item.id ? 'minus' : 'plus'}
                      color={TYPO.colors.dark}
                      size={responsiveFontSize(2.5)}
                    />
                  </Pressable>
                  {openanswer == item.id && (
                    <View className="pt-3">
                      <Text className="text-base font-mulish_regular text-gray-600">
                        {item.answer}
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
            <View></View>
          </View>
        </View>
      </ScrollView>
      <View className="p-2">
        <Pressable className=" bg-main py-2 rounded-full  flex items-center">
          <Text className="text-white text-base font-mulish_semibold">
            Contact Us
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default HelpDesk;
