import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  ImageBackground,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Calendar as RNCalendar } from "react-native-calendars";
import * as Notifications from "expo-notifications";
import DateTimePicker from "@react-native-community/datetimepicker";

const CalendarScreen = () => {
  const [med, setMed] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  async function registerForPushNotificationsAsync() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      alert("Permission required for notifications!");
    }
  }

  const scheduleNotification = async () => {
    if (!med || !date) {
      alert("Please enter medicine name, date & time.");
      return;
    }

    const [year, month, day] = date.split("-").map(Number);
    const finalDateTime = new Date(time);
    finalDateTime.setFullYear(year);
    finalDateTime.setMonth(month - 1);
    finalDateTime.setDate(day);

    if (finalDateTime <= new Date()) {
      alert("Please choose a future date/time.");
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Medicine Reminder",
        body: `Time to take: ${med}`,
      },
      trigger: finalDateTime,
    });

    alert("Reminder set!");
  };

  const onTimeChange = (event, selectedTime) => {
    const chosen = selectedTime || time;
    setShowTimePicker(false);
    setTime(chosen);
  };

  return (
    <ImageBackground
      source={require("../assets/medicine.png")}
      style={styles.bg}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text style={styles.header}>Set Your Medicine Reminder</Text>

          <View style={styles.card}>
            <Text style={styles.label}>Medicine Name</Text>
            <TextInput
              value={med}
              onChangeText={setMed}
              placeholder="Enter medicine name"
              placeholderTextColor="#ddd"
              style={styles.input}
            />
          </View>

          {/* DATE PICKER */}
          <View style={styles.card}>
            <Text style={styles.label}>Select Date</Text>
            <RNCalendar
              onDayPress={(day) => setDate(day.dateString)}
              markedDates={
                date ? { [date]: { selected: true, selectedColor: "#f87a3b" } } : {}
              }
              theme={{
                calendarBackground: "transparent",
                dayTextColor: "white",
                monthTextColor: "white",
                arrowColor: "white",
                selectedDayTextColor: "white",
              }}
            />
          </View>

          {/* TIME PICKER */}
          <View style={styles.card}>
            <Text style={styles.label}>Select Time</Text>

            <TouchableOpacity
              style={styles.timeBtn}
              onPress={() => setShowTimePicker(true)}
            >
              <DateTimePicker
                value={time}
                mode="time"
                is24Hour={false}
                display="default"
                onChange={onTimeChange}
              />
            </TouchableOpacity>

            
          </View>

          <TouchableOpacity style={styles.submitBtn} onPress={scheduleNotification}>
            <Text style={styles.submitText}>Set Reminder</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default CalendarScreen;


const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: "700",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#68636373", // SAME AS HOME SCREEN
    borderRadius: 14,
    padding: 15,
    marginBottom: 20,
  },
  label: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "white",
    borderRadius: 10,
    padding: 10,
    color: "white",
  },

  timeBtn: {
    padding: 12,
    backgroundColor: "#ebb6858d",
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  timeText: {
    color: "white",
    fontSize: 20,
  },

  submitBtn: {
    backgroundColor: "#ca7245ff",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  submitText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
});
