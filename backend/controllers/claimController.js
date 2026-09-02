// Placeholder for claimController.js
import Claim from '../models/Claim.js';

// @desc    Get current user's claims
// @route   GET /api/claims/my
// @access  Private
export const getUserClaims = async (req, res) => {
  try {
    const claims = await Claim.find({ claimantUserId: req.user._id })
      .populate({
        path: 'postId',
        select: 'itemName postType location status images userId',
        populate: { path: 'userId', select: 'fullName studentId' },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({ claims });
  } catch (error) {
    console.error('GetUserClaims Error:', error.message);
    return res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};