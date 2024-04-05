import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, Alert, ImageBackground } from 'react-native';
import {FIREBASE_DB as db} from '../firebaseConfig'
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';

const SignUpScreen2 = ({ navigation }) => {
  const [forename, setForename] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');


  const handleSignUp = async () => {
    if (password !== repeatPassword) {
      Alert.alert("Error", "Passwords do not match.");
      return;
    }

    let userType = 'user'; // Default to 'user'
    if (email === 'admin') {
      userType = 'admin';
    } else if (email !== 'user') {
      Alert.alert("Error", "Username must be either 'admin' or 'user'.");
      return;
    }

    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', email));

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        Alert.alert("Error", "A user already exists with that username.");
        return;
      }

      // Insert user into Firestore
      await addDoc(usersRef, {
        email: email,
        forename: forename,
        surname: surname,
        password: password, // Reminder: Ideally use Firebase Auth
        type: userType
      });

      Alert.alert("Sign Up Successful", "You are now signed up as a " + userType + ".");
      navigation.goBack();

    } catch (error) {
      console.error(error);
      Alert.alert("Sign Up Error", "There was an issue during the sign up process.");
    }
  };

  return (
    <ImageBackground
      source={require('../assets/LoginBackground.png')} // Make sure the path is correct
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Replace with your logo using an Image component */}
        <Text style={styles.logo}>SIGN UP</Text>
        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, styles.inputHalf]}
            placeholder="FORENAME"
            value={forename}
            onChangeText={setForename}
            autoCapitalize="none"
          />
          <TextInput
            style={[styles.input, styles.inputHalf]}
            placeholder="SURNAME"
            value={surname}
            onChangeText={setSurname}
            autoCapitalize="none"
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="EMAIL"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="PASSWORD"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="REPEAT PASSWORD"
          value={repeatPassword}
          onChangeText={setRepeatPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleSignUp}>
          <Text style={styles.loginButtonText}>SIGN UP</Text>
        </TouchableOpacity>
        {/* You can add social sign up options here */}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    fontSize: 50,
    color: '#000',
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginBottom: 60,
    marginTop: 30,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  input: {
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  inputHalf: {
    width: '38%',
  },
  loginButton: {
    backgroundColor: '#0BCE83',
    paddingVertical: 20,
    paddingHorizontal: 80,
    borderRadius: 30,
    marginTop: 20,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Add additional styles if needed
});

export default SignUpScreen2;
