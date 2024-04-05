import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";
import NearbyFoodbanksMap from "./NearbyFoodbanksMap";
import HomeScreenStack from "../stacks/HomeStack";


// Foodbanks screen component
const NearbyFoodbanks = () => {
  return (
    <View style={styles.container}>
      <NearbyFoodbanksMap />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default NearbyFoodbanks;