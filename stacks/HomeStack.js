import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../components/Home";
import FoodbankScreen from "../components/NearbyFoodbanks";
import FavouritesScreen from "../components/Favourites";
import Article1Screen from "../components/Article1";
import Artical2Screen from "../components/Article2";
import NearbyFoodbanksMap from "../components/NearbyFoodbanksMap";
import FoodCategories from "../components/FoodCategories";
import FBDetails from "../components/FBDetails";
import Vegetables from "../components/Vegetables";
import Lettuce from "../components/Lettuce";
import CartScreen from '../components/Cart';
import { CartProvider } from "../components/CartContext";
import ConfirmDetailsScreen from '../components/ConfirmDetails';
import ReservationScreen from "../components/Reservation";
import AdminHome from "../components/AdminHome";
import StartScreen from "../components/Start";

const Stack = createNativeStackNavigator();

const HomeScreenStack = () => {

    return (
        <Stack.Navigator>

            <Stack.Screen name="Start" component={StartScreen}></Stack.Screen>
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


        </Stack.Navigator>
    )

}

export default HomeScreenStack;