import express from "express";
import pool from "../config/db.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

/*
====================================================
GET ALL PRODUCTS FOR ADMIN
GET /api/admin/products
====================================================
*/

router.get("/", authMiddleware, async (req, res) => {
  try {
    const [products] = await pool.query(`
      SELECT *
      FROM products
      ORDER BY created_at DESC
    `);

    res.json({
      success: true,
      products,
    });
  } catch (error) {
    console.error("Admin get products error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
});


/*
====================================================
ADD PRODUCT
POST /api/admin/products
====================================================
*/

router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      name,
      product_code,
      category,
      short_description,
      description,
      specifications,
      packaging,
      image_url,
      status,
    } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        success: false,
        message: "Product name and category are required",
      });
    }

    // Create slug automatically
    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    // Check duplicate slug
    const [existing] = await pool.query(
      `
      SELECT id
      FROM products
      WHERE slug = ?
      LIMIT 1
      `,
      [slug]
    );

    if (existing.length > 0) {
      return res.status(409).json({
        success: false,
        message: "A product with this name already exists",
      });
    }

    const [result] = await pool.query(
      `
      INSERT INTO products
      (
        name,
        slug,
        product_code,
        category,
        short_description,
        description,
        specifications,
        packaging,
        image_url,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        name,
        slug,
        product_code || null,
        category,
        short_description || null,
        description || null,
        specifications || null,
        packaging || null,
        image_url || null,
        status || "published",
      ]
    );

    const [newProduct] = await pool.query(
      `
      SELECT *
      FROM products
      WHERE id = ?
      `,
      [result.insertId]
    );

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: newProduct[0],
    });
  } catch (error) {
    console.error("Create product error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
});


/*
====================================================
UPDATE PRODUCT
PUT /api/admin/products/:id
====================================================
*/

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      product_code,
      category,
      short_description,
      description,
      specifications,
      packaging,
      image_url,
      status,
    } = req.body;

    if (!name || !category) {
      return res.status(400).json({
        success: false,
        message: "Product name and category are required",
      });
    }

    const slug = name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    const [existing] = await pool.query(
      `
      SELECT id
      FROM products
      WHERE id = ?
      LIMIT 1
      `,
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await pool.query(
      `
      UPDATE products
      SET
        name = ?,
        slug = ?,
        product_code = ?,
        category = ?,
        short_description = ?,
        description = ?,
        specifications = ?,
        packaging = ?,
        image_url = ?,
        status = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
      `,
      [
        name,
        slug,
        product_code || null,
        category,
        short_description || null,
        description || null,
        specifications || null,
        packaging || null,
        image_url || null,
        status || "published",
        id,
      ]
    );

    const [updatedProduct] = await pool.query(
      `
      SELECT *
      FROM products
      WHERE id = ?
      `,
      [id]
    );

    res.json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct[0],
    });
  } catch (error) {
    console.error("Update product error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
});


/*
====================================================
DELETE PRODUCT
DELETE /api/admin/products/:id
====================================================
*/

router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const [existing] = await pool.query(
      `
      SELECT id
      FROM products
      WHERE id = ?
      LIMIT 1
      `,
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    await pool.query(
      `
      DELETE FROM products
      WHERE id = ?
      `,
      [id]
    );

    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete product error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete product",
    });
  }
});

export default router;