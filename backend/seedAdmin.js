import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/campus-lost-and-found';
    await mongoose.connect(mongoUri);

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@campus.edu';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Campus@2026!';

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(adminPassword, salt);

    // Schema validation অনুযায়ী আপডেট বা তৈরি করা হচ্ছে
    await User.updateOne(
      { email: adminEmail },
      {
        $set: {
          fullName: 'System Admin',
          studentId: 'ADMIN-001',
          email: adminEmail,
          password: hashedPassword,
          department: 'other',
          batch: 'ADMIN',
          phone: '01700000000',
          role: 'admin',
          status: 'approved',
        },
      },
      { upsert: true }
    );

    console.log('✅ Admin user created/updated successfully!');
    console.log(`Email: ${adminEmail}`);
    console.log(`Password: ${adminPassword}`);
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();