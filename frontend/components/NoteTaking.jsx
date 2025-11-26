import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

const NoteTaking = () => {
  const [thought, setThought] = useState("");
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const saved = await AsyncStorage.getItem("NOTES_LIST");
    if (saved) setNotes(JSON.parse(saved));
  };

  const saveNote = async () => {
    if (!thought.trim()) return;
    const newNote = {
      id: Date.now(),
      text: thought.trim(),
      color: "#c7a99ec8",
      rotate: Math.random() > 0.5 ? "-2deg" : "2deg",
    };
    const updated = [...notes, newNote];
    setNotes(updated);
    await AsyncStorage.setItem("NOTES_LIST", JSON.stringify(updated));
    setThought("");
  };

  const deleteNote = async (id) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    await AsyncStorage.setItem("NOTES_LIST", JSON.stringify(updated));
  };

  return (
    <ImageBackground source={require("../assets/notes.png")} style={styles.bg}>
      <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        <Text style={styles.title}>Let's Declutter</Text>
        <Text style={styles.sub}>Write your thoughts, hold to delete...</Text>
        
        <TextInput
          value={thought}
          onChangeText={setThought}
          placeholder="Let it out here..."
          placeholderTextColor="#d8d8d8"
          style={styles.input}
          multiline
        />
        <TouchableOpacity style={styles.saveBtn} onPress={saveNote}>
          <Text style={styles.saveBtnText}> Save Thought </Text>
        </TouchableOpacity>

        <View style={styles.grid}>

          {notes.map((note) => (
            <TouchableOpacity
              key={note.id}
              onLongPress={() => deleteNote(note.id)}
              style={[styles.stickyNote, { backgroundColor: note.color, transform: [{ rotate: note.rotate }] }]}
            >
              <Text style={styles.noteText}>{note.text}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default NoteTaking;

const styles = StyleSheet.create({
  bg: { flex: 1, padding: 20 },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: "white",
    marginTop: 10,
    textShadowColor: "#00000070",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },
  sub: {
    fontSize: 18,
    color: "#fff",
    marginTop: 4,
    opacity: 0.88,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "rgba(59, 58, 58, 0.31)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.91)",
    color: "white",
    borderRadius: 16,
    padding: 16,
    minHeight: 230,
    fontSize: 16,
    marginBottom: 16,
  },
  saveBtn: {
    backgroundColor: "#d2af8ff1",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
    alignSelf: "center",
    width: "70%",
    marginBottom: 25,
  },
  saveBtnText: {
    color: "white",
    fontWeight: "600",
    fontSize: 17,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  stickyNote: {
    width: "46%",
    minHeight: 110,
    borderRadius: 14,
    padding: 12,
  },
  noteText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#222",
    lineHeight: 19,
  }
});
