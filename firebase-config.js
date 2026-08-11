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

  { en: "Cement",                 ta: "சிமெண்ட்" },
  { en: "River Sand",             ta: "ஆற்று மணல்" },
  { en: "M-Sand",                 ta: "எம்-சாண்ட்" },
  { en: "Jelly 3/4\" (20mm)",     ta: "ஜல்லி 3/4\"" },
  { en: "Jelly 1 1/2\" (40mm)",   ta: "ஜல்லி 1 1/2\"" },
  { en: "Bricks",                 ta: "செங்கல்" },
  { en: "Cement Blocks",          ta: "சிமெண்ட் பிளாக்ஸ்" },
  { en: "TMT Steel Rods",         ta: "TMT இரும்பு கம்பிகள்" },
  { en: "Centering / Shuttering", ta: "சென்டரிங் / ஷட்டரிங்" },
  { en: "Ready-Mix Concrete",     ta: "ரெடிமிக்ஸ் கான்கிரீட்" },
  { en: "Plumbing Materials",     ta: "பிளம்பிங் பொருட்கள்" },
  { en: "Electrical Materials",   ta: "மின் பொருட்கள்" },
  { en: "Paint & Finishing",      ta: "பெயிண்ட் & பூச்சு வேலை" },
  { en: "Tiles / Flooring",       ta: "டைல்ஸ் / தரை வேலை" },
  { en: "Water Tanker",           ta: "தண்ணீர் லாரி" },
  { en: "Other Site Material",    ta: "பிற தள பொருட்கள்" },
  { en: "Labour Wages",           ta: "கூலி ஊதியம்" },
  { en: "JCB / Excavator Rental", ta: "ஜேசிபி வாடகை" },
  { en: "Concrete Mixer Rental",  ta: "கான்கிரீட் மிக்சர் வாடகை" },
  { en: "Vibrator Rental",        ta: "வைப்ரேட்டர் வாடகை" },
  { en: "Crane Rental",           ta: "கிரேன் வாடகை" },
  { en: "Lorry / Transport",      ta: "லாரி போக்குவரத்து" },
  { en: "Generator Rental",       ta: "ஜெனரேட்டர் வாடகை" },
  { en: "Borewell",               ta: "போர்வெல்" },
  { en: "Driver Allowance",       ta: "ஓட்டுநர் படி" },
  { en: "Tools & Equipment",      ta: "கருவிகள் & உபகரணங்கள்" },
];

// Expenses above this amount (in ₹) will require a receipt photo/PDF upload.
const RECEIPT_REQUIRED_ABOVE = 500;

// Receipt uploads need Firebase Storage, which needs the paid "Blaze" plan.
// Set this to true once Storage is upgraded and working — until then, leave
// it false and the receipt field stays hidden so nobody hits upload errors.
const RECEIPT_UPLOAD_ENABLED = false;
