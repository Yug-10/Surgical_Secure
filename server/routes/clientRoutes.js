import express from "express";
import pool from "../config/db.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| PUBLIC - GET ALL PUBLISHED CLIENTS
|--------------------------------------------------------------------------
|
| Used by:
|   /clients
|
| Only published clients are returned.
|
*/

router.get("/", async (req, res) => {
  try {
    const [clients] = await pool.query(`
      SELECT
        id,
        name,
        slug,
        logo_url,
        website,
        description,
        status,
        show_on_homepage,
        created_at,
        updated_at
      FROM clients
      WHERE status = 'published'
      ORDER BY created_at DESC
    `);

    res.json({
      success: true,
      clients,
    });

  } catch (error) {
    console.error("Get clients error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch clients",
    });
  }
});


/*
|--------------------------------------------------------------------------
| PUBLIC - GET ONE CLIENT BY SLUG
|--------------------------------------------------------------------------
*/

router.get("/:slug", async (req, res) => {
  try {
    const { slug } = req.params;

    console.log("Requested client slug:", slug);

    const [clients] = await pool.query(
      `
      SELECT
        id,
        name,
        slug,
        logo_url,
        website,
        description,
        status,
        show_on_homepage,
        created_at,
        updated_at
      FROM clients
      WHERE slug = ?
      AND status = 'published'
      LIMIT 1
      `,
      [slug]
    );

    if (clients.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    res.json({
      success: true,
      client: clients[0],
    });

  } catch (error) {
    console.error("Get client error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch client",
    });
  }
});


/*
|--------------------------------------------------------------------------
| ADMIN - GET ALL CLIENTS
|--------------------------------------------------------------------------
|
| Includes published AND draft clients.
|
*/

router.get("/admin/all", async (req, res) => {
  try {
    const [clients] = await pool.query(`
      SELECT
        id,
        name,
        slug,
        logo_url,
        website,
        description,
        status,
        show_on_homepage,
        created_at,
        updated_at
      FROM clients
      ORDER BY created_at DESC
    `);

    res.json({
      success: true,
      clients,
    });

  } catch (error) {
    console.error("Admin get clients error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch clients",
    });
  }
});


/*
|--------------------------------------------------------------------------
| ADMIN - ADD CLIENT
|--------------------------------------------------------------------------
|
| Published:
|   show_on_homepage = 1
|
| Draft:
|   show_on_homepage = 0
|
*/

router.post("/admin", async (req, res) => {
  try {
    const {
      name,
      slug,
      logo_url,
      website,
      description,
      status,
    } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: "Client name and slug are required",
      });
    }

    // Default to published if status is not supplied
    const clientStatus = status || "published";

    // Published clients automatically appear on homepage
    const showOnHomepage =
      clientStatus === "published" ? 1 : 0;

    const [result] = await pool.query(
      `
      INSERT INTO clients
      (
        name,
        slug,
        logo_url,
        website,
        description,
        status,
        show_on_homepage
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      [
        name,
        slug,
        logo_url || null,
        website || null,
        description || null,
        clientStatus,
        showOnHomepage,
      ]
    );

    res.status(201).json({
      success: true,
      message: "Client added successfully",
      clientId: result.insertId,
      show_on_homepage: showOnHomepage,
    });

  } catch (error) {
    console.error("Add client error:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "A client with this slug already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Failed to add client",
    });
  }
});


/*
|--------------------------------------------------------------------------
| ADMIN - UPDATE CLIENT
|--------------------------------------------------------------------------
|
| Published:
|   show_on_homepage = 1
|
| Draft:
|   show_on_homepage = 0
|
*/

router.put("/admin/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      name,
      slug,
      logo_url,
      website,
      description,
      status,
    } = req.body;

    if (!name || !slug) {
      return res.status(400).json({
        success: false,
        message: "Client name and slug are required",
      });
    }

    const clientStatus = status || "published";

    // Automatically control homepage visibility
    const showOnHomepage =
      clientStatus === "published" ? 1 : 0;

    const [result] = await pool.query(
      `
      UPDATE clients
      SET
        name = ?,
        slug = ?,
        logo_url = ?,
        website = ?,
        description = ?,
        status = ?,
        show_on_homepage = ?
      WHERE id = ?
      `,
      [
        name,
        slug,
        logo_url || null,
        website || null,
        description || null,
        clientStatus,
        showOnHomepage,
        id,
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    res.json({
      success: true,
      message: "Client updated successfully",
      show_on_homepage: showOnHomepage,
    });

  } catch (error) {
    console.error("Update client error:", error);

    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        message: "A client with this slug already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: error.message || "Failed to update client",
    });
  }
});


/*
|--------------------------------------------------------------------------
| ADMIN - DELETE CLIENT
|--------------------------------------------------------------------------
*/

router.delete("/admin/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      `
      DELETE FROM clients
      WHERE id = ?
      `,
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    res.json({
      success: true,
      message: "Client deleted successfully",
    });

  } catch (error) {
    console.error("Delete client error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete client",
    });
  }
});


export default router;

// import express from "express";
// import pool from "../config/db.js";

// const router = express.Router();

// /*
// |--------------------------------------------------------------------------
// | PUBLIC - GET ALL PUBLISHED CLIENTS
// |--------------------------------------------------------------------------
// */

// router.get("/", async (req, res) => {
//   try {
//     const [clients] = await pool.query(`
//       SELECT *
//       FROM clients
//       WHERE status = 'published'
//       ORDER BY created_at DESC
//     `);

//     res.json({
//       success: true,
//       clients,
//     });

//   } catch (error) {
//     console.error("Get clients error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch clients",
//     });
//   }
// });


// /*
// |--------------------------------------------------------------------------
// | PUBLIC - GET ONE CLIENT
// |--------------------------------------------------------------------------
// */

// router.get("/:slug", async (req, res) => {
//   try {
//     const { slug } = req.params;

//     const [clients] = await pool.query(
//       `
//       SELECT *
//       FROM clients
//       WHERE slug = ?
//       AND status = 'published'
//       LIMIT 1
//       `,
//       [slug]
//     );

//     if (clients.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Client not found",
//       });
//     }

//     res.json({
//       success: true,
//       client: clients[0],
//     });

//   } catch (error) {
//     console.error("Get client error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch client",
//     });
//   }
// });


// /*
// |--------------------------------------------------------------------------
// | ADMIN - GET ALL CLIENTS
// |--------------------------------------------------------------------------
// */

// router.get("/admin/all", async (req, res) => {
//   try {
//     const [clients] = await pool.query(`
//       SELECT *
//       FROM clients
//       ORDER BY created_at DESC
//     `);

//     res.json({
//       success: true,
//       clients,
//     });

//   } catch (error) {
//     console.error("Admin get clients error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch clients",
//     });
//   }
// });


// /*
// |--------------------------------------------------------------------------
// | ADMIN - ADD CLIENT
// |--------------------------------------------------------------------------
// */

// router.post("/admin", async (req, res) => {
//   try {
//     const {
//       name,
//       slug,
//       logo_url,
//       website,
//       description,
//       status,
//     } = req.body;

//     if (!name || !slug) {
//       return res.status(400).json({
//         success: false,
//         message: "Client name and slug are required",
//       });
//     }

//     const [result] = await pool.query(
//       `
//       INSERT INTO clients
//       (
//         name,
//         slug,
//         logo_url,
//         website,
//         description,
//         status
//       )
//       VALUES (?, ?, ?, ?, ?, ?)
//       `,
//       [
//         name,
//         slug,
//         logo_url || null,
//         website || null,
//         description || null,
//         status || "published",
//       ]
//     );

//     res.status(201).json({
//       success: true,
//       message: "Client added successfully",
//       clientId: result.insertId,
//     });

//   } catch (error) {
//     console.error("Add client error:", error);

//     if (error.code === "ER_DUP_ENTRY") {
//       return res.status(409).json({
//         success: false,
//         message: "A client with this slug already exists",
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: "Failed to add client",
//     });
//   }
// });


// /*
// |--------------------------------------------------------------------------
// | ADMIN - UPDATE CLIENT
// |--------------------------------------------------------------------------
// */

// router.put("/admin/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const {
//       name,
//       slug,
//       logo_url,
//       website,
//       description,
//       status,
//     } = req.body;

//     if (!name || !slug) {
//       return res.status(400).json({
//         success: false,
//         message: "Client name and slug are required",
//       });
//     }

//     const [result] = await pool.query(
//       `
//       UPDATE clients
//       SET
//         name = ?,
//         slug = ?,
//         logo_url = ?,
//         website = ?,
//         description = ?,
//         status = ?
//       WHERE id = ?
//       `,
//       [
//         name,
//         slug,
//         logo_url || null,
//         website || null,
//         description || null,
//         status || "published",
//         id,
//       ]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Client not found",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Client updated successfully",
//     });

//   } catch (error) {
//     console.error("Update client error:", error);

//     if (error.code === "ER_DUP_ENTRY") {
//       return res.status(409).json({
//         success: false,
//         message: "A client with this slug already exists",
//       });
//     }

//     res.status(500).json({
//       success: false,
//       message: "Failed to update client",
//     });
//   }
// });


// /*
// |--------------------------------------------------------------------------
// | ADMIN - DELETE CLIENT
// |--------------------------------------------------------------------------
// */

// router.delete("/admin/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const [result] = await pool.query(
//       `
//       DELETE FROM clients
//       WHERE id = ?
//       `,
//       [id]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "Client not found",
//       });
//     }

//     res.json({
//       success: true,
//       message: "Client deleted successfully",
//     });

//   } catch (error) {
//     console.error("Delete client error:", error);

//     res.status(500).json({
//       success: false,
//       message: "Failed to delete client",
//     });
//   }
// });


// export default router;
