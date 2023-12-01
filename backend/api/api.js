const mssql = require("mssql"); // Azure connector API
const bcrypt = require("bcrypt"); // Password encryption API
const express = require("express"); // Express API

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
        const result = await mssql.query(
            `UPDATE ITEMS SET quantity = ${req.body.new_stock_level} WHERE item_id = ${req.body.item_id} AND location_id = ${req.body.location_id}`
        );
        res.json(result.recordset);
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

// Handle put request to add items

app.put("/api/items/update/add", async (req, res) => {
    try {
        await mssql.connect(dbConfig);

        let new_quantity = req.body.add_quantity;
        const newStockLevel = req.body.current_stock_level + req.body.adjustment + new_quantity;

        const result = await mssql.query(
            `UPDATE EMERGENCY_PACKS SET quantity = ${newStockLevel} WHERE pack_id = ${req.body.pack_id} AND location_id = ${req.body.location_id}`
        );
        res.json(result.recordset);
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

// Handle put request to subtract items 

app.put("/api/items/update/subtract", async (req, res) => {
    try {
        await mssql.connect(dbConfig);

        let subtract_quantity = req.body.subtract_quantity;
        const newStockLevel = req.body.current_stock_level + req.body.adjustment - subtract_quantity;

        const result = await mssql.query(
            `UPDATE EMERGENCY_PACKS SET quantity = ${newStockLevel} WHERE pack_id = ${req.body.pack_id} AND location_id = ${req.body.location_id}`
        );
        res.json(result.recordset);
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
            `SELECT LOCATIONS.name AS location_name, quantity FROM EMERGENCY_PACKS JOIN LOCATIONS ON EMERGENCY_PACKS.location_id = LOCATIONS.location_id;`
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

// Handle Put request to update epack by ID and location
app.put("/api/epacks/update", async (req, res) => {
    try {
        await mssql.connect(dbConfig);
        const result = await mssql.query(
            `UPDATE EMERGENCY_PACKS SET quantity = ${req.body.new_stock_level} WHERE pack_id = ${req.body.pack_id} AND location_id = ${req.body.location_id}`
        );
        res.json(result.recordset);
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

// Handle put request to add new epack by ID and location

app.put("/api/epacks/update/add", async (req, res) => {
    try {
        await mssql.connect(dbConfig);

        let new_quantity = req.body.add_quantity;
        const newStockLevel = req.body.current_stock_level + req.body.adjustment + new_quantity;

        const result = await mssql.query(
            `UPDATE EMERGENCY_PACKS SET quantity = ${newStockLevel} WHERE pack_id = ${req.body.pack_id} AND location_id = ${req.body.location_id}`
        );
        res.json(result.recordset);
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

// Handle put request to subtract new epack by ID and location

app.put("/api/epacks/update/subtract", async (req, res) => {
    try {
        await mssql.connect(dbConfig);

        let subtract_quantity = req.body.subtract_quantity;
        const newStockLevel = req.body.current_stock_level + req.body.adjustment - subtract_quantity;

        const result = await mssql.query(
            `UPDATE EMERGENCY_PACKS SET quantity = ${newStockLevel} WHERE pack_id = ${req.body.pack_id} AND location_id = ${req.body.location_id}`
        );
        res.json(result.recordset);
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

//This handles calculation to update our items table. 



// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

    console.log("Server: " + DB_SERVER);
    console.log("Database: " + DB_NAME);
});
