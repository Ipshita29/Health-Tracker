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

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("loggedIn");
      navigation.replace("Login");
    } catch (error) {
      console.log("Error during logout:", error);
    }
  };

  const initials = name ? name.charAt(0).toUpperCase() : "U";

  return (
    <ImageBackground
      source={require("../assets/profileBackground.png")}
      style={styles.bg}
    >
      <View style={styles.container}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>

        <Text style={styles.title}>{name}</Text>
        <Text style={styles.email}>{email}</Text>

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
    paddingVertical: 35,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.13)",
    backdropFilter: "blur(10px)",
  },

  avatar: {
    width: 95,
    height: 95,
    borderRadius: 60,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  avatarText: {
    fontSize: 40,
    color: "#fff",
    fontWeight: "bold",
  },

  title: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "700",
  },

  email: {
    fontSize: 18,
    color: "#e8e8e8",
    marginTop: 8,
    marginBottom: 22,
  },

  secondaryBtn: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.18)",
    marginBottom: 15,
  },

  secondaryBtnText: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "600",
  },

  logoutBtn: {
    width: "85%",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: "#d1ab8cef",
    elevation: 5,
  },

  logoutText: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "700",
  },
});
