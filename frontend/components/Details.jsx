import React, { useState } from "react";
import { View, TextInput, StyleSheet, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function Details() {
  const [formData, setFormData] = useState({
    age: "",
    weight: "",
    height: "",
    water: "",
    steps: "",
    gymTime: "",
    yogaTime: "",
    medTime: "",
    sleepHours: "",
    other: "",
  });

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.age || !formData.weight || !formData.height) {
      Alert.alert("Error", "Please fill in age, weight, and height to get started.");
      return;
    }

    // TODO: Connect to backend API to save user details
    console.log("Saving user details:", formData);

    Alert.alert("Success", "Your details have been saved!");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Text style={styles.title}>Your Health Goals</Text>
        
        {/* Basic Details Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Details</Text>
          <View style={styles.inputGroup}>
            <MaterialCommunityIcons name="account" size={24} color="#6A5ACD" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Age"
              keyboardType="numeric"
              value={formData.age}
              onChangeText={val => handleChange("age", val)}
            />
          </View>
          <View style={styles.inputGroup}>
            <MaterialCommunityIcons name="weight-kilogram" size={24} color="#6A5ACD" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Weight (kg)"
              keyboardType="numeric"
              value={formData.weight}
              onChangeText={val => handleChange("weight", val)}
            />
          </View>
          <View style={styles.inputGroup}>
            <MaterialCommunityIcons name="human-male-height" size={24} color="#6A5ACD" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Height (cm)"
              keyboardType="numeric"
              value={formData.height}
              onChangeText={val => handleChange("height", val)}
            />
          </View>
        </View>

        {/* Health Goals Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Goals</Text>
          <View style={styles.inputGroup}>
            <Ionicons name="water" size={24} color="#6A5ACD" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Water intake (ml)"
              keyboardType="numeric"
              value={formData.water}
              onChangeText={val => handleChange("water", val)}
            />
          </View>
          <View style={styles.inputGroup}>
            <MaterialCommunityIcons name="foot-print" size={24} color="#6A5ACD" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Steps goal"
              keyboardType="numeric"
              value={formData.steps}
              onChangeText={val => handleChange("steps", val)}
            />
          </View>
          <View style={styles.inputGroup}>
            <Ionicons name="moon-sharp" size={24} color="#6A5ACD" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Sleep goal (hours)"
              keyboardType="numeric"
              value={formData.sleepHours}
              onChangeText={val => handleChange("sleepHours", val)}
            />
          </View>
        </View>
        
        {/* Schedule & Notes Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Schedule & Notes</Text>
          <View style={styles.inputGroup}>
            <MaterialCommunityIcons name="dumbbell" size={24} color="#6A5ACD" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Gym time (e.g., 6:00 AM)"
              value={formData.gymTime}
              onChangeText={val => handleChange("gymTime", val)}
            />
          </View>
          <View style={styles.inputGroup}>
            <MaterialCommunityIcons name="yoga" size={24} color="#6A5ACD" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Yoga/Exercise time"
              value={formData.yogaTime}
              onChangeText={val => handleChange("yogaTime", val)}
            />
          </View>
          <View style={styles.inputGroup}>
            <MaterialIcons name="local-hospital" size={24} color="#6A5ACD" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Medication time"
              value={formData.medTime}
              onChangeText={val => handleChange("medTime", val)}
            />
          </View>
          <View style={styles.inputGroup}>
            <Ionicons name="pencil" size={24} color="#6A5ACD" style={styles.inputIcon} />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Other important notes"
              value={formData.other}
              onChangeText={val => handleChange("other", val)}
              multiline
            />
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save Details</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#eee3ff",
  },
  scrollViewContainer: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#34006A",
    marginBottom: 20,
    textAlign: "center",
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#34006A",
    marginBottom: 15,
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  inputIcon: {
    position: 'absolute',
    left: 15,
    zIndex: 1,
  },
  input: {
    flex: 1,
    padding: 15,
    paddingLeft: 50, // Added padding to make space for the icon
    borderWidth: 1,
    borderColor: "#b675f3",
    borderRadius: 12,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  textArea: {
    height: 100, // Make the notes input taller
    textAlignVertical: 'top',
  },
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 12,
    backgroundColor: "#8A2BE2",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});