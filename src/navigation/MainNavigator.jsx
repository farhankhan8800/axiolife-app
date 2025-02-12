import {createStackNavigator} from '@react-navigation/stack';
import Search from '../screen/Search';
import HomeScreen from '../screen/Home';
import Profile from '../screen/user/Profile';
import Splash from '../screen/Splash';
import Onboarding from '../screen/Onboarding';
import ProductDetail from '../screen/ProductDetail';
import NotificationScreen from '../screen/Notification';
import CartScreen from '../screen/Cart';
import ProductScreen from '../screen/Product';
import AllCategory from '../screen/AllCategory';
import CategoryDetail from '../screen/CategoryDetail';
import AllStore from '../screen/AllStore';
import StoreDetail from '../screen/StoreDetail';
import SignUp from '../screen/auth/SignUp';
import SignIn from '../screen/auth/SignIn';
import EnterOTP from '../screen/auth/EnterOTP';
import EditProfile from '../screen/user/EditProfile';
import UserAddress from '../screen/user/Address';
import UserOrder from '../screen/user/Order';
import UserFavorite from '../screen/user/UserFavorite';
import NoInternet from '../screen/common/NoInternet';
import NotFound from '../screen/common/NotFound';
import AddAddress from '../screen/user/AddAddress';
import OrderDetail from '../screen/user/OrderDetail';

const Stack = createStackNavigator();

function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash">
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="AllStore" component={AllStore} />
      <Stack.Screen name="StoreDetail" component={StoreDetail} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Product" component={ProductScreen} />
      <Stack.Screen name="AllCategory" component={AllCategory} />
      <Stack.Screen name="CategoryDetail" component={CategoryDetail} />
      <Stack.Screen name="NoInternet" component={NoInternet} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="EnterOTP" component={EnterOTP} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Address" component={UserAddress} />
      <Stack.Screen name="UserOrder" component={UserOrder} />
      <Stack.Screen name="UserFavorite" component={UserFavorite} />
      <Stack.Screen name="NotFound" component={NotFound} />
      <Stack.Screen name="AddAddress" component={AddAddress} />
      <Stack.Screen
        name="OrderDetail"
        options={{
          presentation: 'modal',
          animationDuration: 1400,
        }}
        component={OrderDetail}
      />
    </Stack.Navigator>
  );
}

export default MainNavigator;
