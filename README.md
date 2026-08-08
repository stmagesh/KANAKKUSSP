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

### 1b. Enable Firebase Storage (for receipt photos)
1. In the left sidebar, use the search icon → type **Storage** → click **Storage**.
2. Click **Get started**.
3. Choose **Start in production mode** → Next → pick the same location as your
   Firestore database → **Done**.
4. Go to the **Rules** tab of Storage and paste:
   ```
   rules_version = '2';
   service firebase.storage {
     match /b/{bucket}/o {
       match /receipts/{allPaths=**} {
         allow read, write: if true;
       }
     }
   }
   ```
   Click **Publish**.
   (Same trusted-small-team model as the Firestore rules — the app's PIN is the gate.)

### 2. Register a web app
1. In Project Settings (gear icon, top left) → **Your apps** → click the **</>** (Web) icon.
2. Give it a nickname → Register app. It shows a `firebaseConfig` object.
3. Copy those values into `firebase-config.js` in this folder, replacing the
   `PASTE_...` placeholders.
4. In the same file, edit `PEOPLE_PINS` — replace each `"Person 1"` etc. with
   your team's real names, and give each person their own PIN (so nobody can
   accidentally log an entry under someone else's name).

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

**Option B — GitHub Pages:** push this folder to a GitHub repo (drag in **all
files, including `icon-192.png` and `icon-512.png`** — missing icons is why
the app logo won't show), then enable Pages in the repo settings. You'll get
a URL like `https://yourname.github.io/kanakku`.

### 4. Install on Android
1. Open the deployed URL in Chrome on each phone.
2. Log in once with your name + your own PIN.
3. Tap the Chrome menu (⋮) → **Add to Home screen** / **Install app**.
4. It now opens full-screen with its own icon, like a native app.

## Using it
- **Language** — after logging in, a small dropdown in the top-right corner
  switches the whole app between English and தமிழ் (Tamil) instantly. Your
  choice is remembered on that device. Names, categories, and CSV exports stay
  in whatever language you typed them in `firebase-config.js` — only the app's
  own labels/buttons/messages translate.
- **Add** tab — log an expense (date, category, amount, note). Once the amount
  goes above ₹500 (editable via `RECEIPT_REQUIRED_ABOVE` in
  `firebase-config.js`), a receipt upload field appears and becomes required —
  it accepts a photo (camera opens directly on phones) or a PDF. Photos are
  automatically resized and compressed in the browser before upload (down to
  roughly a few hundred KB), so uploads stay fast even on slow mobile data —
  you'll see a live upload percentage. PDFs are uploaded as-is; keep them
  under ~8MB.
- Entries with a receipt show a **📎 View receipt** link that opens the image/PDF.
- **Entries** tab — live list of everyone's entries, newest first; delete your own.
- **Reports** tab — pick Daily / Fortnightly / Monthly / Yearly and an anchor
  date; see the total plus breakdowns by category and by person; export the
  period as a CSV (opens fine in Excel).

## Notes
- Fortnightly reports split each month into 1st–15th and 16th–end.
- Categories are editable in `firebase-config.js` under `CATEGORIES`. Type
  them in Tamil, English, or both — they're user data, so the app doesn't
  translate them for you.
- Everything is timestamped by calendar date, not device time zone, so entries
  from different locations line up correctly.
- If you outgrow this PIN model (want to fully prevent PIN-sharing, add an
  admin-only deletion role, etc.), the next step is Firebase Authentication —
  happy to extend this when you're ready.

## Icon not showing up?
The app icon is heavily cached by both the browser and, once installed, by
Android itself — so an updated icon often needs a forced refresh to appear:
1. **Confirm the files are actually in your GitHub repo**: open the repo on
   github.com and check `icon-192.png` and `icon-512.png` are listed, with
   those *exact* filenames (GitHub is case-sensitive — `Icon-192.png` won't
   match).
2. **If already installed on a phone**: uninstall the app from the home
   screen (long-press → Uninstall), then in Chrome go to the site → menu (⋮)
   → **Site settings** → **Clear & reset**. Reopen the URL fresh and
   reinstall — the icon is fetched at install time.
3. **In a browser tab**: a hard refresh (Ctrl+Shift+R on Windows, or open the
   URL in an Incognito window) forces a fresh icon fetch instead of using a
   cached one.
4. If it still doesn't show, double check your custom icon files are actual
   square PNGs at 192×192 and 512×512 pixels — a mismatched size or a non-PNG
   file (e.g. renamed .jpg) will silently fail to load.
