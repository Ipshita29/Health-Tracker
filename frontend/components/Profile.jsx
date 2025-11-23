import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          setName(user.name || "");
          setEmail(user.email || "");
        }
      } catch (error) {
        console.log("Error loading user info:", error);
      }
    };

    loadUser();
  }, []);

  // Logout function
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("loggedIn");

      navigation.replace("Login");
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/profileBackground.png")}
      style={styles.bg}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome {name}!</Text>
        <Text style={styles.email}>Email: {email}</Text>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default Profile;

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    alignItems: "center",
    paddingVertical: 30,
    backgroundColor: "rgba(39, 38, 38, 0.34)",
    borderRadius: 15,
  },
  title: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
  },
  email: {
    fontSize: 18,
    color: "#fff",
    marginTop: 25,
    marginBottom: 20
  },
  logoutBtn: {
    backgroundColor: "#9c989854",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 20,
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
