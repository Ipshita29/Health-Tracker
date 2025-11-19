import AsyncStorage from "@react-native-async-storage/async-storage";
import React,{useState} from "react";
import { View, Text,TextInput, TouchableOpacity, Alert, StyleSheet, ImageBackground, StatusBar, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"

const SignUp = ({navigation})=>{
  const [name,setName]=useState("")
  const [email,setEmail] = useState("")
  const [pass,setPass]=useState("")
  
  const handleSignup=async()=>{
    if (!name||!email||!pass){
      Alert.alert("SignUp Error", "All Fields are required.")
      return
    }
    try{
      const userdata = {name,email,pass}
      await AsyncStorage.setItem("user",JSON.stringify(userdata))
      Alert.alert("Success", "Account created successfully! Please log in.")
      navigation.navigate("Login") 
      }
    catch(error){
      console.error("SignUp Failed:", error);
      Alert.alert("SignUp Error", "SignUp Failed due to an unexpected issue.")
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#2C2C2C" /> 
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

        <View style={styles.contentContainer}>
          <Text style={styles.welcomeText}>Create Your Account</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Name</Text>
            <TextInput
              style={styles.textInput}
              value={name}
              onChangeText={setName}
              placeholder="Enter your Name"
              placeholderTextColor="#999" 
              autoCapitalize="words"
            />
          </View>

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

          <TouchableOpacity onPress={handleSignup} style={styles.signupButton}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.signInLink}>
            <Text style={styles.signInText}>Already Have an account? <Text style={styles.signInNowText}>Sign in here.</Text></Text>
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
  backgroundPlaceholder: {
    flex: 1,
    justifyContent: 'flex-end',
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
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end', 
    paddingHorizontal: 30,
    paddingBottom: 40,
  },
  welcomeText: {
    fontSize: 32,
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
  signupButton: {
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
  signupButtonText: {
    color: '#2C2C2C',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signInLink: {
    marginTop: 25,
    alignSelf: 'center',
  },
  signInText: {
    color: '#F8F8F8',
    fontSize: 15,
  },
  signInNowText: {
    color: '#F8F8F8',
    fontWeight: 'bold',
  },
});

export default SignUp