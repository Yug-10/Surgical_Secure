import express from "express";
import pool from "../config/db.js";

const router = express.Router();

// GET ALL PUBLISHED PRODUCTS
router.get("/", async (req, res) => {
  try {
    const [products] = await pool.query(`
      SELECT *
      FROM products
      WHERE status = 'published'
      ORDER BY created_at DESC
    `);

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Get public products error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
});


// GET ONE PUBLISHED PRODUCT
router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    console.log("Public product requested:", slug);

    const [products] = await pool.query(
      `
      SELECT *
      FROM products
      WHERE slug = ?
      AND status = 'published'
      LIMIT 1
      `,
      [slug]
    );

    console.log("Database result:", products);

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product: products[0],
    });

  } catch (error) {
    console.error("Get public product error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
});

export default router;