# Smart Farming Automation System 🌱

An IoT-based crop-aware smart irrigation platform built using ESP32, MQTT, Firebase, and a realtime web dashboard.

The system monitors:
- Soil moisture
- Sunlight intensity
- Pump activity

and automatically controls irrigation based on selected crop requirements.

---

# 🚀 Features

## 🌿 Smart Irrigation
- Automatic pump control using soil moisture thresholds
- Crop-specific irrigation logic
- Manual + Auto control modes

## 📡 Realtime Monitoring
- Live sensor updates using MQTT
- ESP32 cloud communication
- Realtime dashboard updates

## ☁ Cloud Integration
- Firebase Realtime Database logging
- Historical data tracking
- CSV export support

## 🧠 Intelligent Automation
- Crop-aware watering thresholds
- Hysteresis control logic for stable irrigation
- Prevents rapid relay switching

## 🌍 Modern Dashboard
- Responsive UI
- Multilingual support
  - English
  - Marathi
  - Hindi

---

# 🛠 Tech Stack

| Component | Technology |
|---|---|
| Microcontroller | ESP32 |
| Communication Protocol | MQTT |
| MQTT Broker | HiveMQ Cloud |
| Database | Firebase Realtime Database |
| Frontend | HTML, CSS, JavaScript |
| Hosting | Vercel |
| Sensors | Soil Moisture Sensor, LDR |
| Automation Logic | ESP32 Embedded C++ |

---

# ⚙ System Architecture

ESP32 Sensors  
↓  
MQTT Communication  
↓  
Firebase Logging  
↓  
Realtime Dashboard  
↓  
Crop-Aware Pump Automation

---

# 🌾 Supported Crops

| Crop | Moisture Threshold |
|---|---|
| Tomato | 60% |
| Onion | 50% |
| Sugarcane | 70% |
| Cotton | 40% |
| Aloe Vera | 20% |

---

# 📊 Dashboard Features

- Live Moisture Monitoring
- Sunlight Monitoring
- Pump Status Display
- Auto/Manual Irrigation
- Historical Logs
- CSV Download
- Crop Selection System

---

# 🔌 Hardware Used

- ESP32 Dev Board
- Soil Moisture Sensor
- LDR Module
- Relay Module
- Water Pump
- Jumper Wires
- Breadboard / PCB

---

# 📷 Project Screenshots

Add your screenshots here.

Example:
- Dashboard
- ESP32 Hardware Setup
- Pump Automation Demo
- Historical Data Page

---

# 📦 Project Structure

```bash
smart-farming-automation/

│── index.html
│── dashboard.html
│── history.html
│── crops.html
│── schemes.html

│── app.js
│── styles.css

│── README.md
│── .gitignore

├── assets/

└── esp32/
    └── smart_irrigation.ino
```

---

# ▶ How to Run

## 1. Upload ESP32 Code
- Open Arduino IDE
- Install ESP32 Board Package
- Upload `smart_irrigation.ino`

## 2. Configure MQTT
Update:
- WiFi credentials
- HiveMQ credentials
- MQTT topics

## 3. Start Dashboard
Open:
```bash
index.html
```

OR deploy on:
- Vercel
- Netlify

---

# 🔮 Future Improvements

- AI-based irrigation analytics
- Weather API integration
- Water usage prediction
- Live graph analytics
- Pump runtime protection
- Sensor fault detection
- Mobile application

---

# 👨‍💻 Developer

Developed by Viraj More  
B.Tech ENTC Student  
KIT's College of Engineering

---

# ⭐ Project Vision

To create a low-cost intelligent farming system that helps farmers:
- save water
- automate irrigation
- monitor crop conditions remotely
- improve irrigation efficiency

using affordable IoT technology.
