import express from "express";
import db from "../config/db.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| PUBLIC - CREATE INQUIRY
|--------------------------------------------------------------------------
*/

router.post("/", async (req, res) => {
  console.log("Received inquiry:", req.body);

  try {
    const {
      name,
      company,
      email,
      phone,
      country,
      product,
      quantity,
      requirements,
    } = req.body;

    if (!name || !email || !product || !quantity) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    const [result] = await db.execute(
      `
      INSERT INTO inquiries
      (
        name,
        company,
        email,
        phone,
        country,
        product,
        quantity,
        requirements
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        name,
        company || null,
        email,
        phone || null,
        country || null,
        product,
        quantity,
        requirements || null,
      ]
    );

    console.log(
      "Inquiry inserted:",
      result.insertId
    );

    res.status(201).json({
      success: true,
      message: "Inquiry submitted successfully.",
      inquiryId: result.insertId,
    });

  } catch (error) {
    console.error("MYSQL ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit inquiry.",
      error: error.message,
    });
  }
});


/*
|--------------------------------------------------------------------------
| ADMIN - GET ALL INQUIRIES
|--------------------------------------------------------------------------
*/

router.get("/", async (req, res) => {
  try {
    const [inquiries] = await db.execute(
      `
      SELECT *
      FROM inquiries
      ORDER BY created_at DESC
      `
    );

    res.json({
      success: true,
      inquiries,
    });

  } catch (error) {
    console.error(
      "Get inquiries error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch inquiries.",
    });
  }
});


/*
|--------------------------------------------------------------------------
| ADMIN - GET ONE INQUIRY
|--------------------------------------------------------------------------
*/

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [inquiries] = await db.execute(
      `
      SELECT *
      FROM inquiries
      WHERE id = ?
      LIMIT 1
      `,
      [id]
    );

    if (inquiries.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found.",
      });
    }

    res.json({
      success: true,
      inquiry: inquiries[0],
    });

  } catch (error) {
    console.error(
      "Get inquiry error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch inquiry.",
    });
  }
});


/*
|--------------------------------------------------------------------------
| ADMIN - UPDATE INQUIRY STATUS
|--------------------------------------------------------------------------
*/

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "new",
      "contacted",
      "quoted",
      "confirmed",
      "completed",
      "cancelled",
    ];

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required.",
      });
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid inquiry status.",
      });
    }

    const [result] = await db.execute(
      `
      UPDATE inquiries
      SET status = ?
      WHERE id = ?
      `,
      [status, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found.",
      });
    }

    res.json({
      success: true,
      message: "Inquiry status updated successfully.",
    });

  } catch (error) {
    console.error(
      "Update inquiry error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to update inquiry.",
    });
  }
});


/*
|--------------------------------------------------------------------------
| ADMIN - DELETE INQUIRY
|--------------------------------------------------------------------------
*/

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await db.execute(
      `
      DELETE FROM inquiries
      WHERE id = ?
      `,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Inquiry not found.",
      });
    }

    res.json({
      success: true,
      message: "Inquiry deleted successfully.",
    });

  } catch (error) {
    console.error(
      "Delete inquiry error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to delete inquiry.",
    });
  }
});


export default router;