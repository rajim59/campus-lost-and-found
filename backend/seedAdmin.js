import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const adminEmail = process.env.ADMIN_EMAIL || 'admin@campus.edu';
    const adminExists = await User.findOne({ email: adminEmail });

    if (adminExists) {
      console.log('Admin user already exists!');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD || 'admin123456',
      10
    );

    // User Schema অনুযায়ী ফিল্ডের নাম ও ভ্যালিডেশন ঠিক করা হয়েছে
    await User.create({
      fullName: 'System Admin',
      email: adminEmail,
      password: hashedPassword,
      studentId: 'ADMIN-001',
      department: 'other', // enum: ['cse', 'eee', 'ece', 'bba', 'english', 'law', 'other']
      batch: 'ADMIN',      // Schema-তে required field
      phone: '01700000000',
      role: 'admin',
      status: 'approved',  // Schema-তে isVerified এর বদলে status enum রয়েছে
    });

    console.log('✅ Admin user created successfully!');
    process.exit(0);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedAdmin();