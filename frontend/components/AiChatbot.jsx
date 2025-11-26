import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OPENROUTER_KEY } from "@env";

export default function AiChatbot() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]);

  const askGemini = async () => {
    if (!question.trim()) return;

    // show user's message
    setMessages((prev) => [...prev, { from: "user", text: question }]);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini", // BEST for chatting + medical Q&A
          messages: [
            {
              role: "system",
              content:
                "You are a medical assistant. Answer politely and medically based on general health knowledge. Do not prescribe medications or dosages. Encourage consulting a doctor only when necessary.",
            },
            { role: "user", content: question },
          ],
        }),
      });

      const data = await response.json();
      const reply =
        data?.choices?.[0]?.message?.content ??
        data?.choices?.[0]?.message ??
        data?.choices?.[0]?.text ??
        "I couldn't generate a response.";

      // show bot reply
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    } catch (err) {
      console.log("AI Error:", err);
      setMessages((prev) => [...prev, { from: "bot", text: "⚠ Something went wrong. Try again later." }]);
    }

    setQuestion(""); // clear input box
  };

  return (
    <SafeAreaView style={{ flex: 1, padding: 15 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>AI Health Chatbot</Text>

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
