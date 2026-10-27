# User Management Dashboard with Custom Theming Engine

A full-stack MERN application for managing user accounts with a custom, zero-dependency theming engine. Built as a take-home assignment.

---

## What was built

- **Full-stack CRUD**: Add, view, edit, and delete users with all data saved directly to MongoDB.
- **Live Dashboard**: Shows total registered users, active vs inactive count, users added this week, and role distribution. Updates immediately when users are added or removed.
- **Client & Server Validation**: Form validation on the client with regex email checks, plus backend schema validation with proper error messages and HTTP status codes.
- **Delete Confirmation**: Custom modal to confirm before deleting any user record to prevent accidental deletes.
- **Search & Filters**: Filter users by role and status, or search by name, email, or department.
- **Custom Theming Engine (Zero external libraries)**:
  - 4 preset color themes (Oceanic Blue, Neon Violet, Darcula Slate, Emerald Forest).
  - Custom button color picker that overrides the preset's accent color independently, with automatic contrast text calculation (WCAG compliant black/white text).
  - Custom font upload (.ttf, .otf, .woff) applied app-wide using the browser FontFace API.
  - Live preview across all pages without refresh.
  - Theme preferences persist in localStorage and reload without any flicker.

---

## How the Theming Engine is Architected

The theming engine is built entirely with native CSS custom properties (variables) and React Context, without using any UI kits or styling libraries like Tailwind, Bootstrap, or MUI.

The active theme is composed of three parts:
1. **Preset Tokens**: When a preset is selected, its coordinated CSS variables (--bg-primary, --bg-surface, --text-primary, --border-color, etc.) are injected directly into the document root (:root).
2. **Button Color Override**: If the user picks a custom button color, it overrides --btn-primary-bg. An internal luminance calculation checks the background brightness and automatically sets --btn-primary-text to either white or dark slate so the button text remains readable.
3. **Custom FontFace**: When a user uploads a font file, it gets converted to a base64 string and loaded dynamically into the browser using `new FontFace()`. It is then added to `document.fonts` and assigned to `--font-family`. The base64 data is stored in localStorage so it rehydrates immediately on reload.

---

## Tech Stack & Note on JavaScript

- **Frontend**: React 19, Vite, Plain CSS Variables
- **Backend**: Node.js, Express (ES Modules)
- **Database**: MongoDB Atlas via Mongoose
- **Icons**: Lucide React

**Note on TypeScript**: As allowed by the assignment prompt (Section 4), modern JavaScript (ES6+ with React JSX) was chosen on the frontend to prioritize fast feature delivery, clean component structure, and rapid iteration of the zero-dependency theming engine within the 24-hour timeframe.

---

## Use of AI Assistance (Claude & Antigravity)

In accordance with modern engineering practices, AI pair-programming tools (**Claude** and **Google Antigravity**) were utilized during this project:

- **Architecture & Scoping**: Brainstormed the composition model for the zero-dependency theming engine (how presets, button accent overrides, and FontFace dynamically compose into :root CSS variables) to ensure compliance with the 24-hour evaluation timeline.
- **Contrast Algorithm**: Assisted in implementing the WCAG 2.1 relative luminance math to dynamically calculate whether dark or white text provides optimal legibility against custom button colors.
- **Seed Data Generation**: Generated diverse, realistic mock users (departments, roles, and timestamps) for `seed.js`.
- **Responsive Layout & Code Review**: Helped refine responsive breakpoints for edge-to-edge desktop layouts and verified structured error handling across Express routes.

---

## Setup and Running Locally

### 1. Prerequisites
- Node.js (v18 or newer)
- npm

### 2. Install Dependencies

Install packages in both server and client folders:

```bash
# Server
cd server
npm install

# Client
cd ../client
npm install
```

### 3. Database Setup (MongoDB)

The project is connected to MongoDB Atlas by default via `server/.env`. 

If you want to use your own MongoDB instance:
1. Open `server/.env` (or copy from `server/.env.example`).
2. Update the `MONGODB_URI` line:
   - For Local MongoDB: `MONGODB_URI=mongodb://127.0.0.1:27017/usermanagement`
   - For Atlas: `MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/usermanagement?retryWrites=true&w=majority`

### 4. Seed Sample Data (Optional)

To populate the database with 10 sample user records:

```bash
cd server
npm run seed
```

### 5. Start the Application

Open two terminals:

**Terminal 1 (Backend):**
```bash
cd server
npm run dev
```
Server runs on http://localhost:5000

**Terminal 2 (Frontend):**
```bash
cd client
npm run dev
```
Frontend runs on http://localhost:5173

Open http://localhost:5173 in your browser.

---

## API Endpoints

Base URL: http://localhost:5000/api/users (also available at /users)

- GET /api/users - Get all users (supports ?search=, ?role=, ?status=, ?sortBy=)
- GET /api/users/stats - Get dashboard statistics and metrics
- GET /api/users/:id - Get single user details by ID
- POST /api/users - Create new user (checks for duplicate email)
- PUT /api/users/:id - Update existing user
- DELETE /api/users/:id - Delete user by ID
- GET /api/health - API health check

---

## Known Issues and Trade-offs

- **Pagination**: For this assignment scope, client-side table filtering and sorting was used for speed. For large datasets (10,000+ users), server-side pagination with query limits would be added.
- **Font File Storage**: Font files are stored in localStorage as base64 strings with a 2.5MB size guard to prevent exceeding browser storage limits. For a production app, fonts would typically be uploaded to an S3 bucket or CDN.
