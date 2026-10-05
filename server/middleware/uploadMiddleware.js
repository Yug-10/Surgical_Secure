import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "uploads/products";

// Create folder automatically
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {
    recursive: true,
  });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);

    const uniqueName =
      `product-${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${extension}`;

    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/jpg",
  ];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Only JPG, JPEG, PNG and WEBP images are allowed."
      ),
      false
    );
  }
};

const uploadProductImage = multer({
  storage,
  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

export default uploadProductImage;