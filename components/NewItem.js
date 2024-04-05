import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Mock data for the food categories
const categories = [
  { id: '1', title: 'Vegetables', count: 43, image: require('../assets/Vegetables.png') },
  { id: '2', title: 'Fruits', count: 32, image: require('../assets/Fruits.png') },
  { id: '3', title: 'Bread', count: 22, image: require('../assets/Bread.png') },
  { id: '4', title: 'Meats', count: 9, image: require('../assets/Meats.png') },
  { id: '5', title: 'Pasta', count: 16, image: require('../assets/Pasta.png') },
  { id: '6', title: 'Drinks', count: 24, image: require('../assets/Drinks.png') },
  
  // ... add more categories as needed
];

const NewItem = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/mainlogo.png')} // Replace with your logo image file
          style={styles.headerLogo}
        />
        <Text style={styles.screenTitle}>South Belfast Food Bank</Text>

        {/* Food Bank Details Button */}
        <TouchableOpacity onPress={() => navigation.navigate('UpdateDetails')}>
          <Text style={styles.subTitle}>Update Foodbank Details</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('NewItem')}>
          <Text style={styles.subTitle}>NewItem</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Requests')}>
          <Text style={styles.subTitle}>Request Items</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('UpdatedAmount')}>
          <Text style={styles.subTitle}>Update Amount</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="ios-search" size={35} color="gray" />
        <TextInput
          style={styles.input}
          placeholder="Search"
        />
      </View>

      {/* Categories Grid */}
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.categoryItem} onPress={() => {navigation.navigate('Vegetables')}}>
            <Image source={item.image} style={styles.categoryImage} />
            <Text style={styles.categoryTitle}>{item.title}</Text>
            <Text style={styles.categoryCount}>({item.count})</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
        numColumns={2}
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
    fontStyle: 'italic',
  },
  subTitle: {
    fontSize: 16,
    color: '#9586A8',
    textDecorationLine: 'underline',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    margin: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
  },
  categoryItem: {
    flex: 1,
    margin: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryImage: {
    width: 190,
    height: 180,
    borderRadius: 10,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  categoryCount: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
});


  export default NewItem;