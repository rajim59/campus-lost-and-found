import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register new student
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res) => {
  try {
    const {
      fullName,
      studentId,
      email,
      phone,
      department,
      batch,
      password,
    } = req.body;

    if (!fullName || !studentId || !email || !department || !batch || !password) {
      return res.status(400).json({
        message: 'Please provide all required fields: fullName, studentId, email, department, batch, password',
      });
    }

    const trimmedName = fullName.trim();
    const trimmedStudentId = studentId.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPhone = phone ? phone.trim() : '';
    const trimmedBatch = batch.trim();
    const trimmedDept = department.trim().toLowerCase();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // ✅ SWE সহ পূর্ণাঙ্গ ডিপার্টমেন্ট ভ্যালিডেশন
    const allowedDepartments = [
      'cse',
      'swe',
      'eee',
      'ece',
      'bba',
      'english',
      'law',
      'pharmacy',
      'architecture',
      'mathematics',
      'physics',
      'other',
    ];

    if (!allowedDepartments.includes(trimmedDept)) {
      return res.status(400).json({ message: 'Invalid department selected' });
    }

    const existingUser = await User.findOne({
      $or: [{ email: trimmedEmail }, { studentId: trimmedStudentId }],
    });

    if (existingUser) {
      let field = 'User';
      if (existingUser.email === trimmedEmail) field = 'Email';
      else if (existingUser.studentId === trimmedStudentId) field = 'Student ID';
      return res.status(400).json({ message: `${field} already exists` });
    }

    const user = await User.create({
      fullName: trimmedName,
      studentId: trimmedStudentId,
      email: trimmedEmail,
      phone: trimmedPhone,
      department: trimmedDept,
      batch: trimmedBatch,
      password,
      status: 'pending',
      role: 'student',
    });

    return res.status(201).json({
      message: 'Registration successful! Please wait for admin approval before logging in.',
      user: {
        id: user._id,
        fullName: user.fullName,
        studentId: user.studentId,
        email: user.email,
        department: user.department,
        batch: user.batch,
        status: user.status,
        role: user.role,
        createdAt: user.createdAt,
      },
    });

  } catch (error) {
    console.error('Register Error:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// @desc    Login student (studentId only, block admin)
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { studentId, password } = req.body;

    if (!studentId || !password) {
      return res.status(400).json({ message: 'Please provide student ID and password' });
    }

    const trimmedCredential = studentId.trim();
    const user = await User.findOne({ studentId: trimmedCredential });

    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Block admin from student login
    if (user.role === 'admin') {
      return res.status(403).json({ message: 'Please use the admin login page' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.status === 'pending') {
      return res.status(403).json({
        message: 'Your account is pending approval. Please wait for admin verification.',
      });
    }

    if (user.status === 'rejected') {
      return res.status(403).json({
        message: 'Your account has been rejected. Please contact admin.',
      });
    }

    return res.status(200).json({
      message: 'Login successful',
      token: generateToken(user._id),
      user: {
        id: user._id,
        fullName: user.fullName,
        studentId: user.studentId,
        email: user.email,
        phone: user.phone,
        department: user.department,
        batch: user.batch,
        profileImage: user.profileImage,
        status: user.status,
        role: user.role,
      },
    });

  } catch (error) {
    console.error('Login Error:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// @desc    Login admin (email + password only)
// @route   POST /api/auth/admin-login
// @access  Public
export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const trimmedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: trimmedEmail });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized as admin' });
    }

    return res.status(200).json({
      message: 'Admin login successful',
      token: generateToken(user._id),
      user: {
        id: user._id,
        fullName: user.fullName,
        studentId: user.studentId,
        email: user.email,
        role: user.role,
        status: user.status,
      },
    });

  } catch (error) {
    console.error('AdminLogin Error:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// @desc    Get current logged-in user
// @route   GET /api/auth/me
// @access  Private (requires JWT token)
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      user: {
        id: user._id,
        fullName: user.fullName,
        studentId: user.studentId,
        email: user.email,
        phone: user.phone,
        department: user.department,
        batch: user.batch,
        profileImage: user.profileImage,
        status: user.status,
        role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });

  } catch (error) {
    console.error('GetMe Error:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};