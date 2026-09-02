import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';

dotenv.config();

const fixStudent = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/campus-lost-and-found';
    await mongoose.connect(mongoUri);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    await User.updateOne(
      { email: 'student@campus.edu' },
      { 
        $set: { 
          password: hashedPassword,
          role: 'student',
          status: 'approved'
        } 
      }
    );

    console.log('Student account updated! Email: student@campus.edu, Password: password123');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

fixStudent();