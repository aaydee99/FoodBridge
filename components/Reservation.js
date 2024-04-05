import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const ReservationScreen = ({ route, navigation }) => {
  // Retrieve the pickup details passed from the ConfirmDetails screen
  const { pickupDetails } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.headerTitle}>Order Reservation</Text>
        <QRCode
          value={`OrderNo:${pickupDetails.orderNumber};PickUpTime:${pickupDetails.pickUpTime};PickUpDate:${pickupDetails.pickUpDate}Location:${pickupDetails.location}`}
          size={200}
          color="black"
          backgroundColor="white"
        />
        <Text style={styles.orderNumber}>Order No: {pickupDetails.orderNumber}</Text>
        <Text style={styles.instruction}>Please Provide Tokens at Food Bank</Text>
        <Text style={styles.time}>{pickupDetails.pickUpDate}</Text>
        <Text style={styles.time}>{pickupDetails.pickUpTime}</Text>
        <Text style={styles.location}>{pickupDetails.location}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.mapsButton}>
          <Text style={styles.mapsButtonText}>MAPS</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.homeButton}>
          <Text style={styles.homeButtonText}>BACK TO HOME</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    alignItems: 'center',
    padding: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 20,
  },
  orderNumber: {
    fontSize: 16,
    marginVertical: 20,
  },
  instruction: {
    fontSize: 16,
    marginBottom: 20,
  },
  time: {
    fontSize: 16,
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
    marginBottom: 20,
  },
  mapsButton: {
    backgroundColor: '#4074FC',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  mapsButtonText: {
    color: 'white',
    fontSize: 16,
  },
  homeButton: {
    backgroundColor: '#30D158',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  homeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default ReservationScreen;
