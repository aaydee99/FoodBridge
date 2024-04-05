import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';  // Add this import

const NearbyFoodbanksMapDemo = () => {
  const [location, setLocation] = useState(null);
  const [foodbanks, setFoodbanks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNearbyFoodbanks = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error('Location permission denied');
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);

        // Simulated data for demonstration purposes
        const simulatedFoodbanks = [
          {
            id: 1,
            latitude: 37.7749,
            longitude: -122.4194,
            name: 'Food Bank 1',
            description: 'Description 1',
          },
          {
            id: 2,
            latitude: 37.78825,
            longitude: -122.4324,
            name: 'Food Bank 2',
            description: 'Description 2',
          },
          // Add more simulated food banks as needed
        ];

        setFoodbanks(simulatedFoodbanks);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNearbyFoodbanks();
  }, []);

  if (loading || !location) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {foodbanks.map((foodbank) => (
          <Marker
            key={foodbank.id}
            coordinate={{
              latitude: foodbank.latitude,
              longitude: foodbank.longitude,
            }}
            title={foodbank.name}
            description={foodbank.description}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default NearbyFoodbanksMapDemo;
