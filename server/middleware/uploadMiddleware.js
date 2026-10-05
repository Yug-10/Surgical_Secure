import multer from "multer";
import path from "path";
import fs from "fs";

/*
====================================================
UPLOAD DIRECTORIES
====================================================
*/

const uploadDirectories = {
  products: path.join(
    process.cwd(),
    "server",
    "uploads",
    "products"
  ),

  clients: path.join(
    process.cwd(),
    "server",
    "uploads",
    "clients"
  ),

  certifications: path.join(
    process.cwd(),
    "server",
    "uploads",
    "certifications"
  ),
};


/*
====================================================
CREATE DIRECTORIES
====================================================
*/

Object.values(uploadDirectories).forEach((directory) => {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, {
      recursive: true,
    });
  }
});


/*
====================================================
IMAGE FILE FILTER
====================================================
*/

const imageFileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  const extension = path
    .extname(file.originalname)
    .toLowerCase();

  const allowedExtensions = [
    ".jpg",
    ".jpeg",
    ".png",
    ".webp",
  ];

  if (
    allowedTypes.includes(file.mimetype) &&
    allowedExtensions.includes(extension)
  ) {
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


/*
====================================================
PRODUCT IMAGE STORAGE
====================================================
*/

const productStorage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(
      null,
      uploadDirectories.products
    );
  },

  filename: (req, file, cb) => {

    const extension = path
      .extname(file.originalname)
      .toLowerCase();

    const filename =
      `product-${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${extension}`;

    cb(null, filename);
  },

});


const uploadProductImage = multer({

  storage: productStorage,

  fileFilter: imageFileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

});


/*
====================================================
CLIENT LOGO STORAGE
====================================================
*/

const clientStorage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(
      null,
      uploadDirectories.clients
    );
  },

  filename: (req, file, cb) => {

    const extension = path
      .extname(file.originalname)
      .toLowerCase();

    const filename =
      `client-${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${extension}`;

    cb(null, filename);
  },

});


const uploadClientLogo = multer({

  storage: clientStorage,

  fileFilter: imageFileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

});


/*
====================================================
CERTIFICATION PDF STORAGE
====================================================
*/

const certificationStorage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(
      null,
      uploadDirectories.certifications
    );

  },

  filename: (req, file, cb) => {

    const extension = path
      .extname(file.originalname)
      .toLowerCase();

    const filename =
      `certificate-${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${extension}`;

    cb(null, filename);

  },

});


/*
====================================================
CERTIFICATION PDF FILTER
====================================================
*/

const certificationFileFilter = (
  req,
  file,
  cb
) => {

  const extension = path
    .extname(file.originalname)
    .toLowerCase();

  const isPdf =
    file.mimetype === "application/pdf" ||
    extension === ".pdf";

  if (isPdf) {

    cb(null, true);

  } else {

    cb(
      new Error(
        "Only PDF certificate files are allowed."
      ),
      false
    );

  }

};


/*
====================================================
CERTIFICATION PDF UPLOAD
====================================================
*/

const uploadCertificationPdf = multer({

  storage: certificationStorage,

  fileFilter: certificationFileFilter,

  limits: {
    fileSize: 10 * 1024 * 1024,
  },

});


/*
====================================================
EXPORTS
====================================================
*/

export {
  uploadProductImage,
  uploadClientLogo,
  uploadCertificationPdf,
};

export default uploadProductImage;


