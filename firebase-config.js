// ============================================================
// STEP 1 of setup: paste your Firebase project keys here.
// Get these from: Firebase Console → Project Settings → General
// → "Your apps" → Web app → SDK setup and configuration
// (See README.md for the full walkthrough — takes about 5 minutes)
// ============================================================
const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY_HERE",
  authDomain: "PASTE_YOUR_PROJECT.firebaseapp.com",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_PROJECT.appspot.com",
  messagingSenderId: "PASTE_SENDER_ID",
  appId: "PASTE_APP_ID"
};

// ============================================================
// STEP 2 of setup: list each person and give them their own PIN.
// This prevents someone accidentally logging entries under the
// wrong name. Each person only needs to know their own PIN.
// ============================================================
const PEOPLE_PINS = {
  "Person 1": "1111",
  "Person 2": "2222",
  "Person 3": "3333",
  "Person 4": "4444",
  "Person 5": "5555"
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
