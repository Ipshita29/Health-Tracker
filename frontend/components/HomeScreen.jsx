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
    paddingTop: 80, 
  },
  

  imageWrapper: {
    height: 250,
    width: 250,
    marginBottom: 35,
    borderRadius: 125,
    backgroundColor: '#E6F0FF', 
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#007AFF',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 8 },
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
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 17,
    color: '#555',
    textAlign: 'center',
    marginBottom: 50, 
    lineHeight: 24,
    maxWidth: 350,
  },
  
  
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  

  loginButton: {
    width: '90%', // Wider button
    padding: 18,
    borderRadius: 15, 
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#007AFF', 
    shadowColor: '#007AFF',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 8,
  },
  loginButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  
  
  signupButton: {
    width: '90%',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#007AFF',
    marginBottom: 15,
  },
  signupButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007AFF', 
  },
});