import React from "react";
import axios from "axios";
import {GoogleLogin} from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import "./SignIn.css";
import logo from "./img/welcomeLogo.svg";

// Import API_URL from config.js
const config = require("./config.json");
const API_URL = config.API_URL;

const SignIn = ({setUser}) => {
    const responseGoogleSuccess = (response) => {
        const token = response.credential;

        // Authenticate token with backend (make a POST request to /login/oauth)
        axios
            .post(`${API_URL}/login/oauth`, {
                token: token,
            })
            .then((response) => {
                console.log(response);

                // Store the token in localStorage
                localStorage.setItem("authToken", token);

                setUser({
                    role: response.data.permissionLevel,
                    pawprint: response.data.pawprint,
                    name: response.data.name,
                });

                // Redirect to home page
                window.location.href = "/pages/PantryMenu";
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    };

    const responseGoogleFailure = (response) => {
        console.log("An error occurred: " + response.error);
    };

    return (
        <div className="signin-container">
            <img src={logo} alt="Logo" className="signin-logo" />{" "}
            <GoogleLogin
                className="signin-button"
                buttonText="Sign In with Google"
                onSuccess={responseGoogleSuccess}
                onFailure={responseGoogleFailure}
                cookiePolicy={"single_host_origin"}
            />
        </div>
    );
};

export default SignIn;
