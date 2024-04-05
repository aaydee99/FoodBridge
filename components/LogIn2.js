import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { FIREBASE_DB as db } from '../firebaseConfig';

const LogInScreen2 = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Reference to the users collection with Firebase v9 modular syntax
      const usersRef = collection(db, 'users');
      // Create a query to find the user by email with Firebase v9 modular syntax
      const q = query(usersRef, where('email', '==', email));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Alert.alert('Login Failed', 'No such user found.');
        return;
      }

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();

      // Placeholder password comparison - in a real app, use hashed passwords
      if (password === userData.password) {
        if (userData.type === 'admin') {
          navigation.navigate('AdminHome');
        } else {
          navigation.navigate('MainTabs');
        }
      } else {
        Alert.alert('Login Failed', 'Incorrect password.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Login Error', 'There was a problem logging in.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/LoginBackground.png')} // Make sure the path is correct
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          {/* Replace the Text with your actual logo image */}
          <Text style={styles.logo}>LOG IN</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="EMAIL / USERNAME"
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
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>LOG IN</Text>
        </TouchableOpacity>
        <Text
          style={styles.forgotPasswordText}
          onPress={() => Alert.alert('Reset Password', 'Password reset functionality not implemented.')}>
          FORGOT PASSWORD?
        </Text>
        <Text style={styles.socialLoginText}>LOG IN WITH SOCIAL ACCOUNT:</Text>
        {/* Add your social buttons here */}
        <Image
          source={require('../assets/SocialAccounts.png')} // Make sure the path is correct
          style={styles.socialAccounts}
          resizeMode="contain"
        />
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
    backgroundColor: 'transparent',
  },
  logoContainer: {
    marginBottom: 60,
    marginTop: 30,
    // Add your styling for the logo container
  },
  logo: {
    fontSize: 50,
    color: '#000',
    fontStyle: 'italic',
    fontWeight: 'bold',
    // Add your styling for the logo text
  },
  input: {
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
    // Add your styling for the input fields
  },
  loginButton: {
    backgroundColor: '#0BCE83',
    paddingVertical: 20,
    paddingHorizontal: 80,
    borderRadius: 30,
    marginTop: 40,
    // Add your styling for the login button
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    // Add your styling for the login button text
  },
  forgotPasswordText: {
    marginTop: 15,
    color: '#0377FF',
    textDecorationLine: 'underline',
    // Add your styling for the forgot password text
  },
  socialLoginText: {
    marginTop: 15,
    color: '#000',
    // Add your styling for the social login text
  },
  socialAccounts: {
    width: '100%', // Adjust as necessary
    height: 220, // Adjust as necessary
    position: 'absolute',
    bottom: 15,
    // Add your styling for the social accounts image
  },
  // Add styles for social buttons if necessary
});

export default LogInScreen2;
