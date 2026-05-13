#include <WiFi.h>
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <ESP32Servo.h>

// ---------------- WIFI ----------------

const char* ssid = "CARDILAC";
const char* password = "Viraj@141205";

// ---------------- MQTT ----------------

const char* mqtt_server =
"b736600fb46243e38eb3d7685b6eb50e.s1.eu.hivemq.cloud";

const int mqtt_port = 8883;

const char* mqtt_user =
"pbl-cluster";

const char* mqtt_pass =
"Pbl1cluster";


// ---------------- PINS ----------------

#define MOISTURE_PIN 34
#define LDR_PIN 35
#define SERVO_PIN 26

// ---------------- OBJECTS ----------------

WiFiClientSecure espClient;
PubSubClient client(espClient);

Servo pumpServo;

// ---------------- VARIABLES ----------------

unsigned long lastMsg = 0;

bool autoMode = false;

bool pumpState = false;

String selectedCrop = "Tomato";

int moistureThreshold = 60;

// ---------------- WIFI ----------------

void setup_wifi() {

    delay(10);

    Serial.println();
    Serial.print("Connecting WiFi");

    WiFi.begin(ssid, password);

    while (
        WiFi.status() != WL_CONNECTED
    ) {

        delay(500);

        Serial.print(".");
    }

    Serial.println("");
    Serial.println("WiFi Connected");
}

// ---------------- CROP SETTINGS ----------------

void updateCropSettings() {

    if (selectedCrop == "Tomato") {

        moistureThreshold = 60;
    }

    else if (selectedCrop == "Onion") {

        moistureThreshold = 50;
    }

    else if (selectedCrop == "Sugarcane") {

        moistureThreshold = 70;
    }

    else if (selectedCrop == "Cotton") {

        moistureThreshold = 40;
    }

    else if (selectedCrop == "Aloe") {

        moistureThreshold = 20;
    }

    else {

        moistureThreshold = 50;
    }

    Serial.print("Crop: ");
    Serial.println(selectedCrop);

    Serial.print("Threshold: ");
    Serial.println(moistureThreshold);
}

// ---------------- SENSOR FUNCTIONS ----------------

int getMoisture() {

    int raw =
    analogRead(MOISTURE_PIN);

    int moisture =
    map(
        raw,
        4095,
        0,
        0,
        100
    );

    moisture =
    constrain(
        moisture,
        0,
        100
    );

    return moisture;
}

int getLight() {

    int raw =
    analogRead(LDR_PIN);

    int light =
    map(
        raw,
        0,
        4095,
        100,
        0
    );

    light =
    constrain(
        light,
        0,
        100
    );

    return light;
}

// ---------------- SERVO CONTROL ----------------

void pumpON() {

    pumpServo.write(90);

    pumpState = true;

    Serial.println("Pump ON");
}

void pumpOFF() {

    pumpServo.write(0);

    pumpState = false;

    Serial.println("Pump OFF");
}

// ---------------- MQTT PUBLISH ----------------

void publishSensorData() {

    StaticJsonDocument<256> doc;

    doc["moisture"] =
    getMoisture();

    doc["light"] =
    getLight();

    doc["pump"] =
    pumpState ? 1 : 0;

    doc["autoMode"] =
    autoMode;

    doc["crop"] =
    selectedCrop;

    doc["threshold"] =
    moistureThreshold;

    char buffer[256];

    serializeJson(doc, buffer);

    client.publish(
        "smart_irrigation/sensors",
        buffer
    );

    Serial.println(buffer);
}

// ---------------- MQTT CALLBACK ----------------

void callback(
    char* topic,
    byte* payload,
    unsigned int length
) {

    String message;

    for (
        int i = 0;
        i < length;
        i++
    ) {

        message +=
        (char)payload[i];
    }

    message.trim();

    Serial.print("MQTT Message: ");
    Serial.println(message);

    // ---------- MANUAL PUMP ----------

    if (message == "PUMP_ON") {

        Serial.println("MATCHED PUMP_ON");

        autoMode = false;

        pumpON();
    }

    else if (
        message == "PUMP_OFF"
    ) {

        Serial.println("MATCHED PUMP_OFF");

        autoMode = false;

        pumpOFF();
    }

    // ---------- AUTO MODE ----------

    else if (
        message == "AUTO_ON"
    ) {

        autoMode = true;

        Serial.println(
            "Auto Mode ON"
        );
    }

    else if (
        message == "AUTO_OFF"
    ) {

        autoMode = false;

        pumpOFF();

        Serial.println(
            "Auto Mode OFF"
        );
    }

    // ---------- CROP CHANGE ----------

    else if (
        message == "Tomato" ||
        message == "Onion" ||
        message == "Sugarcane" ||
        message == "Cotton" ||
        message == "Aloe"
    ) {

        selectedCrop =
        message;

        updateCropSettings();

        Serial.print(
            "Selected Crop: "
        );

        Serial.println(
            selectedCrop
        );
    }

    publishSensorData();
}

// ---------------- MQTT RECONNECT ----------------

void reconnect() {

    while (
        !client.connected()
    ) {

        Serial.print(
            "Connecting MQTT..."
        );

        String clientId =
        "ESP32Client-";

        clientId +=
        String(
            random(0xffff),
            HEX
        );

        if (
            client.connect(
                clientId.c_str(),
                mqtt_user,
                mqtt_pass
            )
        ) {

            Serial.println(
                "Connected"
            );

            client.subscribe(
                "smart_irrigation/control"
            );

            Serial.println(
                "Subscribed to control topic"
            );
        }

        else {

            Serial.print(
                "Failed: "
            );

            Serial.println(
                client.state()
            );

            delay(2000);
        }
    }
}

// ---------------- SETUP ----------------

void setup() {

    Serial.begin(115200);

    pumpServo.attach(
        SERVO_PIN
    );

    pumpOFF();

    updateCropSettings();

    setup_wifi();

    espClient.setInsecure();

    client.setServer(
        mqtt_server,
        mqtt_port
    );

    client.setCallback(
        callback
    );

    Serial.println(
        "System Ready"
    );
}

// ---------------- LOOP ----------------

void loop() {

    if (
        !client.connected()
    ) {

        reconnect();
    }

    client.loop();

    unsigned long now =
    millis();

    if (
        now - lastMsg > 5000
    ) {

        lastMsg = now;

        int moisture =
        getMoisture();

        // ---------- AUTO IRRIGATION ----------

        if (autoMode) {

            // TURN ON BELOW LIMIT

            if (
                moisture <
                moistureThreshold - 5
            ) {

                if (!pumpState) {

                    pumpON();

                    Serial.println(
                        "AUTO: Pump ON"
                    );
                }
            }

            // TURN OFF ABOVE LIMIT

            else if (
                moisture >
                moistureThreshold + 5
            ) {

                if (pumpState) {

                    pumpOFF();

                    Serial.println(
                        "AUTO: Pump OFF"
                    );
                }
            }
        }

        publishSensorData();
    }
}