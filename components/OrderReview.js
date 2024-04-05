import { useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import {FIREBASE_DB as db } from '../firebaseConfig'; // Adjust this path to where your Firestore configuration is
import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore';
import { imageMap } from './UpdatedAmount';

// Mock data for the order items
const orderItems = [
  {
    id: '1',
    name: 'Sweet Corn',
    quantity: '1 Reserved',
    date: 'Fri. Dec 3rd',
    time: '12:45 - 13:00pm',
    image: require('../assets/sweet_corn.png'), // Replace with your image path
  },
  {
    id: '2',
    name: 'Boston Lettuce',
    quantity: '1 Reserved',
    date: 'Fri. Dec 3rd',
    time: '12:45 - 13:00pm',
    image: require('../assets/lettuce.png'), // Replace with your image path
  },
  {
    id: '3',
    name: 'Rump Steak',
    quantity: '1 Reserved',
    date: 'Fri. Dec 3rd',
    time: '12:45 - 13:00pm',
    image: require('../assets/steak.png'), // Replace with your image path
  },
  // Add more items as needed
];

const OrderReviewScreen = () => {
  const route = useRoute();
  const { orderNumber } = route.params;
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderItems, setOrderItems] = useState([]);
  
  const userId = 'GFneDMvdehh9sPQbSJFI'; // This should dynamically fetch or use the logged-in user's ID

  useEffect(() => {
    // Function to fetch order details goes here
    const fetchOrderDetails = async () => {
      const ordersRef = collection(db, `users/${userId}/orders`);
      const q = query(ordersRef, where('orderNumber', '==', orderNumber));
      
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const orderData = querySnapshot.docs[0].data();
        fetchItemDetails(orderData.items); // Assuming items is an array of item IDs
      } else {
        console.log("No order found with order number:", orderNumber);
      }
    };

    const fetchItemDetails = async (items) => {
      const itemsWithDetails = await Promise.all(items.map(async (item) => {
        const vegRef = doc(db, "vegetables", item.id);
        const vegSnap = await getDoc(vegRef);
        if (vegSnap.exists()) {
          const name = vegSnap.data().name;
          return {
            ...item,
            name, // Add the vegetable name to the item
            image: imageMap[name] // Look up the image path in imageMap
          };
        }
        return item;
      }));
      setOrderItems(itemsWithDetails);
    };

    fetchOrderDetails();
    console.log(orderItems)
  }, []);


  
  // Assuming orderDetails includes a field 'items' which is an array of items
  return (
    <View style={styles.container}>
      <Image source={require('../assets/mainlogo.png')} style={styles.logo} />
      <Text style={styles.headerText}>Order Review</Text>
      <Text style={styles.orderNumber}>Order No: {orderNumber}</Text>
      <FlatList
        data={orderItems}
        keyExtractor={(item, index) => `item-${index}`}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>{item.quantity}</Text>
              
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.cancelButton} onPress={() => console.log('Cancel order')}>
        <Text style={styles.cancelButtonText}>CANCEL ORDER</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 250, // Adjust the width based on your logo
    height: 100, // Adjust the height based on your logo
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 0,
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 10,
  },
  orderNumber: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
    color: '#0377FF',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  itemImage: {
    width: 170,
    height: 130,
    borderRadius: 10,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: 16,
    fontStyle: 'italic',
  },
  itemTime: {
    fontSize: 14,
    color: '#555',
  },
  cancelButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    marginHorizontal: 50,
  },
  cancelButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default OrderReviewScreen;
