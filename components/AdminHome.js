import React from 'react';
import { StyleSheet, Text, View, Image, TextInput, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const AdminHome = ({ navigation }) => {
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
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UpdateDetails')}>
          <Text style={styles.buttonText}>Update Foodbank Details</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('NewItem')}>
          <Text style={styles.buttonText}>Add New Items</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Requests')}>
          <Text style={styles.buttonText}>Request Items</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UpdatedAmount')}>
          <Text style={styles.buttonText}>Update Stock</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AdminOrders')}>
          <Text style={styles.buttonText}>Customer Orders</Text>
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
    color: '#0BCE83',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFFFFF', // or any other color you want for the button
    padding: 15,
    borderRadius: 30,
    marginVertical: 15, // to separate buttons vertically
    alignItems: 'center',
    width: 400,
    height: 80,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    fontSize: 25,
    color: '#0377FF', // the color of your text
    fontWeight: 'bold',
    marginTop: 10,
  },
 

});

export default AdminHome;