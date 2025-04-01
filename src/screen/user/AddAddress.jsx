import {
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableWithoutFeedback,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import SmallHeader from '../../components/SmallHeader';
import Toast from 'react-native-toast-message';
import MakeRequest from '../../utils/axiosInstance';
import {ADD_ADDRESS_API} from '../../service/API';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';

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
  const [activeField, setActiveField] = useState(null);

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

  const handleSubmit = async () => {
    if (validate()) {
      try {
        const data = await MakeRequest(
          ADD_ADDRESS_API,
          {
            ...form,
          },
          {},
          'application/json',
        );

        if (data.status == 1) {
          console.log(data);
          Toast.show({
            type: 'GreenToast',
            text1: 'Address added successfully',
            position: 'bottom',
            visibilityTime: 2000,
          });

          setTimeout(() => {
            navigation.navigate('Address');
          }, 2500);
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

  const formFields = [
    {
      key: 'address_line1',
      placeholder: 'Street Address',
      icon: 'map-marker-outline',
    },
    {
      key: 'address_line2',
      placeholder: 'Apartment, Suite, Unit, etc. (optional)',
      icon: 'office-building-outline',
    },
    {key: 'city', placeholder: 'City', icon: 'city-variant-outline'},
    {key: 'state', placeholder: 'State/Province/Region', icon: 'map-outline'},
    {
      key: 'postal_code',
      placeholder: 'Postal / ZIP Code',
      keyboardType: 'numeric',
      icon: 'post-outline',
    },
    {key: 'country', placeholder: 'Country', icon: 'flag-outline'},
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
      <SmallHeader name="Shipping Address" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        className="flex-1">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView className="flex-1">
            <View className="px-6 pt-8 pb-24">
              {/* Section Title */}
              <View className="mb-6">
                <Text className="text-2xl font-bold text-gray-800">
                  Add Your Address
                </Text>
                <Text className="text-base text-gray-500 mt-1">
                  Please enter your shipping details
                </Text>
              </View>

              {/* Form Fields */}
              {formFields.map(({key, placeholder, keyboardType, icon}) => (
                <View key={key} className="mb-5">
                  <Text className="text-sm font-medium text-gray-700 mb-2">
                    {placeholder}
                    {key !== 'address_line2' && (
                      <Text className="text-red-500"> *</Text>
                    )}
                  </Text>

                  <View
                    className={`flex-row items-center border ${
                      errors[key]
                        ? 'border-red-500'
                        : activeField === key
                        ? 'border-blue-500'
                        : 'border-gray-300'
                    } rounded-xl overflow-hidden bg-gray-50`}>
                    <View className="pl-4 py-3">
                      <Icon name={icon} size={24} color="#6B7280" />
                    </View>

                    <TextInput
                      className="flex-1 pl-3 pr-4 py-4 text-lg text-gray-800"
                      placeholder={placeholder}
                      placeholderTextColor="#9CA3AF"
                      keyboardType={keyboardType || 'default'}
                      value={form[key]}
                      onFocus={() => setActiveField(key)}
                      onBlur={() => setActiveField(null)}
                      onChangeText={value => handleChange(key, value)}
                    />

                    {form[key] && !errors[key] && (
                      <View className="pr-4">
                        <FeatherIcon name="check" size={20} color="#10B981" />
                      </View>
                    )}
                  </View>

                  {errors[key] && (
                    <View className="flex-row items-center mt-2">
                      <FeatherIcon
                        name="alert-circle"
                        size={16}
                        color="#EF4444"
                      />
                      <Text className="text-red-500 text-sm ml-1">
                        {errors[key]}
                      </Text>
                    </View>
                  )}
                </View>
              ))}

              {/* Make Default Address Checkbox */}
              <Pressable
                className="flex-row items-center mt-2 mb-8"
                onPress={() =>
                  handleChange(
                    'primary_address',
                    form.primary_address ? '' : 'yes',
                  )
                }>
                <View
                  className={`w-6 h-6 rounded-md flex items-center justify-center ${
                    form.primary_address
                      ? 'bg-blue-600'
                      : 'border border-gray-400'
                  }`}>
                  {form.primary_address && (
                    <FeatherIcon name="check" size={16} color="white" />
                  )}
                </View>
                <Text className="text-base text-gray-700 ml-3">
                  Set as default address
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {/* Fixed Submit Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white pt-2 pb-8 px-6 shadow-lg">
        <Pressable
          className="bg-blue-600 py-4 rounded-xl flex items-center justify-center"
          onPress={handleSubmit}>
          <Text className="text-white text-lg font-bold">Save Address</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default AddAddress;
