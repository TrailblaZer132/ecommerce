import path from "path";
import express from "express";
import multer from "multer";

const router = express.Router();

const imageStorage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});



const pdfImageStorage = multer.diskStorage({
  destination(req, file, cb) {
    if (file.mimetype === "application/pdf") {
      cb(null, "uploads/");
    } else {
      cb(null, "uploads/");
    }
  },
  filename(req, file, cb) {
    const extname = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${extname}`);
  },
});

const imageFileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images only!"), false);
  }
};

const pdfImageFileFilter = (req, file, cb) => {
  const filetypes = /jpe?g|png|webp|pdf/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp|application\/pdf/;
  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype;

  if (filetypes.test(extname) && mimetypes.test(mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Images and PDFs only!"), false);
  }
};

const uploadImages = multer({ storage: imageStorage, fileFilter: imageFileFilter });
const uploadPDFsAndImages = multer({ storage: pdfImageStorage, fileFilter: pdfImageFileFilter });

const uploadMultipleImages = uploadImages.array("images", 10);
const uploadMultiplePDFsAndImages = uploadPDFsAndImages.array("files", 10);

router.post("/", (req, res) => {
  uploadMultipleImages(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else if (req.files && req.files.length > 0) {
      const imagePaths = req.files.map(file => `/${file.path}`);
      res.status(200).send({
        message: "Images uploaded successfully",
        images: imagePaths,
      });
    } else {
      res.status(400).send({ message: "No images uploaded" });
    }
  });
});

router.post("/files", (req, res) => {
  uploadMultiplePDFsAndImages(req, res, (err) => {
    if (err) {
      res.status(400).send({ message: err.message });
    } else if (req.files && req.files.length > 0) {
      const filePaths = req.files.map(file => `/${file.path}`);
      res.status(200).send({
        message: "Files uploaded successfully",
        files: filePaths,
      });
    } else {
      res.status(400).send({ message: "No files uploaded" });
    }
  });
});
export { uploadMultiplePDFsAndImages };

export default router;
