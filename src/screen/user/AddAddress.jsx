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
  } from "react-native";
  import React, { useState } from "react";
  import SmallHeader from "../../components/SmallHeader";
import Toast from "react-native-toast-message";
  
  const AddAddress = ({ navigation }) => {
    const [form, setForm] = useState({
      name: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
      country: "",
      landmark: "",
      type: "",
    });
  
    const [errors, setErrors] = useState({});
  
    const validate = () => {
      let valid = true;
      let newErrors = {};
  
      if (!form.name.trim()) {
        newErrors.name = "Name is required";
        valid = false;
      }
      if (!form.phone.trim() || !/^\+?\d{10,15}$/.test(form.phone)) {
        newErrors.phone = "Enter a valid phone number";
        valid = false;
      }
      if (!form.address.trim()) {
        newErrors.address = "Address is required";
        valid = false;
      }
      if (!form.city.trim()) {
        newErrors.city = "City is required";
        valid = false;
      }
      if (!form.state.trim()) {
        newErrors.state = "State is required";
        valid = false;
      }
      if (!form.pincode.trim() || !/^\d{5,6}$/.test(form.pincode)) {
        newErrors.pincode = "Enter a valid pincode";
        valid = false;
      }
      if (!form.country.trim()) {
        newErrors.country = "Country is required";
        valid = false;
      }
      if (!form.type.trim()) {
        newErrors.type = "Address type is required";
        valid = false;
      }
  
      setErrors(newErrors);
      return valid;
    };
  
    const handleChange = (key, value) => {
      setForm({ ...form, [key]: value });
      setErrors({ ...errors, [key]: "" });
    };
  
    const handleSubmit = () => {
      if (validate()) {
        Toast.show({
            type: "GreenToast",
            text1: "Address added successfully",
            position: "bottom",
            visibilityTime: 2000,
          });
    console.log(form);     
      }

    
    };
  
    return (
      <SafeAreaView className="flex-1">
        <SmallHeader name="Add your Address" />
        <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView className="flex-1">
          <View className="px-4 flex-1 mt-6 mb-20">
            {[
              { key: "name", placeholder: "Name" },
              { key: "phone", placeholder: "Phone Number", keyboardType: "phone-pad" },
              { key: "address", placeholder: "Address" },
              { key: "city", placeholder: "City" },
              { key: "state", placeholder: "State" },
              { key: "pincode", placeholder: "Pincode", keyboardType: "numeric" },
              { key: "country", placeholder: "Country" },
              { key: "landmark", placeholder: "Landmark (Optional)" },
              { key: "type", placeholder: "Address Type (Home, Work, etc.)" },
            ].map(({ key, placeholder, keyboardType }) => (
              <View key={key} className="mt-2">
                <TextInput
                  className="mt-2 text-dark text-base font-mulish_medium px-4 py-[8px] rounded-xl border border-gray-300"
                  placeholder={placeholder}
                  placeholderTextColor="#A0A5A8"
                  keyboardType={keyboardType || "default"}
                  value={form[key]}
                  onChangeText={(value) => handleChange(key, value)}
                />
                {errors[key] && <Text className="text-red-500 text-base mt-1">{errors[key]}</Text>}
              </View>
            ))}
          </View>
        </ScrollView>
        </TouchableWithoutFeedback>
 
      </KeyboardAvoidingView>
       
        <View className="px-3 my-3">
          <Pressable
            className="bg-main py-3 rounded-xl border border-main flex items-center"
            onPress={handleSubmit}
          >
            <Text className="text-white text-lg font-mulish_semibold">Submit</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  };
  
  export default AddAddress;
  