import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  TextInput,
  Modal,
  ImageBackground,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

const WaterIntake = () => {
  const [goalBottles, setGoalBottles] = useState(0);
  const [drinkCount, setDrinkCount] = useState(0);
  const [bottleSize] = useState(250);
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const savedGoal = await AsyncStorage.getItem("GOAL_BOTTLES");
    const savedCount = await AsyncStorage.getItem("DRINK_COUNT");

    if (savedGoal) setGoalBottles(JSON.parse(savedGoal));
    if (savedCount) setDrinkCount(JSON.parse(savedCount));

    if (savedGoal) setModalVisible(false);
  };

  const saveGoal = async () => {
    if (!goalBottles || goalBottles <= 0) {
      Alert.alert("Enter a valid number!");
      return;
    }

    await AsyncStorage.setItem("GOAL_BOTTLES", JSON.stringify(goalBottles));
    setModalVisible(false);
  };

  const addBottle = async () => {
    const updated = drinkCount + 1;
    setDrinkCount(updated);

    await AsyncStorage.setItem("DRINK_COUNT", JSON.stringify(updated));

    if (updated === goalBottles) {
      Alert.alert("Goal Completed!", "Great job! Stay hydrated ");
    }
  };

  const resetAll = async () => {
    await AsyncStorage.removeItem("GOAL_BOTTLES");
    await AsyncStorage.removeItem("DRINK_COUNT");

    setGoalBottles(0);
    setDrinkCount(0);
    setModalVisible(true);
  };

  const hydrationTips = [
    "Drink 1 bottle right after waking up ",
    "Drink 1 bottle before lunch ",
    "Drink 1 bottle after lunch ",
    "Drink water during mid-evening ",
    "Take small sips before bed ",
  ];

  return (
    <ImageBackground
      source={require("../assets/water.png")}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>

          {/* GOAL MODAL */}
          <Modal visible={modalVisible} transparent animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.modalCard}>
                <Text style={styles.modalTitle}>Set Daily Bottle Goal</Text>

                <TextInput
                  style={styles.input}
                  placeholder="Enter bottles/day"
                  placeholderTextColor="#aaa"
                  keyboardType="numeric"
                  value={String(goalBottles)}
                  onChangeText={(v) => setGoalBottles(Number(v))}
                />

                <TouchableOpacity style={styles.saveBtn} onPress={saveGoal}>
                  <Text style={styles.saveBtnText}>Save</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Text style={styles.title}>Water Intake</Text>

          {/* PROGRESS */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Today's Progress</Text>

            <View style={styles.circle}>
              <Text style={{ fontSize: 22, fontWeight: "700" }}>
                {drinkCount} / {goalBottles}
              </Text>
              <Text style={{ fontSize: 14 }}>bottles</Text>
            </View>

            <Text style={styles.mlText}>
              {drinkCount * bottleSize} ml consumed
            </Text>
          </View>

          {/* BUTTON */}
          <TouchableOpacity style={styles.addBtn} onPress={addBottle}>
            <Text style={styles.addBtnText}>Add Bottle</Text>
          </TouchableOpacity>

          {/* TIPS */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Hydration Tips</Text>

            {hydrationTips.map((tip, i) => (
              <Text key={i} style={styles.tipText}>• {tip}</Text>
            ))}

            <Text style={styles.tipFooter}>
              Adults need 3–4 liters/day 🚰
            </Text>
          </View>

          {/* RESET */}
          <TouchableOpacity onPress={resetAll}>
            <Text style={styles.reset}>Reset All</Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default WaterIntake;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#ffffff33",
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
  },

  cardTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  circle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 6,
    borderColor: "#d69676ff",
    backgroundColor: "#f2faff",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 12,
  },

  mlText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },

  addBtn: {
    backgroundColor: "#ebb6858d",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },

  addBtnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },

  tipText: {
    color: "white",
    opacity: 0.9,
    marginBottom: 6,
    fontSize: 18
  },

  tipFooter: {
    marginTop: 15,
    color: "#ffe0b3",
    fontWeight: "600",
  },

  reset: {
    color: "white",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 30,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099",
  },

  modalCard: {
    backgroundColor: "#ffffff22",
    width: "80%",
    padding: 20,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#ffffff55",
  },

  modalTitle: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    fontWeight: "700",
    marginBottom: 12,
  },

  input: {
    backgroundColor: "#ffffff33",
    padding: 12,
    borderRadius: 10,
    color: "white",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 14,
  },

  saveBtn: {
    backgroundColor: "#ebb6858d",
    padding: 12,
    borderRadius: 10,
  },

  saveBtnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
  },
});
