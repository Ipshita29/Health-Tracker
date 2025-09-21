import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text ,TouchableOpacity,Alert} from "react-native";

export default function SignIn({navigation}) {
  const [username, setUsername] = useState("");
  const [pass, setPass] = useState("");

  const handleSignup = () => {
    if (!username || !pass) {
      Alert.alert("Error", "Please enter both username and password.");
    } else {
      Alert.alert("Success", `Welcome ${username}!`,[{
        text:"OK",onPress:()=>navigation.navigate("Details")
      }]);
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
    backgroundColor: "#eee3ff", 
    padding: 20,
  },
  title: { 
    fontSize: 28, 
    fontWeight: "bold", 
    marginBottom: 25,
    color: "#34006A", 
  },
  input: {
    width: "80%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#b675f3", 
    borderRadius: 12,
    marginBottom: 18,
    backgroundColor: "#fff",
    fontSize: 16,
  },
   button: {
    width: "80%",
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#d2b0f2ff", 
    alignItems: "center",
    marginTop: 10,
  },
});
