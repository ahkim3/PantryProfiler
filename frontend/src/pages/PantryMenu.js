import React from "react";
import {Link} from "react-router-dom";
import NavBar from "./NavBar";
import "./style/Menu.css";

const PantryMenu = ({user}) => {
    return (
        <div>
            <NavBar user={user} />
            <div className="title">
                <h1>Pantry Menu</h1>
            </div>

            <div className="dynamic-box">
                <div className="epack-button-pantry">
                    <Link to="/pages/PantryLowInStock">
                        <button className="button-p">Low In Stock</button>
                    </Link>
                    <Link to="/pages/PantryCurrentInventory">
                        <button className="button-p">Current Inventory</button>
                    </Link>
                    <Link to="/pages/PantryUpdate">
                        <button className="button-p">Update Inventory</button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PantryMenu;
