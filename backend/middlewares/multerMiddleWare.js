// // const multer = require('multer');
// import multer from "multer"
// // const path = require('path');
// import path from "path";

// // Set up storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     // cb(null, `${Date.now()}_${file.originalname}`);
//     const extname = path.extname(file.originalname);
//     cb(null, `${file.fieldname}-${Date.now()}${extname}`);
//   },
// });

// // File filter to accept only certain types of files
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'application/pdf') {
//     cb(null, true);
//   } else {
//     cb(new Error('Unsupported file format'), false);
//   }
// };

// // Set up multer middleware
// const upload = multer({
//   storage: storage,
//   limits: {
//     fileSize: 1024 * 1024 * 5, // 5MB limit
//   },
//   fileFilter: fileFilter,
// });

// module.exports = upload;
