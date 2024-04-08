import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../components/CartContext'; // Import the context
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { FIREBASE_DB as db } from '../firebaseConfig';
import { doc, getDoc, collection, getDocs, query, where, updateDoc } from 'firebase/firestore';
import { imageMap } from './UpdatedAmount';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const [userID, setUserID] = useState('')
  const navigation = useNavigation();
  // const userEmail = "user"; // The user email to identify the user document

  useEffect(() => {
    const fetchUserIdAndCartItems = async () => {
      const userEmail = "user"; // Adjust to the current user's email
      // Fetch the user ID
      const usersQuery = query(collection(db, 'users'), where('email', '==', userEmail));
      const usersSnapshot = await getDocs(usersQuery);
      if (!usersSnapshot.empty) {
        const userDoc = usersSnapshot.docs[0];
        const userId = userDoc.id;
        setUserID(userId); // Store the user ID for later use

        // Fetch cart items for this user
        const cartRef = collection(db, `users/${userId}/cart`);
        const cartSnapshot = await getDocs(cartRef);
        const cartItemsPromises = cartSnapshot.docs.map(async (cartDoc) => {
          const itemRef = doc(db, 'vegetables', cartDoc.id);
          const itemSnap = await getDoc(itemRef);
          return itemSnap.exists() ? {
            id: itemSnap.id,
            ...itemSnap.data(),
            quantity: cartDoc.data().quantity,
            image: imageMap[itemSnap.data().name], // Adjust as necessary
          } : null;
        });
        const fetchedItems = (await Promise.all(cartItemsPromises)).filter(item => item);
        setCartItems(fetchedItems);
        console.log(fetchedItems)
        console.log(cartItems)
      } else {
        console.log('User not found');
      }
    };

    fetchUserIdAndCartItems();
  }, [userID]);

  const handleProceedToCheckout = async () => {
    if (!userID) return; // Guard clause if userID isn't set
    for (const item of cartItems) {
      const veggieRef = doc(db, 'vegetables', item.id);
      await updateDoc(veggieRef, {
        stock: item.stock - item.quantity >= 0 ? item.stock - item.quantity : 0 // Ensure stock isn't negative
      });
      // Optional: Remove item from cart after checkout
    }
    // Navigate to confirmation and potentially clear the cart
    navigation.navigate('ConfirmDetails');
  };
  const removeFromCart = async (userId, itemId) => {
    await deleteDoc(doc(db, `users/${userId}/cart`, itemId));
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  // Renders each item in the cart
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      {/* <Image source={item.image} style={styles.itemImage} /> */}
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemAvailability}>{`${item.quantity} in cart`}</Text>
        <TouchableOpacity onPress={() => removeFromCart(item.userId, item.id)}>
          <Ionicons name="trash-bin" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.locationText}>Your Cart</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={styles.reserveButton}
        onPress={handleProceedToCheckout}
      >
        <Text style={styles.reserveButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  locationText: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 15,
    fontWeight: 'bold',
    color: '#333',
    alignSelf: 'center',
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'center',
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemAvailability: {
    fontSize: 16,
  },
  reserveButton: {
    backgroundColor: '#0BCE83',
    padding: 15,
    borderRadius: 10,
    margin: 20,
  },
  reserveButtonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4, // for Android
    alignItems: 'center',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    margin: 10,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
    paddingRight: 10,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemAvailability: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  reserveButton: {
    backgroundColor: '#0BCE83',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    margin: 20,
    alignItems: 'center',
  },
  reserveButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Add any other styles you need here
});

export default CartScreen;