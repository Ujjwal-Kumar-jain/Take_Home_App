import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const sampleUsers = [
  {
    name: 'Aarav Sharma',
    email: 'aarav.sharma@company.io',
    role: 'Admin',
    status: 'Active',
    department: 'Engineering',
    phone: '+91 98765 43210',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
  },
  {
    name: 'Priya Patel',
    email: 'priya.patel@company.io',
    role: 'Manager',
    status: 'Active',
    department: 'Product',
    phone: '+91 98123 45678',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // 5 days ago
  },
  {
    name: 'Rohan Mehta',
    email: 'rohan.mehta@company.io',
    role: 'Developer',
    status: 'Active',
    department: 'Engineering',
    phone: '+91 97234 56789',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
  },
  {
    name: 'Ananya Iyer',
    email: 'ananya.iyer@company.io',
    role: 'Designer',
    status: 'Active',
    department: 'Design',
    phone: '+91 96345 67890',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) // 1 day ago
  },
  {
    name: 'Vikram Singh',
    email: 'vikram.singh@company.io',
    role: 'Developer',
    status: 'Inactive',
    department: 'Engineering',
    phone: '+91 95456 78901',
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
  },
  {
    name: 'Neha Kapoor',
    email: 'neha.kapoor@company.io',
    role: 'Manager',
    status: 'Active',
    department: 'Operations',
    phone: '+91 94567 89012',
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
  },
  {
    name: 'Kabir Verma',
    email: 'kabir.verma@company.io',
    role: 'Developer',
    status: 'Pending',
    department: 'Engineering',
    phone: '+91 93678 90123',
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
  },
  {
    name: 'Sneha Reddy',
    email: 'sneha.reddy@company.io',
    role: 'Designer',
    status: 'Active',
    department: 'Design',
    phone: '+91 92789 01234',
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000)
  },
  {
    name: 'Aditya Nair',
    email: 'aditya.nair@company.io',
    role: 'Developer',
    status: 'Active',
    department: 'Data & Analytics',
    phone: '+91 91890 12345',
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
  },
  {
    name: 'Tanvi Joshi',
    email: 'tanvi.joshi@company.io',
    role: 'Admin',
    status: 'Active',
    department: 'Security',
    phone: '+91 90901 23456',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  }
];

const seedDatabase = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('Error: MONGODB_URI is not set in server/.env');
    process.exit(1);
  }

  try {
    console.log('[Seed] Connecting to MongoDB...');
    await mongoose.connect(uri);
    console.log('[Seed] Connected successfully.');

    console.log('[Seed] Clearing existing user records...');
    await User.deleteMany({});

    console.log(`[Seed] Inserting ${sampleUsers.length} sample users...`);
    const createdUsers = await User.insertMany(sampleUsers);

    console.log(`[Seed] Successfully inserted ${createdUsers.length} users.`);
    console.log('[Seed] Sample user preview:');
    createdUsers.slice(0, 3).forEach((u) => {
      console.log(`  - ${u.name} (${u.role} | ${u.email} | ${u.status})`);
    });

    await mongoose.connection.close();
    console.log('[Seed] Database connection closed. Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('[Seed Error] Failed to seed database:', error);
    process.exit(1);
  }
};

seedDatabase();
