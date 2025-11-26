import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GEMINI_API_KEY } from "@env";

export default function AiChatbot() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const askGemini = async () => {
    if (!question.trim()) return;

    // show user message instantly
    setMessages((prev) => [...prev, { from: "user", text: question }]);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a professional medical assistant. Be accurate, polite and helpful. 
Avoid prescribing medications and encourage consulting a doctor only when truly necessary.
Question: ${question}`,
                  },
                ],
              },
            ],
          }),
        }
      );

      const data = await response.json();

      // extract reply safely (supports all Gemini formats)
      let reply = "I couldn't generate a response.";

      if (data?.candidates?.[0]?.content?.parts?.[0]?.text) {
        reply = data.candidates[0].content.parts[0].text;
      } else if (data?.candidates?.[0]?.content?.parts) {
        reply = data.candidates[0].content.parts.map((p) => p.text).join("\n");
      } else if (data?.text) {
        reply = data.text;
      } else if (data?.candidates?.[0]?.text) {
        reply = data.candidates[0].text;
      }

      setMessages((prev) => [...prev, { from: "bot", text: reply }]);

    } catch (err) {
      console.log("Gemini Error:", err);
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "⚠️ Something went wrong. Try again later." },
      ]);
    }

    setQuestion(""); // clear input box
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 15 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        AI Health Chatbot
      </Text>

      <ScrollView style={{ flex: 1, marginVertical: 10 }}>
        {messages.map((msg, index) => (
          <View
            key={index}
            style={{
              alignSelf: msg.from === "user" ? "flex-end" : "flex-start",
              backgroundColor: msg.from === "user" ? "#0071ff" : "#2ecc71",
              padding: 10,
              borderRadius: 10,
              marginVertical: 4,
              maxWidth: "80%",
            }}
          >
            <Text style={{ color: "#fff" }}>{msg.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={{ flexDirection: "row", gap: 8 }}>
        <TextInput
          value={question}
          onChangeText={setQuestion}
          placeholder="Ask a health question..."
          placeholderTextColor="#888"
          style={{
            flex: 1,
            borderWidth: 1,
            borderColor: "#ccc",
            padding: 10,
            borderRadius: 10,
          }}
        />
        <TouchableOpacity
          onPress={askGemini}
          style={{
            backgroundColor: "black",
            paddingHorizontal: 15,
            borderRadius: 10,
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#fff" }}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
