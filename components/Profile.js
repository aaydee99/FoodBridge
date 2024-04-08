import { StyleSheet, View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { FIREBASE_DB as db } from '../firebaseConfig'; // Ensure you have the Firebase config correctly imported
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
const mockData = {
  contactDetails: {
    name: 'John Doe',
    email: 'johndoe@email.com',
    phone: '0044712345678',
  },
  currentOrders: [
    {
      id: '1',
      orderNumber: '123456',
      date: 'Fri. Dec 3rd',
      time: '12:45 - 13:00pm',
    },

    // Add more current orders if necessary
  ],
  pastOrders: [
    {
      id: '2',
      orderNumber: '234567',
      date: 'Tue. Nov 9th',
      time: '12:45 - 13:00pm',
    },
    {
      id: '3',
      orderNumber: '345678',
      date: 'Thu. Nov 11th',
      time: '11:45 - 12:00pm',
    },
    // ... more past orders
  ],
};

const ProfileScreen = ({ navigation }) => {

  const [currentOrders, setCurrentOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  const userId = 'GFneDMvdehh9sPQbSJFI'; // This should be dynamically determined, e.g., from auth state

  const goToOrderReview = (orderNumber) => {
    // Pass the order number to the OrderReviewScreen
    navigation.navigate('OrderReview', { orderNumber });
  };

  const handleSignOut = () => {
    // This is where you'd typically handle the sign-out logic
    // For now, it will simply navigate back to the Start screen
    navigation.navigate('Start');
  };


  useEffect(() => {
    const fetchOrders = async () => {
      const ordersRef = collection(db, `users/${userId}/orders`);
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
  }, [userId]); 

  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../assets/mainlogo.png')} // Replace with your logo image file
        style={styles.logo}
      />
      <View style={styles.header}></View>
      <Text style={styles.headerTitle}>Contact Details</Text>
      <View style={styles.contactDetails}><TouchableOpacity style={styles.editButton}><Text style={styles.editButtonText}>EDIT</Text></TouchableOpacity>
        <Text style={styles.contactName}>{mockData.contactDetails.name}</Text>
        <Text style={styles.contactInfo}>{mockData.contactDetails.email}</Text>
        <Text style={styles.contactInfo}>{mockData.contactDetails.phone}</Text>

      </View>

      <View style={styles.ordersSection}>
        <Text style={styles.sectionTitle}>Current Orders</Text>
        {currentOrders.map(order => (
          <View key={order.id} style={styles.orderCard}>
            <TouchableOpacity onPress={() => goToOrderReview(order.orderNumber)}>
              <Text style={styles.orderNumber}>Order No: {order.orderNumber}</Text>
            </TouchableOpacity>
            <Text style={styles.orderDate}>{order.pickUpDate}</Text>
            <Text style={styles.orderTime}>{order.pickUpTime}</Text>
            <TouchableOpacity style={styles.codeButton}>
              <FontAwesome name="qrcode" size={20} color="#fff" />
              <Text style={styles.codeButtonText}>View Code</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      <View style={styles.ordersSection}>
        <Text style={styles.sectionTitle}>Past Orders</Text>
        {pastOrders.map(order => (
          <View key={order.id} style={styles.orderCard}>
            <Text style={styles.orderNumber}>Order No: {order.orderNumber}</Text>
            <Text style={styles.orderDate}>{order.pickUpDate}</Text>
            <Text style={styles.orderTime}>{order.pickUpTime}</Text>
            <Text style={styles.codeExpired}>Code Expired</Text>
          </View>
        ))}
      </View>

      {/* Add the sign-out button */}
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut}>
        <Text style={styles.signOutButtonText}>SIGN OUT</Text>
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
    height: 0, // Set the height of your header
    backgroundColor: '#fff', // Set the background color of your header
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginVertical: 10,
    marginLeft: 20,
  },
  logo: {
    width: 250, // Adjust the width based on your logo
    height: 100, // Adjust the height based on your logo
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 0,
  },
  contactDetails: {
    backgroundColor: '#f4f4f4',
    padding: 0,

  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  contactInfo: {
    fontSize: 16,
    color: '#333',
    marginLeft: 20,
  },
  editButton: {
    alignSelf: 'flex-end',
    marginTop: 0,
    marginRight: 20,
  },
  editButtonText: {
    color: '#0377FF',
    fontWeight: 'bold',
  },
  ordersSection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
  orderCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1.5,
    elevation: 2,
  },
  orderNumber: {
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
  codeButton: {
    backgroundColor: '#0BCE83',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 20,
  },
  codeButtonText: {
    color: '#fff',
    marginLeft: 10,
    fontWeight: 'bold',
  },
  codeExpired: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  homeButton: {
    backgroundColor: '#0BCE83',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginVertical: 20,
    marginHorizontal: 10,
  },
  homeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signOutButton: {
    backgroundColor: '#DD4B39', // Example background color for sign-out button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginVertical: 20,
    alignSelf: 'center', // Center button in the view
  },
  signOutButtonText: {
    color: '#FFFFFF', // Example text color for sign-out button
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
