import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground } from 'react-native';

const StartScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require('../assets/NewBackground.png')} // replace with your background image path
      style={styles.background}
    >
      <View style={styles.logoContainer}>
      </View>
      <Text style={styles.slogan}>BUILDING CONNECTIONS TO END HUNGER.</Text>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate('LogIn2')} // Replace with your login screen name
      >
        <Text style={styles.buttonText}>LOG IN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => navigation.navigate('SignUp2')} // Replace with your signup screen name
      >
        <Text style={styles.buttonText}>SIGN UP</Text>
      </TouchableOpacity>

    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',      // Add this line
    height: '100%',     // And this line
    resizeMode: 'cover', // And also this line
    justifyContent: 'center',
    alignItems: 'center',
  },
  slogan: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000000',
    textAlign: 'center',
    marginHorizontal: 30,
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: '#0BCE83',
    paddingVertical: 20,
    paddingHorizontal: 130,
    borderRadius: 30,
    marginTop: 20,
    marginBottom: 20,
  },
  signupButton: {
    backgroundColor: 'black',
    paddingVertical: 15,
    paddingHorizontal: 130,
    borderRadius: 30,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // ... add any other styling you may need
});

export default StartScreen;
