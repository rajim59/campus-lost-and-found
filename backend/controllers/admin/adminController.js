import fs from 'fs';
import path from 'path';
import User from '../../models/User.js';
import Post from '../../models/Post.js';
import Claim from '../../models/Claim.js';

// =============================================
// USER VERIFICATION (সবুজ)
// =============================================

// @desc    Get all pending users
// @route   GET /api/admin/pending-users
// @access  Private (Admin only)
export const getPendingUsers = async (req, res) => {
  try {
    const pendingUsers = await User.find({ status: 'pending' })
      .select('-password')
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: pendingUsers.length,
      users: pendingUsers,
    });

  } catch (error) {
    console.error('GetPendingUsers Error:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// @desc    Approve or Reject a user
// @route   PUT /api/admin/verify-user/:id
// @access  Private (Admin only)
export const verifyUser = async (req, res) => {
  try {
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Status must be approved or rejected' });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'admin') {
      return res.status(400).json({ message: 'Cannot modify admin account' });
    }

    user.status = status;
    await user.save();

    return res.status(200).json({
      message: `User ${status === 'approved' ? 'approved' : 'rejected'} successfully`,
      user: {
        id: user._id,
        fullName: user.fullName,
        studentId: user.studentId,
        email: user.email,
        status: user.status,
      },
    });

  } catch (error) {
    console.error('VerifyUser Error:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// =============================================
// CLAIM MANAGEMENT (সবুজ)
// =============================================

// @desc    Set deadline for a claim
// @route   PUT /api/admin/claims/:id/deadline
// @access  Private (Admin only)
export const setClaimDeadline = async (req, res) => {
  try {
    const { deadline } = req.body;

    if (!deadline) {
      return res.status(400).json({ message: 'Please provide deadline' });
    }

    const date = new Date(deadline);
    if (isNaN(date.getTime())) {
      return res.status(400).json({ message: 'Invalid deadline format' });
    }

    const claim = await Claim.findById(req.params.id);
    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }

    claim.deadline = date;
    await claim.save();

    return res.status(200).json({
      message: 'Deadline set successfully',
      claim: {
        id: claim._id,
        postId: claim.postId,
        deadline: claim.deadline,
        status: claim.status,
      },
    });

  } catch (error) {
    console.error('SetClaimDeadline Error:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// @desc    Accept a claim and resolve the post
// @route   PUT /api/admin/claims/:id/accept
// @access  Private (Admin only)
export const acceptClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);
    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }

    // Update claim status
    claim.status = 'accepted';
    await claim.save();

    // Reject other pending claims for same post
    await Claim.updateMany(
      { postId: claim.postId, status: 'pending', _id: { $ne: claim._id } },
      { status: 'rejected' }
    );

    // Update post status to resolved
    await Post.findByIdAndUpdate(claim.postId, { status: 'resolved' });

    return res.status(200).json({
      message: 'Claim accepted, post resolved',
      claim: {
        id: claim._id,
        postId: claim.postId,
        status: claim.status,
      },
    });

  } catch (error) {
    console.error('AcceptClaim Error:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// @desc    Reject a claim
// @route   PUT /api/admin/claims/:id/reject
// @access  Private (Admin only)
export const rejectClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);
    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }

    claim.status = 'rejected';
    await claim.save();

    return res.status(200).json({
      message: 'Claim rejected',
      claim: {
        id: claim._id,
        postId: claim.postId,
        status: claim.status,
      },
    });

  } catch (error) {
    console.error('RejectClaim Error:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// =============================================
// POST & CLAIM MODERATION (আল ফাহিম)
// =============================================

// @desc    Get all posts (admin)
// @route   GET /api/admin/posts
// @access  Private (Admin only)
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('userId', 'fullName studentId email')
      .sort({ createdAt: -1 });

    return res.status(200).json({ posts });
  } catch (error) {
    console.error('AdminGetAllPosts Error:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// @desc    Delete any post (admin)
// @route   DELETE /api/admin/posts/:id
// @access  Private (Admin only)
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Delete images from uploads
    if (post.images && post.images.length > 0) {
      post.images.forEach((image) => {
        const imagePath = path.join(process.cwd(), 'uploads', image);
        if (fs.existsSync(imagePath)) {
          try {
            fs.unlinkSync(imagePath);
            console.log('Image deleted:', image);
          } catch (err) {
            console.error('Image delete error:', err.message);
          }
        }
      });
    }

    // Delete associated claims
    await Claim.deleteMany({ postId: post._id });

    // Delete post
    await Post.findByIdAndDelete(post._id);

    return res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('AdminDeletePost Error:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};

// @desc    Get all claims (admin)
// @route   GET /api/admin/claims
// @access  Private (Admin only)
export const getAllClaims = async (req, res) => {
  try {
    const claims = await Claim.find()
      .populate('postId', 'itemName postType status')
      .populate('claimantUserId', 'fullName studentId email')
      .sort({ createdAt: -1 });

    return res.status(200).json({ claims });
  } catch (error) {
    console.error('AdminGetAllClaims Error:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};