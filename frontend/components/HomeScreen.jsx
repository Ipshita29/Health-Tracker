import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image 
          source={require('../assets/homebear.png')} 
          style={styles.icon} 
          resizeMode="cover"
        />
      </View>
      
      <Text style={styles.title}>Health-Tracker</Text>
      <Text style={styles.subtitle}>
        Your friendly companion for a healthier life! Track metrics, set goals, and feel great every day.
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.loginButton} 
          onPress={()=>navigation.navigate("Login")}
        >
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.signupButton} 
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.signupButtonText}>Create Account</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF', 
    alignItems: 'center',
    justifyContent: 'flex-start', 
    padding: 25,
    paddingTop: 150, 
  },
  

  imageWrapper: {
    height: 250,
    width: 250,
    marginBottom: 25,
    borderRadius: 125,
    backgroundColor: '#E6F0FF', 
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#5100ffff',
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 10,
  },
  icon: {
    height: 200, 
    width: 200,
    borderRadius: 100,
  },
  
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#1A237E', 
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 17,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30, 
    lineHeight: 20,
    maxWidth: 250,
  },
  
  
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  

  loginButton: {
    width: '90%', 
    padding: 12,
    borderRadius: 15, 
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#8972d6ff', 
    shadowColor: '#a57fe7ff',
    shadowOpacity: 0.6,
    shadowRadius: 12,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  
  
  signupButton: {
    width: '90%',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#8972d6ff',
  },
  signupButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#8972d6ff', 
  },
});