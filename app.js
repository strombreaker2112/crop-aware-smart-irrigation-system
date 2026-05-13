import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.13.0/firebase-app.js";

import {
    getDatabase,
    ref,
    set,
    push,
    onValue,
    get
}
from
"https://www.gstatic.com/firebasejs/12.13.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBefQKPU2xNDgwyw8qRu0lIj1bQUmhd2BI",
  authDomain: "pbl-cloude-storage.firebaseapp.com",
  databaseURL: "https://pbl-cloude-storage-default-rtdb.firebaseio.com",
  projectId: "pbl-cloude-storage",
  storageBucket: "pbl-cloude-storage.firebasestorage.app",
  messagingSenderId: "114420438363",
  appId: "1:114420438363:web:55695a7b8492a1d13db67e",
  measurementId: "G-M4FYHF93QK"
};

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const sensorRef = ref(
    db,
    'smart_irrigation/sensors'
);

const logsRef = ref(
    db,
    'smart_irrigation/logs'
);

const HISTORY_STORAGE_KEY = "farmdash-history";
const HISTORY_DATE_STORAGE_KEY = "farmdash-history-date";
const AUTH_STORAGE_KEY = "farmdash-auth";
const AUTH_USER_STORAGE_KEY = "farmdash-auth-user";
const ACCOUNTS_STORAGE_KEY = "farmdash-accounts";
const USERS_DB_PATH = "smart_irrigation/users";
const PASSWORD_HASH_SALT = "farmdash-pbl-v1";
const MOISTURE_DRASTIC_CHANGE = 7;
const LIGHT_DRASTIC_CHANGE = 10;

const DEFAULT_ACCOUNTS = [
    {
        username: "viraj",
        password: "Viraj2112",
        displayName: "Viraj"
    }
];

const mqttHost =
"wss://b736600fb46243e38eb3d7685b6eb50e.s1.eu.hivemq.cloud:8884/mqtt";

const mqttOptions = {
    username: "pbl-cluster",
    password: "Pbl1cluster"
};

const mqttTopic =
"smart_irrigation/sensors";

const translations = {
    en: {
        appTitle: "Smart Farming Automation",
        brand: "FarmDash",
        navDashboard: "Dashboard",
        navHistory: "Historical Data",
        navCrops: "Crop Database",
        navSchemes: "Gov Schemes",
        navLogout: "Logout",
        languageLabel: "Language",
        loginTitle: "Welcome Back",
        loginSubtitle: "Sign in to monitor irrigation, moisture and sunlight.",
        usernamePlaceholder: "Username (admin)",
        passwordPlaceholder: "Password (admin)",
        accessSystem: "Access System",
        loginTab: "Login",
        registerTab: "New Account",
        accountUsernamePlaceholder: "Username",
        accountPasswordPlaceholder: "Password",
        confirmPasswordPlaceholder: "Confirm password",
        createAccountTitle: "Create Account",
        createAccountSubtitle: "Add a new FarmDash user account.",
        createAccount: "Create Account",
        usernameRequired: "Enter a username.",
        invalidUsername: "Use 3-30 letters, numbers, dashes or underscores.",
        passwordRequired: "Enter a password.",
        passwordTooShort: "Password must be at least 6 characters.",
        passwordsDoNotMatch: "Passwords do not match.",
        usernameTaken: "That username already exists.",
        accountCreated: "Account created. Signing you in.",
        incorrectCredentials: "Incorrect credentials",
        dashboardEyebrow: "Smart Farming Automation",
        dashboardTitle: "Welcome, Viraj",
        dashboardSubtitle: "Farm sensor readings and irrigation controls in one clear workspace.",
        sensorBadge: "Live Sensors",
        moistureLabel: "Soil Moisture",
        moistureHint: "Root-zone hydration",
        lightLabel: "Sunlight Level (LDR)",
        lightHint: "Canopy light exposure",
        irrigationTitle: "Irrigation Control",
        irrigationSubtitle: "Control water flow manually or let auto mode react to the sensor data.",
        valveStatusLabel: "Solenoid Valve Status",
        autoModeLabel: "Mode",
        manualMode: "Manual",
        autoMode: "Auto",
        enableAuto: "Enable Auto Mode",
        disableAuto: "Disable Auto Mode",
        openValve: "Open Valve",
        closeValve: "Close Valve",
        valveOpen: "OPEN (WATERING)",
        valveClosed: "CLOSED",
        tableOpen: "ON",
        tableClosed: "OFF",
        historyTitle: "Historical Data",
        historySubtitle: "Saved by date when sensor levels shift sharply or the pump turns on.",
        downloadCsv: "Download CSV",
        clearHistory: "Clear History",
        historyDateLabel: "Select Day",
        historyNoDates: "No saved dates",
        confirmClearHistory: "Clear all saved history data?",
        historyEmpty: "No history saved yet.",
        historyDateEmpty: "No history saved for this date.",
        historyUndated: "Saved Earlier",
        thDate: "Date",
        thTime: "Time",
        thMoisture: "Moisture Level",
        thLight: "Light Level",
        thValve: "Pump Status",
        cropsTitle: "Crop Database",
        cropsSubtitle: "Recommended growing parameters for common farm crops.",
        cropTomato: "Tomato",
        cropBasil: "Basil",
        cropAloe: "Aloe Vera",
        cropOnion: "Onion",
        cropCotton: "Cotton",
        cropSugarcane: "Sugarcane",
        moisture6080: "Moisture: 60-80%",
        moisture5070: "Moisture: 50-70%",
        moisture1030: "Moisture: 10-30%",
        moisture4565: "Moisture: 45-65%",
        moisture4060: "Moisture: 40-60%",
        moisture7085: "Moisture: 70-85%",
        highLight: "High Light",
        medLight: "Medium Light",
        tomatoDesc: "Requires consistent watering. Auto-irrigation recommended below 50%.",
        basilDesc: "Allow top soil to dry slightly between watering.",
        aloeDesc: "Highly drought tolerant. Only water when moisture drops below 15%.",
        onionDesc: "Needs steady soil moisture during bulb formation and good drainage.",
        cottonDesc: "Prefers warm weather, full sunlight and moderate irrigation intervals.",
        sugarcaneDesc: "Heavy feeder crop that benefits from frequent irrigation and rich soil.",
        schemesTitle: "Gov Schemes & Subsidies",
        schemesSubtitle: "Useful official portals for income support, crop insurance, irrigation, machinery and farm infrastructure.",
        schemesUpdated: "Official links",
        schemeIncome: "Income Support",
        schemeInsurance: "Crop Insurance",
        schemeIrrigation: "Irrigation",
        schemeMaharashtra: "Maharashtra DBT",
        schemeInfra: "Farm Infrastructure",
        schemeMachinery: "Machinery",
        pmKisanName: "PM-KISAN Samman Nidhi",
        pmKisanDesc: "Direct benefit transfer of Rs. 6,000 per year to eligible landholding farmer families.",
        pmfbyName: "Pradhan Mantri Fasal Bima Yojana",
        pmfbyDesc: "Crop insurance cover for notified crops against non-preventable natural risks from sowing to harvest.",
        pmksyName: "PM Krishi Sinchayee Yojana",
        pmksyDesc: "Supports efficient irrigation, water conservation and micro-irrigation under the “per drop more crop” goal.",
        mahaDbtName: "MahaDBT Farmer Schemes",
        mahaDbtDesc: "Maharashtra portal for agriculture department scheme applications, subsidy tracking and beneficiary lists.",
        aifName: "Agriculture Infrastructure Fund",
        aifDesc: "Interest subvention and credit guarantee support for post-harvest and community farming infrastructure projects.",
        smamName: "Agricultural Mechanization",
        smamDesc: "DBT-linked support for farm machinery, custom hiring centers and mechanization initiatives.",
        openOfficial: "Open official portal"
    },
    mr: {
        appTitle: "स्मार्ट फार्मिंग ऑटोमेशन",
        brand: "फार्मडॅश",
        navDashboard: "डॅशबोर्ड",
        navHistory: "ऐतिहासिक डेटा",
        navCrops: "पीक डेटाबेस",
        navSchemes: "सरकारी योजना",
        navLogout: "लॉगआउट",
        languageLabel: "भाषा",
        loginTitle: "पुन्हा स्वागत आहे",
        loginSubtitle: "सिंचन, आर्द्रता आणि सूर्यप्रकाश पाहण्यासाठी साइन इन करा.",
        usernamePlaceholder: "वापरकर्ता नाव (admin)",
        passwordPlaceholder: "पासवर्ड (admin)",
        accessSystem: "प्रणाली उघडा",
        incorrectCredentials: "चुकीचे लॉगिन तपशील",
        dashboardEyebrow: "स्मार्ट फार्मिंग ऑटोमेशन",
        dashboardTitle: "स्वागत आहे, विराज ",
        dashboardSubtitle: "शेतातील सेन्सर रीडिंग आणि सिंचन नियंत्रण एकाच स्पष्ट जागेत.",
        sensorBadge: "थेट सेन्सर",
        moistureLabel: "मातीतील आर्द्रता",
        moistureHint: "मुळांच्या भागातील ओलावा",
        lightLabel: "सूर्यप्रकाश पातळी (LDR)",
        lightHint: "पिकांवर पडणारा प्रकाश",
        irrigationTitle: "सिंचन नियंत्रण",
        irrigationSubtitle: "पाण्याचा प्रवाह हाताने नियंत्रित करा किंवा ऑटो मोडला सेन्सर डेटानुसार काम करू द्या.",
        valveStatusLabel: "सोलोनॉइड वाल्व स्थिती",
        autoModeLabel: "मोड",
        manualMode: "मॅन्युअल",
        autoMode: "ऑटो",
        enableAuto: "ऑटो मोड सुरू करा",
        disableAuto: "ऑटो मोड बंद करा",
        openValve: "वाल्व उघडा",
        closeValve: "वाल्व बंद करा",
        valveOpen: "उघडे (पाणी सुरू)",
        valveClosed: "बंद",
        tableOpen: "उघडे",
        tableClosed: "बंद",
        wsDisconnected: "ESP32 शी जोडणी तुटली",
        historyTitle: "ऐतिहासिक डेटा",
        historySubtitle: "या सत्रातील अलीकडील सेन्सर रीडिंग आणि वाल्व बदल.",
        downloadCsv: "CSV डाउनलोड करा",
        thTime: "वेळ",
        thMoisture: "आर्द्रता",
        thLight: "प्रकाश पातळी",
        thValve: "वाल्व स्थिती",
        cropsTitle: "पीक डेटाबेस",
        cropsSubtitle: "सामान्य पिकांसाठी शिफारस केलेले वाढीचे पॅरामीटर्स.",
        cropTomato: "टोमॅटो",
        cropBasil: "तुळस",
        cropAloe: "कोरफड",
        cropOnion: "कांदा",
        cropCotton: "कापूस",
        cropSugarcane: "ऊस",
        moisture6080: "आर्द्रता: 60-80%",
        moisture5070: "आर्द्रता: 50-70%",
        moisture1030: "आर्द्रता: 10-30%",
        moisture4565: "आर्द्रता: 45-65%",
        moisture4060: "आर्द्रता: 40-60%",
        moisture7085: "आर्द्रता: 70-85%",
        highLight: "जास्त प्रकाश",
        medLight: "मध्यम प्रकाश",
        tomatoDesc: "नियमित पाणी आवश्यक. 50% खाली ऑटो सिंचन शिफारस केलेले.",
        basilDesc: "पाणी देण्याच्या दरम्यान वरची माती थोडी कोरडी होऊ द्या.",
        aloeDesc: "दुष्काळ सहनशील. आर्द्रता 15% खाली गेल्यावरच पाणी द्या.",
        onionDesc: "कांदा तयार होताना स्थिर ओलावा आणि चांगला निचरा आवश्यक.",
        cottonDesc: "उबदार हवामान, पूर्ण सूर्यप्रकाश आणि मध्यम सिंचन अंतर योग्य.",
        sugarcaneDesc: "जास्त पोषण घेणारे पीक; वारंवार सिंचन आणि सुपीक माती उपयुक्त.",
        schemesTitle: "सरकारी योजना आणि अनुदाने",
        schemesSubtitle: "उत्पन्न मदत, पीक विमा, सिंचन, यंत्रसामग्री आणि शेती पायाभूत सुविधांसाठी अधिकृत पोर्टल.",
        schemesUpdated: "अधिकृत दुवे",
        schemeIncome: "उत्पन्न मदत",
        schemeInsurance: "पीक विमा",
        schemeIrrigation: "सिंचन",
        schemeMaharashtra: "महाराष्ट्र DBT",
        schemeInfra: "शेती पायाभूत सुविधा",
        schemeMachinery: "यंत्रसामग्री",
        pmKisanName: "PM-KISAN सम्मान निधी",
        pmKisanDesc: "पात्र जमीनधारक शेतकरी कुटुंबांना दरवर्षी Rs. 6,000 थेट लाभ हस्तांतरण.",
        pmfbyName: "प्रधानमंत्री फसल बीमा योजना",
        pmfbyDesc: "पेरणीपासून कापणीपर्यंत नैसर्गिक जोखमींविरुद्ध अधिसूचित पिकांसाठी पीक विमा.",
        pmksyName: "PM कृषी सिंचाई योजना",
        pmksyDesc: "“प्रति थेंब अधिक पीक” उद्दिष्टांतर्गत कार्यक्षम सिंचन, जलसंधारण आणि सूक्ष्म सिंचनास मदत.",
        mahaDbtName: "MahaDBT शेतकरी योजना",
        mahaDbtDesc: "कृषी विभागाच्या योजनांसाठी अर्ज, अनुदान स्थिती आणि लाभार्थी याद्यांसाठी महाराष्ट्र पोर्टल.",
        aifName: "कृषी अवसंरचना निधी",
        aifDesc: "काढणीनंतरच्या आणि सामुदायिक शेती पायाभूत प्रकल्पांसाठी व्याज सवलत आणि कर्ज हमी मदत.",
        smamName: "कृषी यांत्रिकीकरण",
        smamDesc: "शेती यंत्रे, कस्टम हायरिंग सेंटर आणि यांत्रिकीकरण उपक्रमांसाठी DBT जोडलेली मदत.",
        openOfficial: "अधिकृत पोर्टल उघडा"
    },
    hi: {
        appTitle: "स्मार्ट फार्मिंग ऑटोमेशन",
        brand: "फार्मडैश",
        navDashboard: "डैशबोर्ड",
        navHistory: "ऐतिहासिक डेटा",
        navCrops: "फसल डेटाबेस",
        navSchemes: "सरकारी योजनाएं",
        navLogout: "लॉगआउट",
        languageLabel: "भाषा",
        loginTitle: "फिर से स्वागत है",
        loginSubtitle: "सिंचाई, नमी और धूप देखने के लिए साइन इन करें.",
        usernamePlaceholder: "उपयोगकर्ता नाम (admin)",
        passwordPlaceholder: "पासवर्ड (admin)",
        accessSystem: "सिस्टम खोलें",
        incorrectCredentials: "लॉगिन जानकारी गलत है",
        dashboardEyebrow: "स्मार्ट फार्मिंग ऑटोमेशन",
        dashboardTitle: "स्वागत है, विराज ",
        dashboardSubtitle: "खेत के सेंसर रीडिंग और सिंचाई नियंत्रण एक साफ जगह पर.",
        sensorBadge: "लाइव सेंसर",
        moistureLabel: "मिट्टी की नमी",
        moistureHint: "जड़ों के क्षेत्र की नमी",
        lightLabel: "धूप स्तर (LDR)",
        lightHint: "फसल पर पड़ने वाली रोशनी",
        irrigationTitle: "सिंचाई नियंत्रण",
        irrigationSubtitle: "पानी के प्रवाह को मैनुअल रूप से नियंत्रित करें या ऑटो मोड को सेंसर डेटा पर प्रतिक्रिया करने दें.",
        valveStatusLabel: "सोलोनॉइड वाल्व स्थिति",
        autoModeLabel: "मोड",
        manualMode: "मैनुअल",
        autoMode: "ऑटो",
        enableAuto: "ऑटो मोड चालू करें",
        disableAuto: "ऑटो मोड बंद करें",
        openValve: "वाल्व खोलें",
        closeValve: "वाल्व बंद करें",
        valveOpen: "खुला (पानी चालू)",
        valveClosed: "बंद",
        tableOpen: "खुला",
        tableClosed: "बंद",
        wsDisconnected: "ESP32 से कनेक्शन टूट गया",
        historyTitle: "ऐतिहासिक डेटा",
        historySubtitle: "इस सत्र की हाल की सेंसर रीडिंग और वाल्व बदलाव.",
        downloadCsv: "CSV डाउनलोड करें",
        thTime: "समय",
        thMoisture: "नमी",
        thLight: "रोशनी स्तर",
        thValve: "वाल्व स्थिति",
        cropsTitle: "फसल डेटाबेस",
        cropsSubtitle: "सामान्य फसलों के लिए सुझाए गए बढ़वार मानक.",
        cropTomato: "टमाटर",
        cropBasil: "तुलसी",
        cropAloe: "एलोवेरा",
        cropOnion: "प्याज",
        cropCotton: "कपास",
        cropSugarcane: "गन्ना",
        moisture6080: "नमी: 60-80%",
        moisture5070: "नमी: 50-70%",
        moisture1030: "नमी: 10-30%",
        moisture4565: "नमी: 45-65%",
        moisture4060: "नमी: 40-60%",
        moisture7085: "नमी: 70-85%",
        highLight: "तेज रोशनी",
        medLight: "मध्यम रोशनी",
        tomatoDesc: "लगातार पानी चाहिए. 50% से कम पर ऑटो सिंचाई की सलाह है.",
        basilDesc: "पानी देने के बीच ऊपरी मिट्टी को थोड़ा सूखने दें.",
        aloeDesc: "सूखे को बहुत सहन करता है. नमी 15% से कम होने पर ही पानी दें.",
        onionDesc: "कंद बनने के समय स्थिर नमी और अच्छी जल निकासी चाहिए.",
        cottonDesc: "गर्म मौसम, पूरी धूप और मध्यम सिंचाई अंतराल पसंद करता है.",
        sugarcaneDesc: "अधिक पोषण लेने वाली फसल; बार-बार सिंचाई और उपजाऊ मिट्टी लाभदायक.",
        schemesTitle: "सरकारी योजनाएं और सब्सिडी",
        schemesSubtitle: "आय सहायता, फसल बीमा, सिंचाई, मशीनरी और कृषि अवसंरचना के लिए उपयोगी आधिकारिक पोर्टल.",
        schemesUpdated: "आधिकारिक लिंक",
        schemeIncome: "आय सहायता",
        schemeInsurance: "फसल बीमा",
        schemeIrrigation: "सिंचाई",
        schemeMaharashtra: "महाराष्ट्र DBT",
        schemeInfra: "कृषि अवसंरचना",
        schemeMachinery: "मशीनरी",
        pmKisanName: "PM-KISAN सम्मान निधि",
        pmKisanDesc: "पात्र भूमिधारक किसान परिवारों को हर साल Rs. 6,000 का प्रत्यक्ष लाभ हस्तांतरण.",
        pmfbyName: "प्रधानमंत्री फसल बीमा योजना",
        pmfbyDesc: "बुवाई से कटाई तक गैर-रोकथाम योग्य प्राकृतिक जोखिमों के लिए अधिसूचित फसलों का बीमा.",
        pmksyName: "PM कृषि सिंचाई योजना",
        pmksyDesc: "“प्रति बूंद अधिक फसल” लक्ष्य के तहत कुशल सिंचाई, जल संरक्षण और माइक्रो-इरिगेशन को समर्थन.",
        mahaDbtName: "MahaDBT किसान योजनाएं",
        mahaDbtDesc: "कृषि विभाग की योजनाओं के आवेदन, सब्सिडी ट्रैकिंग और लाभार्थी सूचियों के लिए महाराष्ट्र पोर्टल.",
        aifName: "कृषि अवसंरचना निधि",
        aifDesc: "कटाई के बाद और सामुदायिक खेती अवसंरचना परियोजनाओं के लिए ब्याज छूट और क्रेडिट गारंटी सहायता.",
        smamName: "कृषि मशीनीकरण",
        smamDesc: "खेती मशीनरी, कस्टम हायरिंग सेंटर और मशीनीकरण पहलों के लिए DBT-लिंक्ड सहायता.",
        openOfficial: "आधिकारिक पोर्टल खोलें"
    }
};

let currentLanguage = localStorage.getItem("farmdash-language") || "en";
let authMode = "login";
let autoMode = localStorage.getItem("farmdash-auto-mode") === "true";
let lastValveState = Number(localStorage.getItem("farmdash-last-pump") || 0);
let historyData = loadHistory();
let selectedHistoryDateKey = localStorage.getItem(HISTORY_DATE_STORAGE_KEY) || "";
let lastLoggedData = null;
let lastLogTime = 0;
let latestSensorData = null;
let mqttInitialized = false;

function t(key) {
    const dictionary = translations[currentLanguage] || translations.en;
    return dictionary[key] || translations.en[key] || key;
}

function setLanguage(language) {
    currentLanguage = translations[language] ? language : "en";
    localStorage.setItem("farmdash-language", currentLanguage);
    applyTranslations();
}

function normalizeUsername(username) {
    return String(username || "").trim().toLowerCase();
}

function isValidUsername(username) {
    return /^[a-z0-9_-]{3,30}$/.test(username);
}

function formatDisplayName(username) {
    return String(username || "")
        .replace(/[_-]+/g, " ")
        .replace(/\b\w/g, (character) => character.toUpperCase());
}

function hashPassword(password) {
    const text = `${PASSWORD_HASH_SALT}:${password}`;
    let hash = 2166136261;

    for (let index = 0; index < text.length; index += 1) {
        hash ^= text.charCodeAt(index);
        hash +=
            (hash << 1) +
            (hash << 4) +
            (hash << 7) +
            (hash << 8) +
            (hash << 24);
    }

    return `v1:${(hash >>> 0).toString(16).padStart(8, "0")}`;
}

function normalizeAccount(account) {
    const username = normalizeUsername(account && account.username);

    if (!username) {
        return null;
    }

    const passwordHash =
        account.passwordHash ||
        (
            account.password
            ? hashPassword(account.password)
            : ""
        );

    if (!passwordHash) {
        return null;
    }

    return {
        username,
        displayName: account.displayName || formatDisplayName(username),
        passwordHash,
        createdAt: Number(account.createdAt) || Date.now()
    };
}

function loadAccounts() {
    try {
        const storedAccounts = JSON.parse(
            localStorage.getItem(ACCOUNTS_STORAGE_KEY) || "[]"
        );

        if (!Array.isArray(storedAccounts)) {
            return [];
        }

        const accountsByName = new Map();

        storedAccounts.forEach((account) => {
            const normalizedAccount = normalizeAccount(account);

            if (normalizedAccount) {
                accountsByName.set(
                    normalizedAccount.username,
                    normalizedAccount
                );
            }
        });

        return Array.from(accountsByName.values());
    } catch (error) {
        return [];
    }
}

function saveAccounts(accounts) {
    localStorage.setItem(
        ACCOUNTS_STORAGE_KEY,
        JSON.stringify(accounts)
    );
}

function getLocalAccount(username) {
    return loadAccounts().find((account) => {
        return account.username === normalizeUsername(username);
    }) || null;
}

function addOrUpdateLocalAccount(account) {
    const normalizedAccount = normalizeAccount(account);

    if (!normalizedAccount) {
        return null;
    }

    const accounts = loadAccounts().filter((storedAccount) => {
        return storedAccount.username !== normalizedAccount.username;
    });

    accounts.push(normalizedAccount);

    saveAccounts(accounts);

    return normalizedAccount;
}

function ensureDefaultAccounts() {
    DEFAULT_ACCOUNTS.forEach((account) => {
        const username = normalizeUsername(account.username);

        if (!getLocalAccount(username)) {
            addOrUpdateLocalAccount(account);
        }
    });
}

function getAccountRef(username) {
    return ref(
        db,
        `${USERS_DB_PATH}/${normalizeUsername(username)}`
    );
}

async function getRemoteAccount(username) {
    try {
        const snapshot = await get(getAccountRef(username));

        if (!snapshot.exists()) {
            return null;
        }

        return addOrUpdateLocalAccount({
            ...snapshot.val(),
            username
        });
    } catch (error) {
        console.log("Account load failed", error);
        return null;
    }
}

async function saveRemoteAccount(account) {
    const normalizedAccount = normalizeAccount(account);

    if (!normalizedAccount) {
        return false;
    }

    try {
        await set(
            getAccountRef(normalizedAccount.username),
            {
                username: normalizedAccount.username,
                displayName: normalizedAccount.displayName,
                passwordHash: normalizedAccount.passwordHash,
                createdAt: normalizedAccount.createdAt
            }
        );

        return true;
    } catch (error) {
        console.log("Account sync failed", error);
        return false;
    }
}

function syncDefaultAccountsToRemote() {
    DEFAULT_ACCOUNTS.forEach(async (account) => {
        const username = normalizeUsername(account.username);
        const existingAccount = await getRemoteAccount(username);

        if (!existingAccount) {
            await saveRemoteAccount(account);
        }
    });
}

async function findAccount(username) {
    const localAccount = getLocalAccount(username);

    if (localAccount) {
        return localAccount;
    }

    return getRemoteAccount(username);
}

function setAuthSession(account) {
    const normalizedAccount = normalizeAccount(account);

    if (!normalizedAccount) {
        return;
    }

    localStorage.setItem(AUTH_STORAGE_KEY, "true");
    localStorage.setItem(
        AUTH_USER_STORAGE_KEY,
        JSON.stringify({
            username: normalizedAccount.username,
            displayName: normalizedAccount.displayName
        })
    );
}

function getCurrentUser() {
    try {
        const storedUser = JSON.parse(
            localStorage.getItem(AUTH_USER_STORAGE_KEY) || "null"
        );

        if (storedUser && storedUser.username) {
            return {
                username: normalizeUsername(storedUser.username),
                displayName:
                    storedUser.displayName ||
                    formatDisplayName(storedUser.username)
            };
        }
    } catch (error) {
        localStorage.removeItem(AUTH_USER_STORAGE_KEY);
    }

    if (localStorage.getItem(AUTH_STORAGE_KEY) === "true") {
        return {
            username: "viraj",
            displayName: "Viraj"
        };
    }

    return null;
}

function updateCurrentUserText() {
    const user = getCurrentUser();
    const displayName = user ? user.displayName : "Viraj";

    document.querySelectorAll("[data-current-user]").forEach((element) => {
        element.textContent = displayName;
    });

    const dashboardTitle = document.querySelector("[data-dashboard-title]");

    if (dashboardTitle) {
        dashboardTitle.textContent = `Welcome, ${displayName}`;
    }
}

function showAuthMessage(message, type = "error") {
    const messageElement = document.getElementById("auth-message");

    if (!messageElement) {
        if (message) {
            alert(message);
        }

        return;
    }

    messageElement.textContent = message;
    messageElement.classList.toggle("success", type === "success");
    messageElement.hidden = !message;
}

function setAuthBusy(isBusy) {
    const form = document.getElementById("auth-form");

    if (!form) {
        return;
    }

    form.querySelectorAll("button, input").forEach((element) => {
        element.disabled = isBusy;
    });
}

function updateAuthMode() {
    const isRegister = authMode === "register";
    const title = document.getElementById("auth-title");
    const copy = document.getElementById("auth-copy");
    const submitButton = document.getElementById("auth-submit");
    const passwordInput = document.getElementById("password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    document.querySelectorAll("[data-auth-mode]").forEach((button) => {
        button.classList.toggle(
            "active",
            button.dataset.authMode === authMode
        );
    });

    document.querySelectorAll("[data-register-only]").forEach((element) => {
        element.hidden = !isRegister;
    });

    if (title) {
        title.textContent = t(isRegister ? "createAccountTitle" : "loginTitle");
    }

    if (copy) {
        copy.textContent = t(isRegister ? "createAccountSubtitle" : "loginSubtitle");
    }

    if (submitButton) {
        submitButton.textContent = t(isRegister ? "createAccount" : "accessSystem");
    }

    if (passwordInput) {
        passwordInput.autocomplete =
            isRegister
            ? "new-password"
            : "current-password";
    }

    if (confirmPasswordInput) {
        confirmPasswordInput.required = isRegister;
        confirmPasswordInput.disabled = !isRegister;
    }
}

function setAuthMode(mode) {
    authMode = mode === "register" ? "register" : "login";
    showAuthMessage("");
    updateAuthMode();
}

async function submitAuthForm() {
    setAuthBusy(true);

    try {
        if (authMode === "register") {
            await createAccount();
        } else {
            await login();
        }
    } finally {
        setAuthBusy(false);
        updateAuthMode();
    }
}

function applyTranslations() {
    document.documentElement.lang = currentLanguage;
    document.title = t("appTitle");

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        element.textContent = t(element.dataset.i18n);
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
        element.placeholder = t(element.dataset.i18nPlaceholder);
    });

    document.querySelectorAll(".lang-btn").forEach((button) => {
        button.classList.toggle("active", button.dataset.lang === currentLanguage);
    });

    updateAutoButton();
    updatePumpText(lastValveState);
    updateAuthMode();
    updateCurrentUserText();
    renderHistory();
}

async function login() {
    const username = normalizeUsername(document.getElementById("username").value);
    const password = document.getElementById("password").value;

    if (!username) {
        showAuthMessage(t("usernameRequired"));
        return;
    }

    if (!password) {
        showAuthMessage(t("passwordRequired"));
        return;
    }

    const account = await findAccount(username);

    if (account && account.passwordHash === hashPassword(password)) {
        setAuthSession(account);
        window.location.href = "dashboard.html";
        return;
    }

    showAuthMessage(t("incorrectCredentials"));
}

async function createAccount() {
    const username = normalizeUsername(document.getElementById("username").value);
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (!username) {
        showAuthMessage(t("usernameRequired"));
        return;
    }

    if (!isValidUsername(username)) {
        showAuthMessage(t("invalidUsername"));
        return;
    }

    if (!password) {
        showAuthMessage(t("passwordRequired"));
        return;
    }

    if (password.length < 6) {
        showAuthMessage(t("passwordTooShort"));
        return;
    }

    if (password !== confirmPassword) {
        showAuthMessage(t("passwordsDoNotMatch"));
        return;
    }

    const existingAccount = await findAccount(username);

    if (existingAccount) {
        showAuthMessage(t("usernameTaken"));
        return;
    }

    const account = addOrUpdateLocalAccount({
        username,
        passwordHash: hashPassword(password),
        displayName: formatDisplayName(username),
        createdAt: Date.now()
    });

    await saveRemoteAccount(account);

    showAuthMessage(t("accountCreated"), "success");
    setAuthSession(account);
    window.location.href = "dashboard.html";
}

function logout() {

    localStorage.removeItem(
        AUTH_STORAGE_KEY
    );

    localStorage.removeItem(
        AUTH_USER_STORAGE_KEY
    );

    window.location.href =
    "index.html";
}

function guardPage() {
    const page = document.body.dataset.page;
    const isLoggedIn =
        localStorage.getItem(AUTH_STORAGE_KEY) === "true" &&
        Boolean(getCurrentUser());

    }

function setActiveNav() {
    const page = document.body.dataset.page;
    document.querySelectorAll("[data-page-link]").forEach((link) => {
        link.classList.toggle("active", link.dataset.pageLink === page);
    });
}

function updateDashboard(data) {
    const moistureValue = document.getElementById("ui-moisture");
    const lightValue = document.getElementById("ui-light");
    const moistureFill = document.getElementById("moisture-fill");
    const lightFill = document.getElementById("light-fill");

    if (!moistureValue || !lightValue) {
        return;
    }

    latestSensorData = {
        moisture: data.moisture,
        light: data.light,
        pump: Number(data.pump)
    };

    moistureValue.innerText = data.moisture;
    lightValue.innerText = data.light;

    if (moistureFill) {
        moistureFill.style.width = `${clampPercent(data.moisture)}%`;
    }

    if (lightFill) {
        lightFill.style.width = `${clampPercent(data.light)}%`;
    }

   lastValveState = Number(data.pump);
   localStorage.setItem("farmdash-last-pump", String(lastValveState));
   updatePumpText(lastValveState);

if (data.crop) {

    const cropText =
        document.getElementById(
            "ui-crop"
        );

    if (cropText) {

        cropText.innerText =
        data.crop;
    }

    const dropdown =
        document.getElementById(
            "crop-select"
        );

    if (dropdown) {

        dropdown.value =
        data.crop;
    }
}

}

function updatePumpText(pumpState) {

    const pumpBtn =
        document.getElementById(
            "btn-pump"
        );

    const pumpTxt =
        document.getElementById(
            "ui-pump-text"
        );

    if (!pumpBtn || !pumpTxt) {
        return;
    }

    const isOn =
        Number(pumpState) === 1;

    pumpTxt.innerText =
        isOn
        ? "PUMP RUNNING"
        : "PUMP OFF";

    pumpTxt.style.color =
        isOn
        ? "var(--forest)"
        : "var(--muted)";

    pumpBtn.innerText =
        isOn
        ? "Stop Pump"
        : "Start Pump";

    pumpBtn.className =
        isOn
        ? "danger-action"
        : "primary-btn";
}

function togglePump() {

    const newPumpState =
        lastValveState === 1 ? 0 : 1;

    lastValveState = newPumpState;

    updatePumpText(lastValveState);

    localStorage.setItem(
        "farmdash-last-pump",
       String(lastValveState)
    );

    sendCommand("toggle_pump");

    if (newPumpState === 1) {
        saveHistoryEvent(
            { pump: newPumpState },
            Date.now()
        );
    }
}

function toggleAuto() {

    autoMode = !autoMode;

    localStorage.setItem(
        "farmdash-auto-mode",
        String(autoMode)
    );

    updateAutoButton();

    sendCommand(
        autoMode
        ? "auto_on"
        : "auto_off"
    );
}

function changeCrop() {

    const crop =
        document.getElementById(
            "crop-select"
        ).value;

    document.getElementById(
        "ui-crop"
    ).innerText = crop;

    if (!window.mqttClient) {

        console.log(
            "MQTT not connected"
        );

        return;
    }

    window.mqttClient.publish(
        "smart_irrigation/control",
        crop
    );

    console.log(
        "Crop changed:",
        crop
    );
}

function updateAutoButton() {
    const btn = document.getElementById("btn-auto");
    const modeText = document.getElementById("ui-auto-text");

    if (!btn || !modeText) {
        return;
    }

    btn.innerText = autoMode ? t("disableAuto") : t("enableAuto");
    btn.className = autoMode ? "primary-btn" : "secondary-btn";
    modeText.innerText = autoMode ? t("autoMode") : t("manualMode");
}

function updatePumpButton() {

    const button =
        document.getElementById(
            "btn-pump"
        );

    if (!button) return;

    button.textContent =
        lastValveState === 1
        ? "Stop Pump"
        : "Start Pump";
}

function sendCommand(command) {

    if (!window.mqttClient) {

        console.log(
            "MQTT not connected"
        );

        return;
    }

    let mqttMessage = "";

    if (command === "toggle_pump") {

       mqttMessage =
       lastValveState === 1
       ? "PUMP_ON"
       : "PUMP_OFF";
    }

    if (command === "auto_on") {

        mqttMessage = "AUTO_ON";
    }

    if (command === "auto_off") {

        mqttMessage = "AUTO_OFF";
    }

    window.mqttClient.publish(
        "smart_irrigation/control",
        mqttMessage
    );

    console.log(
        "MQTT Command Sent:",
        mqttMessage
    );
}

function getHistoryPayload(data) {

    const source = data || {};
    const fallback = latestSensorData || {};

    return {
        moisture: source.moisture ?? fallback.moisture ?? "--",
        light: source.light ?? fallback.light ?? "--",
        pump: Number(source.pump ?? fallback.pump ?? lastValveState) === 1 ? 1 : 0
    };
}

function formatHistoryDate(date) {
    return date.toLocaleDateString(
        undefined,
        {
            year: "numeric",
            month: "short",
            day: "numeric"
        }
    );
}

function getHistoryDateKey(row) {

    if (row.timestamp) {

        const date = new Date(Number(row.timestamp));

        return [
            date.getFullYear(),
            String(date.getMonth() + 1).padStart(2, "0"),
            String(date.getDate()).padStart(2, "0")
        ].join("-");
    }

    return row.date || "undated";
}

function getHistoryDateLabel(row) {

    if (row.timestamp) {

        return new Date(Number(row.timestamp))
        .toLocaleDateString(
            undefined,
            {
                weekday: "long",
                year: "numeric",
                month: "short",
                day: "numeric"
            }
        );
    }

    return row.date || t("historyUndated");
}

function normalizeHistoryRow(row) {

    row = row || {};

    const timestamp = Number(row.timestamp);
    const hasTimestamp =
        Number.isFinite(timestamp) &&
        timestamp > 0;
    const date =
        hasTimestamp
        ? new Date(timestamp)
        : null;

    return {
        timestamp: hasTimestamp ? timestamp : null,
        date: row.date || (date ? formatHistoryDate(date) : t("historyUndated")),
        time: row.time || (date ? date.toLocaleTimeString() : "--"),
        moisture: row.moisture ?? "--",
        light: row.light ?? "--",
        pump: Number(row.pump) === 1 ? 1 : 0
    };
}

function makeHistoryRow(data, timestamp = Date.now()) {

    const createdAt = Number(timestamp);
    const safeTimestamp =
        Number.isFinite(createdAt)
        ? createdAt
        : Date.now();
    const date = new Date(safeTimestamp);

    return {
        timestamp: safeTimestamp,
        date: formatHistoryDate(date),
        time: date.toLocaleTimeString(),
        moisture: data.moisture,
        light: data.light,
        pump: Number(data.pump) === 1 ? 1 : 0
    };
}

function hasValidSensorLevels(row) {
    return (
        Number.isFinite(Number(row.moisture)) &&
        Number.isFinite(Number(row.light))
    );
}

function hasDrasticChange(currentValue, previousValue, threshold) {

    const current = Number(currentValue);
    const previous = Number(previousValue);

    if (
        !Number.isFinite(current) ||
        !Number.isFinite(previous)
    ) {
        return false;
    }

    return Math.abs(current - previous) >= threshold;
}

function shouldSaveSensorHistory(data, previousPumpState) {

    const pumpTurnedOn =
        Number(data.pump) === 1 &&
        Number(previousPumpState) !== 1;

    if (
        !lastLoggedData ||
        !hasValidSensorLevels(lastLoggedData)
    ) {
        return true;
    }

    return (
        hasDrasticChange(
            data.moisture,
            lastLoggedData.moisture,
            MOISTURE_DRASTIC_CHANGE
        ) ||
        hasDrasticChange(
            data.light,
            lastLoggedData.light,
            LIGHT_DRASTIC_CHANGE
        ) ||
        pumpTurnedOn
    );
}

function logHistory(data, timestamp = Date.now()) {

    const row = makeHistoryRow(
        getHistoryPayload(data),
        timestamp
    );

    historyData.unshift(row);

    saveHistory();

    renderHistory();

    return row;
}

function saveHistoryEvent(data, timestamp = Date.now()) {

    const payload = getHistoryPayload(data);
    const row = logHistory(payload, timestamp);

    push(logsRef, {
        moisture: row.moisture,
        light: row.light,
        pump: row.pump,
        timestamp: row.timestamp
    }).catch((error) => {
        console.log("Firebase history save failed", error);
    });

    lastLoggedData = {
        moisture: row.moisture,
        light: row.light,
        pump: row.pump
    };

    lastLogTime = row.timestamp;

    return row;
}

function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            "\"": "&quot;",
            "'": "&#39;"
        }[character];
    });
}

function formatLevel(value) {

    const number = Number(value);

    if (Number.isFinite(number)) {
        return `${number}%`;
    }

    return String(value ?? "--");
}

function getHistoryDateOptions(rows) {

    const seen = new Set();
    const options = [];

    rows.forEach((row) => {

        const key = getHistoryDateKey(row);

        if (seen.has(key)) {
            return;
        }

        seen.add(key);

        options.push({
            key,
            label: getHistoryDateLabel(row)
        });
    });

    return options;
}

function renderHistoryDateSelect(rows) {

    const select = document.getElementById("history-date-select");

    if (!select) {
        return selectedHistoryDateKey;
    }

    const options = getHistoryDateOptions(rows);

    if (!options.length) {

        select.disabled = true;
        select.innerHTML = `
            <option value="">${escapeHtml(t("historyNoDates"))}</option>
        `;

        selectedHistoryDateKey = "";
        localStorage.removeItem(HISTORY_DATE_STORAGE_KEY);

        return "";
    }

    const selectedExists = options.some((option) => {
        return option.key === selectedHistoryDateKey;
    });

    if (!selectedExists) {
        selectedHistoryDateKey = options[0].key;
        localStorage.setItem(
            HISTORY_DATE_STORAGE_KEY,
            selectedHistoryDateKey
        );
    }

    select.disabled = false;
    select.innerHTML = options.map((option) => {

        const selected =
            option.key === selectedHistoryDateKey
            ? " selected"
            : "";

        return `
            <option value="${escapeHtml(option.key)}"${selected}>${escapeHtml(option.label)}</option>
        `;
    }).join("");

    return selectedHistoryDateKey;
}

function renderHistory() {
    const tbody = document.querySelector("#history-table tbody");

    if (!tbody) {
        return;
    }

    const normalizedRows = historyData.map(normalizeHistoryRow);
    const selectedDateKey = renderHistoryDateSelect(normalizedRows);

    if (!normalizedRows.length) {

        tbody.innerHTML = `
            <tr class="history-empty-row">
                <td colspan="4">${escapeHtml(t("historyEmpty"))}</td>
            </tr>
        `;

        return;
    }

    const rows = normalizedRows.filter((row) => {
        return getHistoryDateKey(row) === selectedDateKey;
    });

    if (!rows.length) {

        tbody.innerHTML = `
            <tr class="history-empty-row">
                <td colspan="4">${escapeHtml(t("historyDateEmpty"))}</td>
            </tr>
        `;

        return;
    }

    tbody.innerHTML = rows.map((row) => {
        return `
            <tr>
                <td>${escapeHtml(row.time)}</td>
                <td>${escapeHtml(formatLevel(row.moisture))}</td>
                <td>${escapeHtml(formatLevel(row.light))}</td>
                <td>${Number(row.pump) === 1 ? t("tableOpen") : t("tableClosed")}</td>
            </tr>
        `;
    }).join("");
}

function loadHistory() {
    try {

        const rows = JSON.parse(
            localStorage.getItem(HISTORY_STORAGE_KEY) || "[]"
        );

        if (!Array.isArray(rows)) {
            return [];
        }

        return rows.map(normalizeHistoryRow);
    } catch (error) {
        return [];
    }
}

function saveHistory() {
    localStorage.setItem(
        HISTORY_STORAGE_KEY,
        JSON.stringify(historyData)
    );
}

function setHistoryDate(dateKey) {

    selectedHistoryDateKey = dateKey;

    if (dateKey) {
        localStorage.setItem(
            HISTORY_DATE_STORAGE_KEY,
            dateKey
        );
    } else {
        localStorage.removeItem(HISTORY_DATE_STORAGE_KEY);
    }

    renderHistory();
}

function getHistoryRowKey(row) {
    return [
        row.timestamp || row.date,
        row.time,
        row.moisture,
        row.light,
        row.pump
    ].join("|");
}

function mergeHistoryRows(localRows, remoteRows) {

    const seen = new Set();

    return [
        ...localRows,
        ...remoteRows
    ]
    .map(normalizeHistoryRow)
    .sort((a, b) => {
        return Number(b.timestamp || 0) - Number(a.timestamp || 0);
    })
    .filter((row) => {

        const key = getHistoryRowKey(row);

        if (seen.has(key)) {
            return false;
        }

        seen.add(key);

        return true;
    });
}

async function loadFirebaseHistory() {

    try {

        const snapshot = await get(logsRef);

        if (!snapshot.exists()) {
            renderHistory();
            return;
        }

        const logs = snapshot.val();
        const remoteRows = Object.values(logs).map((row) => {
            return makeHistoryRow(row, row.timestamp);
        });

        historyData = mergeHistoryRows(
            historyData,
            remoteRows
        );

        saveHistory();

        renderHistory();
    } catch (error) {

        console.log("Firebase history load failed", error);

        renderHistory();
    }
}

async function clearHistory() {

    if (!window.confirm(t("confirmClearHistory"))) {
        return;
    }

    historyData = [];
    selectedHistoryDateKey = "";
    lastLoggedData = null;
    lastLogTime = 0;

    localStorage.removeItem(HISTORY_DATE_STORAGE_KEY);

    saveHistory();

    renderHistory();

    try {
        await set(logsRef, null);
    } catch (error) {
        console.log("Firebase history clear failed", error);
    }
}

function escapeCsvValue(value) {

    const text = String(value ?? "");

    if (/[",\n]/.test(text)) {
        return `"${text.replace(/"/g, "\"\"")}"`;
    }

    return text;
}

function downloadCSV() {

    const headers = [
        t("thDate"),
        t("thTime"),
        `${t("thMoisture")} (%)`,
        `${t("thLight")} (%)`,
        t("thValve")
    ];

    let csv = `${headers.map(escapeCsvValue).join(",")}\n`;

    historyData.slice().reverse().forEach((row) => {

        const normalizedRow = normalizeHistoryRow(row);
        const valveLabel =
            Number(normalizedRow.pump) === 1
            ? t("tableOpen")
            : t("tableClosed");
        const values = [
            getHistoryDateLabel(normalizedRow),
            normalizedRow.time,
            normalizedRow.moisture,
            normalizedRow.light,
            valveLabel
        ];

        csv += `${values.map(escapeCsvValue).join(",")}\n`;
    });

    const blob = new Blob(
        [csv],
        { type: "text/csv;charset=utf-8" }
    );

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute(
        "download",
        "farming_history.csv"
    );

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    window.URL.revokeObjectURL(url);
}

function activateCropCard(activeCard) {

    document.querySelectorAll("[data-crop-card]")
    .forEach((card) => {

        card.classList.toggle(
            "is-active",
            card === activeCard
        );
    });
}

function initCropCards() {

    const cards =
        document.querySelectorAll(
            "[data-crop-card]"
        );

    cards.forEach((card) => {

        card.addEventListener(
            "click",
            () => activateCropCard(card)
        );
    });
}

function clampPercent(value) {

    const number = Number(value);

    if (Number.isNaN(number)) {
        return 0;
    }

    return Math.max(
        0,
        Math.min(100, number)
    );
}
function initMQTT() {

    if (mqttInitialized) return;

    mqttInitialized = true;

    const client = mqtt.connect(
        mqttHost,
        mqttOptions
    );
    window.mqttClient = client;
    client.on("connect", () => {

        console.log("MQTT Connected");

        client.subscribe(mqttTopic);
    });

    client.on("error", (err) => {

        console.log("MQTT ERROR");

        console.log(err);
    });

    client.on("message", (topic, message) => {

        const data = JSON.parse(
            message.toString()
        );
        const previousPumpState = lastValveState;

        console.log(data);

        updateDashboard(data);

        set(sensorRef, {
            moisture: data.moisture,
            light: data.light,
            pump: data.pump,
            timestamp: Date.now()
        });

        const now = Date.now();

        if (shouldSaveSensorHistory(data, previousPumpState)) {
            saveHistoryEvent(data, now);
        }
    });
}

function initPage() {

    ensureDefaultAccounts();
    syncDefaultAccountsToRemote();

    guardPage();

    setActiveNav();

    applyTranslations();

    const page =
        document.body.dataset.page;

    if (page === "dashboard") {

        initMQTT();

        console.log(
            "Dashboard started"
        );

        onValue(sensorRef, (snapshot) => {

            const data =
                snapshot.val();

            if (!data) return;

            updateDashboard(data);
        });
    }

    if (page === "history") {

        loadFirebaseHistory();
    }

    if (page === "crops") {

        initCropCards();
    }
}

window.login = login;
window.submitAuthForm = submitAuthForm;
window.setAuthMode = setAuthMode;
window.logout = logout;
window.setLanguage = setLanguage;
window.downloadCSV = downloadCSV;
window.clearHistory = clearHistory;
window.setHistoryDate = setHistoryDate;
window.toggleAuto = toggleAuto;
window.togglePump = togglePump;
window.changeCrop = changeCrop;

initPage();
