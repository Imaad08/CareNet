import mongoose from "mongoose";
import { text } from "stream/consumers";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  location: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
  tags: [
    {
      type: String,
    },
  ],
});

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;