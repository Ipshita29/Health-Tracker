# AIRA-Health-Tracker 

- A next-gen wellness app built using React Native and Expo, focused not on basic fitness stats but on mental, emotional, and lifestyle health.
This health tracker combines AI-powered support, calming exercises, medicine reminders, and self-reflection tools—all in one minimal & intuitive interface.
---

## Features

- AI Chatbot (OpenRouter Integration)
Powered by OpenRouter API (stored securely in .env as OPENROUTER_KEY).
- Smart Calendar with Reminders
Notifications are powered by Expo Notifications + Date & Time Picker.
- Water Intake Tracker
Track how many glasses you drink each day ,progress & history are saved using AsyncStorage for persistence.
- 30-Second Meditation to reset your mind
- Brain Declutter Notes ,a quick digital “thought purge”
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

# Create a .env file in the project root:
  OPENROUTER_KEY=your_openrouter_api_key_here

## Why This App Is Different

Unlike typical health trackers that only focus on steps and calories, this app focuses on mind + body balance:
A health app that actually feels human.

## Getting Started 
# Install dependencies
npm install

# Start the app
expo start


  

