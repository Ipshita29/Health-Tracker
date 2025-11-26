import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const pastelColors = ["#FFE7C7", "#FFCCCC", "#E6FFCC", "#D6E4FF", "#FFF6C2", "#FFD9E8"];

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
    const newNote = { id: Date.now(), text: thought.trim(), color: pastelColors[Math.floor(Math.random() * pastelColors.length)] };
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
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
        
        <Text style={styles.title}>Write it Down</Text>
        <Text style={styles.sub}>Type what’s bothering you...</Text>

        <TextInput
          value={thought}
          onChangeText={setThought}
          placeholder="Write here..."
          placeholderTextColor="#bdbdbd"
          style={styles.input}
          multiline
        />

        <TouchableOpacity style={styles.saveBtn} onPress={saveNote}>
          <Text style={styles.saveBtnText}>Save Thought</Text>
        </TouchableOpacity>

        <View style={styles.grid}>
          {notes.map((note) => (
            <TouchableOpacity
              key={note.id}
              onLongPress={() => deleteNote(note.id)}
              style={[styles.stickyNote, { backgroundColor: note.color }]}
            >
              <Text style={styles.noteText}>{note.text}</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </ImageBackground>
  );
};

export default NoteTaking;

const styles = StyleSheet.create({
  bg: { flex: 1, padding: 18 },
  title: { color: "white", fontSize: 26, fontWeight: "700", marginBottom: 4 },
  sub: { color: "#fff", opacity: 0.9, marginBottom: 12 },
  input: {
    backgroundColor: "rgba(0,0,0,0.4)",
    color: "white",
    borderRadius: 12,
    padding: 15,
    minHeight: 110,
    fontSize: 16,
    marginBottom: 12,
  },
  saveBtn: {
    backgroundColor: "#ebb685",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 18,
  },
  saveBtnText: { color: "white", fontSize: 17, fontWeight: "700" },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    justifyContent: "flex-start",
  },
  stickyNote: {
    width: "45%",
    minHeight: 100,
    borderRadius: 12,
    padding: 12,
    elevation: 2,
  },
  noteText: { fontWeight: "600", fontSize: 15, color: "#222" },
});
