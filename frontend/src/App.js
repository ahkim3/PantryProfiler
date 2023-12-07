import React, {useEffect, useState} from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import axios from "axios";
import SignIn from "./SignIn";
import SignOut from "./SignOut";

import MainMenu from "./pages/MainMenu";
import EPackMenu from "./pages/EPackMenu";
import PantryMenu from "./pages/PantryMenu";
import EPackLocations from "./pages/EPackLocations";
import EPackUpdate from "./pages/EPackUpdate";
import PantryCurrentInventory from "./pages/PantryCurrentInventory";
import PantryLowInStock from "./pages/PantryLowInStock";
import PantryUpdate from "./pages/PantryUpdate";
import RequestEPack from "./pages/RequestEPack";
import Admin from "./pages/Admin";

// Import API_URL from config.js
const config = require("./config.json");
const API_URL = config.API_URL;

const App = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("authToken");

        // Authenticate token with backend (make a POST request to /login/oauth), if it exists
        if (token) {
            axios
                .post(`${API_URL}/login/oauth`, {
                    token: token,
                })
                .then((response) => {
                    console.log(response);

                    setUser({
                        role: response.data.permissionLevel,
                        pawprint: response.data.pawprint,
                        name: response.data.name,
                    });
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        } else {
            setUser(null);
        }
    }, []);

    const PrivateRoute = ({element, requiredRoles}) => {
        // Check if the user is authenticated and has the required role
        if (user && user.role && requiredRoles.includes(user.role)) {
            return element;
        } else {
            // Redirect to the sign-in page if the user is not authenticated
            return <Navigate to="/" />;
        }
    };

    return (
        <Router>
            <Routes>
                <Route
                    path="/pages/EPackMenu"
                    element={
                        <PrivateRoute
                            element={<EPackMenu user={user} />}
                            requiredRoles={["admin", "volunteer", "epack"]}
                        />
                    }
                />
                <Route
                    path="/pages/PantryMenu"
                    element={
                        <PrivateRoute
                            element={<PantryMenu user={user} />}
                            requiredRoles={["admin", "volunteer"]}
                        />
                    }
                />

                <Route
                    path="/pages/EPackLocations"
                    element={
                        <PrivateRoute
                            element={<EPackLocations user={user} />}
                            requiredRoles={["admin", "volunteer", "epack"]}
                        />
                    }
                />
                <Route
                    path="/pages/EPackUpdate"
                    element={
                        <PrivateRoute
                            element={<EPackUpdate user={user} />}
                            requiredRoles={["admin", "volunteer", "epack"]}
                        />
                    }
                />

                <Route
                    path="/pages/PantryCurrentInventory"
                    element={
                        <PrivateRoute
                            element={<PantryCurrentInventory user={user} />}
                            requiredRoles={["admin", "volunteer"]}
                        />
                    }
                />
                <Route
                    path="/pages/PantryLowInStock"
                    element={
                        <PrivateRoute
                            element={<PantryLowInStock user={user} />}
                            requiredRoles={["admin", "volunteer"]}
                        />
                    }
                />
                <Route
                    path="/pages/PantryUpdate"
                    element={
                        <PrivateRoute
                            element={<PantryUpdate user={user} />}
                            requiredRoles={["admin", "volunteer"]}
                        />
                    }
                />

                <Route
                    path="/pages/RequestEPack"
                    element={
                        <PrivateRoute
                            element={<RequestEPack user={user} />}
                            requiredRoles={["admin", "volunteer", "epack"]}
                        />
                    }
                />

                <Route
                    path="/pages/Admin"
                    element={
                        <PrivateRoute
                            element={<Admin user={user} />}
                            requiredRoles={["admin"]}
                        />
                    }
                />

                <Route
                    path="/SignOut"
                    element={<SignOut setUser={setUser} />} // Use the SignOut component
                />
                <Route
                    path="/"
                    element={
                        user ? (
                            <MainMenu user={user} />
                        ) : (
                            <SignIn setUser={setUser} />
                        )
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;
