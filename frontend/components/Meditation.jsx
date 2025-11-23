import React, { useState, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Animated, Alert } from "react-native";
import { useVideoPlayer, VideoView } from "expo-video";

const Meditation = () => {
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRunning, setIsRunning] = useState(false);
  const [phase, setPhase] = useState("Inhale");
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const timerRef = useRef(null);

  // Fullscreen video player
  const player = useVideoPlayer(
    require("../assets/meditation.mp4"),
    (player) => {
      player.loop = true;
      player.play();
    }
  );

  // Timer countdown
  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      Alert.alert("Meditation Complete", "Great job!");
    }

    return () => clearInterval(timerRef.current);
  }, [isRunning, timeLeft]);

  // Circle breathing animation
  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, { toValue: 1.5, duration: 4000, useNativeDriver: true }),
        Animated.timing(scaleAnim, { toValue: 1, duration: 4000, useNativeDriver: true }),
      ])
    ).start();
  };

  const stopAnimation = () => {
    scaleAnim.stopAnimation();
    scaleAnim.setValue(1);
  };

  // Start, Stop, Reset functions
  const startTimer = () => {
    setIsRunning(true);
    startAnimation();
  };

  const stopTimer = () => {
    setIsRunning(false);
    stopAnimation();
    clearInterval(timerRef.current);
  };

  // Switch inhale/exhale
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setPhase((p) => (p === "Inhale" ? "Exhale" : "Inhale"));
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isRunning]);

  return (
    <View style={styles.container}>
      {/* Background video */}
      <VideoView player={player} style={styles.video} resizeMode="cover" />

      {/* UI Overlay */}
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

// STYLES
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },

  video: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  title: {
    fontSize: 34,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 20,
    fontFamily: "Helvetica",
  },

  timer: {
    fontSize: 30,
    color: "#fff",
    marginBottom: 40,
    fontFamily: "Helvetica Neue",
  },

  circle: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 80,
  },

  phase: {
    fontSize: 20,
    color: "#fff",
  },

  button: {
    backgroundColor: "rgba(255,255,255,0.25)",
    padding: 15,
    borderRadius: 12,
    width: 110,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Helvetica",
    fontWeight: "600",
  },
});

export default Meditation;
