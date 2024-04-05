import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Calendar } from 'react-native-calendars';
import {FIREBASE_DB as db } from '../firebaseConfig';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
const ConfirmDetailsScreen = ({ navigation }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const userID = 'GFneDMvdehh9sPQbSJFI';
  const timeSlots = [
    '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM',
    '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM',
  ]; // Define available time slots here

  const onDaySelect = (day) => {
    setSelectedDate(day.dateString);
    setSelectedTimeSlot(null); // Reset the selected time slot when a new date is selected
  };

  const onTimeSlotSelect = (timeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleConfirmReservation = async () => {
    if (selectedDate && selectedTimeSlot) {
      // Fetch cart items before creating the order
      const cartRef = collection(db, `users/${userID}/cart`);
      const cartSnapshot = await getDocs(cartRef);
      const cartItems = cartSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      // Create the order in Firestore
      const orderDetails = {
        orderNumber: '123456', // Ideally, generate this dynamically
        pickUpDate: selectedDate,
        pickUpTime: selectedTimeSlot,
        location: 'South Belfast Foodbank',
        items: cartItems, // Store the entire cart items in the order
      };

      await addDoc(collection(db, `users/${userID}/orders`), orderDetails).then(()=>{
        navigation.navigate('OrderReview', { orderDetails }); 
      })
        .catch((error) => {
          console.error("Error creating the order: ", error);
        });
    } else {
      alert('Please select both a date and a time slot for your pickup.');
    }
  };

  return (
    <ScrollView style={styles.container}>

      <View style={styles.detailsContainer}>
        <View style={styles.contactDetails}>
          <Text style={styles.title}>Contact Details</Text>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>EDIT</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.userInfoContainer}>
          <View style={styles.userInfo}>
            <Ionicons name="person-outline" size={24} color="black" />
            <Text style={styles.userInfoText}>John Doe</Text>
          </View>
          <View style={styles.userInfo}>
            <Ionicons name="mail-outline" size={24} color="black" />
            <Text style={styles.userInfoText}>Johndoe@email.com</Text>
          </View>
          <View style={styles.userInfo}>
            <Ionicons name="call-outline" size={24} color="black" />
            <Text style={styles.userInfoText}>0044712345678</Text>
          </View>
        </View>

        <View style={styles.datePickerContainer}>
          <Text style={styles.title}>Pickup Date & Time</Text>
          <Calendar
            onDayPress={onDaySelect}
            markedDates={{
              [selectedDate]: { selected: true, marked: true, selectedColor: '#0377FF' },
            }}
            // Styling and other props for the Calendar component
          />
        </View>

        {selectedDate && (
          <View style={styles.timeSlotsContainer}>
            {timeSlots.map((timeSlot) => (
              <TouchableOpacity
                key={timeSlot}
                style={[
                  styles.timeSlotButton,
                  selectedTimeSlot === timeSlot && styles.timeSlotButtonSelected,
                ]}
                onPress={() => onTimeSlotSelect(timeSlot)}
              >
                <Text style={styles.timeSlotText}>{timeSlot}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmReservation}>
      <Text style={styles.confirmButtonText}>CONFIRM RESERVATION</Text>
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
  detailsContainer: {
    margin: 20,
  },
  contactDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  editButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#D3D3D3',
  },
  editButtonText: {
    color: '#000',
    fontSize: 16,
  },
  userInfoContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  userInfoText: {
    marginLeft: 10,
    fontSize: 16,
  },
  datePickerContainer: {
    marginBottom: 20,
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  timeSlotButton: {
    padding: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 5,
    marginBottom: 10,
  },
  timeSlotButtonSelected: {
    backgroundColor: '#0ACF83',
  },
  timeSlotText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#000',
  },
  confirmButton: {
    padding: 15,
    backgroundColor: '#0ACF83',
    borderRadius: 5,
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ConfirmDetailsScreen;
