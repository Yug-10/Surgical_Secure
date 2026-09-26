import express from "express";
import cors from "cors";
import "dotenv/config";

import inquiryRoutes from "./routes/inquiryRoutes.js";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Surgical Secure API is running",
  });
});

app.use("/api/inquiries", inquiryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});