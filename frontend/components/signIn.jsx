import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text ,TouchableOpacity,Alert} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; // <-- Import AsyncStorage

export default function SignIn({navigation}) {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");

  const handleSignup = async () => { // <-- Made function async
    if (!username || !pass) {
      Alert.alert("Error", "Please enter both username and password.");
      return;
    }
    
    // 1. Check if username already exists (simulating database check)
    try {
        const storedPassword = await AsyncStorage.getItem(username);
        if (storedPassword !== null) {
            Alert.alert("Signup Failed", "This username is already taken. Please choose another one.");
            return;
        }
    } catch (error) {
        console.error("AsyncStorage error during lookup:", error);
    }
    
    // 2. Store the new user data
    try {
      await AsyncStorage.setItem(username, pass); // Key: username, Value: password
      console.log(`User ${username} successfully registered.`);
      
      Alert.alert("Success!", "Account created. Now let's set up your profile.", [
        { text: "Continue", onPress: () => navigation.navigate("Details") }
      ]);
      
    } catch (e) {
      Alert.alert("Error", "Failed to save registration data. Please try again.");
      console.error("AsyncStorage error:", e);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text> {/* Changed 'Sign In' to 'Sign Up' */}
      <TextInput
        style={styles.input}
        placeholder="Choose Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none" // Best practice for usernames
      />
      <TextInput
        style={styles.input}
        placeholder="Choose Password"
        value={pass}
        onChangeText={setPass}
        secureTextEntry
      />
       <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    alignItems: "center", 
    justifyContent: "center",
    backgroundColor: "#f5f6fa", 
    padding: 20,
  },
  title: { 
    fontSize: 30, 
    fontWeight: "700", 
    marginBottom: 30,
    color: "#2f3640", 
  },
  input: {
    width: "85%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#dcdde1",
    borderRadius: 14,
    marginBottom: 20,
    backgroundColor: "#fff",
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 2,
  },
  button: {
    width: "85%",
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#00a8ff", 
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#00a8ff",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: { // Added text style for better contrast
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  }
});