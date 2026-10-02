import express from "express";
import pool from "../config/db.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| PUBLIC - GET PUBLISHED CERTIFICATIONS
|--------------------------------------------------------------------------
*/

router.get("/", async (req, res) => {
  try {
    const [certifications] = await pool.query(`
      SELECT
        id,
        name,
        slug,
        description,
        certificate_number,
        issue_date,
        expiry_date,
        document_url,
        status,
        created_at,
        updated_at
      FROM certifications
      WHERE status = 'published'
      ORDER BY created_at DESC
    `);

    res.json({
      success: true,
      certifications,
    });

  } catch (error) {
    console.error("Get certifications error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch certifications",
    });
  }
});


/*
|--------------------------------------------------------------------------
| PUBLIC - GET ONE CERTIFICATION
|--------------------------------------------------------------------------
*/

router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    const [certifications] = await pool.query(
      `
      SELECT *
      FROM certifications
      WHERE slug = ?
      AND status = 'published'
      LIMIT 1
      `,
      [slug]
    );

    if (certifications.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Certification not found",
      });
    }

    res.json({
      success: true,
      certification: certifications[0],
    });

  } catch (error) {
    console.error("Get certification error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch certification",
    });
  }
});


/*
|--------------------------------------------------------------------------
| ADMIN - GET ALL CERTIFICATIONS
|--------------------------------------------------------------------------
*/

router.get("/admin/all", async (req, res) => {
  try {
    const [certifications] = await pool.query(`
      SELECT *
      FROM certifications
      ORDER BY created_at DESC
    `);

    res.json({
      success: true,
      certifications,
    });

  } catch (error) {
    console.error("Admin get certifications error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch certifications",
    });
  }
});


/*
|--------------------------------------------------------------------------
| ADMIN - ADD CERTIFICATION
|--------------------------------------------------------------------------
*/

router.post("/admin", async (req, res) => {
  try {
    const {
      name,
      slug,
      description,
      certificate_number,
      issue_date,
      expiry_date,
      document_url,
      status,
    } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: "Certification name and slug are required",
      });
    }

    const certificationStatus = status || "published";

    const [result] = await pool.query(
      `
      INSERT INTO certifications
      (
        name,
        slug,
        description,
        certificate_number,
        issue_date,
        expiry_date,
        document_url,
        status
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        name,
        slug,
        description || null,
        certificate_number || null,
        issue_date || null,
        expiry_date || null,
        document_url || null,
        certificationStatus,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Certification added successfully",
      certificationId: result.insertId,
    });

  } catch (error) {
    console.error("Add certification error:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "A certification with this slug already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to add certification",
    });
  }
});


/*
|--------------------------------------------------------------------------
| ADMIN - UPDATE CERTIFICATION
|--------------------------------------------------------------------------
*/

router.put("/admin/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      slug,
      description,
      certificate_number,
      issue_date,
      expiry_date,
      document_url,
      status,
    } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: "Certification name and slug are required",
      });
    }

    const certificationStatus = status || "published";

    const [result] = await pool.query(
      `
      UPDATE certifications
      SET
        name = ?,
        slug = ?,
        description = ?,
        certificate_number = ?,
        issue_date = ?,
        expiry_date = ?,
        document_url = ?,
        status = ?
      WHERE id = ?
      `,
      [
        name,
        slug,
        description || null,
        certificate_number || null,
        issue_date || null,
        expiry_date || null,
        document_url || null,
        certificationStatus,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Certification not found",
      });
    }

    res.json({
      success: true,
      message: "Certification updated successfully",
    });

  } catch (error) {
    console.error("Update certification error:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "A certification with this slug already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to update certification",
    });
  }
});


/*
|--------------------------------------------------------------------------
| ADMIN - DELETE CERTIFICATION
|--------------------------------------------------------------------------
*/

router.delete("/admin/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      `
      DELETE FROM certifications
      WHERE id = ?
      `,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Certification not found",
      });
    }

    res.json({
      success: true,
      message: "Certification deleted successfully",
    });

  } catch (error) {
    console.error("Delete certification error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete certification",
    });
  }
});


export default router;
