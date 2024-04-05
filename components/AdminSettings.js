import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, View } from "react-native";

// Foodbanks screen component
const AdminSettings = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Text>Admin Settings</Text>
        <Button
          title="Go back to Home"
          onPress={() => navigation.navigate('Home')}
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
  
  export default AdminSettings;