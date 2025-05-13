// import fs from "fs";
// import multer from "multer";
// import path from "path";

// // Ensure the upload folder exists
// const ensureFolder = (folder) => {
//   if (!fs.existsSync(folder)) {
//     fs.mkdirSync(folder, { recursive: true });
//   }
// };

// // Define folder paths
// const uploadProfileFolder = "uploads/profile"; 
// const uploadBannerFolder = "uploads/banners"; 
// const uploadPostFolder = "uploads/posts";

// // Ensure folders exist
// ensureFolder(uploadProfileFolder);
// ensureFolder(uploadBannerFolder);
// ensureFolder(uploadPostFolder)

// // Common File Validation
// const fileFilter = (allowedTypes) => (req, file, cb) => {
//   const extname = allowedTypes.test(
//     path.extname(file.originalname).toLowerCase()
//   );
//   const mimetype = allowedTypes.test(file.mimetype);

//   if (mimetype && extname) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only .jpg, .jpeg, and .png formats are allowed!"));
//   }
// };

// // Profile Storage Configuration
// const profileStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadProfileFolder);
//   },
//   filename: function (req, file, cb) {
//     const timestamp = Date.now();
//     const username = req.body.username || "profile";
//     const originalName = path
//       .basename(file.originalname, path.extname(file.originalname))
//       .replace(/\s+/g, "_"); // Remove spaces
//     cb(
//       null,
//       `${username}_${timestamp}_${originalName}${path.extname(
//         file.originalname
//       )}`
//     );
//   },
// });

// // Banner Storage Configuration
// const bannerStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadBannerFolder);
//   },
//   filename: function (req, file, cb) {
//     const timestamp = Date.now();
//     const bannerName = req.body.bannerName || "banner";
//     const originalName = path
//       .basename(file.originalname, path.extname(file.originalname))
//       .replace(/\s+/g, "_");
//     cb(
//       null,
//       `${bannerName}_${timestamp}_${originalName}${path.extname(
//         file.originalname
//       )}`
//     );
//   },
// });
// const postStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, uploadPostFolder);
//   },
//   filename: function (req, file, cb) {
//     const timestamp = Date.now();
//     const postName = req.body.postName || "post";
//     const originalName = path
//       .basename(file.originalname, path.extname(file.originalname))
//       .replace(/\s+/g, "_");
//     cb(
//       null,
//       `${postName}_${timestamp}_${originalName}${path.extname(
//         file.originalname
//       )}`
//     );
//   },
// });

// // Multer Middlewares
// const profileUpload = multer({
//   storage: profileStorage,
//   fileFilter: fileFilter(/jpg|jpeg|png/),
//   limits: { fileSize: 2 * 1024 * 1024 }, // Limit file size to 2MB
// }).single("profilePicture");

// const bannerUpload = multer({
//   storage: bannerStorage,
//   fileFilter: fileFilter(/jpg|jpeg|png/),
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
// }).single("bannerImage");
// const postUpload = multer({
//   storage: postStorage,
//   fileFilter: fileFilter(/jpg|jpeg|png/),
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
// }).single("postImage");

// // Named Exports for Clarity
// export { profileUpload, bannerUpload, postUpload };



// middleware/multer.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

// Common File Validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(file.originalname.toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (mimetype && extname) {
    cb(null, true);
  } else {
    cb(new Error("Only .jpg, .jpeg, and .png formats are allowed!"));
  }
};

// Cloudinary storage for different types
const profileStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "profiles",
    allowed_formats: ["jpg", "jpeg", "png"],
    public_id: (req, file) => {
      const username = req.body.username || "profile";
      return `${username}_${Date.now()}`;
    },
  },
});

const bannerStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "banners",
    allowed_formats: ["jpg", "jpeg", "png"],
    public_id: (req, file) => {
      const bannerName = req.body.bannerName || "banner";
      return `${bannerName}_${Date.now()}`;
    },
  },
});

const postStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "posts",
    allowed_formats: ["jpg", "jpeg", "png"],
    public_id: (req, file) => {
      const postName = req.body.postName || "post";
      return `${postName}_${Date.now()}`;
    },
  },
});

const profileUpload = multer({ storage: profileStorage, fileFilter }).single("profilePicture");
const bannerUpload = multer({ storage: bannerStorage, fileFilter }).single("bannerImage");
const postUpload = multer({ storage: postStorage, fileFilter }).single("postImage");

export { profileUpload, bannerUpload, postUpload };
