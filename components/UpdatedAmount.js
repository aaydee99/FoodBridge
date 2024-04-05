import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList, Image, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import UpdateConfirmation from './UpdateConfirmation';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';
import { FIREBASE_DB as db } from '../firebaseConfig';

const data = [
  { id: '1', name: 'Carrots', stock: 2, image: require('../assets/carrots.png') },
  { id: '2', name: 'Boston Lettuce', stock: 2, image: require('../assets/lettuce.png') },
  { id: '3', name: 'Cauliflower', stock: 6, image: require('../assets/cauliflower.png') },
  { id: '4', name: 'Savoy Cabbage', stock: 8, image: require('../assets/Cabbage.png') },
  // ... more items
];

export const imageMap = {
  'Carrots': require('../assets/carrots.png'),
  'Boston Lettuce': require('../assets/lettuce.png'),
  'Cauliflower': require('../assets/cauliflower.png'),
  'Savoy Cabbage': require('../assets/Cabbage.png'),
  // Add more mappings as necessary
};



const UpdateAmountScreen = ({navigation}) => {
  const [inventory, setInventory] = useState(data);

  useEffect(() => {
    const fetchInventory = async () => {
      const querySnapshot = await getDocs(collection(db, 'vegetables'));
      const items = querySnapshot.docs.map(doc => {
        const data = doc.data();
        // Use the name to find the correct image in the mapping
        const image = imageMap[data.name] // Fallback to a default image if not found
        return {
          ...data,
          id: doc.id,
          image: image, // Assign the mapped image
        };
      });
      setInventory(items);
    };
  
    fetchInventory();
  }, []);

  const updateStock = async (itemId, newStock) => {
    const itemRef = doc(db, 'vegetables', itemId);
    await updateDoc(itemRef, {
      stock: newStock,
    });
    setInventory(inventory.map(item => item.id === itemId ? { ...item, stock: newStock } : item));
  };

  const incrementStock = (itemId) => {
    const currentItem = inventory.find(item => item.id === itemId);
    if (currentItem) {
      updateStock(itemId, currentItem.stock + 1);
    }
  };

  const decrementStock = (itemId) => {
    const currentItem = inventory.find(item => item.id === itemId);
    if (currentItem && currentItem.stock > 0) {
      updateStock(itemId, currentItem.stock - 1);
    }
  };

  // Call this function when the Confirm Updates button is pressed
  const handleConfirmUpdates = () => {
    navigation.navigate('UpdateConfirmation'); // Use the correct screen name as defined in your navigator
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
     <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemDetailContainer}>
        <View style={styles.itemDetail}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemStock}>{`${item.stock} In Stock`}</Text>
        </View>
        <View style={styles.stockControl}>
          <TouchableOpacity onPress={() => decrementStock(item.id)} style={styles.controlButton}>
            <AntDesign name="minus" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.stockValue}>{item.stock}</Text>
          <TouchableOpacity onPress={() => incrementStock(item.id)} style={styles.controlButton}>
            <AntDesign name="plus" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.addButton}>
        <AntDesign name="pluscircleo" size={24} color="blue" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/mainlogo.png')} 
          style={styles.logo}
        />
        <Text style={styles.screenTitle}>Update Stock</Text>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <AntDesign name="search1" size={20} color="black" />
          <TextInput
            placeholder="Search Items"
            style={styles.searchInput}
          />
        </View>
      </View>
      <FlatList
        data={inventory}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={styles.list}
      />
      {/* Add a footer for the Confirm Updates button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmUpdates}>
          <Text style={styles.confirmButtonText}>Confirm Updates</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8F8',
      },
      header: {
        paddingTop: 10, // For status bar
        paddingBottom: 10,
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
      logo: {
        width: 250,
        height: 100, 
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
        marginBottom: 10,
      },
      searchContainer: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 25,
        paddingVertical: 8,
        paddingHorizontal: 15,
        alignItems: 'center',
        width: '90%',
        marginBottom: 20,
      },
      searchInput: {
        flex: 1,
        marginLeft: 10,
      },
      list: {
        backgroundColor: '#fff', 
      },
      itemContainer: {
        flexDirection: 'row',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff', // Added for contrast
        borderBottomWidth: 1, // Added for separation
        borderColor: '#eee', // Added for separation
      },
      itemImage: {
        width: 170, // Adjusted for layout
        height: 120, // Adjusted for layout
        borderRadius: 10,
      },
      itemInfo: {
        flex: 1, // Take available space
        marginLeft: 10, // Add some spacing from the image
      },
      itemName: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5, // Add spacing between name and stock
      },
      itemStock: {
        fontSize: 16,
        color: 'green',
        marginBottom: 10, // Add spacing between stock and controls
      },
      stockControl: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      controlButton: {
        padding: 10, // Easier to tap
      },
      stockValue: {
        marginHorizontal: 10,
        fontSize: 18,
      },
      addButton: {
        padding: 5,
      },
      footer: {
        padding: 20,
        borderTopWidth: 1,
        borderColor: '#ccc',
        backgroundColor: '#fff',
      },
      confirmButton: {
        backgroundColor: '#0BCE83', 
        borderRadius: 25,
        paddingVertical: 15,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
      },
      confirmButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
      },
});

export default UpdateAmountScreen;
