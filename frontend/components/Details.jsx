import React, { useState } from "react";
import {View,TextInput,StyleSheet,Text,TouchableOpacity,ScrollView,Alert,KeyboardAvoidingView,Platform} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {FontAwesome5,MaterialCommunityIcons,MaterialIcons,Ionicons} from "@expo/vector-icons";

export default function Details({navigation}) {
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
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!formData.age || !formData.weight || !formData.height) {
      Alert.alert(
        "Error",
        "Please fill in age, weight, and height to get started."
      );
      return;
    }
    console.log("Saving user details:", formData);
    Alert.alert("Success", "Your details have been saved!")
    navigation.navigate("Dashboard", { userData: formData });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          <Text style={styles.title}>Your Health Goals</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Basic Details</Text>
            <View style={styles.inputGroup}>
              <MaterialCommunityIcons
                name="account"
                size={22}
                color="#7B2CBF"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Age"
                keyboardType="numeric"
                value={formData.age}
                onChangeText={(val) => handleChange("age", val)}
              />
            </View>
            <View style={styles.inputGroup}>
              <MaterialCommunityIcons
                name="weight-kilogram"
                size={22}
                color="#7B2CBF"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Weight (kg)"
                keyboardType="numeric"
                value={formData.weight}
                onChangeText={(val) => handleChange("weight", val)}
              />
            </View>
            <View style={styles.inputGroup}>
              <MaterialCommunityIcons
                name="human-male-height"
                size={22}
                color="#7B2CBF"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Height (cm)"
                keyboardType="numeric"
                value={formData.height}
                onChangeText={(val) => handleChange("height", val)}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Daily Goals</Text>
            <View style={styles.inputGroup}>
              <Ionicons
                name="water"
                size={22}
                color="#7B2CBF"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Water intake (ml)"
                keyboardType="numeric"
                value={formData.water}
                onChangeText={(val) => handleChange("water", val)}
              />
            </View>
            <View style={styles.inputGroup}>
              <MaterialCommunityIcons
                name="foot-print"
                size={22}
                color="#7B2CBF"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Steps goal"
                keyboardType="numeric"
                value={formData.steps}
                onChangeText={(val) => handleChange("steps", val)}
              />
            </View>
            <View style={styles.inputGroup}>
              <Ionicons
                name="moon-sharp"
                size={22}
                color="#7B2CBF"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Sleep goal (hours)"
                keyboardType="numeric"
                value={formData.sleepHours}
                onChangeText={(val) => handleChange("sleepHours", val)}
              />
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Schedule & Notes</Text>
            <View style={styles.inputGroup}>
              <MaterialCommunityIcons
                name="dumbbell"
                size={22}
                color="#7B2CBF"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Gym time (e.g., 6:00 AM)"
                value={formData.gymTime}
                onChangeText={(val) => handleChange("gymTime", val)}
              />
            </View>
            <View style={styles.inputGroup}>
              <MaterialCommunityIcons
                name="yoga"
                size={22}
                color="#7B2CBF"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Yoga/Exercise time"
                value={formData.yogaTime}
                onChangeText={(val) => handleChange("yogaTime", val)}
              />
            </View>
            <View style={styles.inputGroup}>
              <MaterialIcons
                name="local-hospital"
                size={22}
                color="#7B2CBF"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Medication time"
                value={formData.medTime}
                onChangeText={(val) => handleChange("medTime", val)}
              />
            </View>
            <View style={styles.inputGroup}>
              <Ionicons
                name="pencil"
                size={22}
                color="#7B2CBF"
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Other important notes"
                value={formData.other}
                onChangeText={(val) => handleChange("other", val)}
                multiline
              />
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Save Details</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f5f7", // light gray background
  },
  scrollViewContainer: {
    padding: 20,
    paddingTop: 35,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "#1e1e2f", // dark gray
    marginBottom: 25,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  section: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginBottom: 22,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#2f2f3d", // muted dark color
    marginBottom: 15,
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 14,
  },
  inputIcon: {
    position: "absolute",
    left: 16,
    zIndex: 1,
    color: "#4b4b5a",
  },
  input: {
    flex: 1,
    padding: 14,
    paddingLeft: 48,
    borderWidth: 1,
    borderColor: "#d1d2d6",
    borderRadius: 12,
    backgroundColor: "#fdfdfd",
    fontSize: 16,
    color: "#1e1e2f",
  },
  textArea: {
    height: 95,
    textAlignVertical: "top",
  },
  button: {
    width: "100%",
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#00a8ff", // modern blue
    alignItems: "center",
    marginTop: 10,
    marginBottom: 35,
    shadowColor: "#00a8ff",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
