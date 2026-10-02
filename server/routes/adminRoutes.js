import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/authMiddleware.js";
const router = express.Router();

/*
|--------------------------------------------------------------------------
| ADMIN LOGIN
|--------------------------------------------------------------------------
*/
router.get(
  "/verify",
  authMiddleware,
  (req, res) => {
    res.json({
      success: true,
      message: "Admin authentication is valid.",
      admin: req.admin,
    });
  }
);



router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and password are required.",
      });
    }

    const adminUsername = process.env.ADMIN_USERNAME;
    const adminPasswordHash =
      process.env.ADMIN_PASSWORD_HASH;

    const jwtSecret = process.env.JWT_SECRET;

    if (
      !adminUsername ||
      !adminPasswordHash ||
      !jwtSecret
    ) {
      console.error(
        "Admin authentication environment variables are missing."
      );

      return res.status(500).json({
        success: false,
        message: "Admin authentication is not configured.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | CHECK USERNAME
    |--------------------------------------------------------------------------
    */

    if (username !== adminUsername) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | CHECK PASSWORD
    |--------------------------------------------------------------------------
    */

    const passwordMatches = await bcrypt.compare(
      password,
      adminPasswordHash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        success: false,
        message: "Invalid username or password.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | CREATE JWT
    |--------------------------------------------------------------------------
    */

    const token = jwt.sign(
      {
        username: adminUsername,
        role: "admin",
      },
      jwtSecret,
      {
        expiresIn: "8h",
      }
    );

    /*
    |--------------------------------------------------------------------------
    | RESPONSE
    |--------------------------------------------------------------------------
    */

    res.json({
      success: true,
      message: "Login successful.",
      token,
      admin: {
        username: adminUsername,
        role: "admin",
      },
    });

  } catch (error) {
    console.error(
      "Admin login error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Login failed.",
    });
  }
});


/*
|--------------------------------------------------------------------------
| ADMIN LOGOUT
|--------------------------------------------------------------------------
|
| JWT logout is handled on the frontend by removing the token.
| The backend does not need a logout database request for this
| basic stateless implementation.
|--------------------------------------------------------------------------
*/


export default router;
