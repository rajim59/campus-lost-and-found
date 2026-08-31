// Placeholder for postController.js
import Post from '../models/Post.js';
import Claim from '../models/Claim.js';
import fs from 'fs';
import path from 'path';

// =============================================
// POST CRUD
// =============================================

// @desc    Get all posts with filters
// @route   GET /api/posts
// @access  Public
export const getAllPosts = async (req, res) => {
  // TODO: implement by Atikul (Package for Atikul)
  return res.status(501).json({ message: 'Not implemented yet' });
};

// @desc    Get single post by id
// @route   GET /api/posts/:id
// @access  Public
export const getPostById = async (req, res) => {
  // TODO: implement by Atikul
  return res.status(501).json({ message: 'Not implemented yet' });
};

// @desc    Create new post
// @route   POST /api/posts
// @access  Private (Verified Student only)
export const createPost = async (req, res) => {
  try {
    const {
      postType,
      itemName,
      category,
      description,
      location,
      itemDate,
      contactEmail,
      contactPhone,
      isContactPublic,
    } = req.body;

    // ✅ Required fields validation
    if (!postType || !itemName || !category || !location || !itemDate) {
      return res.status(400).json({
        message: 'Please provide postType, itemName, category, location, itemDate',
      });
    }

    // ✅ postType validation
    if (!['lost', 'found'].includes(postType)) {
      return res.status(400).json({ message: 'Invalid postType' });
    }

    // ✅ category validation
    const allowedCategories = ['id_card', 'wallet', 'phone', 'book', 'key', 'other'];
    if (!allowedCategories.includes(category)) {
      return res.status(400).json({ message: 'Invalid category' });
    }

    // ✅ location validation
    const allowedLocations = [
      'library',
      'cafeteria',
      'dormitory',
      'academic_building',
      'playground',
      'other',
    ];
    if (!allowedLocations.includes(location)) {
      return res.status(400).json({ message: 'Invalid location' });
    }

    // ✅ Date validation
    const date = new Date(itemDate);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ message: 'Invalid itemDate format' });
    }

    // ✅ Image paths from multer
    let images = [];
    if (req.files && req.files.length > 0) {
      images = req.files.map((file) => file.filename);
    }

    // ✅ Contact info handling
    const finalContactEmail = contactEmail ? contactEmail.trim() : req.user.email;
    const finalContactPhone = contactPhone ? contactPhone.trim() : req.user.phone || '';
    const publicStatus = isContactPublic === 'false' || isContactPublic === false ? false : true;

    // ✅ Create post
    const post = await Post.create({
      userId: req.user._id,
      postType,
      itemName: itemName.trim(),
      category,
      description: description ? description.trim() : '',
      location,
      itemDate: date,
      images,
      contactEmail: finalContactEmail,
      contactPhone: finalContactPhone,
      isContactPublic: publicStatus,
      status: 'open',
    });

    return res.status(201).json({
      message: 'Post created successfully',
      post: {
        id: post._id,
        postType: post.postType,
        itemName: post.itemName,
        category: post.category,
        description: post.description,
        location: post.location,
        itemDate: post.itemDate,
        images: post.images,
        contactEmail: post.isContactPublic ? post.contactEmail : '',
        contactPhone: post.isContactPublic ? post.contactPhone : '',
        isContactPublic: post.isContactPublic,
        status: post.status,
        userId: post.userId,
        createdAt: post.createdAt,
      },
    });

  } catch (error) {
    console.error('CreatePost Error:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// @desc    Update own post
// @route   PUT /api/posts/:id
// @access  Private (Post Owner only)
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // ✅ Ownership check
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to update this post' });
    }

    const {
      itemName,
      category,
      description,
      location,
      itemDate,
      contactEmail,
      contactPhone,
      isContactPublic,
    } = req.body;

    // ✅ If fields provided, validate and update
    if (itemName !== undefined) post.itemName = itemName.trim();
    if (description !== undefined) post.description = description.trim();
    if (contactEmail !== undefined) post.contactEmail = contactEmail.trim();
    if (contactPhone !== undefined) post.contactPhone = contactPhone.trim();

    if (category !== undefined) {
      const allowedCategories = ['id_card', 'wallet', 'phone', 'book', 'key', 'other'];
      if (!allowedCategories.includes(category)) {
        return res.status(400).json({ message: 'Invalid category' });
      }
      post.category = category;
    }

    if (location !== undefined) {
      const allowedLocations = [
        'library',
        'cafeteria',
        'dormitory',
        'academic_building',
        'playground',
        'other',
      ];
      if (!allowedLocations.includes(location)) {
        return res.status(400).json({ message: 'Invalid location' });
      }
      post.location = location;
    }

    if (itemDate !== undefined) {
      const date = new Date(itemDate);
      if (isNaN(date.getTime())) {
        return res.status(400).json({ message: 'Invalid itemDate format' });
      }
      post.itemDate = date;
    }

    if (isContactPublic !== undefined) {
      post.isContactPublic = isContactPublic === 'false' || isContactPublic === false ? false : true;
    }

    // ✅ Image update: if new files uploaded, replace old ones (remove old files)
    if (req.files && req.files.length > 0) {
      // Delete old image files
      if (post.images && post.images.length > 0) {
        post.images.forEach((oldImage) => {
          const oldPath = path.join(process.cwd(), 'uploads', oldImage);
          if (fs.existsSync(oldPath)) {
            try {
              fs.unlinkSync(oldPath);
            } catch (err) {
              console.error('Old image delete error:', err.message);
            }
          }
        });
      }
      post.images = req.files.map((file) => file.filename);
    }

    // ✅ Save post
    await post.save();

    return res.status(200).json({
      message: 'Post updated successfully',
      post: {
        id: post._id,
        postType: post.postType,
        itemName: post.itemName,
        category: post.category,
        description: post.description,
        location: post.location,
        itemDate: post.itemDate,
        images: post.images,
        contactEmail: post.isContactPublic ? post.contactEmail : '',
        contactPhone: post.isContactPublic ? post.contactPhone : '',
        isContactPublic: post.isContactPublic,
        status: post.status,
        userId: post.userId,
        updatedAt: post.updatedAt,
      },
    });

  } catch (error) {
    console.error('UpdatePost Error:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// @desc    Delete own post
// @route   DELETE /api/posts/:id
// @access  Private (Post Owner only)
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // ✅ Ownership check
    if (post.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You are not authorized to delete this post' });
    }

    // ✅ Delete image files from uploads folder
    if (post.images && post.images.length > 0) {
      post.images.forEach((image) => {
        const imagePath = path.join(process.cwd(), 'uploads', image);
        if (fs.existsSync(imagePath)) {
          try {
            fs.unlinkSync(imagePath);
          } catch (err) {
            console.error('Image delete error:', err.message);
          }
        }
      });
    }

    // ✅ Delete associated claims (optional but good practice)
    await Claim.deleteMany({ postId: post._id });

    // ✅ Delete post
    await Post.findByIdAndDelete(post._id);

    return res.status(200).json({ message: 'Post deleted successfully' });

  } catch (error) {
    console.error('DeletePost Error:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// =============================================
// CLAIM SYSTEM
// =============================================

// @desc    Submit a claim on a Found post
// @route   POST /api/posts/:id/claim
// @access  Private (Verified Student only)
export const submitClaim = async (req, res) => {
  try {
    const { message } = req.body;
    const postId = req.params.id;

    // ✅ Message validation
    if (!message || !message.trim()) {
      return res.status(400).json({ message: 'Please provide claim message' });
    }

    // ✅ Find post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // ✅ Check post type is found
    if (post.postType !== 'found') {
      return res.status(400).json({ message: 'You can only claim on found items' });
    }

    // ✅ Check post status is open
    if (post.status !== 'open') {
      return res.status(400).json({ message: 'This post is already claimed or resolved' });
    }

    // ✅ Prevent owner from claiming own post
    if (post.userId.toString() === req.user._id.toString()) {
      return res.status(400).json({ message: 'You cannot claim your own post' });
    }

    // ✅ Check if user already claimed this post
    const existingClaim = await Claim.findOne({
      postId: post._id,
      claimantUserId: req.user._id,
    });
    if (existingClaim) {
      return res.status(400).json({ message: 'You have already claimed this item' });
    }

    // ✅ Create claim
    const claim = await Claim.create({
      postId: post._id,
      claimantUserId: req.user._id,
      message: message.trim(),
      status: 'pending',
      deadline: null,
    });

    return res.status(201).json({
      message: 'Claim submitted successfully',
      claim: {
        id: claim._id,
        postId: claim.postId,
        claimantUserId: claim.claimantUserId,
        message: claim.message,
        status: claim.status,
        deadline: claim.deadline,
        createdAt: claim.createdAt,
      },
    });

  } catch (error) {
    console.error('SubmitClaim Error:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// @desc    Get all claims for a post
// @route   GET /api/posts/:id/claims
// @access  Private (Post Owner or Admin only)
export const getClaimsByPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // ✅ Authorization: post owner or admin
    const isOwner = post.userId.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';
    if (!isOwner && !isAdmin) {
      return res.status(403).json({ message: 'Not authorized to view claims' });
    }

    // ✅ Get claims with claimant details
    const claims = await Claim.find({ postId: post._id })
      .populate('claimantUserId', 'fullName studentId email department batch')
      .sort({ createdAt: -1 });

    return res.status(200).json({ claims });

  } catch (error) {
    console.error('GetClaimsByPost Error:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};