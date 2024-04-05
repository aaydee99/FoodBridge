import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert, ImageBackground, Image, } from 'react-native';


const AdminLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Default credentials
    const defaultEmail = 'admin';
    const defaultPassword = 'password';

    // Check if the entered credentials match the default
    if (email === defaultEmail && password === defaultPassword) {
      // Navigate to the HomeScreen if credentials are correct
      navigation.navigate('AdminHome');
    } else {
      // Show an alert if credentials are incorrect
      Alert.alert('Login Failed', 'Incorrect email or password.');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/LoginBackground.png')} // Make sure the path is correct
      style={styles.background}
    >
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* Replace the Text with your Image */}
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
      <Text style={styles.forgotPasswordText}>FORGOT PASSWORD?</Text>
      <Text style={styles.socialLoginText}>LOG IN WITH SOCIAL ACCOUNT:</Text>
      {/* Social buttons would go here */}
      <Image
          source={require('../assets/SocialAccounts.png')} // Make sure the path is correct
          style={styles.socialAccounts}
          resizeMode="contain"
        />
    </View>
    </ImageBackground>
  );
};

// Styles remain the same


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
    // If you have an image, replace this with an Image component
    marginBottom: 60,
    marginTop:30,
  },
  logo: {
    fontSize: 50,
    color: '#000',
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    padding: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#0BCE83',
    paddingVertical: 20,
    paddingHorizontal: 80,
    borderRadius: 30,
    marginTop: 40,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  forgotPasswordText: {
    marginTop: 15,
    color: '#0377FF',
    textDecorationLine: 'underline',
  },
  socialLoginText: {
    marginTop: 15,
    color: '#000',
  },
  socialAccounts: {
    width: '100%', // You can adjust this as needed
    height: 220, // Adjust the height as needed
    position: 'absolute', // Position it at the bottom
    bottom: 15,
  },
  // Add styles for social buttons
});

export default AdminLogin;
