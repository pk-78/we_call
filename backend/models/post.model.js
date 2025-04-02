import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    imageLink: {
      type: String,
    },
    description: {
      type: String,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    like:{
        type:[String],
        default:[]
    },
    gift:{
        type:[String],
        default:[]
    },
    comment:[]
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
