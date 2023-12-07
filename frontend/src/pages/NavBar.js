import React from "react";
import {Link} from "react-router-dom";
import "./style/NavBar.css";
import logo from "../logo.svg";

const NavBar = () => {
    return (
        <nav className="navbar">
            <div className="svg-container">
                <img src={logo} alt="Logo" />
            </div>
            <ul className="nav-list">
                <li className="nav-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="nav-item dropdown">
                    <Link to="/pages/EPackMenu">Emergency Packs</Link>
                    <div className="dropdown-content">
                        <Link to="/pages/EPackLocations">E-Pack Locations</Link>
                        <Link to="/pages/EPackUpdate">Update E-Pack</Link>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <Link to="/pages/PantryMenu">Pantry</Link>
                    <div className="dropdown-content">
                        <Link to="/pages/PantryCurrentInventory">
                            Current Inventory
                        </Link>
                        <Link to="/pages/PantryLowInStock">Low In Stock </Link>
                        <Link to="/pages/PantryUpdate">Update Inventory</Link>
                    </div>
                </li>
                <li className="nav-item">
                    <Link to="/pages/Admin">Admin</Link>
                </li>
                <li className="nav-item">
                    <Link to="/SignOut" className="signout-button">
                        Sign Out
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default NavBar;
