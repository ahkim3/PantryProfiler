import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import './style/Table.css';

const EPackLocations = () => {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = 'http://20.84.215.228:3000/api/epacks/query';
        const response = await axios.post(apiUrl);
        setResponseData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();

     const [editableRowIndex, setEditableRowIndex] = useState(null);
     const [quantityData, setQuantityData] = useState(responseData); // responseData is assumed to be your initial data
  
     const handleEdit = (index) => {
       setEditableRowIndex(index);
     };
  
     const handleQuantityChange = (event, index) => {
       const newQuantityData = [...quantityData];
       newQuantityData[index].quantity = event.target.value;
       setQuantityData(newQuantityData);
     };
  
     const handleSubmit = async () => {
       try {
         // Assuming your API endpoint is '/api/updateQuantity'
         const response = await fetch('/api/items/update', {
           method: 'PUT', // or 'POST' depending on your API
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(quantityData),
         });
  
         if (response.ok) {
           setEditableRowIndex(null); // Reset editableRowIndex after submitting changes
           // You might want to handle success or show a success message here
         } else {
           // Handle errors or show an error message
           console.error('Failed to update data');
         }
       } catch (error) {
         // Handle network errors
         console.error('Error:', error);
       }
     };
  
  }, []);

  return (
    <div>
      <NavBar />
      <h1>Emergency Pack Locations</h1>

      <div className="dynamic-box">
        <table className="table" >
          <thead>
            <tr>
              <th>Location</th>
              <th>Quantity</th>  
            </tr>
          </thead>
          <tbody>
            {responseData &&
              responseData.map((dataItem, index) => (
                <tr key={index}>
                  <td>{dataItem.location_name}</td>
                  <td>{editableRowIndex === index ? (
                    <input
                      type="number"
                      value={dataItem.quantity}
                      onChange={(event) => handleQuantityChange(event, index)}
                    />
                  ) : (
                    dataItem.quantity
                  )}</td>
                  <td>
                  {editableRowIndex !== index ? (
                    <button onClick={() => handleEdit(index)}>Edit</button>
                  ) : null}
                </td>
                </tr>
              ))}
          </tbody>
        </table>
        {editableRowIndex !== null && (
        <button onClick={handleSubmit}>Submit Changes</button>
      )}
      </div>
    </div>
  );
};

export default EPackLocations;