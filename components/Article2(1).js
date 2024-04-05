import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Article2Screen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../assets/mainlogo.png')} // Replace with your logo image file
          style={styles.headerLogo}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Break The Stigma</Text>
        <Text style={styles.paragraph}>
          If you are facing food insecurity, know that you are not alone. Many others are coping
          silently with the same daily reality of lacking reliable access to affordable, nourishing food.
          This says nothing about your dignity or humanity. Support communities understand how easily
          hardship can strike, and are working to dissolve harmful stereotypes, raise awareness,
          and create policy changes so no one has their basic needs compromised or spirit diminished
          just to survive. You deserve to know there are allies by your side who provide compassion
          without judgment. Stay hopeful – help is here.
        </Text>
        <Text style={styles.subtitle}>You Are Not Alone</Text>
        <Image
          source={require('../assets/BTS1.jpeg')} // Replace with your article image file
          style={styles.articleImage}
        />
      </View>
    </ScrollView>
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
  content: {
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: '#000',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#0BCE83', // Replace with your subtitle color
    marginBottom: 20,
  },
  articleImage: {
    width: '100%',
    height: 200, // Adjust the height based on your image aspect ratio
    resizeMode: 'cover', // or 'contain' based on your preference
    marginBottom: 20,
    borderRadius: 20
  },
  // ... Add any additional styling you may need
});

export default Article2Screen;