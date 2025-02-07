import { createStackNavigator } from '@react-navigation/stack';
import Search from '../screen/Search';
import HomeScreen from '../screen/Home';
import Store from '../screen/Store';
import Profile from '../screen/user/Profile';
import Splash from '../screen/Splash';
import Onboarding from '../screen/Onboarding';
import { RootStackParamList } from './types';
import ProductDetail from '../screen/ProductDetail';
import NotificationScreen from '../screen/Notification';
import CartScreen from '../screen/Cart';
import ProductScreen from '../screen/Product';
import AllCategory from '../screen/AllCategory';
import CategoryDetail from '../screen/CategoryDetail';

const Stack = createStackNavigator<RootStackParamList>();

function MainNavigator() {
  return (
    <Stack.Navigator 
    screenOptions={{
      headerShown: false, 
    }}
    initialRouteName='Splash'
    >
      <Stack.Screen name="Splash" component={Splash} />
       <Stack.Screen name="Onboarding" component={Onboarding} />
       <Stack.Screen name="Home" component={HomeScreen} />
       <Stack.Screen name="Search" component={Search} />
       <Stack.Screen name="Store" component={Store} />
       <Stack.Screen name="Profile" component={Profile} />
       <Stack.Screen name="ProductDetail" component={ProductDetail} />
       <Stack.Screen name="Notification" component={NotificationScreen} />
       <Stack.Screen name="Cart" component={CartScreen} />
       <Stack.Screen name="Product" component={ProductScreen} />
       <Stack.Screen name="AllCategory" component={AllCategory} />
       <Stack.Screen name="CategoryDetail" component={CategoryDetail} />
    </Stack.Navigator>
  );
}

export default MainNavigator;