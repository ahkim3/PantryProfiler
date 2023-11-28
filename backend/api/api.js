const mssql = require("mssql"); // Azure connector API
const bcrypt = require("bcrypt"); // Password encryption API
const express = require("express"); // Express API

const dbConfig = require("./dbConfig"); // Config file holds DB credentials

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
app.post("/api/query/items", async (req, res) => {
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

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
