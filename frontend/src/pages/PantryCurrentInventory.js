import React, {useState, useEffect} from "react";
import axios from "axios";
import NavBar from "./NavBar";
import "./style/Table.css";

// Import API_URL from config.js
const config = require("../config");
const API_URL = config.API_URL;

const PantryCurrentInventory = () => {
    const [editedData, setEditedData] = useState([]);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [addQuantity, setAddQuantity] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const apiUrl = `${API_URL}/items/query`;
            const response = await axios.post(apiUrl, {
                location_id: 1,
            });
            const retrievedData = response.data.map((item) => ({
                ...item,
                isEditing: false,
            }));
            setEditedData(retrievedData);
            console.log(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const handleEdit = (index) => {
        const updatedData = [...editedData];
        updatedData[index].isEditing = true;
        setEditedData(updatedData);
    };

    const handleQuantityChange = (event, index) => {
        const updatedData = [...editedData];
        updatedData[index].quantity = event.target.value;
        setEditedData(updatedData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedRows = editedData.filter(
                (dataItem) => dataItem.isEditing
            );

            await Promise.all(
                updatedRows.map(async (dataItem) => {
                    try {
                        const response = await axios.put(
                            `${API_URL}/items/update`,
                            {
                                item_id: dataItem.item_id,
                                item_name: dataItem.idem_name,
                                location_id: 1,
                                new_stock_level: dataItem.quantity,
                            }
                        );
                        console.log(
                            "Data updated successfully:",
                            response.data
                        );
                    } catch (error) {
                        console.error("Error updating data:", error);
                    }
                })
            );

            setUpdateSuccess(true);
            setSelectedOption(null);
            setAddQuantity("");
            setTimeout(() => {
                setUpdateSuccess(false);
            }, 3000);

            fetchData(); // Refresh table data after submitting changes
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <NavBar />
            <h1>Pantry Current Inventory</h1>

            <div className="dynamic-box">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Location</th>
                            <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {editedData &&
                            editedData.map((dataItem, index) => (
                                <tr key={index}>
                                    <td>{dataItem.item_name}</td>
                                    <td onClick={() => handleEdit(index)}>
                                        {dataItem.isEditing ? (
                                            <input
                                                type="number"
                                                value={dataItem.quantity}
                                                onChange={(event) =>
                                                    handleQuantityChange(
                                                        event,
                                                        index
                                                    )
                                                }
                                            />
                                        ) : (
                                            dataItem.quantity
                                        )}
                                        <input
                                            type="hidden"
                                            value={dataItem.item_id}
                                            name={`item_id_${index}`}
                                        />
                                        <input
                                            type="hidden"
                                            value={dataItem.location_id}
                                            name={`location_id_${index}`}
                                        />
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                <button className="button-submit" onClick={handleSubmit}>
                    Submit Changes
                </button>
                {updateSuccess && <p>Update successful!</p>}
            </div>
        </div>
    );
};

export default PantryCurrentInventory;
