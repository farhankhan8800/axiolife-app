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

const EditProfile = ({navigation}) => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (key, value) => {
    setForm({...form, [key]: value});
    setErrors({...errors, [key]: ''});
  };

  const handleSubmit = () => {
    if (validate()) {
      Toast.show({
        type: 'GreenToast',
        text1: 'Update Profile successfully',
        position: 'bottom',
        visibilityTime: 2000,
      });
      console.log(form);
    }
  };

  return (
    <SafeAreaView className="flex-1">
      <SmallHeader name="Edit Profile" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView className="flex-1">
            <View className="px-4 flex-1 mt-6 mb-20">
              {[
                {key: 'name', placeholder: 'Name', readonly: false},
                {
                  key: 'phone',
                  placeholder: 'Phone Number',
                  readonly: true,
                  keyboardType: 'phone-pad',
                },
              ].map(({key, placeholder, readonly, keyboardType}) => (
                <View key={key} className="mt-3">
                  <TextInput
                    className="mt-2 text-dark text-lg font-mulish_medium px-4 py-3 rounded-xl border border-gray-300"
                    placeholder={placeholder}
                    editable={!readonly}
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

export default EditProfile;
