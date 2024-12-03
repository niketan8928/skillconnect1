import mongoose from "mongoose";

export interface IFollow extends mongoose.Document {
  follower: mongoose.Schema.Types.ObjectId;
  following: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
}

const FollowSchema = new mongoose.Schema({
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  following: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure unique follow relationship
FollowSchema.index({ follower: 1, following: 1 }, { unique: true });

export default mongoose.models.Follow ||
  mongoose.model<IFollow>("Follow", FollowSchema);
