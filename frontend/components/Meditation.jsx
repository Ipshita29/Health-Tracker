import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, Alert } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";

const Meditation = () => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState("Inhale");
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const timerRef = useRef(null);

  const player = useVideoPlayer(
    require("../assets/meditation.mp4"),
    (player) => {
      player.loop = true;
      player.play();
    }
  );

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      Alert.alert("Meditation Complete", "Great job staying calm 🧘‍♀️");
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning, timeLeft]);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.65, duration: 4000, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 4000, useNativeDriver: true }),
      ])
    ).start();
  };

  const stopAnimation = () => {
    scaleAnim.stopAnimation();
    scaleAnim.setValue(1);
  };

  const startTimer = () => {
    setIsRunning(true);
    startAnimation();
  };

  const stopTimer = () => {
    setIsRunning(false);
    stopAnimation();
    clearInterval(timerRef.current);
  };

  useEffect(() => {
    if (isRunning) {
      const switcher = setInterval(() => {
        setPhase((p) => (p === "Inhale" ? "Exhale" : "Inhale"));
      }, 4000);
      return () => clearInterval(switcher);
    }
  }, [isRunning]);

  return (
    <View style={styles.container}>
      <VideoView player={player} style={styles.video} resizeMode="cover" />

      <View style={styles.overlay}>
        <Text style={styles.title}>Breathing Meditation</Text>
        <Text style={styles.timer}>{timeLeft}s</Text>

        <Animated.View style={[styles.circle, { transform: [{ scale: scaleAnim }] }]}>
          <Text style={styles.phase}>{phase}</Text>
        </Animated.View>

        <View style={styles.buttons}>
          {!isRunning ? (
            <TouchableOpacity style={styles.button} onPress={startTimer}>
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={stopTimer}>
              <Text style={styles.buttonText}>Stop</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default Meditation;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#4e301feb" },

  video: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: "100%",
    height: "100%",
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0.25)", 
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 12,
  },

  timer: {
    fontSize: 28,
    color: "#fff",
    marginBottom: 32,
  },

  circle: {
    width: 190,
    height: 190,
    borderRadius: 95,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 70,
    backgroundColor: "rgba(255,255,255,0.15)",
    borderWidth: 6,
    borderColor: "rgba(235,182,133,0.65)",
  },

  phase: {
    fontSize: 22,
    fontWeight: "600",
    color: "#fff",
  },

  buttons: { marginTop: 10 },

  button: {
    backgroundColor: "#ffca98b5", 
    paddingVertical: 13,
    paddingHorizontal: 30,
    borderRadius: 14,
  },

  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "700",
  },
});
