import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import './style/Menu.css';


const PantryMenu = () => {
    return (
    <div>
        <NavBar />
        <div class="title">
            <h1>Pantry Menu</h1>
        </div>

        <div class="dynamic-box">

            <div class="button-pantry1">
                <Link to="/pages/PantryLowInStock">
                    <button class="button-p">Low In Stock</button>
                </Link>
                <Link to="/pages/PantryCurrentInventory">
                    <button class="button-p">Current Inventory</button>
                </Link>
                </div>

                <div class="button-pantry2">
                <Link to="/pages/PantryUpdate">
                    <button class="button-p">Update Inventory</button>
                </Link>
                <Link to="/pages/PantryTrending">
                    <button class="button-p">Trending Items</button>
                </Link>
                </div>
            </div>
        </div>
);
};

export default PantryMenu;