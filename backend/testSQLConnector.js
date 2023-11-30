const mssql = require("mssql"); // Azure connector API
const bcrypt = require("bcrypt"); // Password encryption API
const dbConfig = require("./dbConfig"); // Config file holds DB credentials
const queriesAdminInsert = require("./queriesAdminInsert"); // Admin data to insert into DB

const queriesCreate = [
    "CREATE TABLE LOCATIONS (location_id INT IDENTITY(1,1) PRIMARY KEY, name VARCHAR(255) NOT NULL, address VARCHAR(255) NOT NULL);",
    "CREATE TABLE ITEMS (item_id INT IDENTITY(1,1) PRIMARY KEY, item_name VARCHAR(255) NOT NULL, quantity INT NOT NULL, location_id INT NOT NULL, FOREIGN KEY (location_id) REFERENCES LOCATIONS(location_id));",
    "CREATE TABLE EMERGENCY_PACKS (pack_id INT IDENTITY(1,1) PRIMARY KEY, item_name VARCHAR(255) NOT NULL, quantity INT NOT NULL, location_id INT NOT NULL, FOREIGN KEY (location_id) REFERENCES LOCATIONS(location_id));",
    "CREATE TABLE ADMINS (admin_id VARCHAR(255) PRIMARY KEY NOT NULL, password VARCHAR(255) NOT NULL, first_name VARCHAR(255) NOT NULL, last_name VARCHAR(255) NOT NULL, location_id INT NOT NULL, FOREIGN KEY (location_id) REFERENCES LOCATIONS(location_id), UNIQUE(admin_id));",
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
    "INSERT INTO LOCATIONS (name, address) VALUES ('Center for Student Involvement', '901 Rollins St, Columbia, MO 65211');",
    "INSERT INTO LOCATIONS (name, address) VALUES ('College of Arts & Science', '512 S 9th St, Columbia, MO 65201');",
    "INSERT INTO LOCATIONS (name, address) VALUES ('College of Education and Human Development', '526 Hitt St, Columbia, MO 65201');",
    "INSERT INTO LOCATIONS (name, address) VALUES ('College of Engineering', '416 S 6th St, Columbia, MO 65201');",
    "INSERT INTO LOCATIONS (name, address) VALUES ('College of Veterinary Medicine', '1520 East, Rollins St, Columbia, MO 65211');",
    "INSERT INTO LOCATIONS (name, address) VALUES ('Counseling Center', '805 Rollins St, Columbia, MO 65201');",
    "INSERT INTO LOCATIONS (name, address) VALUES ('Disability Center', 'S5 Memorial Union, Columbia, MO 65211');",
    "INSERT INTO LOCATIONS (name, address) VALUES ('Gaines/Oldham Black Culture Center', '813 Virginia Ave, Columbia, MO 65201');",
    "INSERT INTO LOCATIONS (name, address) VALUES ('Graduate School', '801 Conley Ave, Columbia, MO 65211');",
    "INSERT INTO LOCATIONS (name, address) VALUES ('Hawthorn Hall', '903 Hitt St, Columbia, MO 65201');",
    "INSERT INTO LOCATIONS (name, address) VALUES ('International Center', '518 Hitt St, Columbia, MO 65201');",
    "INSERT INTO LOCATIONS (name, address) VALUES ('LGTBQ Resource Center', '901 Rollins St, Columbia, MO 65211');",
    "INSERT INTO LOCATIONS (name, address) VALUES ('McReynolds Hall', '305 S 5th St, Columbia, MO 65201');",
    "INSERT INTO LOCATIONS (name, address) VALUES ('MizzouRec', '1000 Rollins St, Columbia, MO 65203');",
    "INSERT INTO LOCATIONS (name, address) VALUES ('Multicultural Center', '901 Rollins St, Columbia, MO 65211');",
    "INSERT INTO LOCATIONS (name, address) VALUES ('Office of Accountability and Support', '901 Rollins St, Columbia, MO 65201');",
    "INSERT INTO LOCATIONS (name, address) VALUES ('RSVP', '901 Rollins St, Columbia, MO 65201');",
    "INSERT INTO LOCATIONS (name, address) VALUES ('Student Health Center', '1020 Hitt St, Columbia, MO 65211');",
    "INSERT INTO LOCATIONS (name, address) VALUES ('Transfer Center', '909 Lowry Mall, Columbia, MO 65211');",
    "INSERT INTO LOCATIONS (name, address) VALUES ('CASE', '110 Student Success Center, Columbia, MO 65211');",
    "INSERT INTO LOCATIONS (name, address) VALUES ('TRIO Women's Center', '901 Rollins St, Columbia, MO 65201');",
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
    "INSERT INTO ITEMS (item_name, quantity, location_id) VALUES ('Feminie hygiene products', 10, 1);",
    "INSERT INTO ITEMS (item_name, quantity, location_id) VALUES ('Deodorant', 10, 1)",
    "INSERT INTO ITEMS (item_name, quantity, location_id) VALUES ('Hand sanitizer', 10, 1);",
    "INSERT INTO ITEMS (item_name, quantity, location_id) VALUES ('Household products', 10, 1);",
    "INSERT INTO ITEMS (item_name, quantity, location_id) VALUES ('Body care', 10, 1);"
];

const queriesEmergencyPacksInsert = [
    "INSERT INTO EMERGENCY_PACKS (item_name, quantity, location_id) VALUES ('E-PACK', 10, 1);",
    "INSERT INTO EMERGENCY_PACKS (item_name, quantity, location_id) VALUES ('E-PACK', 10, 2);",
    "INSERT INTO EMERGENCY_PACKS (item_name, quantity, location_id) VALUES ('E-PACK', 10, 3);",
    "INSERT INTO EMERGENCY_PACKS (item_name, quantity, location_id) VALUES ('E-PACK', 10, 4);",
    "INSERT INTO EMERGENCY_PACKS (item_name, quantity, location_id) VALUES ('E-PACK', 10, 5);",
    "INSERT INTO EMERGENCY_PACKS (item_name, quantity, location_id) VALUES ('E-PACK', 10, 6);",
    "INSERT INTO EMERGENCY_PACKS (item_name, quantity, location_id) VALUES ('E-PACK', 10, 7);",
    "INSERT INTO EMERGENCY_PACKS (item_name, quantity, location_id) VALUES ('E-PACK', 10, 8);",
    "INSERT INTO EMERGENCY_PACKS (item_name, quantity, location_id) VALUES ('E-PACK', 10, 9);",
    "INSERT INTO EMERGENCY_PACKS (item_name, quantity, location_id) VALUES ('E-PACK', 10, 10);",
    "INSERT INTO EMERGENCY_PACKS (item_name, quantity, location_id) VALUES ('E-PACK', 10, 11);",
    "INSERT INTO EMERGENCY_PACKS (item_name, quantity, location_id) VALUES ('E-PACK', 10, 12);",
    "INSERT INTO EMERGENCY_PACKS (item_name, quantity, location_id) VALUES ('E-PACK', 10, 13);",
    "INSERT INTO EMERGENCY_PACKS (item_name, quantity, location_id) VALUES ('E-PACK', 10, 14);",
    "INSERT INTO EMERGENCY_PACKS (item_name, quantity, location_id) VALUES ('E-PACK', 10, 15);",
    "INSERT INTO EMERGENCY_PACKS (item_name, quantity, location_id) VALUES ('E-PACK', 10, 16);",
    "INSERT INTO EMERGENCY_PACKS (item_name, quantity, location_id) VALUES ('E-PACK', 10, 17);",
    "INSERT INTO EMERGENCY_PACKS (item_name, quantity, location_id) VALUES ('E-PACK', 10, 18);",
    "INSERT INTO EMERGENCY_PACKS (item_name, quantity, location_id) VALUES ('E-PACK', 10, 19);",
    "INSERT INTO EMERGENCY_PACKS (item_name, quantity, location_id) VALUES ('E-PACK', 10, 20);",
    "INSERT INTO EMERGENCY_PACKS (item_name, quantity, location_id) VALUES ('E-PACK', 10, 21);",
    "INSERT INTO EMERGENCY_PACKS (item_name, quantity, location_id) VALUES ('E-PACK', 10, 22);"
];

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

async function insertEmergencyPacksTable(conn) {
    try {
        for (let query of queriesEmergencyPacksInsert) {
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

        // Insert into EMERGENCY_PACKS
        // await insertEmergencyPacksTable(conn);

        // Drop tables
        // await dropTables(conn);

        await conn.close();
    } catch (error) {
        console.error("Main error:", error);
    }
}

main();
