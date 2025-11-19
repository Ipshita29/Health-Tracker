import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar } from "react-native-calendars";

const HomeScreen = ({ navigation }) => {
  return (
    <ImageBackground
      source={require("../assets/background2.png")}
      style={styles.bg}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
      
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
                onDayPress={() => navigation.navigate("Calender")}
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
          <TouchableOpacity onPress={() => navigation.navigate("WaterIntake")}>
            <View style={styles.card}>
              <Text style={styles.cardTitle}>Water Intake</Text>
              <View style={styles.circle}>
                <Text style={{ fontWeight: "600" }}>0 / 8 cups</Text>
              </View>
            </View>
          </TouchableOpacity>

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
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 6,
    borderColor: "#f87a3b",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "#f2faff",
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
