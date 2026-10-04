import express from "express";
import cors from "cors";
import "dotenv/config";

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
   PUBLIC APIs
========================================================= */

/*
   PUBLIC PRODUCTS

   GET /api/products
   GET /api/products/:slug
*/

app.use(
  "/api/products",
  publiproductRoutes
);


/*
   PUBLIC INQUIRIES

   POST /api/inquiries
*/

app.use(
  "/api/inquiries",
  inquiryRoutes
);


/*
   PUBLIC CLIENTS

   GET /api/clients
   GET /api/clients/:slug

   If your clientRoutes contains public routes.
*/

app.use(
  "/api/clients",
  clientRoutes
);


/*
   PUBLIC CERTIFICATIONS

   GET /api/certifications
   GET /api/certifications/:slug

   If your certificationRoutes contains public routes.
*/

app.use(
  "/api/certifications",
  certificationRoutes
);


/* =========================================================
   ADMIN LOGIN
========================================================= */

/*
   IMPORTANT:

   Login must NOT use authMiddleware.

   POST /api/admin/login
*/

app.use(
  "/api/admin",
  adminRoutes
);


/* =========================================================
   PROTECTED ADMIN PRODUCT APIs
========================================================= */

/*
   These routes require a valid JWT.

   POST   /api/admin/products
   PUT    /api/admin/products/:id
   DELETE /api/admin/products/:id
*/

app.use(
  "/api/admin/products",
  authMiddleware,
  productRoutes
);


/* =========================================================
   START SERVER
========================================================= */

app.listen(PORT, () => {
  console.log(
    `Server running on http://localhost:${PORT}`
  );
});



//Contact form route
app.use("/api/contact", contactRoutes);