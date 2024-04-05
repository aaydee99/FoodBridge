import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../components/CartContext';

const Lettuce = () => {
  const { addToCart, toggleFavorite, favorites } = useCart();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const isFavorite = favorites.includes('lettuce'); // assuming 'lettuce' is the identifier for the item


  const handleAddToCart = () => {
    setIsAddedToCart(true);
    addToCart('lettuce'); // replace 'lettuce' with your actual item object or id
  };

  const handleFavorite = () => {
    toggleFavorite('lettuce'); // replace 'lettuce' with the actual item id
  };

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../assets/lettuce.png')} // Update with the correct path to your image
        style={styles.lettuceImage}
        resizeMode="cover"
      />
      <View style={styles.content}>
        <Text style={styles.title}>Boston Lettuce</Text>
        <Text style={styles.availability}>{isAddedToCart ? '4 Available' : '5 Available'}</Text>
        {/* ... Add your nutritional information ... */}

        <TouchableOpacity onPress={handleFavorite} style={styles.favoriteButton}>
          <Ionicons
            name={isFavorite ? 'ios-heart' : 'ios-heart-outline'}
            size={30}
            color={isFavorite ? 'red' : 'gray'}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleAddToCart} style={isAddedToCart ? styles.addedButton : styles.addButton}>
          <Text style={styles.buttonText}>{isAddedToCart ? 'ADDED TO CART' : 'ADD TO CART'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  lettuceImage: {
    width: '100%',
    height: 300, // Adjust the height as needed
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  availability: {
    fontSize: 18,
    marginBottom: 20,
  },
  favoriteButton: {
    position: 'absolute',
    right: 20,
    zIndex: 10, // Ensure the button is above other elements
    backgroundColor: '#FFFFFF', // Background to cover the part of image
    borderRadius: 30, // Circular background
    padding: 10, // Padding around the icon
  },
  addButton: {
    backgroundColor: '#4074FC',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  addedButton: {
    backgroundColor: 'green',
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  // ... Add any other styling you may need ...
});

export default Lettuce;