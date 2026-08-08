# Kanakku — Shared Expense Ledger

A lightweight web app for 2–5 people to log expenses from anywhere and share one
database in real time. Installs on Android like a normal app (no Play Store
needed). Reports: Daily, Fortnightly, Monthly, Yearly, with CSV export.

## How it works
- All entries write to **Firebase Firestore** — one shared cloud database.
- Every phone that has the app open sees new entries **instantly**, from any location.
- No server to manage, no monthly cost at this scale (Firestore free tier: 50K reads
  and 20K writes a day — miles more than 5 people logging expenses will ever use).

## Setup (about 10 minutes, one-time)

### 1. Create a Firebase project
1. Go to https://console.firebase.google.com → **Add project** → give it a name (e.g. `kanakku-ledger`) → skip Google Analytics → Create.
2. In the left menu, go to **Build → Firestore Database → Create database** → choose a region close to you (e.g. `asia-south1` for India) → start in **Production mode**.
3. Go to the **Rules** tab of Firestore and paste this (simple shared-access rules suited to a small trusted team — the app's own PIN screen is the access gate, not Firestore auth):
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /expenses/{doc} {
         allow read, write: if true;
       }
     }
   }
   ```
   Click **Publish**.

### 2. Register a web app
1. In Project Settings (gear icon, top left) → **Your apps** → click the **</>** (Web) icon.
2. Give it a nickname → Register app. It shows a `firebaseConfig` object.
3. Copy those values into `firebase-config.js` in this folder, replacing the
   `PASTE_...` placeholders.
4. In the same file, edit `PEOPLE` to your team's actual names, and change
   `SHARED_PIN` to something private.

### 3. Put it online
Any static hosting works. Two easy free options:

**Option A — Firebase Hosting (recommended, same ecosystem):**
```
npm install -g firebase-tools
firebase login
firebase init hosting     # select this folder as public directory
firebase deploy
```
You'll get a URL like `https://kanakku-ledger.web.app`.

**Option B — GitHub Pages:** push this folder to a GitHub repo, then enable
Pages in the repo settings. You'll get a URL like
`https://yourname.github.io/kanakku`.

### 4. Install on Android
1. Open the deployed URL in Chrome on each phone.
2. Log in once with name + PIN.
3. Tap the Chrome menu (⋮) → **Add to Home screen** / **Install app**.
4. It now opens full-screen with its own icon, like a native app.

## Using it
- **Add** tab — log an expense (date, category, amount, note).
- **Entries** tab — live list of everyone's entries, newest first; delete your own.
- **Reports** tab — pick Daily / Fortnightly / Monthly / Yearly and an anchor
  date; see the total plus breakdowns by category and by person; export the
  period as a CSV (opens fine in Excel).

## Notes
- Fortnightly reports split each month into 1st–15th and 16th–end.
- Categories are editable in `firebase-config.js` under `CATEGORIES`.
- Everything is timestamped by calendar date, not device time zone, so entries
  from different locations line up correctly.
- If you outgrow the shared-PIN model (want individual logins, admin-only
  deletion, etc.), the next step is Firebase Authentication — happy to extend
  this when you're ready.
