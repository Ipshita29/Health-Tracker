# AIRA — Health Tracker

A next-gen wellness app built using **React Native** and **Expo**, focused not on basic fitness stats but on **mental, emotional, and lifestyle health**.  
This tracker combines **AI-powered support, calming exercises, medicine reminders, and self-reflection tools** — all in one **minimal & intuitive interface**.

---

## Features

- **AI Chatbot (OpenRouter Integration)**  
  Powered by OpenRouter API (securely stored in `.env` as `OPENROUTER_KEY`).

- **Smart Calendar with Reminders**  
  Notifications handled using **Expo Notifications + Date & Time Picker**.

- **Water Intake Tracker**  
  Track daily hydration — **progress & history saved in AsyncStorage**.

- **30-Second Meditation**  
  A quick calming breathing session to reset your mind.

- **Brain Declutter Notes**  
  A short “thought purge” — type a stress sentence and clear it for instant relief.

---

## TECH-STACK

| Tool                   | Purpose                |
| ---------------------- | ---------------------- |
| **React Native**       | App development        |
| **Expo Go**            | Build & testing        |
| **Expo Notifications** | Calendar reminders     |
| **AsyncStorage**       | Local data persistence |
| **OpenRouter API**     | AI chatbot             |
| **dotenv**             | Secure API key storage |

---

## Environment Variables

Create a `.env` file in the project root and paste:

OPENROUTER_KEY=your_openrouter_api_key_here

---

## Why This App Is Different

Most health apps track only **steps, weight, and calories**.  
AIRA focuses on **mind + body balance**, helping users feel mentally lighter, emotionally stable, and physically consistent.

🧠 A wellness app that **actually feels human**, not robotic.

---

## Getting Started

### 1️⃣ Install dependencies
npm install

### 2️⃣ Start the app
expo start
