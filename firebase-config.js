// ============================================================
// STEP 1 of setup: paste your Firebase project keys here.
// Get these from: Firebase Console → Project Settings → General
// → "Your apps" → Web app → SDK setup and configuration
// (See README.md for the full walkthrough — takes about 5 minutes)
// ============================================================
const firebaseConfig = {
  apiKey: "AIzaSyAXDo_xdN7ovoY23O8dHFwKlbif0eNzamg",
  authDomain: "kanakkussp.firebaseapp.com",
  projectId: "kanakkussp",
  storageBucket: "kanakkussp.firebasestorage.app",
  messagingSenderId: "862062563758",
  appId: "1:862062563758:web:0b580ec38fc326cfa3f83f"
};

// ============================================================
// STEP 2 of setup: list the people who will log expenses.
// Whatever name they tap on the login screen is how their
// entries get tagged. Add or remove names freely.
// ============================================================
const PEOPLE = ["Swami", "Senthil", "Periyasamy", "Person 4", "Person 5"];

// A single shared PIN everyone uses to open the app.
// Change this to something only your team knows.

const PEOPLE_PINS = {
  "Swami": "4345",
  "Senthil": "3176",
  "Periyasamy": "8327"
};
// ============================================================
// STEP 3 (optional): customize expense categories.
// ============================================================
const CATEGORIES = [
  "Food", "Travel", "Site Material", "Labour Wages",
  "Utilities", "Rent", "Medical", "Miscellaneous","Office Setup"
];