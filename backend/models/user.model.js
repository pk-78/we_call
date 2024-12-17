import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    gender: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      default: "Welcome to my place , please follow me for more",
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    confirmPassword: {
      type: String,
      required: true,
      select: false,
    },
    joiningDate: {
      type: Date,
      default: Date.now,
    },
    avatar: {
      type: String,
    },
    coverImage: {
      type: String,
    },
    location: {
      city: {
        type: String,
        required: false,
      },
      state: {
        type: String,
        required: false,
      },
    },
    hobby: {
      type: [String],
      enum: [
        "Reading",
        "Traveling",
        "Cooking",
        "Gardening",
        "Photography",
        "Music",
        "Dancing",
        "Painting",
        "Sports",
        "Fitness",
        "Writing",
        "Crafting",
        "Fishing",
        "Gaming",
        "Yoga",
        "Meditation",
        "Hiking",
        "Cycling",
        "Collecting",
        "Watching Movies",
      ],
      default: ["Reading", "Cooking", "Music"], // Optional: Default hobby
    },

    language: {
      type: [String],
      enum: [
        "Hindi",
        "English",
        "Punjabi",
        "Marathi",
        "Gujarati",
        "Tamil",
        "Telugu",
        "Malayalam",
        "Kannada",
        "Bengali",
        "Odia",
        "Assamese",
        "Urdu",
      ],
      default: ["Hindi", "English"], // Optional: Set a default language
    },
    tags: {
      type: [String],
      enum: [
        "Kind",
        "Generous",
        "Compassionate",
        "Loving",
        "Empathetic",
        "Caring",
        "Adventurous",
        "Energetic",
        "Cheerful",
        "Charming",
        "Optimistic",
        "Outgoing",
        "Creative",
        "Imaginative",
        "Innovative",
        "Visionary",
        "Curious",
        "Intellectual",
        "Confident",
        "Ambitious",
        "Determined",
        "Fearless",
        "Independent",
        "Resilient",
        "Charismatic",
        "Friendly",
        "Approachable",
        "Persuasive",
        "Diplomatic",
      ],
      default: [],
    },

    refreshToken: {
      type: String,
    },
    otherProfile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserProfile",
      required: false,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
