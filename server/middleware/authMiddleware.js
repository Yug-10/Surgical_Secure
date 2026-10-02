// import jwt from "jsonwebtoken";

// const authMiddleware = (req, res, next) => {
//   try {
//     const authHeader = req.headers.authorization;

//     if (!authHeader) {
//       return res.status(401).json({
//         success: false,
//         message: "Authorization token is required",
//       });
//     }

//     if (!authHeader.startsWith("Bearer ")) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid authorization format",
//       });
//     }

//     const token = authHeader.split(" ")[1];

//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET
//     );

//     req.admin = decoded;

//     next();
//   } catch (error) {
//     console.error("Auth error:", error.message);

//     return res.status(401).json({
//       success: false,
//       message: "Invalid or expired token",
//     });
//   }
// };

// export default authMiddleware;

import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader =
      req.headers.authorization;

    /*
    |--------------------------------------------------------------------------
    | CHECK AUTHORIZATION HEADER
    |--------------------------------------------------------------------------
    */

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authentication required.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | EXPECT:
    |
    | Authorization: Bearer TOKEN
    |--------------------------------------------------------------------------
    */

    const parts = authHeader.split(" ");

    if (
      parts.length !== 2 ||
      parts[0] !== "Bearer"
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format.",
      });
    }

    const token = parts[1];

    /*
    |--------------------------------------------------------------------------
    | VERIFY TOKEN
    |--------------------------------------------------------------------------
    */

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    /*
    |--------------------------------------------------------------------------
    | CHECK ADMIN ROLE
    |--------------------------------------------------------------------------
    */

    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required.",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | STORE ADMIN DATA
    |--------------------------------------------------------------------------
    */

    req.admin = decoded;

    next();

  } catch (error) {
    console.error(
      "Authentication error:",
      error.message
    );

    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

export default authMiddleware;
