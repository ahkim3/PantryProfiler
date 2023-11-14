const mssql = require("mssql");
const dbConfig = require("./dbConfig"); // Config file holds DB credentials
const queriesAdminInsert = require("./queriesAdminInsert"); // Admin data to insert into DB

const queriesCreate = [
    "CREATE TABLE LOCATIONS (location_id INT IDENTITY(1,1) PRIMARY KEY, name VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL);",
    "CREATE TABLE ITEMS (item_id INT IDENTITY(1,1) PRIMARY KEY, item_name VARCHAR(255) NOT NULL, quantity INT NOT NULL, location_id INT NOT NULL, FOREIGN KEY (location_id) REFERENCES LOCATIONS(location_id));",
    "CREATE TABLE EMERGENCY_PACKS (pack_id INT IDENTITY(1,1) PRIMARY KEY, item_name VARCHAR(255) NOT NULL, expiry DATE NOT NULL, quantity INT NOT NULL, location_id INT NOT NULL, FOREIGN KEY (location_id) REFERENCES LOCATIONS(location_id));",
    "CREATE TABLE ADMINS (admin_id INT IDENTITY(1,1) PRIMARY KEY, username VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, location_id INT NOT NULL, FOREIGN KEY (location_id) REFERENCES LOCATIONS(location_id));",
];

const queriesShowTables = [
    "SELECT * FROM LOCATIONS",
    "SELECT * FROM ITEMS",
    "SELECT * FROM EMERGENCY_PACKS",
    "SELECT * FROM ADMINS",
];

const queriesDropTables = [
    "DROP TABLE ITEMS",
    "DROP TABLE EMERGENCY_PACKS",
    "DROP TABLE ADMINS",
    "DROP TABLE LOCATIONS",
];

const queriesLocationsInsert = [
    "INSERT INTO LOCATIONS (name, address) VALUES ('Tiger Pantry', '299 Hitt St, Columbia, MO 65201');",
];

const queriesItemsInsert = [
    "INSERT INTO ITEMS (item_name, quantity, location_id) VALUES ('Flour', 10, 1);",
    "INSERT INTO ITEMS (item_name, quantity, location_id) VALUES ('Sugar', 10, 1);",
    "INSERT INTO ITEMS (item_name, quantity, location_id) VALUES ('Vegetable oil (big and small)', 10, 1);",
    "INSERT INTO ITEMS (item_name, quantity, location_id) VALUES ('Canola Oil', 10, 1);",
    "INSERT INTO ITEMS (item_name, quantity, location_id) VALUES ('Canned meat', 10, 1);",
    "INSERT INTO ITEMS (item_name, quantity, location_id) VALUES ('Peanut butter', 10, 1);",
    "INSERT INTO ITEMS (item_name, quantity, location_id) VALUES ('Jelly', 10, 1);",
    "INSERT INTO ITEMS (item_name, quantity, location_id) VALUES ('White rice', 10, 1);",
    "INSERT INTO ITEMS (item_name, quantity, location_id) VALUES ('Brown rice', 10, 1);",
    "INSERT INTO ITEMS (item_name, quantity, location_id) VALUES ('Tomato sauce', 10, 1);",
    "INSERT INTO ITEMS (item_name, quantity, location_id) VALUES ('Broth', 10, 1);",
    "INSERT INTO ITEMS (item_name, quantity, location_id) VALUES ('Soy sauce', 10, 1);",
    "INSERT INTO ITEMS (item_name, quantity, location_id) VALUES ('Tortillas', 10, 1);",
    "INSERT INTO ITEMS (item_name, quantity, location_id) VALUES ('Ramen', 10, 1);",
    "INSERT INTO ITEMS (item_name, quantity, location_id) VALUES ('Granola bar (GF)', 10, 1);",
    "INSERT INTO ITEMS (item_name, quantity, location_id) VALUES ('Mac and cheese', 10, 1);",
    "INSERT INTO ITEMS (item_name, quantity, location_id) VALUES ('Pasta', 10, 1);",
    "INSERT INTO ITEMS (item_name, quantity, location_id) VALUES ('Meals to go', 10, 1);",
    "INSERT INTO ITEMS (item_name, quantity, location_id) VALUES ('Apple sauce', 10, 1);",
];

const bcrypt = require("bcrypt");
const mysql = require("mysql");

// Function to hash passwords using bcrypt
async function hashPasswords() {
    for (const admin of queriesAdminInsert) {
        const hashedPassword = await bcrypt.hash(admin.password, 10);
        admin.password = hashedPassword;
    }
}

async function connect() {
    try {
        const pool = await mssql.connect(dbConfig);
        return pool;
    } catch (error) {
        console.error("Database connection error:", error);
        throw error;
    }
}

async function createTables(conn) {
    try {
        for (let query of queriesCreate) {
            const result = await conn.request().query(query);
            console.log(result);
        }
    } catch (error) {
        console.error("Table creation error:", error);
    }
}

async function showTables(conn) {
    try {
        for (let query of queriesShowTables) {
            const result = await conn.request().query(query);
            console.log(result.recordset);
        }
    } catch (error) {
        console.error("Show tables error:", error);
    }
}

async function insertLocationsTable(conn) {
    try {
        for (let query of queriesLocationsInsert) {
            const result = await conn.request().query(query);
            console.log(result.recordset);
        }
    } catch (error) {
        console.error("Show tables error:", error);
    }
}

async function insertItemsTable(conn) {
    try {
        for (let query of queriesItemsInsert) {
            const result = await conn.request().query(query);
            console.log(result.recordset);
        }
    } catch (error) {
        console.error("Show tables error:", error);
    }
}

async function insertAdminTable(conn) {
    try {
        if (!conn.connected) {
            console.error("Connection is closed. Reconnecting...");
            await conn.connect();
        }

        for (const admin of queriesAdminInsert) {
            let {admin_id, password, first_name, last_name, location_id} =
                admin;
            admin_id = admin_id.toUpperCase(); // Capitalize admin_id

            const query = `INSERT INTO ADMINS (admin_id, password, first_name, last_name, location_id) VALUES ('${admin_id}', '${password}', '${first_name}', '${last_name}', ${location_id})`;
            const result = await conn.request().query(query);
            console.log(result.recordset);
        }
    } catch (error) {
        console.error("Show tables error:", error);
    }
}

async function dropTables(conn) {
    try {
        for (let query of queriesDropTables) {
            const result = await conn.request().query(query);
            console.log(result.recordset);
        }
    } catch (error) {
        console.error("Show tables error:", error);
    }
}

async function main() {
    try {
        const conn = await connect();

        // Create tables
        // await createTables(conn);

        // List tables
        // await showTables(conn);

        // Insert into LOCATIONS table
        // await insertLocationsTable(conn);

        // Insert into ITEMS table
        // await insertItemsTable(conn);

        // Insert into ADMIN table
        // await insertAdminTable(conn);

        // Insert hashed passwords into the database
        // hashPasswords().then(() => insertAdminTable(conn));

        // Drop tables
        // await dropTables(conn);

        await conn.close();
    } catch (error) {
        console.error("Main error:", error);
    }
}

main();
