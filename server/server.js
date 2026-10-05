import express from "express";
import cors from "cors";
import "dotenv/config";
import path from "path";

import publiproductRoutes from "./routes/publicproductsRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

import productRoutes from "./routes/productRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import certificationRoutes from "./routes/certificationRoutes.js";

import authMiddleware from "./middleware/authMiddleware.js";

import pool from "./config/db.js";

const app = express();

const PORT = process.env.PORT || 5000;


/* =========================================================
   MIDDLEWARE
========================================================= */

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(
  "/uploads",
  express.static(
    path.join(process.cwd(), "server", "uploads")
  )
);



/* =========================================================
   UPLOADED FILES
========================================================= */

/*
   Files stored inside:

   server/uploads/products
   server/uploads/clients
   server/uploads/certifications

   will be accessible through:

   http://localhost:5000/uploads/...
*/



/* =========================================================
   ROOT
========================================================= */

app.get("/", (req, res) => {
  res.json({
    message: "Surgical Secure API is running",
  });
});


/* =========================================================
   DATABASE TEST
========================================================= */

app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT 1 AS result"
    );

    res.json({
      success: true,
      message: "MySQL connection successful",
      data: rows,
    });

  } catch (error) {

    console.error(
      "MySQL connection error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "MySQL connection failed",
      error: error.message,
    });
  }
});


/* =========================================================
   PUBLIC PRODUCTS
========================================================= */

app.use(
  "/api/products",
  publiproductRoutes
);


/* =========================================================
   PUBLIC INQUIRIES
========================================================= */

app.use(
  "/api/inquiries",
  inquiryRoutes
);


/* =========================================================
   CLIENTS
========================================================= */

app.use(
  "/api/clients",
  clientRoutes
);


/* =========================================================
   CERTIFICATIONS
========================================================= */

/*
   Public:

   GET /api/certifications
   GET /api/certifications/:slug
*/

app.use(
  "/api/certifications",
  certificationRoutes
);


/*
   Admin:

   GET    /api/admin/certifications/admin/all
   POST   /api/admin/certifications/admin
   PUT    /api/admin/certifications/admin/:id
   DELETE /api/admin/certifications/admin/:id

   Upload:

   POST /api/admin/certifications/upload-pdf
*/

app.use(
  "/api/admin/certifications",
  certificationRoutes
);


/* =========================================================
   ADMIN LOGIN
========================================================= */

app.use(
  "/api/admin",
  adminRoutes
);


/* =========================================================
   ADMIN PRODUCTS
========================================================= */

app.use(
  "/api/admin/products",
  authMiddleware,
  productRoutes
);


/* =========================================================
   CONTACT
========================================================= */

app.use(
  "/api/contact",
  contactRoutes
);


/* =========================================================
   404 HANDLER
========================================================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});


/* =========================================================
   ERROR HANDLER
========================================================= */

app.use((error, req, res, next) => {

  console.error("SERVER ERROR:", error);

  res.status(500).json({
    success: false,
    message: error.message || "Internal server error",
  });

});


/* =========================================================
   START SERVER
========================================================= */

app.listen(PORT, () => {

  console.log(
    `Server running on http://localhost:${PORT}`
  );

  console.log(
    `Uploads available at http://localhost:${PORT}/uploads`
  );

});




// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import path from "path";

// import publiproductRoutes from "./routes/publicproductsRoutes.js";
// import inquiryRoutes from "./routes/inquiryRoutes.js";
// import contactRoutes from "./routes/contactRoutes.js";

// import productRoutes from "./routes/productRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import clientRoutes from "./routes/clientRoutes.js";
// import certificationRoutes from "./routes/certificationRoutes.js";

// import authMiddleware from "./middleware/authMiddleware.js";

// import pool from "./config/db.js";

// const app = express();

// const PORT = process.env.PORT || 5000;


// /* =========================================================
//    MIDDLEWARE
// ========================================================= */

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//   })
// );

// app.use(express.json());

// app.use(
//   express.urlencoded({
//     extended: true,
//   })
// );


// /* =========================================================
//    ROOT
// ========================================================= */

// app.get("/", (req, res) => {
//   res.json({
//     message: "Surgical Secure API is running",
//   });
// });


// /* =========================================================
//    DATABASE TEST
// ========================================================= */

// app.get("/api/test-db", async (req, res) => {
//   try {
//     const [rows] = await pool.query(
//       "SELECT 1 AS result"
//     );

//     res.json({
//       success: true,
//       message: "MySQL connection successful",
//       data: rows,
//     });

//   } catch (error) {

//     console.error(
//       "MySQL connection error:",
//       error
//     );

//     res.status(500).json({
//       success: false,
//       message: "MySQL connection failed",
//       error: error.message,
//     });
//   }
// });


// /* =========================================================
//    PUBLIC APIs
// ========================================================= */

// /*
//    PUBLIC PRODUCTS

//    GET /api/products
//    GET /api/products/:slug
// */

// app.use(
//   "/api/products",
//   publiproductRoutes
// );


// /*
//    PUBLIC INQUIRIES

//    POST /api/inquiries
// */

// app.use(
//   "/api/inquiries",
//   inquiryRoutes
// );


// /*
//    PUBLIC CLIENTS

//    GET /api/clients
//    GET /api/clients/:slug

//    If your clientRoutes contains public routes.
// */

// app.use(
//   "/api/clients",
//   clientRoutes
// );


// /*
//    PUBLIC CERTIFICATIONS

//    GET /api/certifications
//    GET /api/certifications/:slug

//    If your certificationRoutes contains public routes.
// */
// app.use(
//   "/api/certifications",
//   certificationRoutes
// );
// app.use(
//   "/api/admin/certifications",
//   certificationRoutes
// );


// /* =========================================================
//    ADMIN LOGIN
// ========================================================= */

// /*
//    IMPORTANT:

//    Login must NOT use authMiddleware.

//    POST /api/admin/login
// */

// app.use(
//   "/api/admin",
//   adminRoutes
// );


// /* =========================================================
//    PROTECTED ADMIN PRODUCT APIs
// ========================================================= */

// /*
//    These routes require a valid JWT.

//    POST   /api/admin/products
//    PUT    /api/admin/products/:id
//    DELETE /api/admin/products/:id
// */

// app.use(
//   "/api/admin/products",
//   authMiddleware,
//   productRoutes
// );


// /* =========================================================
//    START SERVER
// ========================================================= */

// app.listen(PORT, () => {
//   console.log(
//     `Server running on http://localhost:${PORT}`
//   );
// });



// //Contact form route
// app.use("/api/contact", contactRoutes);

// //uplod route
// app.use(
//   "/uploads",
//   express.static(
//     path.join(process.cwd(),"server", "uploads")
//   )
// );


// // import express from "express";
// // import cors from "cors";
// // import "dotenv/config";

// // import publiproductRoutes from "./routes/publicproductsRoutes.js";
// // import inquiryRoutes from "./routes/inquiryRoutes.js";
// // import contactRoutes from "./routes/contactRoutes.js";

// // import productRoutes from "./routes/productRoutes.js";
// // import adminRoutes from "./routes/adminRoutes.js";
// // import clientRoutes from "./routes/clientRoutes.js";
// // import certificationRoutes from "./routes/certificationRoutes.js";

// // import authMiddleware from "./middleware/authMiddleware.js";

// // import pool from "./config/db.js";

// // const app = express();

// // const PORT = process.env.PORT || 5000;


// // /* =========================================================
// //    MIDDLEWARE
// // ========================================================= */

// // app.use(
// //   cors({
// //     origin: "http://localhost:5173",
// //   })
// // );

// // app.use(express.json());

// // app.use(
// //   express.urlencoded({
// //     extended: true,
// //   })
// // );


// // /* =========================================================
// //    ROOT
// // ========================================================= */

// // app.get("/", (req, res) => {
// //   res.json({
// //     message: "Surgical Secure API is running",
// //   });
// // });


// // /* =========================================================
// //    DATABASE TEST
// // ========================================================= */

// // app.get("/api/test-db", async (req, res) => {
// //   try {
// //     const [rows] = await pool.query(
// //       "SELECT 1 AS result"
// //     );

// //     res.json({
// //       success: true,
// //       message: "MySQL connection successful",
// //       data: rows,
// //     });

// //   } catch (error) {

// //     console.error(
// //       "MySQL connection error:",
// //       error
// //     );

// //     res.status(500).json({
// //       success: false,
// //       message: "MySQL connection failed",
// //       error: error.message,
// //     });
// //   }
// // });


// // /* =========================================================
// //    PUBLIC APIs
// // ========================================================= */

// // /*
// //    PUBLIC PRODUCTS

// //    GET /api/products
// //    GET /api/products/:slug
// // */

// // app.use(
// //   "/api/products",
// //   publiproductRoutes
// // );


// // /*
// //    PUBLIC INQUIRIES

// //    POST /api/inquiries
// // */

// // app.use(
// //   "/api/inquiries",
// //   inquiryRoutes
// // );


// // /*
// //    PUBLIC CLIENTS

// //    GET /api/clients
// //    GET /api/clients/:slug

// //    If your clientRoutes contains public routes.
// // */

// // app.use(
// //   "/api/clients",
// //   clientRoutes
// // );


// // /*
// //    PUBLIC CERTIFICATIONS

// //    GET /api/certifications
// //    GET /api/certifications/:slug

// //    If your certificationRoutes contains public routes.
// // */

// // app.use(
// //   "/api/certifications",
// //   certificationRoutes
// // );


// // /* =========================================================
// //    ADMIN LOGIN
// // ========================================================= */

// // /*
// //    IMPORTANT:

// //    Login must NOT use authMiddleware.

// //    POST /api/admin/login
// // */

// // app.use(
// //   "/api/admin",
// //   adminRoutes
// // );


// // /* =========================================================
// //    PROTECTED ADMIN PRODUCT APIs
// // ========================================================= */

// // /*
// //    These routes require a valid JWT.

// //    POST   /api/admin/products
// //    PUT    /api/admin/products/:id
// //    DELETE /api/admin/products/:id
// // */

// // app.use(
// //   "/api/admin/products",
// //   authMiddleware,
// //   productRoutes
// // );


// // /* =========================================================
// //    START SERVER
// // ========================================================= */

// // app.listen(PORT, () => {
// //   console.log(
// //     `Server running on http://localhost:${PORT}`
// //   );
// // });



// // //Contact form route
// // app.use("/api/contact", contactRoutes);