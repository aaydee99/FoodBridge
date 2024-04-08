import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import {FIREBASE_DB as db } from '../firebaseConfig'; // Adjust this path
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
// const ordersData = {
//   currentOrders: [
//     {
//       id: '1',
//       orderNumber: '123456',
//       date: 'Fri. Dec 3rd',
//       time: '12:45 - 13:00pm',
//       status: 'Pending',
//     },
//     {
//       id: '2',
//       orderNumber: '654321',
//       date: 'Thu. Dec 2nd',
//       time: '11:45 - 12:00pm',
//       status: 'Ready',
//     },
//     // ... more current orders
//   ],
//   pastOrders: [
//     {
//       id: '3',
//       orderNumber: '456789',
//       date: 'Wed. Oct 18th',
//       time: '11:00 - 11:15am',
//       status: 'Expired',
//     },
//     // ... more past orders
//   ],
// };

const getStatusStyle = (status) => {
  switch (status) {
    case 'Pending':
      return styles.pendingButton;
    case 'Ready':
      return styles.readyButton;
    default:
      return styles.statusButton;
  }
};

const AdminOrders = ({ navigation }) => {
  const [currentOrders, setCurrentOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  const userID = 'GFneDMvdehh9sPQbSJFI'

  useEffect(() => {
    const fetchOrders = async () => {
      const ordersRef = collection(db, `users/${userID}/orders`);
      // Query orders and order them by timestamp
      const q = query(ordersRef, orderBy("timestamp", "desc"));
  
      try {
        const ordersSnapshot = await getDocs(q);
        const now = new Date();
        // Calculate the date one week ago from now
        const oneWeekAgo = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
  
        const fetchedOrders = ordersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          // Convert Firestore Timestamp to JavaScript Date object
          timestamp: doc.data().timestamp.toDate()
        }));
  
        // Filter orders based on whether they are newer than one week ago
        const currentOrders = fetchedOrders.filter(order => order.timestamp > oneWeekAgo);
        const pastOrders = fetchedOrders.filter(order => order.timestamp <= oneWeekAgo);
  
        setCurrentOrders(currentOrders);
        setPastOrders(pastOrders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
  
    fetchOrders();
  }, [userID]); 
  const goToOrderReview = (order) => {
    navigation.navigate('AdminOrderReview', { order });
  };

  const scanQRCode = (order) => {
    // Navigate to your QR Code Scanner screen, and optionally pass order data if needed
    navigation.navigate('QRCodeScanner', { order });
  };

  return (
    <ScrollView style={styles.container}>
      {/* Logo and Title */}
      <View style={styles.header}>
        {/* Replace with your logo */}
        <Image
          source={require('../assets/mainlogo.png')} 
          style={styles.logo}
        />
      </View>

      <Text style={styles.sectionHeader}>Current Orders</Text>
      {currentOrders.map((order) => (
        <View key={order.id} style={styles.orderCard}>
          <Text style={styles.orderText}>Order No: {order.orderNumber}</Text>
          {/* Additional order details */}
          <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigation.navigate('AdminOrderReview', { orderNumber: order.orderNumber })}
            >
              <Text style={styles.detailsButtonText}>View Details</Text>
            </TouchableOpacity>
        </View>
      ))}

      {/* Past Orders Section */}
      <Text style={styles.sectionHeader}>Past Orders</Text>
      {pastOrders.map((order) => (
        <View key={order.id} style={styles.orderCard}>
          <Text style={styles.orderText}>Order No: {order.orderNumber}</Text>
          {/* Additional order details */}
          <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigation.navigate('AdminOrderReview', { orderNumber: order.orderNumber })}
            >
              <Text style={styles.detailsButtonText}>View Details</Text>
            </TouchableOpacity>
        </View>
      ))}

      {/* Back to Home Button */}
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('AdminHome')}
      >
        <Text style={styles.homeButtonText}>BACK TO HOME</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
  },
  header: {
    padding: 0,
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  logo: {
    width: 250,
    height: 100, 
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'navy',
    marginBottom: 10,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  orderCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,

    borderColor: '#e0e0e0',
    borderWidth: 1,
    paddingTop: 10,
  
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  orderText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  orderDate: {
    fontSize: 14,
    color: 'grey',
  },
  orderTime: {
    fontSize: 14,
    color: 'grey',
    marginBottom: 10,
  },
  statusButton: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  pendingButton: {
    backgroundColor: '#0377FF',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    // ... (The rest of your button styling)
  },
  readyButton: {
    backgroundColor: '#0ACF83',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    // ... (The rest of your button styling)
  },
  statusText: {
    color: 'white',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  statusExpired: {
    color: 'red',
  },
  homeButton: {
    backgroundColor: '#0ACF83',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  homeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  scanButton: {
    position: 'absolute', // Position the button over the card
    top: 10, // Distance from the top of the card
    right: 10, // Distance from the right of the card
    backgroundColor: '#0377FF', // Button background color
    padding: 10, // Padding inside the button
    borderRadius: 20, // Rounded corners
  },
});

export default AdminOrders;
