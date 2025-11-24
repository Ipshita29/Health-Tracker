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

    if (savedGoal) setGoalBottles(JSON.parse(savedGoal));
    if (savedCount) setDrinkCount(JSON.parse(savedCount));
  };

  const addBottleFromHome = async () => {
    const updated = drinkCount + 1;
    setDrinkCount(updated);

    await AsyncStorage.setItem("DRINK_COUNT", JSON.stringify(updated));

    if (updated === goalBottles) {
      alert("🎉 Water Goal Completed!\nGreat job staying hydrated!");
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
            <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
              <Image
                source={require("../assets/Profile.png")}
                style={styles.profileIcon}
              />
            </TouchableOpacity>
          </View>

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

          {/* CHATBOT */}
          <TouchableOpacity
            style={styles.chatbotBtn}
            onPress={() => navigation.navigate("AiChatbot")}
          >
            <Text style={styles.chatText}>AI Chatbot</Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  bg: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 16, paddingVertical: 10 },

  navbar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 15,
  },
  profileIcon: { width: 40, height: 40, borderRadius: 20 },

  card: {
    backgroundColor: "#ffffff33",
    padding: 15,
    borderRadius: 14,
    marginBottom: 20,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "white",
  },

  circle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 6,
    borderColor: "#d69676ff",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#f2faff",
    marginBottom: 10,
  },

  addCupBtn: {
    backgroundColor: "#ebb6858d",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignSelf: "center",
  },

  addCupText: {
    color: "white",
    fontWeight: "700",
  },

  meditationText: {
    color: "white",
    fontSize: 15,
    marginTop: 5,
  },

  chatbotBtn: {
    backgroundColor: "#ebb6858d",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },

  chatText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
