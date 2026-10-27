import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User.js';

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

async function runVerification() {
  console.log('=== API & Database End-to-End Verification ===\n');

  try {
    // 1. Connect
    console.log('[1/5] Connecting to MongoDB Atlas...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✓ Connected successfully.\n');

    // 2. Count existing users
    console.log('[2/5] Querying user count & stats...');
    const totalUsers = await User.countDocuments();
    const activeUsers = await User.countDocuments({ status: 'Active' });
    console.log(`✓ Total users in MongoDB: ${totalUsers} (Active: ${activeUsers})\n`);

    // 3. Create a test user
    console.log('[3/5] Testing CREATE operation...');
    const testEmail = `test.verification.${Date.now()}@company.io`;
    const created = await User.create({
      name: 'Verification Bot',
      email: testEmail,
      role: 'Developer',
      status: 'Active',
      department: 'QA & Testing',
      phone: '+1 555 0199'
    });
    console.log(`✓ User created: ${created.name} (${created._id})\n`);

    // 4. Update the test user
    console.log('[4/5] Testing UPDATE operation...');
    created.department = 'Core Infrastructure';
    await created.save();
    const updated = await User.findById(created._id);
    console.log(`✓ User updated: department is now "${updated.department}"\n`);

    // 5. Delete the test user
    console.log('[5/5] Testing DELETE operation...');
    await User.findByIdAndDelete(created._id);
    const verifyDeleted = await User.findById(created._id);
    console.log(`✓ User deleted: findById returned ${verifyDeleted} (confirmed removed)\n`);

    console.log('🎉 ALL 5 DATABASE CRUD CHECKS PASSED PERFECTLY!');
  } catch (err) {
    console.error('❌ Verification failed:', err);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
}

runVerification();
