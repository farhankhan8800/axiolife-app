import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import SmallHeader from '../../components/SmallHeader';
import Toast from 'react-native-toast-message';
import MakeRequest from '../../utils/axiosInstance';
import { ADD_ADDRESS_API } from '../../service/API';

const AddAddress = ({navigation}) => {
  const [form, setForm] = useState({
    address_line1: '',
    address_line2: '',
    city: '',
    state: '',
    postal_code: '',
    country: '',
    primary_address: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!form.address_line1.trim()) {
      newErrors.address_line1 = 'Address line 1 is required';
      valid = false;
    }
    if (!form.city.trim()) {
      newErrors.city = 'City is required';
      valid = false;
    }
    if (!form.state.trim()) {
      newErrors.state = 'State is required';
      valid = false;
    }
    if (!form.postal_code.trim() || !/^\d{5,6}$/.test(form.postal_code)) {
      newErrors.postal_code = 'Enter a valid Postal code';
      valid = false;
    }
    if (!form.country.trim()) {
      newErrors.country = 'Country is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (key, value) => {
    setForm({...form, [key]: value});
    setErrors({...errors, [key]: ''});
  };

  const handleSubmit =  async () => {
    if (validate()) {

      try {
        const data = await MakeRequest(
          ADD_ADDRESS_API,
          {
           ...form
          },
          {},
          'application/json',
        );
  
        if (data.status == 1) {

          console.log(data)
          Toast.show({
            type: 'GreenToast',
            text1: 'Address added successfully',
            position: 'bottom',
            visibilityTime: 2000,
          });

          setTimeout(()=>{
            // navigation.goBack()
            navigation.navigate('Address')
          },2500)
        }
      } catch (error) {
        console.error('Verification failed:', error);
        Toast.show({
          type: 'BasicToast',
          text1: 'Something went wrong. Please try again.',
          position: 'bottom',
          visibilityTime: 5000,
        });
      }
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <SmallHeader name="Add your Address" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView className="flex-1">
            <View className="px-8 flex-1 mt-6 mb-20">
              {[
                {key: 'address_line1', placeholder: 'Address line 1'},
                {key: 'address_line2', placeholder: 'Address line 2'},
                {key: 'city', placeholder: 'City'},
                {key: 'state', placeholder: 'State'},
                {
                  key: 'postal_code',
                  placeholder: 'Postal code',
                  keyboardType: 'numeric',
                },
                {key: 'country', placeholder: 'Country'},
              ].map(({key, placeholder, keyboardType}) => (
                <View key={key} className="mt-2">
                  <TextInput
                    className="mt-2 text-dark text-base font-mulish_medium px-4 py-[8px] rounded-xl border border-gray-300"
                    placeholder={placeholder}
                    placeholderTextColor="#A0A5A8"
                    keyboardType={keyboardType || 'default'}
                    value={form[key]}
                    onChangeText={value => handleChange(key, value)}
                  />
                  {errors[key] && (
                    <Text className="text-red-500 text-base mt-1">
                      {errors[key]}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      <View className="px-3 my-3">
        <Pressable
          className="bg-main py-3 rounded-xl border border-main flex items-center"
          onPress={handleSubmit}>
          <Text className="text-white text-lg font-mulish_semibold">
            Submit
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AddAddress;
