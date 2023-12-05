import React, {useState, useEffect} from "react";
import axios from "axios";
import NavBar from "./NavBar";
import "./style/Table.css";

// Import API_URL from config.js
const config = require("../config");
const API_URL = config.API_URL;

const PantryLowInStock = () => {
    const [responseData, setResponseData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = `${API_URL}/items/low-stock`;
                const response = await axios.post(apiUrl, {
                    location_id: 1,
                    threshold: 5,
                });
                setResponseData(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <NavBar />
            <h1>Pantry Low In Stock</h1>

            <div className="dynamic-box">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {responseData &&
                            responseData.map((dataItem, index) => (
                                <tr key={index}>
                                    <td>{dataItem.item_name}</td>
                                    <td>{dataItem.quantity}</td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PantryLowInStock;
