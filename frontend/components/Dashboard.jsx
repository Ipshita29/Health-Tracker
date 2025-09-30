import React, { useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions,Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ProgressBar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LineChart } from "react-native-chart-kit";

const HEALTH_TIP = "Stay hydrated! Aim for 8 glasses of water daily to boost energy and focus.";

const RECENT_ACTIVITY = [
  { id: 1, type: "Run", duration: "30 min", calories: 350, icon: "run" },
  { id: 2, type: "Weights", duration: "45 min", calories: 400, icon: "dumbbell" },
];
const WEEKLY_STEPS_DATA = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
        {
            data: [
                5000, 6200, 4800, 7500, 8100, 10500, 5600
            ],
            color: (opacity = 1) => `rgba(76, 175, 80, ${opacity})`,
            strokeWidth: 2,
        },
    ],
};


export default function Dashboard({ navigation }) {

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
      
        <Text style={styles.heading}>Hi {name} 👋</Text>
        <Text style={styles.subtext}>Your health summary today</Text>

        <Image source={require('../assets/exercise.png')} style={{height:150,width:350}}/>

        <Text style={styles.sectionTitle}>Daily Goal</Text>
        <ProgressBar
          progress={todayStats.goal}
          color="#4CAF50"
          style={styles.bar}
        />
        <Text style={styles.percent}>
          {Math.round(todayStats.goal * 100)}% achieved
        </Text>
        


        <View style={styles.row}>
          <View style={[styles.card, { backgroundColor: "#E8F5E9" }]}>
            <MaterialCommunityIcons name="foot-print" size={24} color="#4CAF50" style={styles.iconStyle} />
            <Text style={styles.label}>Steps</Text>
            <Text style={styles.value}>{todayStats.steps}</Text>
          </View>
          <View style={[styles.card, { backgroundColor: "#FFF3E0" }]}>
            <MaterialCommunityIcons name="fire" size={24} color="#FF9800" style={styles.iconStyle} />
            <Text style={styles.label}>Calories</Text>
            <Text style={styles.value}>{todayStats.calories} kcal</Text>
          </View>
        </View>


        <View style={styles.row}>
          <View style={[styles.card, { backgroundColor: "#E3F2FD" }]}>
            <MaterialCommunityIcons name="water-outline" size={24} color="#8972d6ff" style={styles.iconStyle} />
            <Text style={styles.label}>Water</Text>
            <Text style={styles.value}>{todayStats.water} glasses</Text>
          </View>
          <View style={[styles.card, { backgroundColor: "#F3E5F5" }]}>
            <MaterialCommunityIcons name="sleep" size={24} color="#9C27B0" style={styles.iconStyle} />
            <Text style={styles.label}>Sleep</Text>
            <Text style={styles.value}>{todayStats.sleep} hrs</Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Weekly Steps Progress</Text>
        <View style={styles.chartContainer}>
            <LineChart
                data={WEEKLY_STEPS_DATA}
                width={Dimensions.get("window").width - 36}
                height={220}
                chartConfig={{
                    backgroundColor: "#FFFFFF",
                    backgroundGradientFrom: "#FFFFFF",
                    backgroundGradientTo: "#FFFFFF",
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(26, 35, 126, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(102, 102, 102, ${opacity})`,
                    style: {
                        borderRadius: 16
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#493181ff"
                    }
                }}
                bezier
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
        </View>

        
        <Text style={styles.sectionTitle}>Recent Activities</Text>
        {RECENT_ACTIVITY.map((activity) => (
          <View key={activity.id} style={styles.activityCard}>
            <MaterialCommunityIcons 
                name={activity.icon} 
                size={28} 
                color="#8972d6ff" 
                style={{ marginRight: 15 }} 
            />
            <View style={{ flex: 1 }}>
                <Text style={styles.activityTitle}>{activity.type}</Text>
                <Text style={styles.activitySubtext}>{activity.duration} | Burned {activity.calories} kcal</Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
          </View>
        ))}

        {/* 3. Health Tip/Quote */}
        <View style={styles.tipCard}>
            <MaterialCommunityIcons name="lightbulb-on-outline" size={22} color="#8972d6ff" style={{ marginRight: 10 }} />
            <Text style={styles.tipText}>
                {HEALTH_TIP}
            </Text>
        </View>

        {/* 4. Add Details Button (Action Button) */}
        <TouchableOpacity 
            style={styles.detailsButton}
            onPress={() => navigation.navigate("Details")} 
        >
            <MaterialCommunityIcons name="plus-circle-outline" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.detailsButtonText}>
                Log New Activity or Metric
            </Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F5F5", 
  },
  wrapper: {
    padding: 18,
  },
  heading: {
    fontSize: 28, 
    fontWeight: "800", 
    marginBottom: 4,
    color: "#8972d6ff", 
  },
  subtext: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    borderRadius: 16, 
    shadowColor: "#000",
    shadowOpacity: 0.1, 
    shadowRadius: 8,
    elevation: 5,
  },
  iconStyle: {
    marginBottom: 5,
  },
  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
    fontWeight: "600",
  },
  value: {
    fontSize: 22, 
    fontWeight: "700",
    color: "#111",
  },
  sectionTitle: { 
    marginTop: 25,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#333",
  },
  bar: {
    height: 12,
    borderRadius: 8,
  },
  percent: {
    marginTop: 8,
    fontSize: 16,
    color: "#444",
    fontWeight: "500",
  },
  

  activityCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderLeftWidth: 5,
    borderLeftColor: '#8972d6ff', 
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  activitySubtext: {
    fontSize: 13,
    color: "#777",
    marginTop: 2,
  },
  tipCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#E0F7FA", 
    padding: 15,
    borderRadius: 12,
    marginTop: 25,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#dfbef0ff',
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: "#55056dff",
    lineHeight: 20,
  },
  detailsButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#8972d6ff", 
    padding: 18,
    borderRadius: 12,
    marginTop: 20,
    shadowColor: "#8972d6ff",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 8,
  },
  detailsButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
});