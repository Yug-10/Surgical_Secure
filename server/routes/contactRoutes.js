import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: false,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      company,
      phone,
      subject,
      message,
    } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required.",
      });
    }

    await transporter.sendMail({
      from: `"Surgical Secure Website" <${process.env.MAIL_USER}>`,

      to: process.env.MAIL_TO,

      replyTo: email,

      subject:
        subject || `New Contact Inquiry - ${name}`,

      text: `
New Contact Inquiry

Name: ${name}
Email: ${email}
Company: ${company || "Not provided"}
Phone: ${phone || "Not provided"}
Subject: ${subject || "General Inquiry"}

Message:
${message}
      `,
    });

    res.status(200).json({
      success: true,
      message: "Your message has been sent successfully.",
    });

  } catch (error) {
    console.error("Contact email error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to send your message.",
    });
  }
});

export default router;