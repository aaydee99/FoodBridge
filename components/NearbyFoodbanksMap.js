import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

const NearbyFoodbanksMap = ({ navigation }) => {
  const [postcode, setPostcode] = useState('');
  const [showFoodbanks, setShowFoodbanks] = useState(false);
  const [foodbanks, setFoodbanks] = useState([]);
  const [region, setRegion] = useState({
    latitude: 54.597,
    longitude: -5.93,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const fetchNearbyFoodbanks = () => {
    // Simulate an API call to get foodbanks based on the postcode
    setFoodbanks([
      // Hardcoded foodbanks, ideally this would be replaced with data from an API
      {
        id: 1,
        name: 'South Belfast Foodbank',
        latitude: 54.59,
        longitude: -5.87,
        distance: '0.2 Miles',
      },
      {
        id: 2,
        name: 'St Vincent De Paul',
        latitude: 54.58,
        longitude: -5.95,
        distance: '0.5 Miles',
      },
      {
        id: 3,
        name: 'Belfast Central Mission',
        latitude: 54.60,
        longitude: -5.93,
        distance: '1.4 Miles',
      },
      // ...add other foodbanks
    ]);
    setShowFoodbanks(true);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/mainlogo.png')} // Replace with your logo image file
          style={styles.headerLogo}
        />
      </View>

      <Text style={styles.title}>Postcode</Text>

      <View style={styles.searchContainer}>
        <Ionicons name="ios-search" size={20} color="gray" />
        <TextInput
          style={styles.input}
          placeholder="Search Postcode"
          onChangeText={setPostcode}
          value={postcode}
        />
      </View>

      <TouchableOpacity onPress={fetchNearbyFoodbanks} style={styles.button}>
        <Text style={styles.buttonText}>Find Foodbanks</Text>
      </TouchableOpacity>

      {/* Rounded Map Container */}
      <View style={styles.mapContainer}>
        <MapView style={styles.map} region={region}>
          {foodbanks.map((foodbank) => (
            <Marker
              key={foodbank.id}
              coordinate={{
                latitude: foodbank.latitude,
                longitude: foodbank.longitude,
              }}
              title={foodbank.name}
            />
          ))}
        </MapView>
      </View>

       {/* Footer */}
      <Text style={styles.footer}>Nearby Locations</Text>

      {/* ScrollView for Foodbanks list appears after the button is pressed */}

      {showFoodbanks && (
        <ScrollView style={styles.foodbanksListContainer}>
          <View style={styles.foodbanksList}>
            {foodbanks.map((foodbank) => (
              <View key={foodbank.id} style={styles.foodbankItem}>
                <View style={styles.foodbankInfo}>
                  <Ionicons name="ios-pin" size={24} color="#000" />
                  <View style={styles.foodbankDetails}>
                    <Text style={styles.foodbankName}>{foodbank.name}</Text>
                    <Text style={styles.foodbankDistance}>{foodbank.distance}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.selectButton}
                  onPress={() => navigation.navigate('FoodCategories')} // Add the navigation here
                >
                  <Text style={styles.selectButtonText}>SELECT</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
      
      {/* Show "No Nearby Locations" if there are no foodbanks */}
      {foodbanks.length === 0 && (
        <View style={styles.noLocationsContainer}>
          <Ionicons name="ios-pin" size={24} color="#000" />
          <Text style={styles.noLocationsText}>No Nearby Locations</Text>
          </View>
        )}
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#F8F8F8', // Adjust the header background color to match your theme
  },
  headerLogo: {
    width: 250, // Adjust the width based on your logo
    height: 100, // Adjust the height based on your logo
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 0,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    fontStyle: 'italic',
    color: 'black',
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginTop: 0,
    marginBottom: 0,
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff', // Changed to white for the search bar
    borderRadius: 20, // Rounded corners
    borderWidth: 0, // No border
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    paddingVertical: 5, // Slightly less padding to make it rounder
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
    color: 'black', // This makes the text input color black
  },
  button: {
    backgroundColor: '#0BCE83', // Use your brand color
    padding: 10,
    borderRadius: 5,
    margin: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  footer: {
    padding: 20,
    textAlign: 'left',
    fontSize: 22,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  noLocationsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  noLocationsText: {
    textAlign: 'center',
    fontStyle: 'italic',
    color: '#0377FF', // Adjust as necessary
    marginLeft: 10, // Space after the icon
  },

  // Styles for the foodbanks list
  foodbanksList: {
    borderTopColor: '#e0e0e0',
    borderTopWidth: 1,
    paddingTop: 10,
    backgroundColor: '#fff', // Changed to white for the search bar
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    paddingHorizontal: 10,
    paddingVertical: 5, // Slightly less padding to make it rounder
  
  },
  foodbankItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
  },
  foodbankInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  foodbankDetails: {
    marginLeft: 10,
  },
  foodbankName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  foodbankDistance: {
    fontSize: 14,
    color: '#0BCE83',
  },
  selectButton: {
    backgroundColor: '#0377FF',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  selectButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },

  //Rounded map
  mapContainer: {
    height: 300, // Fixed height for the map container
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
    },
    map: {
    ...StyleSheet.absoluteFillObject, // This ensures the map fills the container
    },
    foodbanksListContainer: {
    flex: 1, // This allows for scrolling of foodbanks when the list is longer than the screen
    },



});

export default NearbyFoodbanksMap;
