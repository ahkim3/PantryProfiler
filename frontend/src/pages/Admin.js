import React, {useState, useEffect} from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import NavBar from "./NavBar";
import Header from './Header';
import Header2 from './Header2';
import "./style/Update.css";

// Import API_URL from config.js
const config = require("../config");
const API_URL = config.API_URL;

const Admin = ({user}) => {
    const [responseData, setResponseData] = useState([]);
    const [newAdminId, setNewAdminId] = useState("");
    const [newPermissionLevel, setNewPermissionLevel] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const apiUrl = `${API_URL}/admins/query`;
            const response = await axios.post(apiUrl);
            const responseData = response.data.map((item) => ({
                ...item,
            }));
            setResponseData(responseData);
            console.log(response.data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const addAdmin = async () => {
        try {
            const response = await axios.put(`${API_URL}/admins/add`, {
                admin_id: newAdminId,
                permission_level: newPermissionLevel,
            });
            console.log("Add response:", response);
            // Check if the add operation was successful before refreshing the data
            if (response.status === 200) {
                fetchData();
                // Reset the input fields after successful addition
                setNewAdminId("");
                setNewPermissionLevel("");
            }
        } catch (error) {
            console.error("Error:", error);
            console.error("Failed to add admin.");
            setIsModalOpen(true);
        }
    };

    return (
        <div>
            <Header />
            <Header2 />
            <NavBar user={user} />
            <h1>Admin</h1>

            <div className="dynamic-box">
                <table className="table">
                    <thead>
                        <tr>
                            <th>PawPrint</th>
                            <th>Role</th>
                            <th style={{textAlign: "center"}}>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {responseData &&
                            responseData.map((dataItem, index) => (
                                <tr key={index}>
                                    <td>{dataItem.admin_id}</td>
                                    <td>{dataItem.permission_level}</td>
                                    <td>
                                        <span
                                            style={{
                                                cursor: "pointer",
                                                color: "orange",
                                                fontSize: "27px",
                                                fontWeight: "bold",
                                                textAlign: "center",
                                                verticalAlign: "middle",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                            }}
                                            onClick={async () => {
                                                try {
                                                    const response =
                                                        await axios.delete(
                                                            `${API_URL}/admins/delete`,
                                                            {
                                                                data: {
                                                                    admin_id:
                                                                        dataItem.admin_id,
                                                                },
                                                            }
                                                        );
                                                    console.log(
                                                        "Delete response:",
                                                        response
                                                    );
                                                    fetchData();
                                                } catch (error) {
                                                    console.error(
                                                        "Error:",
                                                        error
                                                    );
                                                }
                                            }}
                                        >
                                            &#x1F5D1;
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        {/* New row for adding admins */}
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    value={newAdminId}
                                    onChange={(e) =>
                                        setNewAdminId(e.target.value)
                                    }
                                    style={{
                                        backgroundColor: "#f0f0f0",
                                        color: "#404040",
                                        border: "none",
                                        padding: "0px",
                                        borderRadius: "5px",
                                        fontSize: "16px",
                                        cursor: "text",
                                    }}
                                />
                            </td>
                            <td>
                                <select
                                    value={newPermissionLevel}
                                    onChange={(e) =>
                                        setNewPermissionLevel(e.target.value)
                                    }
                                    style={{
                                        backgroundColor: "#f0f0f0",
                                        color: "#404040",
                                        border: "none",
                                        padding: "10px",
                                        borderRadius: "5px",
                                        fontSize: "16px",
                                        cursor: "pointer",
                                    }}
                                >
                                    <option value="" selected disabled>
                                        Select Role
                                    </option>
                                    <option value="admin">admin</option>
                                    <option value="volunteer">volunteer</option>
                                    <option value="epack">epack</option>
                                </select>
                            </td>
                            <td>
                                <button
                                    onClick={addAdmin}
                                    disabled={
                                        !newAdminId || newPermissionLevel === ""
                                    }
                                    style={{
                                        backgroundColor:
                                            !newAdminId ||
                                            newPermissionLevel === ""
                                                ? "#ccc"
                                                : "#0ad16a",
                                        color: "#fff",
                                        border: "none",
                                        padding: "10px 20px",
                                        borderRadius: "5px",
                                        cursor:
                                            !newAdminId ||
                                            newPermissionLevel === ""
                                                ? "default"
                                                : "pointer",
                                        fontSize: "16px",
                                    }}
                                >
                                    Add User
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Popup
                open={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                modal
                contentStyle={{
                    background: "#f0f0f0",
                    borderRadius: "25px",
                    padding: "20px",
                    border: "solid 2px #404040",
                    color: "#262626",
                }}
            >
                <div>
                    <p style={{color: "#262626"}}>
                        Failed to add. Please delete the user if it already
                        exists.
                    </p>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <button
                            onClick={() => setIsModalOpen(false)}
                            style={{
                                backgroundColor: "#404040",
                                color: "#fff",
                                border: "none",
                                padding: "8px 16px",
                                borderRadius: "5px",
                                cursor: "pointer",
                                fontSize: "14px",
                            }}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Popup>
        </div>
    );
};

export default Admin;
