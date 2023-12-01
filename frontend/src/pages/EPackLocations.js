import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import './style/Table.css';

const EPackLocations = () => {
  const [responseData, setResponseData] = useState(null);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = 'http://20.12.134.62:3000/api/epacks/query';
        const response = await axios.post(apiUrl);
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
                  <td>{dataItem.quantity}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
        

  );
};

export default EPackLocations;