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
       match /categories/{doc} {
         allow read, write: if true;
       }
     }
   }
   ```
   Click **Publish**.
   (The `categories` collection is what lets anyone add a new expense category
   from inside the app and have it instantly show up for everyone else.)

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
- **Add** tab — log an expense (date, category, amount, note).
- **Receipt uploads are currently switched off** (`RECEIPT_UPLOAD_ENABLED =
  false` in `firebase-config.js`) because they need Firebase Storage, which
  requires upgrading to the paid "Blaze" plan (still free at this usage level,
  but needs a card on file — see "Enabling receipt uploads" below). Once
  amounts go above ₹500 (`RECEIPT_REQUIRED_ABOVE`), the app currently just
  saves the entry without asking for a receipt.
- Entries with a receipt (once enabled) show a **📎 View receipt** link that
  opens the image/PDF.
- **Entries** tab — live list of everyone's entries, newest first. Regular
  users can edit or delete only entries they personally logged. Anyone listed
  in `ADMIN_USERS` (in `firebase-config.js`) sees **Edit** and **Delete** on
  *every* entry, and gets an **Admin** badge next to their name in the header.
  Editing reuses the Add screen — pick Edit, the form fills in with that
  entry's details, change what's needed, and save (or hit Cancel in the
  banner that appears to back out without changing anything). Editing never
  changes who the entry is attributed to or when it was originally created.
- **Logout** (top-right, once logged in) — asks for confirmation, then
  fully logs out: clears the cached app data and reloads the page, so the
  next person always lands on a clean login screen and the Add tab — never
  stuck on whatever screen the previous person left open.
- **Auto-logout after 5 minutes idle** — if the app is left open with no
  taps, scrolls, or typing for 5 minutes, it automatically logs out (same
  full cleanup as manual logout) and shows a short message. Protects against
  someone walking away from an unlocked phone while still logged in. The
  5-minute window is set by `INACTIVITY_LIMIT_MS` near the top of the script
  in `index.html` if you ever want it longer or shorter.
- **Reports** tab — set an anchor date, and all four totals (Daily,
  Fortnightly, Monthly, Yearly) show at once in a grid, each relative to that
  date. A **Person** filter above the grid narrows every total, breakdown, and
  CSV export to just one person's expenses — set it back to "All people" to
  see everyone combined again. Tap any of the four totals to see its category
  and person breakdown below, and export that period as a CSV (opens fine in
  Excel) — the exported file ends with a **TOTAL** row summing the Amount
  column. **"+ Custom date range"** below the grid lets you pick any From/To
  dates instead of a fixed period — tap **Show total** and the breakdown and
  CSV switch to that exact range.

## Enabling receipt uploads later
1. In Firebase Console → Storage, click **Upgrade project** and link a
   billing account (Blaze plan). Storage has its own free tier — 5GB stored,
   1GB downloaded/day — so a small team logging receipts stays at ₹0 in
   practice; the card is just how Google verifies the account.
2. Go to **Storage → Rules** and publish:
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
3. In `firebase-config.js`, change `RECEIPT_UPLOAD_ENABLED` to `true`.
4. Update the file in your GitHub repo and commit — the receipt field will
   reappear automatically, no other changes needed. Photos are resized and
   compressed in the browser before upload (down to roughly a few hundred KB)
   so uploads stay fast on slow mobile data, with a live upload percentage.
   PDFs upload as-is; keep them under ~8MB.

## Notes
- **Fixed: Daily report showing ₹0.** A date-handling bug was converting
  report date ranges through UTC time, which silently shifted them back a day
  for India's timezone (UTC+5:30) — so "today" in the report didn't match
  today's entries. This is now fixed; all reports use local dates throughout.
- **Visual polish pass** — cards now have soft layered shadows instead of flat
  borders, buttons and inputs have proper hover/press feedback and focus
  rings, tab bar icons are clean line-icons instead of plain text characters,
  and corners are more rounded throughout for a softer, more modern feel.
  Purely cosmetic — no functional changes.
- **"Warm ledger" color theme** — deep oxblood/maroon header and buttons,
  warm gold accent line, warm parchment background, replacing the earlier
  teal theme. Colors are set once, near the top of `index.html`, under
  `:root{ ... }` — change the hex values there if you ever want to adjust it
  further.
- **Your logo now appears in the app itself** — on the login screen and in
  the header next to "Kanakku" — not just as the install/home-screen icon.
  It's pulled from `icon-192.png`, so if you ever update your logo, replacing
  that one file updates it everywhere at once.
- **App colors now match your SSP Infra Groups logo** — the deep blue from
  the logo replaces the old navy header/accent color, and the gold ring and
  green from the logo replace the previous brass/green accents throughout
  (buttons, header, totals banner, "View receipt" links). The colors are set
  once, near the top of `index.html`, under `:root{ ... }` — change the hex
  values there if you ever want to adjust the palette.
- Fortnightly reports split each month into 1st–15th and 16th–end.
- **Categories are bilingual and shared live.** `firebase-config.js` seeds a
  starting list of ~26 common categories in English + Tamil. From inside the
  app, the category dropdown always ends with **"+ Add new category"** — pick
  it, type an English name (and optionally a Tamil one), tap **Add category**,
  and it's saved to the shared database instantly, appearing in everyone
  else's dropdown too — no file editing or redeploying needed. The category
  shown in each entry, and in report breakdowns, automatically follows
  whichever language is currently selected. CSV exports always use the
  English name, for consistency when opening in Excel.
- Everything is timestamped by calendar date, not device time zone, so entries
  from different locations line up correctly.
- **Admin delete rights are set in `ADMIN_USERS`** in `firebase-config.js` —
  currently `["Swami"]`. Add more names to give others the same rights, or
  remove the name to leave nobody with admin delete access (everyone would
  then only delete their own entries). **Important:** this is an in-app
  restriction, not a database-level one — the app has no real login system
  behind the PINs, so Firestore itself can't verify who's asking. It's a
  sensible setup for a small trusted team, but someone with enough technical
  know-how (browser dev tools) could bypass it. A hard, unbypassable version
  needs real Firebase Authentication — ask if you'd like that upgrade.
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
