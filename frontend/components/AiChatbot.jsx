import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { OPENROUTER_KEY } from "@env";

export default function AiChatbot() {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Ask AIra anything about health" },
  ]);

  const scrollViewRef = useRef(null);

  const askGemini = async () => {
    if (!question.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text: question }]);

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "openai/gpt-4o-mini",
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

      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "⚠ Something went wrong. Try again later." },
      ]);
    }

    setQuestion("");
  };

  // Auto scroll to latest message
  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  return (
    <ImageBackground
      source={require("../assets/aichatbot2.png")}
      style={styles.bg}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>AIra</Text>

        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={85}
        >
          <ScrollView
            style={styles.messagesBox}
            showsVerticalScrollIndicator={false}
            ref={scrollViewRef}
            keyboardShouldPersistTaps="handled"
          >
            {messages.map((msg, index) => (
              <View
                key={index}
                style={[
                  styles.msgBubble,
                  msg.from === "user" ? styles.userBubble : styles.botBubble,
                ]}
              >
                <Text style={styles.msgText}>{msg.text}</Text>
              </View>
            ))}
          </ScrollView>

          <View style={styles.inputSection}>
            <TextInput
              value={question}
              onChangeText={setQuestion}
              placeholder="Ask a health question..."
              placeholderTextColor="#ffffff99"
              style={styles.input}
            />
            <TouchableOpacity style={styles.sendBtn} onPress={askGemini}>
              <Text style={styles.sendText}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 14,
  },
  heading: {
    fontSize: 32,
    fontWeight: "700",
    color: "white",
    textAlign: "center",
    marginBottom: 12,
  },
  messagesBox: {
    flex: 1,
    marginVertical: 8,
  },
  msgBubble: {
    padding: 12,
    borderRadius: 14,
    marginVertical: 6,
    maxWidth: "80%",
  },
  userBubble: {
    backgroundColor: "#705a45cc",
    alignSelf: "flex-end",
  },
  botBubble: {
    backgroundColor: "#08080880",
    alignSelf: "flex-start",
  },
  msgText: {
    color: "white",
    fontSize: 15,
    lineHeight: 20,
  },
  inputSection: {
    flexDirection: "row",
    gap: 8,
    paddingTop: 6,
    paddingBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ffffffaa",
    backgroundColor: "#08080880",
    padding: 12,
    borderRadius: 12,
    color: "white",
    fontSize: 15,
  },
  sendBtn: {
    backgroundColor: "#b59271dd",
    paddingHorizontal: 18,
    justifyContent: "center",
    borderRadius: 12,
  },
  sendText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 15,
  },
});
