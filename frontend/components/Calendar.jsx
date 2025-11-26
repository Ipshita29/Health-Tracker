import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
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
  const [frequency, setFrequency] = useState("once"); // NEW

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

    if (finalDateTime <= new Date() && frequency === "once") {
      alert("Please choose a future date/time.");
      return;
    }

    let triggerOptions = {};

    if (frequency === "once") {
      triggerOptions = finalDateTime;
    } 
    else if (frequency === "daily") {
      triggerOptions = {
        hour: finalDateTime.getHours(),
        minute: finalDateTime.getMinutes(),
        repeats: true,
      };
    }
    else if (frequency === "weekly") {
      triggerOptions = {
        weekday: finalDateTime.getDay() + 1,
        hour: finalDateTime.getHours(),
        minute: finalDateTime.getMinutes(),
        repeats: true,
      };
    }
    else if (frequency === "monthly") {
      triggerOptions = {
        day: finalDateTime.getDate(),
        hour: finalDateTime.getHours(),
        minute: finalDateTime.getMinutes(),
        repeats: true,
      };
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Medicine Reminder",
        body: `It's time to take: ${med}`,
      },
      trigger: triggerOptions,
    });

    alert(`Reminder set! (${frequency.toUpperCase()})`);
  };

  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    setTime(selectedTime || time);
  };

  return (
    <ImageBackground source={require("../assets/medicine.png")} style={styles.bg}>
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
          <View style={styles.card}>
            <Text style={styles.label}>Select Date</Text>
            <RNCalendar
              onDayPress={(day) => setDate(day.dateString)}
              markedDates={
                date ? { [date]: { selected: true, selectedColor: "#f2a36b" } } : {}
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

          {/* TIME */}
          <View style={styles.card}>
            <Text style={styles.label}>Select Time</Text>
            <TouchableOpacity style={styles.timeBtn} onPress={() => setShowTimePicker(true)}>
              <Text style={{ color: "white", fontWeight: "600" }}>
                {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker value={time} mode="time" onChange={onTimeChange} />
            )}
          </View>

          {/* FREQUENCY */}
          <View style={styles.card}>
            <Text style={styles.label}>Reminder Frequency</Text>

            <View style={styles.freqRow}>
              {["once", "daily", "weekly", "monthly"].map((f) => (
                <TouchableOpacity
                  key={f}
                  onPress={() => setFrequency(f)}
                  style={[styles.freqBtn, frequency === f && styles.freqBtnActive]}
                >
                  <Text style={styles.freqText}>
                    {f === "once" ? "One-Time" : f.charAt(0).toUpperCase() + f.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
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
  bg: { flex: 1 },
  container: { flex: 1, paddingHorizontal: 16, paddingVertical: 10 },

  header: {
    fontSize: 25,
    fontWeight: "800",
    color: "white",
    textAlign: "center",
    marginBottom: 16,
  },

  card: {
    backgroundColor: "rgba(39, 38, 38, 0.36)",
    borderRadius: 16,
    padding: 15,
    marginBottom: 20,
    borderColor: "rgba(255, 255, 255, 0.89)",
    borderWidth: 1,
  },

  label: { color: "white", fontSize: 17, fontWeight: "700", marginBottom: 12 },

  input: {
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 12,
    padding: 12,
    color: "white",
    fontSize: 16,
  },

  timeBtn: {
    backgroundColor: "#ebb685a9",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  freqRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 8,
  },

  freqBtn: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#ffffff30",
  },
  freqBtnActive: {
    backgroundColor: "#ebb685bb",
  },

  freqText: {
    color: "white",
    fontWeight: "600",
  },

  submitBtn: {
    backgroundColor: "#af88649b",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 8,
  },
  submitText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
});
