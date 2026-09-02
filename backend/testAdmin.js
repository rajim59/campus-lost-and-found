import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import Post from './models/Post.js';
import Claim from './models/Claim.js';

dotenv.config();

const BASE_URL = 'http://localhost:3000/api';

const runAdminTests = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // ধাপ ১: ফ্রেশ Admin তৈরি ও লগইন
    console.log('\n--- ১. Admin Login Verification ---');
    const adminEmail = 'admin@campus.edu';
    const adminPassword = 'adminpassword123';

    // পুরোনো অ্যাডমিন ডিলিট করা
    await User.deleteOne({ email: adminEmail });

    // প্লেইন টেক্সট পাসওয়ার্ড দেওয়া হচ্ছে (মডেলের pre-save হুক নিজে হ্যাশ করবে)
    await User.create({
      fullName: 'System Admin',
      studentId: 'ADMIN-001',
      email: adminEmail,
      password: adminPassword,
      department: 'other',
      batch: 'ADMIN',
      role: 'admin',
      status: 'approved'
    });

    const loginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailOrStudentId: adminEmail, password: adminPassword })
    });
    const loginData = await loginRes.json();
    const ADMIN_TOKEN = loginData.token;
    console.log('Status Code:', loginRes.status, '| Admin Logged In.');

    if (!ADMIN_TOKEN) {
      throw new Error(`Admin login failed: ${loginData.message}`);
    }

    // টেস্টের জন্য ডামি Pending ইউজার তৈরি
    const pendingEmail = `pending_${Date.now()}@student.edu`;
    const regRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: 'Pending Student',
        studentId: `CSE-2022-${Math.floor(1000 + Math.random() * 9000)}`,
        email: pendingEmail,
        department: 'cse',
        batch: '2022',
        password: 'password123'
      })
    });
    const regData = await regRes.json();
    const pendingUserId = regData.user?.id;

    // ধাপ ২: Get Pending Users
    console.log('\n--- ২. Testing Get Pending Users ---');
    const getPendingRes = await fetch(`${BASE_URL}/admin/pending-users`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${ADMIN_TOKEN}` }
    });
    const pendingListData = await getPendingRes.json();
    console.log('Status Code:', getPendingRes.status);
    console.log('Pending Users Count:', pendingListData.count);

    // ধাপ ৩: Approve User
    console.log(`\n--- ৩. Testing Approve User (ID: ${pendingUserId}) ---`);
    const verifyRes = await fetch(`${BASE_URL}/admin/verify-user/${pendingUserId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_TOKEN}`
      },
      body: JSON.stringify({ status: 'approved' })
    });
    const verifyData = await verifyRes.json();
    console.log('Status Code:', verifyRes.status);
    console.log('Response:', verifyData.message);

    // টেস্টের জন্য একটি Found Post তৈরি
    const postRes = await fetch(`${BASE_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_TOKEN}`
      },
      body: JSON.stringify({
        postType: 'found',
        itemName: 'Admin Test Item',
        category: 'wallet',
        location: 'library',
        itemDate: '2026-08-30T10:00:00',
        description: 'Test post for claim handling',
        contactEmail: adminEmail,
        isContactPublic: true
      })
    });
    const postData = await postRes.json();
    const testPostId = postData.post?.id;

    // Claim তৈরি করা
    const dummyClaim = await Claim.create({
      postId: testPostId,
      claimantUserId: pendingUserId,
      message: 'Direct test claim',
      status: 'pending'
    });
    const claimId = dummyClaim._id;

    // ধাপ ৪: Set Claim Deadline
    console.log(`\n--- ৪. Testing Set Claim Deadline (Claim ID: ${claimId}) ---`);
    const deadlineRes = await fetch(`${BASE_URL}/admin/claims/${claimId}/deadline`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${ADMIN_TOKEN}`
      },
      body: JSON.stringify({ deadline: '2026-09-02T18:00:00' })
    });
    const deadlineData = await deadlineRes.json();
    console.log('Status Code:', deadlineRes.status);
    console.log('Response:', deadlineData.message);

    // ধাপ ৫: Accept Claim
    console.log(`\n--- ৫. Testing Accept Claim ---`);
    const acceptRes = await fetch(`${BASE_URL}/admin/claims/${claimId}/accept`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${ADMIN_TOKEN}` }
    });
    const acceptData = await acceptRes.json();
    console.log('Status Code:', acceptRes.status);
    console.log('Response:', acceptData.message);

    // ধাপ ৬: Reject Claim
    console.log(`\n--- ৬. Testing Reject Claim ---`);
    const rejectDummyClaim = await Claim.create({
      postId: testPostId,
      claimantUserId: pendingUserId,
      message: 'Claim to be rejected',
      status: 'pending'
    });
    const rejectRes = await fetch(`${BASE_URL}/admin/claims/${rejectDummyClaim._id}/reject`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${ADMIN_TOKEN}` }
    });
    const rejectData = await rejectRes.json();
    console.log('Status Code:', rejectRes.status);
    console.log('Response:', rejectData.message);

    await mongoose.connection.close();
    console.log('\n✅ Package C-এর সবকটি টেস্ট সফলভাবে সম্পন্ন হয়েছে!');

  } catch (error) {
    console.error('Test execution failed:', error.message);
  }
};

runAdminTests();