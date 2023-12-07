import React from "react";
import {Link} from "react-router-dom";
import "./style/NavBar.css";


const NavBar = ({user}) => {
    return (
        <nav className="navbar">
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
                {(user.role === "admin" || user.role === "volunteer") && (
                    <li className="nav-item dropdown">
                        <Link to="/pages/PantryMenu">Pantry</Link>
                        <div className="dropdown-content">
                            <Link to="/pages/PantryCurrentInventory">
                                Current Inventory
                            </Link>
                            <Link to="/pages/PantryLowInStock">
                                Low In Stock{" "}
                            </Link>
                            <Link to="/pages/PantryUpdate">
                                Update Inventory
                            </Link>
                        </div>
                    </li>
                )}
                {user.role === "admin" && (
                    <li className="nav-item">
                        <Link to="/pages/Admin">Admin</Link>
                    </li>
                )}
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
