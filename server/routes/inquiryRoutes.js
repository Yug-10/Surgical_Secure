// import express from "express";
// import db from "../config/db.js";

// const router = express.Router();

// // Create inquiry
// router.post("/", async (req, res) => {
//   try {
//     const {
//       name,
//       company,
//       email,
//       phone,
//       country,
//       product,
//       quantity,
//       requirements,
//     } = req.body;

//     if (!name || !email || !product || !quantity) {
//       return res.status(400).json({
//         message: "Please fill in all required fields.",
//       });
//     }

//     const [result] = await db.execute(
//       `
//       INSERT INTO inquiries
//       (
//         name,
//         company,
//         email,
//         phone,
//         country,
//         product,
//         quantity,
//         requirements
//       )
//       VALUES (?, ?, ?, ?, ?, ?, ?, ?)
//       `,
//       [
//         name,
//         company || null,
//         email,
//         phone || null,
//         country || null,
//         product,
//         quantity,
//         requirements || null,
//       ]
//     );

//     res.status(201).json({
//       message: "Inquiry submitted successfully.",
//       inquiryId: result.insertId,
//     });
//   } catch (error) {
//     console.error("Inquiry error:", error);

//     res.status(500).json({
//       message: "Something went wrong while submitting your inquiry.",
//     });
//   }
// });

// export default router;
import express from "express";
import db from "../config/db.js";

const router = express.Router();

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
        message: "Please fill in all required fields.",
      });
    }

    console.log("Attempting MySQL insert...");

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

    console.log("Inquiry inserted:", result.insertId);

    res.status(201).json({
      message: "Inquiry submitted successfully.",
      inquiryId: result.insertId,
    });

  } catch (error) {
    console.error("================================");
    console.error("MYSQL ERROR:");
    console.error(error);
    console.error("================================");

    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;