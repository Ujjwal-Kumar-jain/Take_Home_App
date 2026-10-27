import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputPath = path.resolve(__dirname, '../../../Video_Presentation_Guide.pdf');

const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 40, bottom: 40, left: 45, right: 45 }
});

const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

// Colors
const primaryColor = '#1e3a8a';
const accentColor = '#2563eb';
const textColor = '#1e293b';
const mutedColor = '#64748b';

// Header
doc.fontSize(20).font('Helvetica-Bold').fillColor(primaryColor).text('Video Presentation Guide & 5-Minute Script');
doc.fontSize(10).font('Helvetica').fillColor(mutedColor).text('Take-Home Assignment: User Management Dashboard with Custom Theming Engine');
doc.moveDown(0.5);
doc.strokeColor(accentColor).lineWidth(2).moveTo(45, doc.y).lineTo(550, doc.y).stroke();
doc.moveDown(1);

// PART 1
doc.fontSize(14).font('Helvetica-Bold').fillColor(primaryColor).text('PART 1: Video Kaise Banayein (Setup & Tools)');
doc.moveDown(0.5);

doc.fontSize(11).font('Helvetica-Bold').fillColor(textColor).text('1. Best Tool: Loom (Recommended & Free)');
doc.fontSize(9.5).font('Helvetica').fillColor(textColor).text(
  '• Visit www.loom.com and use the free recorder (Screen + Camera bubble).\n' +
  '• Loom automatically generates a shareable web link when you stop recording.\n' +
  '• You can paste this link directly into the assignment submission form!\n' +
  '• Alternative: Use Windows Screen Recorder (Win + Alt + R) or Clipchamp and upload to Google Drive.'
);
doc.moveDown(0.5);

doc.fontSize(11).font('Helvetica-Bold').fillColor(textColor).text('2. Screen Setup Before Starting');
doc.fontSize(9.5).font('Helvetica').fillColor(textColor).text(
  '• Tab 1: Running frontend at http://localhost:5173\n' +
  '• Tab 2: VS Code open showing server/ and client/ folder structure\n' +
  '• Target duration: 5 to 6 minutes. Reviewers look for calm, clear architectural understanding.'
);
doc.moveDown(1);

// PART 2
doc.fontSize(14).font('Helvetica-Bold').fillColor(primaryColor).text('PART 2: 5-Minute Word-by-Word Speaking Script');
doc.moveDown(0.5);

// Minute 1
doc.fontSize(10).font('Helvetica-Bold').fillColor(accentColor).text('[0:00 - 0:45] INTRODUCTION & SCOPE (Screen: Browser Dashboard)');
doc.fontSize(9.5).font('Helvetica-Oblique').fillColor(textColor).text(
  '"Hi everyone! My name is Ujjwal, and this is my walkthrough for the Full Stack Developer Intern Take-Home assignment: a User Management Dashboard with a zero-dependency Custom Theming Engine.\n\n' +
  'When scoping this project for the 24-hour timeline, I focused on two core priorities: first, implementing a complete and reliable MERN CRUD workflow persisted end-to-end in MongoDB Atlas; and second, the main differentiator of this assignment: building a completely self-contained theming engine using native CSS variables and the browser FontFace API without using any third-party UI libraries.\n\n' +
  'I used modern JavaScript with Vite and React to eliminate compilation overhead and focus maximum effort on UI responsiveness, edge cases, and accessible contrast math."'
);
doc.moveDown(0.3);
doc.fontSize(8.5).font('Helvetica').fillColor(mutedColor).text(
  'Hindi Meaning: Apna intro dein, batayein ki 24h me solid MERN CRUD aur zero-dependency theming engine par focus kiya.'
);
doc.moveDown(0.8);

// Minute 2
doc.fontSize(10).font('Helvetica-Bold').fillColor(accentColor).text('[0:45 - 1:30] ARCHITECTURE WALKTHROUGH (Screen: VS Code folders)');
doc.fontSize(9.5).font('Helvetica-Oblique').fillColor(textColor).text(
  '"Let me quickly walk you through the architecture in the code:\n\n' +
  'On the backend, we follow a clean Express MVC structure. The User.js model defines our Mongoose schema with email uniqueness and enum fields. userController.js handles our CRUD operations and a dedicated stats aggregation endpoint. validate.js catches invalid inputs before database calls, and errorHandler.js converts Mongoose errors into structured JSON responses.\n\n' +
  'On the frontend, React is cleanly componentized: all API calls live inside a dedicated api.js service consumed via a custom useUsers hook, and all theming state is orchestrated inside ThemeContext.jsx."'
);
doc.moveDown(0.3);
doc.fontSize(8.5).font('Helvetica').fillColor(mutedColor).text(
  'Hindi Meaning: VS Code me server MVC (models, controllers, routes, validation) aur frontend API service + context structure dikhayein.'
);

doc.addPage();

// Minute 3
doc.fontSize(10).font('Helvetica-Bold').fillColor(accentColor).text('[1:30 - 2:45] LIVE CRUD WORKFLOW DEMO (Screen: http://localhost:5173)');
doc.fontSize(9.5).font('Helvetica-Oblique').fillColor(textColor).text(
  '"Now let\'s demonstrate the application in the browser.\n\n' +
  'Here on the Dashboard, we have real-time metrics fetched from MongoDB: Total Users, Active accounts, Inactive accounts, New registrations this week, and role distribution bars.\n\n' +
  'Let\'s navigate to the User Directory to test our complete CRUD cycle:\n' +
  '1. Create: I\'ll click \'Add New User\'. If I submit empty or invalid fields, client validation catches it immediately. Let\'s create \'Aryan Gupta\' with role Developer and department Engineering. As soon as I submit, the user appears in our table, and the Dashboard total count updates live.\n' +
  '2. Read: Clicking the eye icon opens our read-only profile modal with full details.\n' +
  '3. Update: Let\'s edit Aryan\'s department to \'Product Architecture\'. The change is saved directly to MongoDB Atlas.\n' +
  '4. Delete: Clicking delete opens our custom Confirmation Modal. Upon confirming, the user is permanently removed from MongoDB, a success toast notifies us, and our stats decrement live."'
);
doc.moveDown(0.3);
doc.fontSize(8.5).font('Helvetica').fillColor(mutedColor).text(
  'Hindi Meaning: Browser me Dashboard stats, Create User (with validation), View details, Edit department, aur Delete confirmation modal live run karein.'
);
doc.moveDown(0.8);

// Minute 4
doc.fontSize(10).font('Helvetica-Bold').fillColor(accentColor).text('[2:45 - 4:00] CUSTOM THEMING ENGINE DEEP-DIVE (Screen: Theme Studio Drawer)');
doc.fontSize(9.5).font('Helvetica-Oblique').fillColor(textColor).text(
  '"Now for the primary differentiator of this assignment: our Custom Theming Engine.\n\n' +
  'This engine is built completely from scratch using native CSS custom properties on the root element composed with React Context:\n' +
  '1. Design Presets: We have 4 coordinated presets — Oceanic Blue, Neon Violet, Darcula Slate, and Emerald Forest. Notice how clicking a preset instantly transitions all surface cards, tables, text colors, and shadows across both pages without any lag.\n' +
  '2. Custom Button Color: Regardless of which preset is active, the user can pick any custom accent color. Notice our WCAG contrast calculation: if I pick a bright neon yellow or green, the button text automatically flips to dark slate. If I choose crimson or dark blue, it flips to white for optimal legibility.\n' +
  '3. Custom Font Upload: Using the browser\'s native FontFace API, users can upload a TTF, OTF, or WOFF font. The file is converted to Base64, registered dynamically with document.fonts.add(), and assigned to --font-family.\n' +
  '4. Persistence: Now let\'s refresh the page. Both the preset, custom button color, and uploaded font persist in localStorage and rehydrate immediately without any flash of unstyled content!"'
);
doc.moveDown(0.3);
doc.fontSize(8.5).font('Helvetica').fillColor(mutedColor).text(
  'Hindi Meaning: Theme studio drawer kholkar 4 presets, custom button color (text contrast), font upload, aur reload persistence demonstrate karein.'
);
doc.moveDown(0.8);

// Minute 5
doc.fontSize(10).font('Helvetica-Bold').fillColor(accentColor).text('[4:00 - 5:00] BACKEND HIGHLIGHT & WRAP-UP');
doc.fontSize(9.5).font('Helvetica-Oblique').fillColor(textColor).text(
  '"One piece of the backend I\'m particularly proud of is the aggregation endpoint /api/users/stats. Rather than making multiple database queries, it uses MongoDB aggregation to compute total counts, active ratios, and role breakdowns in a single query.\n\n' +
  'A technical challenge I overcame was font persistence. Because binary fonts cannot be saved as plain strings in localStorage, I built a Base64 encoding pipeline with file size limits, and rehydrated it synchronously on mount to eliminate layout shifting.\n\n' +
  'Given more time in a production environment, I would add server-side pagination with query limits for 100,000+ records, CSV export for user reports, and JWT authentication with role-based permissions.\n\n' +
  'Thank you so much for your time and for reviewing my project!"'
);
doc.moveDown(0.3);
doc.fontSize(8.5).font('Helvetica').fillColor(mutedColor).text(
  'Hindi Meaning: Backend aggregation & font persistence challenge explain karein, future roadmap batayein, aur thank you bolkar wrap up karein.'
);

doc.end();

writeStream.on('finish', () => {
  console.log(`[Success] PDF generated successfully at: ${outputPath}`);
});
