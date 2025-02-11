import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Home: undefined;
  Search: undefined;
  AllStore: undefined;
  StoreDetail: { slug:string};
  Profile: undefined;
  ProductDetail: { slug: string }; 
  Notification: undefined 
  Cart: undefined  
  Product: { slug: string }  
  AllCategory:undefined 
  CategoryDetail: { slug: string }   
  NoInternet: undefined ;
  SignUp: undefined ;
  SignIn: undefined ;
  EnterOTP: undefined ;
  EditProfile: undefined ;
  Address: undefined ;
  Order: undefined ;
  UserFavorite: undefined ;
};


export type ScreenProps<T extends keyof RootStackParamList> = NativeStackScreenProps<RootStackParamList, T>;