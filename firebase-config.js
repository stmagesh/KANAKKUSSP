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
// Admin(s): these people can delete ANY entry. Everyone else
// can only delete entries they personally logged. Add/remove
// names freely — must match a name in PEOPLE_PINS above.
// Note: this is a soft, in-app restriction (no real login system
// behind it), suited to a small trusted team — not a hard
// security boundary. Ask if you'd like it hardened later.
// ============================================================
const ADMIN_USERS = ["Swami"];

// ============================================================
// STEP 3: default expense categories, shown in English + Tamil.
// This is just the STARTING list — anyone can add a new category
// right from the app (a "+ Add new category" option in the
// dropdown), and it instantly appears for everyone else too,
// since it's saved to the shared database, not this file.
// Format: { en: "English name", ta: "தமிழ் பெயர்" }
// ============================================================
const CATEGORIES = [
  { en: "Food",                  ta: "உணவு" },
  { en: "Groceries",              ta: "மளிகைப் பொருட்கள்" },
  { en: "Travel",                 ta: "பயணம்" },
  { en: "Fuel",                   ta: "எரிபொருள்" },
  { en: "Vehicle Maintenance",    ta: "வாகன பராமரிப்பு" },
  { en: "Rent",                   ta: "வாடகை" },
  { en: "Electricity Bill",       ta: "மின்சாரக் கட்டணம்" },
  { en: "Water Bill",             ta: "தண்ணீர்க் கட்டணம்" },
  { en: "Cooking Gas",            ta: "சமையல் எரிவாயு" },
  { en: "Mobile / Internet",      ta: "மொபைல் / இணையம்" },
  { en: "Medical",                ta: "மருத்துவம்" },
  { en: "Education",              ta: "கல்வி" },
  { en: "Site Material",          ta: "தள பொருட்கள்" },
  { en: "Labour Wages",           ta: "கூலி ஊதியம்" },
  { en: "Tools & Equipment",      ta: "கருவிகள் & உபகரணங்கள்" },
  { en: "Household Items",        ta: "வீட்டுப் பொருட்கள்" },
  { en: "Clothing",               ta: "ஆடை" },
  { en: "Entertainment",          ta: "பொழுதுபோக்கு" },
  { en: "Festival / Religious",   ta: "திருவிழா / சமய செலவு" },
  { en: "Gifts",                  ta: "பரிசுகள்" },
  { en: "Donation",               ta: "நன்கொடை" },
  { en: "Insurance",              ta: "காப்பீடு" },
  { en: "Loan / EMI",             ta: "கடன் தவணை" },
  { en: "Bank Charges",           ta: "வங்கி கட்டணங்கள்" },
  { en: "Repairs & Maintenance",  ta: "பழுது பார்த்தல் & பராமரிப்பு" },
  { en: "Miscellaneous",          ta: "பிற செலவுகள்" }
];

// Expenses above this amount (in ₹) will require a receipt photo/PDF upload.
const RECEIPT_REQUIRED_ABOVE = 500;

// Receipt uploads need Firebase Storage, which needs the paid "Blaze" plan.
// Set this to true once Storage is upgraded and working — until then, leave
// it false and the receipt field stays hidden so nobody hits upload errors.
const RECEIPT_UPLOAD_ENABLED = false;
