import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import { FIREBASE_DB as db } from '../firebaseConfig'; // Adjust the import path
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';
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
  const [orderDetails, setOrderDetails] = useState(null);
  const route = useRoute();
  const { orderNumber } = route.params;
  const userID = 'GFneDMvdehh9sPQbSJFI'

  useEffect(() => {
    const fetchOrderDetails = async () => {
      const ordersRef = collection(db, `users/${userID}/orders`);
      const q = query(ordersRef, where('orderNumber', '==', orderNumber));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        // Assuming the first document is the desired order
        const orderData = querySnapshot.docs[0].data();
        setOrderDetails(orderData);
      } else {
        console.log('No order found with the provided order number.');
      }
    };

    fetchOrderDetails();
  }, [orderNumber]);

  // Function to handle cancel order action
  const handleCancelOrder = () => {
    // Implement cancel order functionality
    alert('Order canceled');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/mainlogo.png')} // Replace with your logo path
        style={styles.logo}
      />
      <Text style={styles.headerText}>Order Review</Text>
      <Text style={styles.orderNumber}>Order No: {orderDetails.orderNumber}</Text>
      <FlatList
        data={orderDetails.items} // Adjust based on your data structure
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>{item.quantity}</Text>
              {/* Other details like date and time can be included here */}
            </View>
          </View>
        )}
      />
      <TouchableOpacity style={styles.cancelButton} onPress={handleCancelOrder}>
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
