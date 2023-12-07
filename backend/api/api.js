const mssql = require("mssql"); // Azure connector API
const express = require("express"); // Express API
const jwt = require("jwt-decode"); // JWT decoding API

// const dbConfig = require("./dbConfig"); // Config file holds DB credentials (relative path)

// Grab DB credentials from environment variables
const DB_SERVER = process.env.DB_SERVER;
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

const dbConfig = {
    server: DB_SERVER,
    database: DB_NAME,
    user: DB_USER,
    password: DB_PASSWORD,
};

const app = express();
const port = 3000;

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

// Middleware to parse JSON bodies
app.use(express.json());

// API endpoint to query the database
app.get("/api/query", async (req, res) => {
    try {
        await mssql.connect(dbConfig);
        const result = await mssql.query("SELECT * FROM LOCATIONS");
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    } finally {
        await mssql.close();
    }
});

// Handle POST request to query the Items table. Needs location ID.
app.post("/api/items/query", async (req, res) => {
    try {
        await mssql.connect(dbConfig);
        const result = await mssql.query(
            `SELECT * FROM ITEMS WHERE location_id = ${req.body.location_id}`
        );
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        res.status(500).send("Internal Server Error");
    } finally {
        await mssql.close();
    }
});

// Handle POST request to check for low stock levels. Needs location ID and a threshold.
app.post("/api/items/low-stock", async (req, res) => {
    try {
        await mssql.connect(dbConfig);
        const result = await mssql.query(
            `SELECT * FROM ITEMS WHERE location_id = ${req.body.location_id} AND quantity < ${req.body.threshold}`
        );
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        // Log info about the error
        console.log("Error occurred while querying low stock items");
        console.log(
            `location_id: ${req.body.location_id}, threshold: ${req.body.threshold}`
        );
        res.status(500).send("Internal Server Error");
    } finally {
        await mssql.close();
    }
});

// Handle POST request to update items by ID and location
app.put("/api/items/update", async (req, res) => {
    try {
        await mssql.connect(dbConfig);
        const resultUpdate = await mssql.query(
            `UPDATE ITEMS SET quantity = ${req.body.new_stock_level} WHERE item_id = ${req.body.item_id} AND location_id = ${req.body.location_id}`
        );
        const result = await mssql.query(
            `SELECT * FROM ITEMS WHERE location_id = ${req.body.location_id}`
        );
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error(err);
        // Log info about the error
        console.log("Error occurred while updating item stock level");
        console.log(
            `item_id: ${req.body.item_id}, location_id: ${req.body.location_id}, new_stock_level: ${req.body.new_stock_level}`
        );
        res.status(500).send("Internal Server Error");
    } finally {
        await mssql.close();
    }
});

// Handle PUT request to add items
app.put("/api/items/update/add", async (req, res) => {
    try {
        await mssql.connect(dbConfig);

        let new_quantity = req.body.add_quantity;
        const newStockLevel =
            req.body.current_stock_level + req.body.adjustment + new_quantity;

        const resultUpdate = await mssql.query(
            `UPDATE EMERGENCY_PACKS SET quantity = ${newStockLevel} WHERE pack_id = ${req.body.pack_id} AND location_id = ${req.body.location_id}`
        );
        const result = await mssql.query(
            `SELECT * FROM ITEMS WHERE location_id = ${req.body.location_id}`
        );
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error(err);
        // Log info about the error
        console.log("Error occurred while updating epack stock level");
        console.log(
            `pack_id: ${req.body.pack_id}, location_id: ${req.body.location_id}, new_stock_level: ${req.body.new_stock_level}`
        );
        res.status(500).send("Internal Server Error");
    } finally {
        await mssql.close();
    }
});

// Handle PUT request to subtract items
app.put("/api/items/update/subtract", async (req, res) => {
    try {
        await mssql.connect(dbConfig);

        let subtract_quantity = req.body.subtract_quantity;
        const newStockLevel =
            req.body.current_stock_level +
            req.body.adjustment -
            subtract_quantity;
        const resultUpdate = await mssql.query(
            `UPDATE EMERGENCY_PACKS SET quantity = ${newStockLevel} WHERE pack_id = ${req.body.pack_id} AND location_id = ${req.body.location_id}`
        );
        const result = await mssql.query(
            `SELECT * FROM ITEMS WHERE location_id = ${req.body.location_id}`
        );
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error(err);
        // Log info about the error
        console.log("Error occurred while updating epack stock level");
        console.log(
            `pack_id: ${req.body.pack_id}, location_id: ${req.body.location_id}, new_stock_level: ${req.body.new_stock_level}`
        );
        res.status(500).send("Internal Server Error");
    } finally {
        await mssql.close();
    }
});

// Handle POST request to query all epacks
app.post("/api/epacks/query", async (req, res) => {
    try {
        await mssql.connect(dbConfig);
        const result = await mssql.query(
            `SELECT LOCATIONS.name AS location_name, EMERGENCY_PACKS.quantity, EMERGENCY_PACKS.pack_id, EMERGENCY_PACKS.location_id FROM EMERGENCY_PACKS JOIN LOCATIONS ON EMERGENCY_PACKS.location_id = LOCATIONS.location_id;`
        );
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        // Log info about the error
        console.log("Error occurred while querying epacks");
        res.status(500).send("Internal Server Error");
    } finally {
        await mssql.close();
    }
});

// Handle PUT request to update epack by ID and location
app.put("/api/epacks/update", async (req, res) => {
    try {
        await mssql.connect(dbConfig);
        const resultUpdate = await mssql.query(
            `UPDATE EMERGENCY_PACKS SET quantity = ${req.body.new_stock_level} WHERE pack_id = ${req.body.pack_id} AND location_id = ${req.body.location_id}`
        );
        const result = await mssql.query(
            `SELECT LOCATIONS.name AS location_name, quantity FROM EMERGENCY_PACKS JOIN LOCATIONS ON EMERGENCY_PACKS.location_id = LOCATIONS.location_id;`
        );
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error(err);
        // Log info about the error
        console.log("Error occurred while updating epack stock level");
        console.log(
            `pack_id: ${req.body.pack_id}, location_id: ${req.body.location_id}, new_stock_level: ${req.body.new_stock_level}`
        );
        res.status(500).send("Internal Server Error");
    } finally {
        await mssql.close();
    }
});

// Handle PUT request to add new epack by ID and location
app.put("/api/epacks/update/add", async (req, res) => {
    try {
        await mssql.connect(dbConfig);

        let new_quantity = req.body.add_quantity;
        const newStockLevel =
            req.body.current_stock_level + req.body.adjustment + new_quantity;
        const resultUpdate = await mssql.query(
            `UPDATE EMERGENCY_PACKS SET quantity = ${newStockLevel} WHERE pack_id = ${req.body.pack_id} AND location_id = ${req.body.location_id}`
        );
        const result = await mssql.query(
            `SELECT LOCATIONS.name AS location_name, quantity FROM EMERGENCY_PACKS JOIN LOCATIONS ON EMERGENCY_PACKS.location_id = LOCATIONS.location_id;`
        );
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error(err);
        // Log info about the error
        console.log("Error occurred while updating epack stock level");
        console.log(
            `pack_id: ${req.body.pack_id}, location_id: ${req.body.location_id}, new_stock_level: ${req.body.new_stock_level}`
        );
        res.status(500).send("Internal Server Error");
    } finally {
        await mssql.close();
    }
});

// Handle PUT request to subtract new epack by ID and location
app.put("/api/epacks/update/subtract", async (req, res) => {
    try {
        await mssql.connect(dbConfig);

        let subtract_quantity = req.body.subtract_quantity;
        const newStockLevel =
            req.body.current_stock_level +
            req.body.adjustment -
            subtract_quantity;
        const resultUpdate = await mssql.query(
            `UPDATE EMERGENCY_PACKS SET quantity = ${newStockLevel} WHERE pack_id = ${req.body.pack_id} AND location_id = ${req.body.location_id}`
        );
        const result = await mssql.query(
            `SELECT LOCATIONS.name AS location_name, quantity FROM EMERGENCY_PACKS JOIN LOCATIONS ON EMERGENCY_PACKS.location_id = LOCATIONS.location_id;`
        );
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error(err);
        // Log info about the error
        console.log("Error occurred while updating epack stock level");
        console.log(
            `pack_id: ${req.body.pack_id}, location_id: ${req.body.location_id}, new_stock_level: ${req.body.new_stock_level}`
        );
        res.status(500).send("Internal Server Error");
    } finally {
        await mssql.close();
    }
});

// Handle POST request to check for low epack levels
app.post("/api/epacks/low-stock", async (req, res) => {
    try {
        await mssql.connect(dbConfig);
        const result = await mssql.query(
            `SELECT * FROM EMERGENCY_PACKS WHERE location_id = ${req.body.location_id} AND quantity < ${req.body.threshold}`
        );
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        // Log info about the error
        console.log("Error occurred while querying low stock epacks");
        console.log(
            `location_id: ${req.body.location_id}, threshold: ${req.body.threshold}`
        );
        res.status(500).send("Internal Server Error");
    } finally {
        await mssql.close();
    }
});

// Handle POST request to check for empty epack levels
app.post("/api/epacks/empty", async (req, res) => {
    try {
        await mssql.connect(dbConfig);
        const result = await mssql.query(
            `SELECT * FROM EMERGENCY_PACKS WHERE location_id = ${req.body.location_id} AND quantity = 0`
        );
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        // Log info about the error
        console.log("Error occurred while querying empty epacks");
        console.log(`location_id: ${req.body.location_id}`);
        res.status(500).send("Internal Server Error");
    } finally {
        await mssql.close();
    }
});

// Handle POST request to query all admins
app.post("/api/admins/query", async (req, res) => {
    try {
        await mssql.connect(dbConfig);
        const result = await mssql.query(`SELECT * FROM ADMINS`);
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        // Log info about the error
        console.log("Error occurred while querying admins");
        res.status(500).send("Internal Server Error");
    } finally {
        await mssql.close();
    }
});

// Handle POST request to query specific admin by ID (PawPrint)
app.post("/api/admins/query/id", async (req, res) => {
    try {
        await mssql.connect(dbConfig);
        const result = await mssql.query(
            `SELECT * FROM ADMINS WHERE admin_id = '${req.body.admin_id}'`
        );
        res.json(result.recordset);
    } catch (err) {
        console.error(err);
        // Log info about the error
        console.log(
            `Error occurred while querying admin with admin_id: ${req.body.admin_id}`
        );
        res.status(500).send("Internal Server Error");
    } finally {
        await mssql.close();
    }
});

// Handle PUT request to add new admin by ID (PawPrint) and permission level
app.put("/api/admins/add", async (req, res) => {
    try {
        await mssql.connect(dbConfig);

        // Ensure admin_id is lowercase
        let admin_id = req.body.admin_id.toLowerCase();

        // Ensure permission level is one of three options: admin, volunteer, or epack
        if (
            req.body.permission_level !== "admin" &&
            req.body.permission_level !== "volunteer" &&
            req.body.permission_level !== "epack"
        ) {
            throw "Invalid permission level";
        }

        // Check if admin already exists in current database
        const currentResult = await mssql.query(`SELECT * FROM ADMINS`);

        // If admin already exists, return 400 error
        for (let i = 0; i < currentResult.recordset.length; i++) {
            if (currentResult.recordset[i].admin_id === admin_id) {
                throw "Admin already exists. Must delete existing entry first.";
            }
        }

        const resultAdd = await mssql.query(
            `INSERT INTO ADMINS (admin_id, permission_level) VALUES ('${admin_id}', '${req.body.permission_level}')`
        );
        const result = await mssql.query(`SELECT * FROM ADMINS`);
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error(err);
        // Log info about the error
        console.log("Error occurred while adding admin");
        console.log(
            `admin_id: ${req.body.admin_id}, permission_level: ${req.body.permission_level}`
        );
        if (err == "Invalid permission level") {
            res.status(400).send("Invalid permission level");
        } else if (
            err == "Admin already exists. Must delete existing entry first."
        ) {
            res.status(400).send(
                "Admin already exists. Must delete existing entry first."
            );
        } else {
            res.status(500).send("Internal Server Error");
        }
    } finally {
        await mssql.close();
    }
});

// Handle DELETE request to remove an admin by ID (PawPrint)
app.delete("/api/admins/delete", async (req, res) => {
    try {
        await mssql.connect(dbConfig);

        // Ensure admin_id is lowercase
        let admin_id = req.body.admin_id.toLowerCase();

        const resultUpdate = await mssql.query(
            `DELETE FROM ADMINS WHERE admin_id = '${admin_id}'`
        );
        const result = await mssql.query(`SELECT * FROM ADMINS`);
        res.status(200).json(result.recordset);
    } catch (err) {
        console.error(err);
        // Log info about the error
        console.log("Error occurred while deleting admin");
        console.log(`admin_id: ${req.body.admin_id}`);
        res.status(500).send("Internal Server Error");
    } finally {
        await mssql.close();
    }
});

// Handle POST request to authenticate a user via Google OAuth 2.0. Takes in a token and returns permission level.
app.post("/api/login/oauth", async (req, res) => {
    try {
        // Decode the Google ID token
        const decodedToken = jwt(req.body.token);

        // Verify hd (hosted domain) is umsystem.edu, missouri.edu, umsl.edu, umkc.edu, or mst.edu
        if (
            decodedToken.hd !== "umsystem.edu" &&
            decodedToken.hd !== "missouri.edu" &&
            decodedToken.hd !== "umsl.edu" &&
            decodedToken.hd !== "umkc.edu" &&
            decodedToken.hd !== "mst.edu"
        ) {
            throw "Invalid hosted domain";
        }

        // Grab PawPrint from email
        let pawprint = decodedToken.email.split("@")[0].toLowerCase();

        // Determine if the user is an admin, volunteer, epack, or none of the above
        let permissionLevel;
        await mssql.connect(dbConfig);
        const result = await mssql.query(
            `SELECT * FROM ADMINS WHERE admin_id = '${pawprint}'`
        );
        if (result.recordset.length > 0) {
            permissionLevel = result.recordset[0].permission_level;
        } else {
            permissionLevel = "none";
        }

        // Ensure permission level is one of three options: admin, volunteer, or epack
        if (
            permissionLevel !== "admin" &&
            permissionLevel !== "volunteer" &&
            permissionLevel !== "epack"
        ) {
            throw "Invalid permission level";
        }

        // Return the permission level, PawPrint, and name
        res.status(200).json({
            permissionLevel: permissionLevel,
            pawprint: pawprint,
            name: decodedToken.name,
        });
    } catch (err) {
        console.error(err);
        // Log info about the error
        console.log("Error occurred while authenticating user");
        console.log(`token: ${req.body.token}`);

        if (err == "Invalid hosted domain") {
            res.status(400).send("Invalid hosted domain");
        } else if (err == "Invalid permission level") {
            res.status(400).send("Invalid permission level");
        } else {
            res.status(500).send("Internal Server Error");
        }
    } finally {
        await mssql.close();
    }
});

// // Handle LDAP authentication

// const ldap = require('ldapjs');

// // Middleware to parse JSON
// app.use(express.json());

// // LDAP server configuration
// const ldapServer = 'ldap://umad.umsystem.edu:3268';
// const ldapBaseDN = 'DC=umad,DC=umsystem,DC=edu';

// // API endpoint for LDAP authentication
// app.post('/api/login', (req, res) => {
//   const { username, password } = req.body;

//   // Create an LDAP client
//   const client = ldap.createClient({
//     url: ldapServer,
//   });

//   // Attempt to bind with the provided credentials
//   client.bind(`CN=${username},OU=Distribution Groups,OU=UM,OU=UMAD Groups,${ldapBaseDN}`, password, (err) => {
//     if (err) {
//       // LDAP authentication failed
//       console.error('LDAP Authentication Failed:', err);
//       res.status(401).json({ error: 'Authentication failed' });
//     } else {
//       // LDAP authentication successful
//       console.log('LDAP Authentication Successful');

//       // Check the user's role and route to the appropriate page
//       let pageToRedirect;

//       switch (username) {
//         case 'gc_tigerpantryprofiler_admin':
//           pageToRedirect = '/admin', '/items', '/epacks'; // Route for admin page
//           break;
//         case 'gc_tigerpantryprofiler_volunteer':
//           pageToRedirect = '/items', '/epacks'; // Route for volunteer page
//           break;
//         case 'gc_tigerpantryprofiler_epack':
//           pageToRedirect = '/epacks'; // Route for ePack page
//           break;
//         default:
//           pageToRedirect = '/'; // Default route (modify as needed)
//       }

//       // Close the LDAP connection
//       client.unbind();

//       // Respond with the route to redirect to
//       res.json({ redirectTo: pageToRedirect });
//     }
//   });
// });

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
