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
// STEP 2 of setup: list each person and give them their own PIN.
// This prevents someone accidentally logging entries under the
// wrong name. Each person only needs to know their own PIN.
// ============================================================
const PEOPLE_PINS = {
  "Swami": "4345",
  "Senthil": "3176",
  "Samy": "8327"
};

// ============================================================
// STEP 3 (optional): customize expense categories.
// ============================================================
const CATEGORIES = [
  "Food", "Travel", "Site Material", "Labour Wages",
  "Utilities", "Rent", "Medical", "Miscellaneous"
];

// Expenses above this amount (in ₹) will require a receipt photo/PDF upload.
const RECEIPT_REQUIRED_ABOVE = 500;

// Receipt uploads need Firebase Storage, which needs the paid "Blaze" plan.
// Set this to true once Storage is upgraded and working — until then, leave
// it false and the receipt field stays hidden so nobody hits upload errors.
const RECEIPT_UPLOAD_ENABLED = false;