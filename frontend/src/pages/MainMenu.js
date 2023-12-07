import React, {useState, useEffect} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import NavBar from "./NavBar";
import Header from './Header';
import Header2 from './Header2';
import "./style/Menu.css";

const config = require("../config");
const API_URL = config.API_URL;

const MainMenu = ({user}) => {
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
            const apiUrl = `${API_URL}/epacks/query`;
            const response = await axios.post(apiUrl);
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
                            `${API_URL}/epacks/update`,
                            {
                                pack_id: dataItem.pack_id,
                                location_id: dataItem.location_id,
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

            fetchData();
        } catch (error) {
            console.error("Error:", error);
        }
    };
    return (
        <div>
            <Header />
            <Header2 />
            <NavBar user={user} />
            <div className="title">
                <h1>Main Menu</h1>
            </div>

            <div className="dynamic-box">
                <div className="main-button-pantry">
                    {(user.role === "admin" || user.role === "volunteer") && (
                        <Link to="./pages/PantryMenu">
                            <button className="button-p">Pantry</button>
                        </Link>
                    )}
                    <Link to="./pages/EPackMenu">
                        <button className="button-p">Emergency Packs</button>
                    </Link>
                    {user.role === "admin" && (
                        <Link to="./pages/Admin">
                            <button className="button-p">Admin</button>
                        </Link>
                    )}
                </div>
            </div>

            <div className="request-epack">
                <Link to="./pages/RequestEPack">
                    <button className="button-request">Request E-Pack</button>
                </Link>
            </div>

            <div className="dynamic-box1">
                <table className="notification-table">
                    <thead>
                        <tr>
                            <th>Locations that Need EPacks</th>
                        </tr>
                    </thead>
                    <tbody>
                        {editedData &&
                            editedData
                                .filter((dataItem) => dataItem.quantity === 0) // Filter locations with quantity 0
                                .map((dataItem, index) => (
                                    <tr key={index}>
                                        <td>
                                            {dataItem.location_name}
                                            <input
                                                type="hidden"
                                                value={dataItem.quantity}
                                                name={`quantity_${index}`}
                                            />
                                            <input
                                                type="hidden"
                                                value={dataItem.pack_id}
                                                name={`pack_id_${index}`}
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
            </div>

            <div className="greeting">
                <p>
                    Welcome,&nbsp;<b>{user.name}!</b>
                </p>
                <p>
                    <i>
                        Your permission level is:&nbsp;<b>{user.role}</b>
                    </i>
                </p>
            </div>
        </div>
    );
};

export default MainMenu;
