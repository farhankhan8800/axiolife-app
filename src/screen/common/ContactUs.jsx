import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import SmallHeader from '../../components/SmallHeader';
import {responsiveHeight} from 'react-native-responsive-dimensions';
import Toast from 'react-native-toast-message';
import MakeRequest from '../../utils/axiosInstance';
import { CONTACT_FORM_API } from '../../service/API';

const ContactUs = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (key, value) => {
    setForm(prev => ({...prev, [key]: value}));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(form.phone)) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }
    if (!form.subject.trim()) newErrors.subject = 'Subject is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit =  async() => {
    if (validateForm()) {
      try {
        const data = await MakeRequest(
          CONTACT_FORM_API,
          {
            email: form.email,
            phone:form.phone,
            message: form.message
          },
          {},
          'application/json',
        );

        if (data.status == 1) {
          console.log(data);
          Toast.show({
            type: 'GreenToast',
            text1: 'Sent your message, contact soon!',
            position: 'bottom',
            visibilityTime: 5000,
          });
          setForm({name: '', email: '', phone: '', subject: '', message: ''});
          setErrors({});
        }
      } catch (error) {
        console.log(error);
        Toast.show({
          type: 'ErrorToast',
          text1: error.response.data.message,
          position: 'bottom',
          visibilityTime: 5000,
        });
      }
      
    }
  };



  const inputFields = [
    {key: 'name', placeholder: 'Name'},
    {key: 'email', placeholder: 'Email', keyboardType: 'email-address'},
    {key: 'phone', placeholder: 'Phone number', keyboardType: 'numeric'},
    {key: 'subject', placeholder: 'Subject'},
    {
      key: 'message',
      placeholder: 'Your message',
      multiline: true,
      numberOfLines: 4,
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-[#F6F6F6]">
      <SmallHeader name="Contact Us" showSearch={false} />
      <ScrollView className="flex-1 px-4 pt-5 ">
        <Text className="text-2xl pb-3 font-mulish_semibold">
          We’re here to help you with anything and everything on ViralPitch
        </Text>
        <Text className="text-sm font-mulish_regular">
          At Viral Pitch, we expect at a day’s start is you, better and happier
          than yesterday. We’ve got you covered—share your concern or check our
          frequently asked questions listed below.
        </Text>

        <View className="mt-5">
          {inputFields.map(
            ({key, placeholder, keyboardType, multiline, numberOfLines}) => (
              <View key={key} className="mt-2">
                <TextInput
                  style={{
                    height: key == 'message' ? responsiveHeight(20) : 'auto',
                    textAlignVertical: key == 'message' ? 'top' : 'center',
                  }}
                  className="mt-2 text-dark text-base font-mulish_medium px-4 py-[8px] rounded-xl border border-gray-300 bg-white"
                  placeholder={placeholder}
                  placeholderTextColor="#A0A5A8"
                  keyboardType={keyboardType || 'default'}
                  value={form[key]}
                  onChangeText={value => handleChange(key, value)}
                  multiline={multiline}
                  numberOfLines={numberOfLines}
                />
                {errors[key] && (
                  <Text className="text-red-500 text-base mt-1">
                    {errors[key]}
                  </Text>
                )}
              </View>
            ),
          )}
          <View
            className="px-3 mb-10"
            style={{marginTop: responsiveHeight(10)}}>
            <Pressable
              onPress={handleSubmit}
              className="mt-6 bg-main py-2 rounded-xl border border-main  flex items-center">
              <Text className="text-white text-lg font-mulish_semibold">
                Submit
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ContactUs;
