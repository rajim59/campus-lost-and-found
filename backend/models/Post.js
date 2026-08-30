import mongoose from 'mongoose';

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    postType: {
      type: String,
      enum: ['lost', 'found'],
      required: true,
    },
    itemName: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['id_card', 'wallet', 'phone', 'book', 'key', 'other'],
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    location: {
      type: String,
      required: true,
      enum: ['library', 'cafeteria', 'dormitory', 'academic_building', 'playground', 'other'],
    },
    itemDate: {
      type: Date,
      required: true,
    },
    images: [
      {
        type: String,
      },
    ],
    contactEmail: {
      type: String,
      trim: true,
      default: '',
    },
    contactPhone: {
      type: String,
      trim: true,
      default: '',
    },
    isContactPublic: {
      type: Boolean,
      default: true,
    },
    status: {
      type: String,
      enum: ['open', 'claimed', 'resolved'],
      default: 'open',
    },
  },
  { timestamps: true }
);

const Post = mongoose.model('Post', postSchema);
export default Post;