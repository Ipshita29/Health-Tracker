import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";
import { useFocusEffect } from "@react-navigation/native";

const HomeScreen = ({ navigation }) => {
  const [drinkCount, setDrinkCount] = useState(0);
  const [goalBottles, setGoalBottles] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      loadWaterData();
    }, [])
  );

  const loadWaterData = async () => {
  const savedGoal = await AsyncStorage.getItem("GOAL_BOTTLES");
  const savedCount = await AsyncStorage.getItem("DRINK_COUNT");

  setGoalBottles(savedGoal ? JSON.parse(savedGoal) : 0);
  setDrinkCount(savedCount ? JSON.parse(savedCount) : 0);
};


  const addBottleFromHome = async () => {
    const updated = drinkCount + 1;
    setDrinkCount(updated);

    await AsyncStorage.setItem("DRINK_COUNT", JSON.stringify(updated));

    if (updated === goalBottles) {
      alert("Water Goal Completed!\nGreat job staying hydrated!");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/background2.png")}
      style={styles.bg}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>

          {/* NAVBAR */}
          <View style={styles.navbar}>
            <TouchableOpacity
              style={styles.airaBtn}
              onPress={() => navigation.navigate("AiChatbot")}
            >
              <Text style={styles.airaText}>Ask AIRA</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Image source={require("../assets/Profile.png")} style={styles.profileIcon} />
            </TouchableOpacity>
          </View>

          {/* GREETING */}
          <Text style={styles.greeting}>Welcome back!</Text>
          <Text style={styles.subGreeting}>Let’s take care of your health today</Text>

          {/* Decorative divider */}
          <View style={styles.waveDivider} />

          {/* CALENDAR */}
          <TouchableOpacity onPress={() => navigation.navigate("Calendar")}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Your Calendar</Text>

              <Calendar
                onDayPress={() => navigation.navigate("Calendar")}
                theme={{
                  calendarBackground: "transparent",
                  dayTextColor: "white",
                  monthTextColor: "white",
                  arrowColor: "white",
                }}
              />
            </View>
          </TouchableOpacity>

          {/* WATER INTAKE */}
          <View style={styles.card}>
            <TouchableOpacity onPress={() => navigation.navigate("WaterIntake")}>
              <Text style={styles.cardTitle}>Water Intake</Text>
            </TouchableOpacity>

            <View style={styles.circle}>
              <Text style={{ fontWeight: "700", fontSize: 20 }}>
                {drinkCount} / {goalBottles || 0}
              </Text>
              <Text style={{ fontSize: 14 }}>bottles</Text>
            </View>

            <TouchableOpacity
              style={styles.addCupBtn}
              onPress={addBottleFromHome}
            >
              <Text style={styles.addCupText}>+ Add 1 Bottle</Text>
            </TouchableOpacity>
          </View>

          {/* MEDITATION */}
          <TouchableOpacity onPress={() => navigation.navigate("Meditation")}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Meditation</Text>
              <Text style={styles.meditationText}>
                Tap to begin a 30s breathing exercise
              </Text>
            </View>
          </TouchableOpacity>

          {/*Note Taking */}
          <TouchableOpacity onPress={() => navigation.navigate("NoteTaking")}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Note Taking</Text>
              <Text style={styles.meditationText}>
                Let's Declutter your mind
              </Text>
            </View>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  bg: { flex: 1 },

  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },

  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  airaBtn: {
    backgroundColor: "rgba(91, 88, 88, 0.2)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255, 248, 248, 1)",
    backdropFilter: "blur(10px)",
  },
  airaText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
    letterSpacing: 0.3,
  },

  profileIcon: { width: 40, height: 40, borderRadius: 20 },

  greeting: {
    fontSize: 26,
    fontWeight: "800",
    color: "white",
    marginBottom: 2,
    textShadowColor: "#00000070",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },
  subGreeting: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 10,
    opacity: 0.85,
  },

  waveDivider: {
    height: 3,
    backgroundColor: "#ffcc9dff",
    width: "100%",
    alignSelf: "center",
    borderRadius: 10,
    marginBottom: 20,
    opacity: 0.8,
  },

  card: {
    backgroundColor: "rgba(91, 89, 89, 0.05)",
    padding: 18,
    borderRadius: 16,
    marginBottom: 23,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 1)",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 14,
    color: "white",
  },

  circle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 6,
    borderColor: "#ebb685",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#ffffffe6",
    marginBottom: 12,
    shadowColor: "#ebb685",
    shadowOpacity: 0.65,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },

  addCupBtn: {
    backgroundColor: "#ebb685a4",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignSelf: "center",
    marginTop: 5,
  },

  addCupText: {
    color: "white",
    fontWeight: "700",
    fontSize: 15,
  },

  meditationText: {
    color: "white",
    fontSize: 15,
    marginTop: 6,
    opacity: 0.85,
  },
});
