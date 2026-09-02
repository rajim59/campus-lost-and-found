import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config();

const BASE_URL = 'http://localhost:3000/api';
// প্রথম ইউজারের টোকেন (পোস্ট মালিক)
const USER1_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhOTUyN2U1ZTQ4Y2JmOGFkZTA2ZTFlMiIsImlhdCI6MTc4ODE2MjE1OCwiZXhwIjoxNzg4MjQ4NTU4fQ.yNJD0RkYAMRRBnCVp1iDdLJ10WByJvz6bI6UMTfrrbE';

const runClaimTests = async () => {
  try {
    // ১. একটি Found পোস্ট তৈরি করা
    console.log('\n--- Step A: Creating a Found Post (User 1) ---');
    const postRes = await fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${USER1_TOKEN}`
      },
      body: JSON.stringify({
        postType: 'found',
        itemName: 'Found Wallet',
        category: 'wallet',
        location: 'cafeteria',
        itemDate: '2026-08-30T10:00:00',
        description: 'Black leather wallet found on cafeteria table',
        contactEmail: 'test@student.edu',
        isContactPublic: true
      })
    });
    const postData = await postRes.json();
    const foundPostId = postData.post?.id;
    console.log('Post ID Created:', foundPostId);

    // ২. দ্বিতীয় ইউজার রেজিস্ট্রেশন ও অনুমোদন
    console.log('\n--- Step B: Registering & Approving User 2 ---');
    const secondUserEmail = `user2_${Date.now()}@student.edu`;
    const secondStudentId = `CSE-2022-${Math.floor(100 + Math.random() * 900)}`;

    await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Second Claimant',
        studentId: secondStudentId,
        email: secondUserEmail,
        department: 'cse',
        batch: '2022',
        password: 'password123'
      })
    });

    // ডাটাবেজে অনুমোদন দেওয়া
    await mongoose.connect(process.env.MONGO_URI);
    await User.updateOne({ email: secondUserEmail }, { status: 'approved' });
    await mongoose.connection.close();

    // দ্বিতীয় ইউজারের লগইন
    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        emailOrStudentId: secondUserEmail,
        password: 'password123'
      })
    });
    const loginData = await loginRes.json();
    const USER2_TOKEN = loginData.token;
    console.log('User 2 Logged in successfully.');

    // ৩. ধাপ ৫ টেস্ট: Submit Claim
    console.log('\n--- ধাপ ৫: Testing Submit Claim (POST /api/posts/:id/claim) ---');
    const claimRes = await fetch(`${BASE_URL}/posts/${foundPostId}/claim`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${USER2_TOKEN}`
      },
      body: JSON.stringify({
        message: 'I think this wallet is mine, it has my ID card inside.'
      })
    });
    const claimData = await claimRes.json();
    console.log('Status Code:', claimRes.status);
    console.log('Claim Response:\n', JSON.stringify(claimData, null, 2));

    // ৪. ধাপ ৬ টেস্ট: Get Claims By Post
    console.log('\n--- ধাপ ৬: Testing Get Claims By Post (GET /api/posts/:id/claims) ---');
    const getClaimsRes = await fetch(`${BASE_URL}/posts/${foundPostId}/claims`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${USER1_TOKEN}`
      }
    });
    const getClaimsData = await getClaimsRes.json();
    console.log('Status Code:', getClaimsRes.status);
    console.log('Get Claims Response:\n', JSON.stringify(getClaimsData, null, 2));

    console.log('\n সমস্ত ৬টি টেস্ট সম্পূর্ণ হলো!');
  } catch (error) {
    console.error('Error during testing:', error.message);
  }
};

runClaimTests();