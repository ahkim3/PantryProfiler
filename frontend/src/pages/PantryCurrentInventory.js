import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import './style/Table.css';

const PantryCurrentInventory = () => {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = 'http://20.84.215.228:3000/api/items/query';
        const response = await axios.post(apiUrl, {
          location_id: 1
        });
        setResponseData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <NavBar />
      <h1>Pantry Current Inventory</h1>

      <div className="dynamic-box">
        <table class="table" >
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


export default PantryCurrentInventory;
