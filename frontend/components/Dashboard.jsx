import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressBar } from "react-native-paper";

export default function Dashboard() {
  // mock user + stats (later connect with backend)
  const name = "Ipshita";
  const todayStats = {
    steps: 5600,
    calories: 450,
    water: 5, // glasses
    sleep: 7, // hrs
    goal: 0.62, // 62% done
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.wrapper}>
        {/* greeting */}
        <Text style={styles.heading}>Hi {name} 👋</Text>
        <Text style={styles.subtext}>Your health summary today</Text>

        {/* row 1 */}
        <View style={styles.row}>
          <View style={[styles.card, { backgroundColor: "#E8F5E9" }]}>
            <Text style={styles.label}>Steps</Text>
            <Text style={styles.value}>{todayStats.steps}</Text>
          </View>
          <View style={[styles.card, { backgroundColor: "#FFF3E0" }]}>
            <Text style={styles.label}>Calories</Text>
            <Text style={styles.value}>{todayStats.calories} kcal</Text>
          </View>
        </View>

        {/* row 2 */}
        <View style={styles.row}>
          <View style={[styles.card, { backgroundColor: "#E3F2FD" }]}>
            <Text style={styles.label}>Water</Text>
            <Text style={styles.value}>{todayStats.water} glasses</Text>
          </View>
          <View style={[styles.card, { backgroundColor: "#F3E5F5" }]}>
            <Text style={styles.label}>Sleep</Text>
            <Text style={styles.value}>{todayStats.sleep} hrs</Text>
          </View>
        </View>

        {/* progress */}
        <Text style={styles.progressTitle}>Daily Goal</Text>
        <ProgressBar
          progress={todayStats.goal}
          color="#4CAF50"
          style={styles.bar}
        />
        <Text style={styles.percent}>
          {Math.round(todayStats.goal * 100)}% achieved
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  wrapper: {
    padding: 18,
  },
  heading: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 4,
  },
  subtext: {
    fontSize: 15,
    color: "#666",
    marginBottom: 18,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  card: {
    flex: 1,
    paddingVertical: 22,
    paddingHorizontal: 14,
    marginHorizontal: 5,
    borderRadius: 14,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontSize: 15,
    color: "#333",
    marginBottom: 6,
  },
  value: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111",
  },
  progressTitle: {
    marginTop: 20,
    fontSize: 17,
    fontWeight: "600",
    marginBottom: 8,
  },
  bar: {
    height: 10,
    borderRadius: 6,
  },
  percent: {
    marginTop: 6,
    fontSize: 15,
    color: "#444",
  },
});
