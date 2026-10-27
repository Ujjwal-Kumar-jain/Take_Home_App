# User Management Dashboard with Custom Theming Engine

A production-ready full-stack MERN application (MongoDB, Express.js, React, Node.js) featuring a complete User Management system with live analytics and a **100% self-contained, zero-dependency custom theming engine** with preset switching, independent button accent customization, and browser-native `FontFace` font uploading.

---

## 📑 Table of Contents
1. [Project Highlights](#project-highlights)
2. [Theming Engine Architecture (Core Differentiator)](#theming-engine-architecture-core-differentiator)
3. [Technology Stack & Rationale](#technology-stack--rationale)
4. [Quickstart & Setup Instructions](#quickstart--setup-instructions)
5. [Database Configuration (MongoDB Atlas & Local)](#database-configuration)
6. [API Endpoints Reference](#api-endpoints-reference)
7. [Design Decisions & Trade-offs](#design-decisions--trade-offs)
8. [5–8 Minute Video Walkthrough Script (Section 6)](#58-minute-video-walkthrough-script)

---

## 🌟 Project Highlights

- **Zero-Dependency Theming Engine**: Pure CSS custom properties (variables) driven by a dedicated `ThemeContext`. No external UI kits, no Tailwind, no styled-components theming bloat.
- **Dynamic Typeface Injection (`FontFace` API)**: Accepts `.ttf`, `.otf`, `.woff`, `.woff2` font files. Converts to base64, registers with the browser's `document.fonts`, applies instantly, and rehydrates from `localStorage` without Flash of Unstyled Text (FOUT).
- **Independent Button Accent & WCAG Contrast**: Custom button color picker that overrides the preset accent. Includes dynamic relative luminance calculation ($Y = 0.299R + 0.587G + 0.114B$) to ensure accessible button text contrast (`#ffffff` or `#0f172a`).
- **Full-Stack End-to-End CRUD**:
  - **Create**: Modal form with client-side regex validation and backend schema validation.
  - **Read**: Live table with search, role/status filters, and single-user detail inspection modal.
  - **Update**: Pre-populated modal editing with unique email protection.
  - **Delete**: Custom confirmation dialog preventing accidental deletions.
  - **Live Dashboard**: Real-time stats synced to MongoDB (Total users, Active/Inactive breakdown, Role distribution, Recent registrations).
- **Database Seeder**: Includes realistic sample users across multiple roles and departments (`npm run seed`).

---

## 🎨 Theming Engine Architecture (Core Differentiator)

The core requirement of this assignment is to compose design presets, an independent button color override, and user-uploaded custom fonts into a single unified theme without relying on third-party UI libraries.

### Theme Composition Formula
$$\text{Active Theme} = \text{Preset Design Tokens} \oplus \text{Button Accent Override} \oplus \text{FontFace Typeface}$$

```
                          ┌───────────────────────────┐
                          │  ThemeContext / useTheme  │
                          └─────────────┬─────────────┘
                                        │
           ┌────────────────────────────┼────────────────────────────┐
           ▼                            ▼                            ▼
┌──────────────────────┐   ┌─────────────────────────┐   ┌──────────────────────┐
│  Selected Preset     │   │  Button Color Override  │   │  Custom Font Upload  │
│  (e.g., Neon Violet) │   │  (e.g., #e11d48)        │   │  (.ttf / .otf / etc) │
└──────────┬───────────┘   └────────────┬────────────┘   └──────────┬───────────┘
           │                            │                           │
           ▼                            ▼                           ▼
:root Design Tokens        --btn-primary-bg: #e11d48;    window.FontFace API
--bg-primary: #0e0c15;     --btn-primary-text: #fff;     document.fonts.add()
--bg-surface: #181524;     (WCAG luminance calculated)   --font-family: 'Font'
--text-primary: #f5f3ff;
```

### 1. Coordinated Design Presets
Four presets are defined in `client/src/styles/presets.js`:
- **Oceanic Blue** (Default): Clean, light corporate mode with slate borders and sapphire blue accents.
- **Neon Violet**: Modern dark theme with deep graphite surfaces (`#0e0c15`), rich elevation shadows, and electric violet accents.
- **Darcula Slate**: Pro developer dark theme with charcoal surfaces (`#1e1f22`), warm amber accents, and IntelliJ/VS Code readability.
- **Emerald Forest**: Fresh light mode with soft mint backgrounds (`#f0fdf4`), sage cards, and pine green accents.

### 2. Button Accent Override
- An independent `<input type="color">` and curated quick-swatch palette allow the user to override button colors without altering the active preset's surface and typography palette.
- Dynamic contrast detection in `client/src/utils/contrast.js` evaluates whether `#ffffff` or dark `#0f172a` text offers optimal legibility against the picked background color.
- A "Reset to Preset Default" button restores the preset's native accent color.

### 3. Font Loading API & Persistence
- User uploads a font file (`.ttf`, `.otf`, `.woff`, `.woff2`).
- The file is validated (size limit < 2.5 MB to respect browser storage safety) and read as a Base64 Data URL via `FileReader`.
- A new instance of `window.FontFace('UserUploadedFont', url)` is constructed, loaded asynchronously, and registered into `document.fonts.add()`.
- The `--font-family` CSS custom property on `:root` is updated to `'UserUploadedFont', system-ui, sans-serif`.
- The Base64 string and metadata are stored in `localStorage`.
- On application boot, `ThemeContext` rehydrates the font during the `useLayoutEffect` / initial mount lifecycle, eliminating FOUT (Flash of Unstyled Text).

---

## 🛠 Technology Stack & Rationale

| Layer | Technology | Decision & Justification |
| :--- | :--- | :--- |
| **Frontend** | React 19 (JavaScript JSX) + Vite | Fast HMR, lightweight bundle. Standard modern JavaScript (ES6+) was chosen on the frontend to prioritize fast feature delivery, clean component architecture, and rapid theming iteration within the 24-hour evaluation timeframe (as permitted by Section 4). |
| **Styling** | Native CSS Custom Properties | 100% compliant with the constraint of building a self-contained theming engine without third-party styling frameworks. |
| **Backend** | Node.js + Express (ES Modules) | Clean MVC architecture with `import/export`, clear route/controller/model separation. |
| **Database** | MongoDB Atlas via Mongoose | Cloud-hosted document store providing schema validation, indexed search, and durable persistence. |
| **Icons** | Lucide React | Lightweight SVG icons for intuitive, polished dashboard UX. |

---

## 🚀 Quickstart & Setup Instructions

### Prerequisites
- Node.js (v18+ recommended, tested on v24.6.0)
- npm (v9+)
- Internet access for MongoDB Atlas connection

### 1. Installation
Clone the repository and install dependencies for both `server` and `client`:

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

### 2. Environment Configuration
The backend comes pre-configured with a working `.env`. If you want to use your own database, update `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/usermanagement?retryWrites=true&w=majority
NODE_ENV=development
```

*(A template is also provided at `server/.env.example`).*

### 3. Seed Sample Data (Optional but Recommended)
Populate the database with 10 realistic initial user records:
```bash
# From project root
npm run seed

# Or from server directory
cd server
npm run seed
```

### 4. Run the Application
Open two terminal windows:

**Terminal 1 (Backend API):**
```bash
cd server
npm run dev
# Server boots on http://localhost:5000
```

**Terminal 2 (Frontend Client):**
```bash
cd client
npm run dev
# Frontend boots on http://localhost:5173
```

Visit **`http://localhost:5173`** in your browser.

---

## 🗄 Database Configuration

### Using MongoDB Atlas (Current Setup)
The project is connected to a MongoDB Atlas cluster. The connection string includes user credentials and automatically connects to the `usermanagement` database collection.

### Using Local MongoDB
If you prefer running a local MongoDB instance:
1. Ensure your local MongoDB service is running (`mongod`).
2. Update `server/.env`:
   ```env
   MONGODB_URI=mongodb://127.0.0.1:27017/usermanagement
   ```
3. Restart the backend server.

---

## 📡 API Endpoints Reference

Base URL: `http://localhost:5000/api/users`

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Health check probe |
| `GET` | `/api/users/stats` | Aggregated metrics for dashboard (totals, active count, role breakdown, new this week) |
| `GET` | `/api/users` | List all users (query params: `?search=`, `?role=`, `?status=`, `?sortBy=`, `?order=`) |
| `GET` | `/api/users/:id` | Retrieve single user record by MongoDB `_id` |
| `POST` | `/api/users` | Create new user (validates email uniqueness, required fields) |
| `PUT` | `/api/users/:id` | Update existing user by `_id` |
| `DELETE`| `/api/users/:id` | Permanently delete user by `_id` |

### Sample Validation Error Response (`400 Bad Request`):
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "name": "Name must be at least 2 characters",
    "email": "Please provide a valid email address"
  }
}
```

---

## ⚖️ Design Decisions & Trade-offs

1. **Native CSS Variables over CSS-in-JS**:
   - *Decision*: We manipulated `:root` CSS variables rather than using Emotion or styled-components.
   - *Why*: Direct CSS variable mutations have zero runtime parsing cost, cause zero layout re-renders, and allow external components to respond instantly to theme changes without context-nesting issues.
2. **Font Storage in `localStorage` as Base64**:
   - *Decision*: We convert the user's uploaded font to a Base64 data URI and store it in `localStorage` under `um_theme_font` with a 2.5MB safety guard.
   - *Why*: The assignment specifies that UI preferences belong on the client. Storing the raw Base64 string enables synchronous rehydration on reload via `FontFace` without needing server-side asset uploading endpoints.
3. **Delete Confirmation Dialog**:
   - *Decision*: Built a custom, themed `ConfirmModal` component rather than relying on browser `window.confirm()`.
   - *Why*: Matches the active theme aesthetic, presents clear contextual info (target user's name), and prevents accidental keystroke dismissals.
4. **Known Minor Shortcuts**:
   - For an application with over 100,000 records, server-side pagination (`?page=1&limit=25`) would be introduced. For this take-home scope (< 500 team members), in-memory query filtering and sorting was selected for instant UI responsiveness.

---

## 🎥 5–8 Minute Video Walkthrough Script (Section 6)

Use this outline during your screen recording to ensure you hit all evaluation criteria:

### 1. Introduction & 24-Hour Scope (0:00 - 1:00)
> *"Hello! In this video, I'll walk you through my submission for the Full Stack Developer Intern Take-Home assignment: a User Management Dashboard with a zero-dependency Custom Theming Engine.*
>
> *When approaching the 24-hour scope, I prioritized two core areas: first, rock-solid end-to-end CRUD persistence using Express and MongoDB Atlas; and second, the core differentiator — designing a clean, composable theming engine without relying on any external UI library.*
>
> *I chose modern JavaScript (ES6+ with React JSX and Vite) to eliminate compilation friction and focus maximum effort on UI polish, edge cases, and font rehydration."*

### 2. Architecture Overview (1:00 - 2:00)
> *"Looking at the project structure, we have a clean separation of concerns:*
> - *On the **backend (`server/`)**, we have an Express REST API following MVC: `User.js` model with Mongoose validation, `userController.js` handling business logic and aggregation stats, `validate.js` middleware catching errors before database queries, and a custom `errorHandler.js` returning structured JSON error responses.*
> - *On the **frontend (`client/`)**, we have React 19 powered by Vite. API calls are cleanly encapsulated inside `services/api.js` and consumed through a custom `useUsers` hook. All theme state is orchestrated inside `context/ThemeContext.jsx`."*

### 3. Core CRUD Workflow Walkthrough (2:00 - 3:30)
> *(Demonstrate live in browser)*
> 1. **Dashboard Overview**: *"Here on the Dashboard, we see live metric cards showing total users, active accounts, inactive accounts, and users joined this week, along with role breakdown bars."*
> 2. **Create User**: *"Let's click 'Add New User'. If I try to submit empty or invalid fields, our client-side validation catches it. If I enter a duplicate email, our backend returns a 409 conflict and displays the error under the field. Let's create 'Dev Candidate' with an Active Developer role."*
> 3. **Verify Live Sync**: *"Notice that as soon as the user is created, our user table updates, and switching to the Dashboard shows our Total Users count incremented immediately without a page refresh."*
> 4. **Read & Edit**: *"Clicking the eye icon opens the Read modal with all details. Clicking edit lets us change their department to 'Architecture'. The update persists directly to MongoDB."*
> 5. **Delete Confirmation**: *"Clicking delete triggers our custom Confirmation Modal. Upon confirming, the user is removed from MongoDB, the toast notifies us, and dashboard counts update live."*

### 4. Custom Theming Engine Deep-Dive (3:30 - 5:30)
> *(Click 'Theme Studio' in the Navbar)*
> 1. **Design Presets**: *"Now for the core twist of this assignment: the theming engine. We built this from scratch using native CSS custom properties. Let's switch between our 4 coordinated presets: Oceanic Blue, Neon Violet, Darcula Slate, and Emerald Forest. Notice how every surface, text color, table border, and card shadow shifts instantly with zero lag."*
> 2. **Button Color Override**: *"Next, the button color override. Regardless of which preset is active, the user can pick any custom accent color. Watch the primary buttons change immediately. Notice our contrast calculation: if I choose a bright yellow or neon green, the button text automatically flips to dark slate to satisfy WCAG contrast compliance. If I choose a dark crimson, it flips to white."*
> 3. **Font Upload & FontFace API**: *"Now, custom font uploading. Let's drag in or select a font file (e.g. .ttf or .woff). The file is read as Base64, registered dynamically with the browser via `document.fonts.add(new FontFace(...))`, and assigned to `--font-family`. The entire UI instantly adopts the new typeface."*
> 4. **Reload Persistence**: *"Now let's refresh the browser. Both the selected preset, the custom button color, and the uploaded font rehydrate seamlessly from `localStorage` without any flash of unstyled content."*

### 5. Backend Highlights & Technical Challenge Solved (5:30 - 6:45)
> *"One piece of the backend I'm particularly proud of is the aggregation endpoint `/api/users/stats` which computes counts, active ratios, and role breakdowns in a single optimized database call, rather than making multiple frontend queries.*
>
> *A technical challenge I overcame was handling font persistence. Since binary font files cannot be stored directly as strings, I implemented a Base64 encoding pipeline with file size validation, paired with `useLayoutEffect` rehydration on the client to ensure the font is registered before the DOM paints, preventing layout shifting."*

### 6. Summary & Future Roadmap (6:45 - 7:30)
> *"With more time, I would love to add:
> 1. Server-side pagination with infinite scroll for datasets exceeding 100,000 records.
> 2. CSV / Excel export of directory listings.
> 3. Role-based access control (RBAC) with JWT authentication.
>
> Thank you for reviewing my project!"*
