import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const NearbyFoodbanksMapNew = () => {
  const [foodbanks, setFoodbanks] = useState([]);
  const [locationPermission, setLocationPermission] = useState(null);

  const initialRegion = {
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  };

  const fetchNearbyFoodbanks = async () => {
    // Simulating API call to fetch food banks based on the provided postcode
    const fetchedFoodbanks = [
      {
        id: 1,
        postcode: '12345',
        latitude: 37.7749,
        longitude: -122.4194,
        name: 'Food Bank 1',
        description: 'Description 1',
      },
      {
        id: 2,
        postcode: '67890',
        latitude: 37.78825,
        longitude: -122.4324,
        name: 'Food Bank 2',
        description: 'Description 2',
      },
      // Add more food banks as needed
    ];

    setFoodbanks(fetchedFoodbanks);
  };

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await Location.requestForegroundPermissionsAsync();
          if (granted.status === 'granted') {
            setLocationPermission(true);
            fetchNearbyFoodbanks();
          } else {
            console.error('Location permission denied');
            setLocationPermission(false);
          }
        } catch (err) {
          console.warn(err);
        }
      } else {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          setLocationPermission(true);
          fetchNearbyFoodbanks();
        } else {
          console.error('Location permission denied');
          setLocationPermission(false);
        }
      }
    };

    requestLocationPermission();
  }, []);

  if (locationPermission === false) {
    return (
      <View style={styles.container}>
        <Text>Location permission denied. Please enable location services in your device settings.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* MapView to display nearby foodbanks */}
      <MapView style={styles.map} initialRegion={initialRegion}>
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
    height: 400,
  },
});

export default NearbyFoodbanksMapNew;
