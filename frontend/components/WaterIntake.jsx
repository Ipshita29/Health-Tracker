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

const WATER_DATE_KEY = "WATER_DATE";

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
    const savedDate = await AsyncStorage.getItem(WATER_DATE_KEY);

    const today = new Date().toDateString();

    if (savedGoal) setGoalBottles(JSON.parse(savedGoal));

    if (savedDate === today && savedCount) {
      setDrinkCount(JSON.parse(savedCount));
    } else {
      setDrinkCount(0);
      await AsyncStorage.setItem("DRINK_COUNT", JSON.stringify(0));
      await AsyncStorage.setItem(WATER_DATE_KEY, today);
    }

    if (savedGoal) setModalVisible(false);
  };

  const saveGoal = async () => {
    if (!goalBottles || goalBottles <= 0) {
      Alert.alert("Enter a valid number!");
      return;
    }

    await AsyncStorage.setItem("GOAL_BOTTLES", JSON.stringify(goalBottles));
    await AsyncStorage.setItem("DRINK_COUNT", JSON.stringify(0));
    await AsyncStorage.setItem(WATER_DATE_KEY, new Date().toDateString());

    setDrinkCount(0);
    setModalVisible(false);
  };

  const addBottle = async () => {
    if (!goalBottles || goalBottles <= 0) {
      Alert.alert("Set a goal first!", "Please set your daily bottle goal.");
      setModalVisible(true);
      return;
    }

    const updated = drinkCount + 1;
    setDrinkCount(updated);

    await AsyncStorage.setItem("DRINK_COUNT", JSON.stringify(updated));
    await AsyncStorage.setItem(WATER_DATE_KEY, new Date().toDateString());

    if (updated === goalBottles) {
      Alert.alert("Goal Completed!", "Great job! Stay hydrated");
    } else if (updated > goalBottles) {
      Alert.alert("Wow!", "You crossed your daily goal. Hydration hero!");
    }
  };

  const resetAll = async () => {
    await AsyncStorage.removeItem("GOAL_BOTTLES");
    await AsyncStorage.removeItem("DRINK_COUNT");
    await AsyncStorage.removeItem(WATER_DATE_KEY);

    setGoalBottles(0);
    setDrinkCount(0);
    setModalVisible(true);
  };

  const openEditGoal = () => {
    setModalVisible(true);
  };

  const hydrationTips = [
    "Drink 1 bottle right after waking up",
    "Have a bottle before each meal",
    "Keep a bottle on your study/desk",
    "Take small sips during breaks",
    "Drink more in hot weather or after workouts",
  ];

  const totalTargetMl = goalBottles * bottleSize;
  const currentMl = drinkCount * bottleSize;
  const progress = goalBottles > 0 ? Math.min(drinkCount / goalBottles, 1) : 0;
  const progressPercent = Math.round(progress * 100);

  let statusText = "Just getting started ";
  if (progressPercent >= 25 && progressPercent < 50) statusText = "Nice! Keep sipping ";
  else if (progressPercent >= 50 && progressPercent < 90) statusText = "Halfway there, keep going ";
  else if (progressPercent >= 90 && progressPercent < 100) statusText = "Almost at your goal! ";
  else if (progressPercent >= 100 && goalBottles > 0) statusText = "Goal smashed! Hydration hero ";

  return (
    <ImageBackground
      source={require("../assets/water.png")}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Modal visible={modalVisible} transparent animationType="fade">
            <View style={styles.modalOverlay}>
              <View style={styles.modalCard}>
                <Text style={styles.modalTitle}>Set Daily Bottle Goal</Text>

                <Text style={styles.modalSub}>
                  Example: 8 bottles × 250ml = 2L
                </Text>

                <TextInput
                  style={styles.input}
                  placeholder="Enter bottles/day"
                  placeholderTextColor="#aaa"
                  keyboardType="numeric"
                  value={goalBottles ? String(goalBottles) : ""}
                  onChangeText={(v) => setGoalBottles(Number(v))}
                />

                <TouchableOpacity style={styles.saveBtn} onPress={saveGoal}>
                  <Text style={styles.saveBtnText}>Save Goal</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Text style={styles.title}>Water Intake</Text>
          <Text style={styles.subtitle}>Stay hydrated, stay glowing </Text>

          <View style={styles.card}>
            <View style={styles.cardHeaderRow}>
              <Text style={styles.cardTitle}>Today's Progress</Text>
              {goalBottles > 0 && (
                <TouchableOpacity onPress={openEditGoal}>
                  <Text style={styles.editGoal}>Edit Goal</Text>
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.circle}>
              <Text style={{ fontSize: 22, fontWeight: "700" }}>
                {drinkCount} / {goalBottles || 0}
              </Text>
              <Text style={{ fontSize: 14 }}>bottles</Text>
            </View>

            <Text style={styles.mlText}>
              {currentMl} ml / {totalTargetMl || 0} ml
            </Text>

            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
            </View>
            <Text style={styles.progressPercent}>{progressPercent}% of your goal</Text>

            <Text style={styles.statusText}>{statusText}</Text>
          </View>

          <TouchableOpacity style={styles.addBtn} onPress={addBottle}>
            <Text style={styles.addBtnText}>+ Add 1 Bottle</Text>
          </TouchableOpacity>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Hydration Tips</Text>

            {hydrationTips.map((tip, i) => (
              <Text key={i} style={styles.tipText}>
                • {tip}
              </Text>
            ))}

            <Text style={styles.tipFooter}>Most adults need ~2–3L/day </Text>
          </View>

          {/* RESET */}
          <TouchableOpacity onPress={resetAll}>
            <Text style={styles.reset}>Reset All</Text>
          </TouchableOpacity>

          <View style={{ height: 30 }} />

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
    fontWeight: "800",
    color: "white",
    textAlign: "center",
    marginTop: 4,
  },

  subtitle: {
    fontSize: 14,
    color: "white",
    textAlign: "center",
    marginBottom: 18,
    opacity: 0.9,
  },

  card: {
    backgroundColor: "rgba(12, 12, 12, 0.25)",
    padding: 18,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 253, 253, 0.79)",
  },

  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  cardTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },

  editGoal: {
    color: "#f0eae3ff",
    fontWeight: "600",
    fontSize: 14,
  },

  circle: {
    width: 145,
    height: 145,
    borderRadius: 72.5,
    borderWidth: 6,
    borderColor: "#d69676ff",
    backgroundColor: "#f2faff",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 12,
    shadowColor: "#d69676",
    shadowOpacity: 0.6,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 0 },
  },

  mlText: {
    color: "white",
    textAlign: "center",
    fontSize: 15,
    marginBottom: 10,
  },

  progressBar: {
    height: 10,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.3)",
    overflow: "hidden",
    marginBottom: 6,
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#ebb685d0",
  },

  progressPercent: {
    color: "white",
    fontSize: 14,
    textAlign: "right",
    marginBottom: 6,
  },

  statusText: {
    color: "#ffe2bf",
    fontSize: 15,
    fontWeight: "600",
    marginTop: 4,
    textAlign: "center",
  },

  addBtn: {
    backgroundColor: "#ebb685c7",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 20,
  },

  addBtnText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },

  tipText: {
    color: "white",
    opacity: 0.9,
    marginBottom: 6,
    fontSize: 15,
  },

  tipFooter: {
    marginTop: 12,
    color: "#ffe0b3",
    fontWeight: "600",
  },

  reset: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    textDecorationLine: "underline",
    opacity: 0.9,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00000099",
  },

  modalCard: {
    backgroundColor: "rgba(0, 0, 0, 0.63)",
    width: "80%",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ffffff55",
  },

  modalTitle: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
    fontWeight: "700",
    marginBottom: 6,
  },

  modalSub: {
    textAlign: "center",
    fontSize: 13,
    color: "#ddd",
    marginBottom: 12,
  },

  input: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 12,
    borderRadius: 10,
    color: "white",
    textAlign: "center",
    fontSize: 16,
    marginBottom: 14,
  },

  saveBtn: {
    backgroundColor: "#ebb685c0",
    padding: 12,
    borderRadius: 10,
  },

  saveBtnText: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
  },
});
