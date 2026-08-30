import mongoose from 'mongoose';

const claimSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
      required: true,
    },
    claimantUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
    deadline: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Claim = mongoose.model('Claim', claimSchema);
export default Claim;