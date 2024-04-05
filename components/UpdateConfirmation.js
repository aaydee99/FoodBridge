import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";

// Foodbanks screen component
const UpdateConfirmation = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Text>All Updates Have Been Confirmed And Saved</Text>
        <Button
          title="Go back to Home"
          onPress={() => navigation.navigate('AdminHome')}
        />
        <StatusBar style="auto" />
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#808080',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
  export default UpdateConfirmation;