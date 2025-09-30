import React, { useState } from "react";
import {View,TextInput,StyleSheet,Text,TouchableOpacity,Alert} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'; // <-- Import AsyncStorage

export default function Login({navigation}) {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = async () => { 
      if (!username || !pass) {
        Alert.alert("Error", "Please enter valid username and password.");
        return;
      }
      
      try {
          const storedPassword = await AsyncStorage.getItem(username);
          
          if (storedPassword === null) {
              Alert.alert("Login Failed", "Username not found. Please check your credentials or sign up.");
              return;
          }

          if (storedPassword === pass) {
              Alert.alert("Welcome Back!", `Logged in as ${username}.`);
              navigation.navigate("Dashboard");
          } else {
              Alert.alert("Login Failed", "Incorrect password. Please try again.");
          }

      } catch (error) {
          Alert.alert("Error", "An error occurred during login. Please try again.");
          console.error("AsyncStorage error during login:", error);
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={pass}
        onChangeText={setPass}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      
      {/* Added link to signup for better UX */}
      <TouchableOpacity onPress={() => navigation.navigate("SignIn")} style={styles.signupLink}>
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
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
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  signupLink: {
      marginTop: 25,
      padding: 10,
  },
  signupText: {
      color: '#007AFF',
      fontSize: 16,
      fontWeight: '600',
  }
});