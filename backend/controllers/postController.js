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
  try {
    const { search, postType, category, location, status, page = 1, limit = 10 } = req.query;

    const query = {};

    // Filters
    if (postType) query.postType = postType;
    if (category) query.category = category;
    if (location) query.location = location;
    if (status) query.status = status;

    // Search
    if (search) {
      query.$or = [
        { itemName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    // Pagination
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    // Count and fetch
    const total = await Post.countDocuments(query);
    const posts = await Post.find(query)
      .populate('userId', 'fullName studentId department batch profileImage')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    return res.status(200).json({
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
      posts,
    });

  } catch (error) {
    console.error('GetAllPosts Error:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// @desc    Get single post by id
// @route   GET /api/posts/:id
// @access  Public
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('userId', 'fullName studentId email department batch profileImage');

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    return res.status(200).json({ post });
  } catch (error) {
    console.error('GetPostById Error:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
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

    // ✅ Required fields presence validation
    if (!postType || !itemName || !category || !location || !itemDate) {
      return res.status(400).json({
        message: 'Please provide postType, itemName, category, location, itemDate',
      });
    }

    // ✅ postType validation
    if (!['lost', 'found'].includes(postType)) {
      return res.status(400).json({ message: 'Invalid postType' });
    }

    // ✅ Non-empty string validation for category and location (supports custom inputs)
    if (!category.trim()) {
      return res.status(400).json({ message: 'Please provide a valid category' });
    }

    if (!location.trim()) {
      return res.status(400).json({ message: 'Please provide a valid location' });
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
      category: category.trim(),
      description: description ? description.trim() : '',
      location: location.trim(),
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

    // ✅ Non-empty string check for category
    if (category !== undefined) {
      if (!category.trim()) {
        return res.status(400).json({ message: 'Category cannot be empty' });
      }
      post.category = category.trim();
    }

    // ✅ Non-empty string check for location
    if (location !== undefined) {
      if (!location.trim()) {
        return res.status(400).json({ message: 'Location cannot be empty' });
      }
      post.location = location.trim();
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

    // ✅ Image update: replace old files if new ones uploaded
    if (req.files && req.files.length > 0) {
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

    // ✅ Delete associated claims
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

// @desc    Submit a claim on a Post (Lost or Found)
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

    // ✅ Check post type is either lost or found
    if (!['lost', 'found'].includes(post.postType)) {
      return res.status(400).json({ message: 'Invalid post type for claim' });
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

// @desc    Get all claims for a post (public)
// @route   GET /api/posts/:id/claims
// @access  Public
export const getClaimsByPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // ✅ Get public claims with safe claimant details
    const claims = await Claim.find({ postId: post._id })
      .populate('claimantUserId', 'fullName studentId department batch profileImage')
      .sort({ createdAt: -1 });

    return res.status(200).json({ claims });

  } catch (error) {
    console.error('GetClaimsByPost Error:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};