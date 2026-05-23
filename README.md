# DormLink 🏠
**Smart Dormitory Management System** — Built for Filipino students, caretakers, dorm owners, and university admins.

---

## 📁 Project Structure

```
dormlink/
├── dormlink.html        ← Main app (entire frontend — open this to run)
├── assets/
│   └── (place any images/icons here if needed later)
├── package.json         ← Optional: for local dev server
├── .gitignore
└── README.md
```

> The entire application lives in **`dormlink.html`** — it's a self-contained single-page React app. No build step, no compilation required.

---

## 🚀 How to Run

### Option 1 — Simplest (No install needed)
Just double-click `dormlink.html` — it opens directly in your browser. Done.

> ⚠️ Some browsers block local file access for certain features (like file uploads). Use Option 2 if you encounter issues.

---

### Option 2 — Local Dev Server (Recommended)

**Requires:** [Node.js](https://nodejs.org) (v16 or higher)

```bash
# 1. Clone or download the project
git clone https://github.com/YOUR_USERNAME/dormlink.git
cd dormlink

# 2. Install dev server (one-time)
npm install

# 3. Start the server
npm start
```

Then open your browser and go to: **http://localhost:3000/dormlink.html**

---

### Option 3 — Python (No Node.js needed)

```bash
# Python 3
cd dormlink
python -m http.server 3000
```

Then go to: **http://localhost:3000/dormlink.html**

---

### Option 4 — VS Code Live Server Extension

1. Install the **Live Server** extension in VS Code
2. Right-click `dormlink.html` → **"Open with Live Server"**
3. Browser opens automatically at `localhost:5500`

---

## 👤 Roles & Demo Credentials

| Role | Demo Name | Log In With |
|------|-----------|-------------|
| **Student** | Maria Santos | Any email + any password (6+ chars) |
| **Caretaker** | Jose Bautista | Any email + any password (6+ chars) |
| **Dorm Owner** | Ricardo Lim | Any email + any password (6+ chars) |
| **University Admin** | Dr. Ana Cruz | Any email + any password (6+ chars) |

> Authentication is **mock/demo only** — no real backend. Select your role from the dropdown on the Sign In page.

---

## 📄 Pages & Views

### Public / Auth
| Page | Description |
|------|-------------|
| Landing | Role selection cards, hero section |
| Sign In | Email + password + role selector, Google/Facebook stubs |
| Register | Full name, email, password, confirm, role |

### Student
| Page | Description |
|------|-------------|
| Dashboard | Payment status, quick actions, notification feed |
| Dorm Search | Search bar, price/amenity filters, result cards |
| Dorm Detail | Amenities, availability, Apply button |
| Payments | GCash submission form, payment history table |
| Maintenance | Request form, past requests with status badges |
| Notifications | Unread count, full notification list |

### Caretaker
| Page | Description |
|------|-------------|
| Dashboard | Dormers count, unpaid rent, pending apps, activity feed |
| Dormer Management | Residents list with payment status |
| Application Review | Approve / Reject pending applications |
| Record Payment | Select dormer, log payment |
| Maintenance | All requests, update status dropdown |
| Parcel Log | Log deliveries, mark claimed |

### Dorm Owner
| Page | Description |
|------|-------------|
| Dashboard | Revenue chart, occupancy stats |
| Dorm Listings | Edit / Delete owned dorms |
| Add / Edit Dorm | Full dorm form with amenities |
| Payment Records | Filter by dorm, full history |
| Activity Log | Read-only caretaker action log |

### University Admin
| Page | Description |
|------|-------------|
| Dashboard | Alerts panel, student count, high-risk areas |
| Student Registry | Searchable table of all off-campus students |
| Emergency Detail | Emergency contacts, dorm info per student |
| Alerts | Post and manage emergency alerts |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 (CDN) | UI framework (no build step) |
| Tailwind CSS (CDN) | Utility-first styling |
| Babel Standalone | JSX transpilation in-browser |
| Outfit + DM Sans | Typography (Google Fonts) |

---

## 🔄 Future Improvements (Backend Integration)

When you're ready to connect a real backend:

1. **Replace mock data** — `DORMS`, `STUDENTS`, `MY_PAYMENTS`, etc. at the top of `dormlink.html` with API calls
2. **Auth** — Replace the mock `setTimeout` login with real JWT/session auth
3. **File uploads** — Wire the proof-of-payment and photo upload inputs to a storage service (e.g. Supabase Storage, Cloudinary)
4. **GCash** — Integrate GCash API for payment verification
5. **Real-time notifications** — Add WebSockets or polling for live updates

---

## 📦 Deploying (Static Hosting)

Since this is a static HTML file, you can host it for free on:

- **GitHub Pages** — Push to repo → Settings → Pages → Deploy from branch
- **Netlify** — Drag & drop the `dormlink/` folder at [netlify.com/drop](https://netlify.com/drop)
- **Vercel** — `npx vercel` in the project folder

---

## 📝 Notes

- All data is **in-memory mock data** — refreshing the page resets everything
- File uploads are UI-only (no actual file storage)
- Google/Facebook OAuth buttons are **stubs** — they show the button but don't connect to real OAuth
- The app is **mobile-responsive** via Tailwind's responsive utilities

---

*Built for IPT Project — DormLink © 2025*
