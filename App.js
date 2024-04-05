import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import all the screens
import HomeScreen from './components/Home';
import CartScreen from './components/Cart';
import ProfileScreen from './components/Profile';
import StartScreen from './components/Start';
import LogInScreen2 from './components/LogIn2';
import SignUpScreen2 from './components/SignUp2';
import AdminLogin from './components/AdminLogin';
// Import the context
import { CartProvider } from './components/CartContext';

import FoodbankScreen from "./components/NearbyFoodbanks";
import FavouritesScreen from "./components/Favourites";
import Article1Screen from "./components/Article1";
import Artical2Screen from "./components/Article2";
import NearbyFoodbanksMap from "./components/NearbyFoodbanksMap";
import FoodCategories from "./components/FoodCategories";
import FBDetails from "./components/FBDetails";
import Vegetables from "./components/Vegetables";
import Lettuce from "./components/Lettuce";
import ConfirmDetailsScreen from './components/ConfirmDetails';
import ReservationScreen from "./components/Reservation";
import AdminHome from "./components/AdminHome";
import AdminSettings from './components/AdminSettings';

//admin screens
import UpdateAmountScreen from './components/UpdatedAmount';
import NewItem from './components/NewItem';
import Requests from './components/Requests';
import UpdateDetails from './components/UpdateDetails';
import AdminOrders from './components/AdminOrders';
import UpdateConfirmation from './components/UpdateConfirmation';
import AdminOrderReview from './components/AdminOrderReview';
import QRCodeScanner from './components/QRCodeScanner';
import OrderReviewScreen from './components/OrderReview';

// Import icons
const gridIcon = require('./assets/grid.png');
const cartIcon = require('./assets/cart.png');
const userIcon = require('./assets/user.png');

const AdminTab = createBottomTabNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AdminTabNavigator() {
  return (
    <AdminTab.Navigator
      screenOptions={({ route }) => ({
        // Here you can define the common styles for the admin tabs
      })}
    >
      <AdminTab.Screen name="AdminHome" component={AdminHome} />
      <AdminTab.Screen name="AdminSettings" component={AdminSettings} />
      <AdminTab.Screen name="UpdatedAmount" component={UpdateAmountScreen} />
      {/* Add more tabs for the admin as needed */}
    </AdminTab.Navigator>
  );
}

// Here's the tab navigator that holds the main parts of the app
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = gridIcon;
          } else if (route.name === 'Cart') {
            iconName = cartIcon;
          } else if (route.name === 'Profile') {
            iconName = userIcon;
          }

          // You can return any component that you like here!
          return <Image source={iconName} style={{ width: size, height: size }} resizeMode="contain" />;
        },
        headerShown: false,
        // Add other options here
      })}
    >
      <Tab.Screen name="Home" component={HomeScreenStack} />
      <Tab.Screen name="Cart" component={CartScreen} options={{ headerShown: true }}/>
      <Tab.Screen name="FoodCategories" component={FoodCategories} options={{headerShown: true}} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ headerShown: true }}/>
      
      {/* Other screens that should appear in the tab navigator go here */}
    </Tab.Navigator>
  );
}

const HomeScreenStack = () => {

  return (
      <Stack.Navigator>

          <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
          <Stack.Screen name="NearbyFoodbanks" component={FoodbankScreen}></Stack.Screen>
          <Stack.Screen name="Favourites" component={FavouritesScreen}></Stack.Screen>
          <Stack.Screen name="Article 1" component={Article1Screen}></Stack.Screen>
          <Stack.Screen name="Article 2" component={Artical2Screen}></Stack.Screen>
          <Stack.Screen name="NearbyFoodbanksMap" component={NearbyFoodbanksMap}></Stack.Screen>
          <Stack.Screen name="FoodCategories" component={FoodCategories}></Stack.Screen>
          <Stack.Screen name="FBDetails" component={FBDetails}></Stack.Screen>
          <Stack.Screen name="Vegetables" component={Vegetables}></Stack.Screen>
          <Stack.Screen name="Lettuce" component={Lettuce}></Stack.Screen>
          <Stack.Screen name="Cart" component={CartScreen}></Stack.Screen>
          <Stack.Screen name="ConfirmDetails" component={ConfirmDetailsScreen}></Stack.Screen>
          <Stack.Screen name="Reservation" component={ReservationScreen}></Stack.Screen>
          <Stack.Screen name="AdminHome" component={AdminHome}></Stack.Screen>
          <Stack.Screen name="CartContext" component={CartProvider}></Stack.Screen>
          <Stack.Screen name="Profile" component={ProfileScreen}></Stack.Screen>
          <Stack.Screen name="OrderReview" component={OrderReviewScreen}></Stack.Screen>
          <Stack.Screen name="Start" component={StartScreen}></Stack.Screen>



      </Stack.Navigator>
  )

}

// Main app component
function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* The first part of the app before logging in */}
          <Stack.Screen name="Start" component={StartScreen} />
          <Stack.Screen name="LogIn2" component={LogInScreen2} />
          <Stack.Screen name="SignUp2" component={SignUpScreen2} />
          
          {/* Main part of the app after logging in */}
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="AdminHome" component={AdminHome} options={{ headerShown: true }} />

          {/* Admin screens */}
          <Stack.Screen name="AdminTabs" component={AdminTabNavigator} options={{ headerShown: true }} />
          {/* Add more Stack.Screen for admin if needed */}
          <Stack.Screen name="AdminLogin" component={AdminLogin} />
          <Stack.Screen name="UpdatedAmount" component={UpdateAmountScreen} options={{ headerShown: true }}/>
          <Stack.Screen name="NewItem" component={NewItem} options={{ headerShown: true }}/>
          <Stack.Screen name="Requests" component={Requests} options={{ headerShown: true }}/>
          <Stack.Screen name="UpdateDetails" component={UpdateDetails} options={{ headerShown: true }}/>
          <Stack.Screen name="AdminOrders" component={AdminOrders} options={{ headerShown: true }}/>
          <Stack.Screen name="UpdateConfirmation" component={UpdateConfirmation} options={{ headerShown: true }}/>
          <Stack.Screen name="AdminOrderReview" component={AdminOrderReview} options={{ headerShown: true }}/>
          <Stack.Screen name="QRCodeScanner" component={QRCodeScanner} options={{ headerShown: true }}/>

          
          {/* Other screens that should not have a tab bar and are not part of the MainTabs flow */}
          {/* If you have such screens, add them here */}
          
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

export default App;
