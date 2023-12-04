import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import './style/Table.css';

const EPackLocations = () => {
  const [responseData, setResponseData] = useState(null);
  const [editedData, setEditedData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const apiUrl = 'http://20.12.134.62:3000/api/epacks/query';
      const response = await axios.post(apiUrl);
      const retrievedData = response.data.map(item => ({ ...item, isEditing: false }));
      setResponseData(retrievedData);
      setEditedData(retrievedData);
      console.log(response.data);
    } catch (error) {
      console.error('Error:', error);
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

  const handleSubmit = async () => {
    try {
      console.log('Submitting changes:', editedData);
      await Promise.all(
        editedData.map(async (dataItem) => {
          if (dataItem.id) {
            try {
              const response = await axios.put(
                `http://20.12.134.62:3000/api/epacks/update`,
                {
                  pack_id: dataItem.pack_id,
                  location_id: dataItem.location_id,
                  new_stock_level: dataItem.quantity // Use new_stock_level field for API
                }
              );
              console.log('Updated data:', response.data);
            } catch (error) {
              console.error('Error updating data:', error);
            }
          }
        })
      );
      fetchData(); 
    } catch (error) {
      console.error('Error submitting changes:', error);
    }
  };
  

  return (
    <div>
      <NavBar />
      <h1>Emergency Pack Locations</h1>

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
                  <td>{dataItem.location_name}</td>
                  <td onClick={() => handleEdit(index)}>
                    {dataItem.isEditing ? (
                      <input
                        type="number"
                        value={dataItem.quantity}
                        onChange={(event) => handleQuantityChange(event, index)}
                      />
                    ) : (
                      dataItem.quantity
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <button className="button-submit" onClick={handleSubmit}>Submit Changes</button>
      </div>
    </div>
  );
};

export default EPackLocations;