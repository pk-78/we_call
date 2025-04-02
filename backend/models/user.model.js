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
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],

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
      default: ["Kind", "Generous", "Caring"],
    },
    rate: {
      type: Number,
      default: 200,
    },
    rating: {
      type: String,
      default: 3.5,
    },
    coins: {
      type: Number,
      default: 200,
    },
    dailyCheckIn: {
      type: String,
      default: 1,
    },
    lastLogin: {
      type: Date,
      default: new Date("2017-10-17T00:00:00Z"),
    },
    isLive: {
      type: Boolean,
      default: false,
    },
    level: {
      type: String,
      default: 1,
    },
    TotalEarning: {
      type: String,
      default: 0,
    },
    todayEarning: {
      type: String,
      default: 0,
    },
    coinConsumption: {
      type: String,
      default: 0,
    },
    dob: {
      type: Date,
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
