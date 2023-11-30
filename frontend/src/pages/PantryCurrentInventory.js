import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import axios from 'axios';

const PantryCurrentInventory = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Make a POST request to your backend API endpoint
        
        const response = await axios.post('/api/items/query', {
          location_id: 1 // Replace with the appropriate location ID or pass it dynamically
        });

        setItems(response.data); // Set the retrieved items in state
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div>
        <NavBar />
      <h1>Pantry Current Inventory</h1>

     <div class="dynamic-box">

     <h2>Items Table</h2>
      <table>
        <thead>
          <tr>
            <th>Item_name</th>
            <th>quantity</th>
            {/* Add other table headers based on your item structure */}
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.item_id}>
              <td>{item.item_name}</td>
              <td>{item.quantity}</td>
              {/* Render other data fields accordingly */}
            </tr>
          ))}
        </tbody>
      </table>

    </div>
    </div>
  );
};

export default PantryCurrentInventory;