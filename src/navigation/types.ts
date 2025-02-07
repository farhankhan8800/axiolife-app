import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Home: undefined;
  Search: undefined;
  Store: undefined;
  Profile: undefined;
  ProductDetail: { slug: string }; 
  Notification: undefined 
  Cart: undefined  
  Product: { slug: string }  
  AllCategory:undefined 
  CategoryDetail: { slug: string }   
};


export type ScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;