import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Switch, // Import Switch for the new feature
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

// --- Custom Component for Input Fields (Simpler and Cleaner) ---
const CustomInput = ({ iconName, label, placeholder, value, onChangeText, keyboardType = 'default', isMultiline = false }) => (
  <View style={styles.inputGroup}>
    <MaterialCommunityIcons name={iconName} size={20} color="#007AFF" style={styles.inputIcon} />
    <View style={styles.inputFieldContainer}>
        <Text style={styles.inputLabel}>{label}</Text>
        <TextInput
            style={[styles.input, isMultiline && styles.textArea]}
            placeholder={placeholder}
            keyboardType={keyboardType}
            value={value}
            onChangeText={onChangeText}
            multiline={isMultiline}
            placeholderTextColor="#999"
        />
    </View>
  </View>
);

export default function Details({ navigation }) {
  const initialFormData = {
    age: "",
    weight: "",
    height: "",
    water: "2500", 
    steps: "10000",
    sleepHours: "7.5",
    gymTime: "",
    medTime: "",
    smoke: false, // New state for Switch
    drink: false, // New state for Switch
    other: "",
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleToggle = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
      Alert.alert(
        "Confirm Reset",
        "Are you sure you want to clear all the data in this form?",
        [
            { text: "Cancel", style: "cancel" },
            { text: "Reset", onPress: () => setFormData(initialFormData), style: "destructive" },
        ]
      );
  };

  const handleSubmit = () => {
    if (!formData.age || !formData.weight || !formData.height) {
      Alert.alert(
        "Missing Details",
        "Please fill in Age, Weight, and Height. These fields are essential for your profile."
      );
      return;
    }
    // Simple mock save logic
    Alert.alert("Success!", "Your health profile has been updated!", [
        { text: "OK", onPress: () => navigation.navigate("Dashboard", { userData: formData }) }
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <Text style={styles.title}>Health Profile Setup</Text>
          <Text style={styles.subtitle}>Define your body metrics and lifestyle goals.</Text>

          {/* SECTION 1: BASIC METRICS */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Body Metrics</Text>
            
            <CustomInput
                iconName="numeric-1-box-multiple"
                label="Age (Years)"
                placeholder="25"
                keyboardType="numeric"
                value={formData.age}
                onChangeText={(val) => handleChange("age", val)}
            />
            <CustomInput
                iconName="weight-kilogram"
                label="Weight (kg)"
                placeholder="70"
                keyboardType="numeric"
                value={formData.weight}
                onChangeText={(val) => handleChange("weight", val)}
            />
            <CustomInput
                iconName="human-male-height"
                label="Height (cm)"
                placeholder="175"
                keyboardType="numeric"
                value={formData.height}
                onChangeText={(val) => handleChange("height", val)}
            />
          </View>

          {/* SECTION 2: DAILY GOALS */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Daily Targets</Text>
            
            <CustomInput
                iconName="water"
                label="Water Intake (ml)"
                placeholder="2500"
                keyboardType="numeric"
                value={formData.water}
                onChangeText={(val) => handleChange("water", val)}
            />
            <CustomInput
                iconName="run-fast"
                label="Steps Goal"
                placeholder="10000"
                keyboardType="numeric"
                value={formData.steps}
                onChangeText={(val) => handleChange("steps", val)}
            />
            <CustomInput
                iconName="sleep"
                label="Sleep Goal (Hours)"
                placeholder="7.5"
                keyboardType="numeric"
                value={formData.sleepHours}
                onChangeText={(val) => handleChange("sleepHours", val)}
            />
          </View>

          {/* SECTION 3: LIFESTYLE & NOTES */}
          <View style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Lifestyle & Reminders</Text>
            <View style={styles.divider} />
            
            <CustomInput
                iconName="calendar-clock"
                label="Gym/Activity Time"
                placeholder="e.g., 1:00 PM"
                value={formData.gymTime}
                onChangeText={(val) => handleChange("gymTime", val)}
            />
            <CustomInput
                iconName="pill"
                label="Medication Time"
                placeholder="e.g., 8:00 AM and 8:00 PM"
                value={formData.medTime}
                onChangeText={(val) => handleChange("medTime", val)}
            />
            <CustomInput
                iconName="note-edit-outline"
                label="Other Notes"
                placeholder="Allergies, chronic conditions, etc."
                isMultiline={true}
                value={formData.other}
                onChangeText={(val) => handleChange("other", val)}
            />
          </View>

          {/* ACTION BUTTONS */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
                <Ionicons name="trash-bin-outline" size={18} color="#FF5252" />
                <Text style={styles.resetButtonText}>Reset Form</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
                <MaterialCommunityIcons name="content-save-all-outline" size={20} color="#FFF" style={{ marginRight: 8 }} />
                <Text style={styles.saveButtonText}>Save Profile</Text>
            </TouchableOpacity>
          </View>
          
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F8FA", // Very light, professional background
  },
  scrollViewContainer: {
    padding: 18,
    paddingTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1A237E", // Deep blue/primary color
    marginBottom: 4,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#667",
    marginBottom: 25,
    textAlign: "center",
  },
  
  // --- CARD STYLES ---
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 25,
    shadowColor: "#1A237E",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#007AFF', // Feature highlight
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A237E",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f5',
    paddingBottom: 10,
  },
  
  // --- INPUT STYLES (Used by CustomInput) ---
  inputGroup: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  inputIcon: {
    marginTop: 18,
    marginRight: 10,
    color: "#007AFF"
  },
  inputFieldContainer: {
      flex: 1,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: "#D3D3D3",
      backgroundColor: "#fdfdfd",
  },
  inputLabel: {
      fontSize: 12,
      color: "#667",
      paddingHorizontal: 12,
      paddingTop: 8,
      fontWeight: '600',
  },
  input: {
    paddingHorizontal: 12,
    paddingBottom: 10,
    fontSize: 16,
    color: "#1e1e2f",
    paddingTop: Platform.OS === 'ios' ? 4 : 0, // OS specific adjustment
  },
  textArea: {
    height: 90,
    textAlignVertical: "top",
    paddingTop: 10,
  },
  
  // --- TOGGLE STYLES ---
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F5',
    marginBottom: 8,
  },
  toggleIcon: {
      marginRight: 10,
  },
  toggleLabel: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F5',
    marginVertical: 15,
  },
  
  // --- BUTTON STYLES ---
  buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15,
      marginBottom: 35,
  },
  saveButton: {
    flex: 2.5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    borderRadius: 12,
    backgroundColor: "#007AFF", // Primary save color
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "700",
  },
  resetButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 18,
    borderRadius: 12,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: '#FF5252',
    marginRight: 15,
  },
  resetButtonText: {
    color: "#FF5252",
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 5,
  },
});