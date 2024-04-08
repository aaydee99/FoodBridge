import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../components/CartContext';
import { imageMap } from './UpdatedAmount';
import { collection, getDocs, query, where, doc, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { FIREBASE_DB as db } from '../firebaseConfig';

// Mock data for the vegetable items
const vegetables = [
  { id: '1', title: 'Carrots', count: '8 Available', image: require('../assets/carrots.png') },
  { id: '2', title: 'Boston Lettuce', count: '5 Available', image: require('../assets/lettuce.png') },
  { id: '3', title: 'Purple Cauliflower', count: '6 Available', image: require('../assets/cauliflower.png') },
  { id: '4', title: 'Savoy Cabbage', count: '2 Available', image: require('../assets/Cabbage.png') },
  // ... add more vegetables as needed
];

const VegetablesScreen = () => {
  const [vegetables, setVegetables] = useState([]);
  const [userID, setUserID] = useState('')
  const navigation = useNavigation();


  useEffect(() => {
    const fetchUserIdByEmail = async () => {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', 'user'));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        // Assuming the email field is unique and only one document will match
        const userDoc = querySnapshot.docs[0];
        setUserID(userDoc.id); // Store the user ID in state
      } else {
        console.log('No user found with the specified email');
      }
    };

    fetchUserIdByEmail();
  }, []);

  useEffect(() => {
    const fetchVegetables = async () => {
      const veggiesSnapshot = await getDocs(collection(db, 'vegetables'));
      const veggies = veggiesSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        title: doc.data().name,
        image: imageMap[doc.data().name], // Use your imageMap to match names to local images
      }));
      setVegetables(veggies);
    };

    fetchVegetables();
  }, []);

  // Example function to toggle an item's favorite status
  const toggleFavorite = async (itemId) => {
    const userRef = doc(db, 'users', userID);
    // Fetch current favorites from the user's document
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      const { favorites } = docSnap.data();
      if (favorites.includes(itemId)) {
        // If item is already favorited, remove it from favorites
        await updateDoc(userRef, {
          favorites: arrayRemove(itemId)
        });
      } else {
        // If item is not in favorites, add it
        await updateDoc(userRef, {
          favorites: arrayUnion(itemId)
        });
      }
    }
  };
  const addToCart = async (itemId) => {
    if (!userID) {
      console.log('No userID found');
      return; // Exit if no userID is available
    }

    const cartItemRef = doc(db, `users/${userID}/cart`, itemId); // Reference to the specific cart item

    try {
      // Check if the item already exists in the cart
      const cartItemSnapshot = await getDoc(cartItemRef);
      if (cartItemSnapshot.exists()) {
        // If item exists, update its quantity
        const currentQuantity = cartItemSnapshot.data().quantity;
        await setDoc(cartItemRef, {
          id: itemId,
          quantity: currentQuantity + 1
        }, { merge: true });
      } else {
        // If item does not exist, add it with a quantity of 1
        await setDoc(cartItemRef, {
          id: itemId,
          quantity: 1
        }, { merge: true });
      }

      console.log(`Item ${itemId} added/updated in cart successfully`);
    } catch (error) {
      console.error("Error adding/updating item in cart:", error);
    }
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/mainlogo.png')}
          style={styles.headerLogo}
        />
        <Text style={styles.screenTitle}>Vegetables</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="ios-search" size={35} color="gray" />
        <TextInput style={styles.input} placeholder="Search" />
      </View>

      {/* Vegetables List */}
      <FlatList
        data={vegetables}
        renderItem={({ item }) => (
          <View style={styles.vegetableItem}>
            <Image source={item.image} style={styles.vegetableImage} />
            <View style={styles.vegetableInfo}>
              <TouchableOpacity onPress={() => {/* Navigation or detail view logic here */ }}>
                <Text style={styles.vegetableTitle}>{item.title}</Text>
              </TouchableOpacity>
              <Text style={styles.vegetableCount}>{`${item.stock} Available`}</Text>
            </View>
            <TouchableOpacity onPress={() => toggleFavorite(item.id)}>
              <Ionicons name="ios-heart-outline" size={24} color="gray" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => addToCart(item.id)}>
              <Text>Cart</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id}
      />
    </View>
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
  screenTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'left',
    fontStyle: 'italic',
  },

  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    height: 40,
  },
  vegetableItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 0,
    marginHorizontal: 10,
    marginTop: 10,
  },
  vegetableImage: {
    width: 170,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
  },
  vegetableInfo: {
    flex: 1,
  },
  vegetableTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  vegetableCount: {
    fontSize: 14,
    color: '#666',
  },
  favoritesButton: {
    marginRight: 10,
  },
  cartButton: {
    backgroundColor: '#4074FC',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  cartButtonAdded: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
});

export default VegetablesScreen;