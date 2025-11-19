import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground, StatusBar, Image, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = async () => {
    if (!email || !pass) {
      Alert.alert("Login Error", "All fields are required.");
      return;
    }
    try {
      const data = await AsyncStorage.getItem("user");
      if (!data) {
        Alert.alert("Login Error", "No user found! Sign Up first.");
        return;
      }
      const user = JSON.parse(data);
      if (user.email === email && user.pass === pass) {
        Alert.alert("Success", "Login Successful!");
        navigation.navigate("HomeScreen");
      } else {
        Alert.alert("Login Error", "Wrong Email or Password.");
      }
    } catch (error) {
      console.error("Login Failed:", error); 
      Alert.alert("Login Error", "Login Failed due to an unexpected issue.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#2C2C2C" /> 
      
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ImageBackground 
          source={require('../assets/background.png')} 
          style={styles.backgroundPlaceholder}
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

          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
          >
            <View style={styles.contentContainer}>
              <Text style={styles.welcomeText}>Welcome Back</Text>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <TextInput
                  style={styles.textInput}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  placeholderTextColor="#999" 
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  style={styles.textInput}
                  value={pass}
                  onChangeText={setPass}
                  placeholder="Enter your password"
                  placeholderTextColor="#999"
                  secureTextEntry={true}
                />
              </View>

              <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => navigation.navigate("SignUp")} style={styles.signUpLink}>
                <Text style={styles.signUpText}>Don't have an account? <Text style={styles.createNowText}>Create Now.</Text></Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </ImageBackground>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2C2C2C', 
  },
  keyboardAvoidingContainer: {
    flex: 1, // Must take full space
  },
  backgroundPlaceholder: {
    flex: 1,
    backgroundColor: '#2C2C2C',
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
    left:258,
    width: 150, 
    height: 200, 
    zIndex: 10,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-end', 
  },
  contentContainer: {
    marginTop: '30%', 
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  welcomeText: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#F8F8F8',
    marginBottom: 40,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: '#F8F8F8',
    marginBottom: 8,
    fontWeight: '600',
  },
  textInput: {
    height: 55,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    paddingHorizontal: 20,
    color: '#F8F8F8',
    fontSize: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 1)',
  },
  loginButton: {
    backgroundColor: '#F8F8F8',
    paddingVertical: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 30,
    shadowColor: '#E0BBE4',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  loginButtonText: {
    color: '#2C2C2C',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signUpLink: {
    marginTop: 25,
    alignSelf: 'center',
  },
  signUpText: {
    color: '#F8F8F8',
    fontSize: 15,
  },
  createNowText: {
    color: '#F8F8F8',
    fontWeight: 'bold',
  },
});

export default Login;