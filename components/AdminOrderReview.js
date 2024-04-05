import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { FIREBASE_DB as db } from '../firebaseConfig'; // Adjust this path
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { useRoute } from '@react-navigation/native';
import { imageMap } from './UpdatedAmount';
const AdminOrderReview = ({navigation, route}) => {
  // Mock data
  const [orderDetails, setOrderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { orderNumber } = route.params // Assuming the order ID is passed via navigation parameters
  const userID = 'GFneDMvdehh9sPQbSJFI'
  useEffect(() => {
    const fetchOrderDetails = async () => {
      setIsLoading(true);
  
      // Fetching the specific order document using orderNumber
      const ordersRef = query(collection(db, `users/${userID}/orders`), where("orderNumber", "==", orderNumber));
      const querySnapshot = await getDocs(ordersRef);
  
      if (!querySnapshot.empty) {
        const orderData = querySnapshot.docs[0].data();
  
        // Assuming orderData.items is an array of objects { id: string, quantity: number }
        const itemDetails = await Promise.all(
          orderData.items.map(async (orderItem) => {
            const itemRef = doc(db, `vegetables/${orderItem.id}`);
            const itemSnap = await getDoc(itemRef);
            if (itemSnap.exists()) {
              const itemName = itemSnap.data().name;
              return {
                id: orderItem.id,
                name: itemName,
                quantity: orderItem.quantity,
                image: imageMap[itemName] || null, // Fallback to null if no matching image
              };
            }
            return null;
          })
        );
  
        setOrderDetails(itemDetails.filter(item => item !== null));
      }
      setIsLoading(false);
    };
  
    fetchOrderDetails();
  }, [orderNumber, userID]);
  
  

  return (

    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/mainlogo.png')} style={styles.logo} />
        <Text style={styles.title}>Order Review</Text>
        <Text style={styles.orderNumber}>Order No: {orderNumber}</Text>
      </View>

      <View style={styles.orderItems}>
        {orderDetails.map(item => (
          <View key={item.id} style={styles.itemContainer}>
            {/* <Image source={item.image} style={styles.itemImage} /> */}
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
              {/* Display date and time if available */}
            </View>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.readyButton}>
        <Text style={styles.readyButtonText}>ORDER READY</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.pendingButton}>
        <Text style={styles.readyButtonText}>ORDER PENDING</Text>
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
    alignItems: 'center',
    padding: 20,
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
    marginVertical: 10,
  },
  orderNumber: {
    fontSize: 18,
    color: 'grey',
  },
  orderItems: {
    margin: 10,
  },
  itemContainer: {
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 100,
    height: 100,
  },
  itemInfo: {
    padding: 10,
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: 16,
    color: 'grey',
  },
  itemTime: {
    fontSize: 14,
    color: 'grey',
  },
  readyButton: {
    backgroundColor: '#0ACF83',
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 50,
    borderRadius: 30,
    marginBottom: 20,
  },
  readyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  pendingButton: {
    backgroundColor: '#0377FF',
    paddingVertical: 15,
    alignItems: 'center',
    marginHorizontal: 50,
    borderRadius: 30,
    marginBottom: 20,
  },
});

export default AdminOrderReview;
