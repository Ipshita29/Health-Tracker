import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Image
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      const storedUser = await AsyncStorage.getItem("user");

      if (!storedUser) {
        Alert.alert("Error", "No user found. Please sign up first.");
        return;
      }

      const user = JSON.parse(storedUser);

      const storedEmail = user.email?.trim();
      const storedPass = user.pass?.trim();

      if (storedEmail === email.trim() && storedPass === password.trim()) {
        await AsyncStorage.setItem("loggedIn", "true");

        Alert.alert("Success", "Login successful");

        navigation.replace("HomeScreen"); 
      } else {
        Alert.alert("Error", "Invalid email or password");
      }
    } catch (error) {
      console.log("Login error:", error);
      Alert.alert("Error", "Unexpected issue occurred");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#2C2C2C" />
      <ImageBackground 
        source={require('../assets/background.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.topCurveContainer}>
          <View style={styles.topCurve}></View>

          <Image
            source={require('../assets/aria.png')}
            style={styles.airaImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.welcomeText}>Welcome Back</Text>

          {/* Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password */}
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter your password"
              placeholderTextColor="#999"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Login button */}
          <TouchableOpacity style={styles.signupButton} onPress={handleLogin}>
            <Text style={styles.signupButtonText}>Login</Text>
          </TouchableOpacity>

          {/* Go to signup */}
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.signInLink}>
            <Text style={styles.signInText}>
              Don't have an account? <Text style={styles.signInNowText}>Sign up here.</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2C2C2C',
  },
  background: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: "#2C2C2C"
  },
  topCurveContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '35%',
    overflow: 'hidden',
  },
  topCurve: {
    position: 'absolute',
    top: -100,
    left: -50,
    right: -50,
    bottom: 0,
    backgroundColor: '#F8F8F8',
    borderBottomLeftRadius: 1000,
    borderBottomRightRadius: 1000,
    transform: [{ scaleX: 1.5 }],
  },
  airaImage: {
    position: 'absolute',
    top: 20,
    left: 230,
    width: 160,
    height: 200,
    zIndex: 10,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#FFF',
    marginBottom: 8,
    fontWeight: '600',
  },
  textInput: {
    height: 55,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 15,
    paddingHorizontal: 20,
    color: '#FFF',
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#FFF',
  },
  signupButton: {
    backgroundColor: "#FFF",
    paddingVertical: 18,
    borderRadius: 15,
    marginTop: 30,
    alignItems: "center",
  },
  signupButtonText: {
    color: '#2C2C2C',
    fontWeight: 'bold',
    fontSize: 18,
  },
  signInLink: {
    marginTop: 25,
    alignSelf: "center"
  },
  signInText: {
    color: "#FFF",
    fontSize: 15
  },
  signInNowText: {
    color: "#FFF",
    fontWeight: "bold"
  }
});

export default Login;
