import React from "react";

import NavBar from "./NavBar";

// Import API_URL from config.js
const config = require("../config");
const API_URL = config.API_URL;

const EPackNotifications = () => {
    return (
        <div>
            <NavBar />
            <h1>Emergency Pack Notifications</h1>
        </div>
    );
};

export default EPackNotifications;
