import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Custom Header or Logo */}
      <Image
        style={styles.logo}
        source={require('../assets/mainlogo.png')}
      />

      {/* Welcome Message */}
      <Text style={styles.welcomeText}>Welcome, John Doe!</Text>

      {/* Nearby Foodbanks Button */}
      <TouchableOpacity
        style={styles.buttonWithIcon}
        onPress={() => navigation.navigate('NearbyFoodbanksMap')}>
        <Image
          source={require('../assets/Search.png')}
          style={styles.iconStyle}
        />
        <Text style={styles.buttonText}>Nearby Foodbanks</Text>
      </TouchableOpacity>

      {/* Favourites Button */}
      <TouchableOpacity
        style={styles.buttonWithIcon}
        onPress={() => navigation.navigate('Favourites')}>
        <Image
          source={require('../assets/Heart.png')}
          style={styles.iconStyle}
        />
        <Text style={styles.buttonText}>Favourites</Text>
      </TouchableOpacity>

      {/* Image Buttons Row */}
      <View style={styles.buttonRow}>
        {/* Image Button for End Hunger UK */}
        <TouchableOpacity
          style={styles.squareButton}
          onPress={() => navigation.navigate('NearbyFoodbanksMap')}>
          <ImageBackground
            source={require('../assets/EndHunger.png')}
            style={styles.imageButtonBackground}
            resizeMode="cover"
          >
          </ImageBackground>
        </TouchableOpacity>

        {/* Image Button for Break the Stigma */}
        <TouchableOpacity
          style={styles.squareButton}
          onPress={() => navigation.navigate('Article 2')}>
          <ImageBackground
            source={require('../assets/BreakTheStigma.png')}
            style={styles.imageButtonBackground}
            resizeMode="cover"
          >
          </ImageBackground>
        </TouchableOpacity>
      </View>

      {/* Stats Image */}
      <Image
        source={require('../assets/homestats.png')}
        style={styles.statsImage}
        resizeMode="contain"
      />

      {/* Recently Viewed Section (placeholder for actual content) */}
      <Text style={styles.recentlyViewedText}>Recently Viewed</Text>
      <View style={styles.recentActivityContainer}>
        <Image
          source={require('../assets/Location.png')} // Make sure the path is correct
          style={styles.recentActivityIcon}
        />
        <Text>No Recent Activity</Text>
      </View>

      {/* Bottom Navigation Placeholder (not included in the code) */}
      {/* You'll need to use a BottomTabNavigator or custom view to create this */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  logo: {
    width: 250, // Adjust the width based on your logo
    height: 100, // Adjust the height based on your logo
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'center',
    marginBottom: 16,
  },

  searchPlaceholder: {
    marginLeft: 8,
    color: '#888',
    fontSize: 18,
    flex: 1,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
    paddingHorizontal: 25,
  },
  squareButton: {
    width: 180,
    height: 180,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 3,
  },
  imageButtonBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  statsImage: {
    width: '100%',
    height: 200, // Adjust based on the size of your image
    resizeMode: 'contain',
    marginVertical: 20,
  },
  recentlyViewedText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'Left',
    marginLeft: 25,
    marginBottom: 16,
  },
  recentActivityText: {
    fontSize: 15,
    fontWeight: '',
    color: '#333',
    alignSelf: 'center',
    marginLeft: 25,
    marginBottom: 16,
  },
  buttonWithIcon: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 20,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 18,
  },
  iconStyle: {
    width: 30, // Adjust based on your icon size
    height: 30, // Adjust based on your icon size
    marginRight: 10,
  },
  recentlyViewedText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'left',
    marginLeft: 25,
    marginBottom: 16,
  },
  recentActivityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  recentActivityIcon: {
    width: 20, // Adjust size as needed
    height: 20, // Adjust size as needed
    marginRight: 10, // Add some space between the icon and the text
  },

  // Add other styles that you might need for the rest of your components
});

export default HomeScreen;

