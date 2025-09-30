import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text ,TouchableOpacity,Alert} from "react-native";

export default function SignIn({navigation}) {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");

  const handleSignup = () => {
    if (!username || !pass) {
      Alert.alert("Error", "Please enter both username and password.");
    } else {
      navigation.navigate("Details")
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={pass}
        onChangeText={setPass}
        secureTextEntry
      />
       <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text>Sign up</Text>
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
});