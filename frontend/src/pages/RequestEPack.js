import React, {useState, useEffect} from "react";
import axios from "axios";
import Select from "react-select";
import NavBar from "./NavBar";
import Header from './Header';
import Header2 from './Header2';
import "./style/Update.css";

// Import API_URL from config.js
const config = require("../config");
const API_URL = config.API_URL;

const RequestEPack = ({user}) => {
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [addQuantity, setAddQuantity] = useState("");
    const [updateSuccess, setUpdateSuccess] = useState(false);

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await axios.post(`${API_URL}/epacks/query`);
                const options = response.data.map((location) => ({
                    label: location.location_name,
                    value: location.pack_id,
                    location_id: location.location_id,
                    new_stock_level: location.new_stock_level,
                }));
                setOptions(options);
            } catch (error) {
                console.error("Error fetching options:", error);
            }
        };

        fetchOptions();
    }, []);

    const handleChangeSelect = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!selectedOption || !addQuantity) {
                console.error("Please select an EPack and enter quantity.");
                return;
            }

            // Calculate new stock level
            const currentStockLevel = selectedOption.new_stock_level || 0;
            const newStockLevel = currentStockLevel + parseInt(addQuantity);

            const response = await axios.put(`${API_URL}/epacks/update`, {
                pack_id: selectedOption.value,
                location_id: selectedOption.location_id,
                new_stock_level: newStockLevel,
            });

            // Handle success - check response status or log response data
            console.log("Data updated successfully:", response.data);

            // Display success message
            setUpdateSuccess(true);

            // Clear the dropdown and quantity fields
            setSelectedOption(null);
            setAddQuantity("");

            // Reset success message after a delay
            setTimeout(() => {
                setUpdateSuccess(false);
            }, 3000);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const customStyles = {
        control: (provided) => ({
            ...provided,
            border: "4px solid #dbd5cd",
            borderRadius: "0px",
            backgroundColor: "white",
            color: "#9f9c97",
            fontFamily:
                'Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
            fontSize: "14px",
            fontWeight: "400",
            textAlign: "center",
            willChange: "transform",
            "&:hover": {border: "4px solid #dbd5cd"},
        }),
    };

    return (
        <div>
            <Header />
            <Header2 />
            <NavBar user={user} />
            <h1>Request Emergency Food Packs</h1>
            <div className="dynamic-box">
                <div className="form">
                    <form onSubmit={handleSubmit}>
                        <Select
                            className="react-select"
                            options={options}
                            value={selectedOption}
                            onChange={handleChangeSelect}
                            placeholder="Select EPack Location"
                            isSearchable
                            required
                            styles={customStyles}
                        />
                        <input
                            type="text"
                            id="addQuantity"
                            name="addQuantity"
                            value={addQuantity}
                            onChange={(e) => setAddQuantity(e.target.value)}
                            placeholder="Current Quantity"
                            required
                        />
                        <button className="button-submit-update" type="submit">
                            Request
                        </button>
                    </form>
                    {updateSuccess && <p>Request successful!</p>}
                </div>
            </div>
        </div>
    );
};

export default RequestEPack;
