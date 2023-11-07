const mssql = require("mssql");
const dbConfig = require("./dbConfig"); // Config file holds DB credentials

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
    "INSERT INTO ITEMS (item_name, quantity, location_id) VALUES ('Canned Green Beans', 10, 1);",
    "INSERT INTO ITEMS (item_name, quantity, location_id) VALUES ('Canned Red Beans', 10, 1);",
    "INSERT INTO ITEMS (item_name, quantity, location_id) VALUES ('Canned Black Beans', 10, 1);",
];

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

        // Drop tables
        // await dropTables(conn);

        await conn.close();
    } catch (error) {
        console.error("Main error:", error);
    }
}

main();
