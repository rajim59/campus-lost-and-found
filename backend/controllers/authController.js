// Placeholder for authController.js
import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register new user
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

    // ✅ Basic validation — required fields
    if (!fullName || !studentId || !email || !department || !batch || !password) {
      return res.status(400).json({
        message: 'Please provide all required fields: fullName, studentId, email, department, batch, password',
      });
    }

    // ✅ Trim inputs
    const trimmedName = fullName.trim();
    const trimmedStudentId = studentId.trim();
    const trimmedEmail = email.trim().toLowerCase();
    const trimmedPhone = phone ? phone.trim() : '';
    const trimmedBatch = batch.trim();

    // ✅ Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // ✅ Password length check
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }

    // ✅ Department validation
    const allowedDepartments = ['cse', 'eee', 'ece', 'bba', 'english', 'law', 'other'];
    if (!allowedDepartments.includes(department)) {
      return res.status(400).json({ message: 'Invalid department' });
    }

    // ✅ Duplicate check — email OR studentId
    const existingUser = await User.findOne({
      $or: [{ email: trimmedEmail }, { studentId: trimmedStudentId }],
    });

    if (existingUser) {
      // Check which field caused duplicate
      let field = 'User';
      if (existingUser.email === trimmedEmail) field = 'Email';
      else if (existingUser.studentId === trimmedStudentId) field = 'Student ID';
      return res.status(400).json({ message: `${field} already exists` });
    }

    // ✅ Create user
    const user = await User.create({
      fullName: trimmedName,
      studentId: trimmedStudentId,
      email: trimmedEmail,
      phone: trimmedPhone,
      department,
      batch: trimmedBatch,
      password,
      status: 'pending',
      role: 'student',
    });

    // ✅ Return response without password
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

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  try {
    const { emailOrStudentId, password } = req.body;

    // ✅ Required fields validation
    if (!emailOrStudentId || !password) {
      return res.status(400).json({ message: 'Please provide email/student ID and password' });
    }

    const trimmedCredential = emailOrStudentId.trim().toLowerCase();

    // ✅ Find user by email OR studentId
    const user = await User.findOne({
      $or: [
        { email: trimmedCredential },
        { studentId: trimmedCredential },
      ],
    });

    // ✅ User existence check
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // ✅ Password match check
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // ✅ Account status check
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

    // ✅ Generate token and return
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

// @desc    Get current logged-in user
// @route   GET /api/auth/me
// @access  Private (requires JWT token)
export const getMe = async (req, res) => {
  try {
    // req.user is set by protect middleware
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