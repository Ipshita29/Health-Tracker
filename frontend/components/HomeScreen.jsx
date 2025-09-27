import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/homebear.png')} style={styles.icon} />
      <Text style={styles.title}>Health-Tracker</Text>
      <Text style={styles.subtitle}>
        Your friendly companion for a healthier life!
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.loginButton]} 
          onPress={()=>navigation.navigate("Login")}
        >
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.signupButton]} 
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={[styles.buttonText, styles.signupText]}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  icon: {
    height: 220,
    width: 220,
    marginBottom: 20,
    borderRadius: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#2f3640',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8fa6',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    padding: 16,
    borderRadius: 28,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4,
  },
  loginButton: {
    backgroundColor: '#00a8ff',
  },
  signupButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#00a8ff',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  signupText: {
    color: '#00a8ff',
  },
});
