import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import NavBar from './NavBar';
import './style/Update.css';

const PantryUpdate = () => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [addQuantity, setAddQuantity] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await axios.post('http://20.118.4.46:3000/api/items/query', { location_id: 1 });
        const options = response.data.map((item) => ({
          label: item.item_name,
          value: item.item_id,
          location_id: 1,
          new_stock_level: item.new_stock_level,
        }));
        setOptions(options);
      } catch (error) {
        console.error('Error fetching options:', error);
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
        console.error('Please select an item and enter a quantity.');
        return;
      }

      // Calculate new stock level
      const currentStockLevel = selectedOption.new_stock_level || 0;
      const newStockLevel = currentStockLevel + parseInt(addQuantity);

      // Prepare the data to match the API's expected format
      const dataToUpdate = {
        item_id: selectedOption.value,
        location_id: 1,
        new_stock_level: newStockLevel,
      };

      // Perform PUT request to update the stock level for the selected item
      await axios.put('http://20.118.4.46:3000/api/items/update', dataToUpdate);

      // Display success message
      setUpdateSuccess(true);

      // Clear the dropdown and quantity fields
      setSelectedOption(null);
      setAddQuantity('');

      // Reset success message after a delay
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: '4px solid #dbd5cd',
      borderRadius: '0px',
      backgroundColor: 'white',
      color: '#9f9c97',
      fontFamily: 'Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"',
      fontSize: '14px',
      fontWeight: '400',
      textAlign: 'center',
      willChange: 'transform',
      '&:hover': { border: '4px solid #dbd5cd' },
    }),
  };

  return (
    <div>
      <NavBar />
      <h1>Pantry Update</h1>
      <div className="dynamic-box">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <Select
              className="react-select"
              options={options}
              value={selectedOption}
              onChange={handleChangeSelect}
              placeholder="Select Item"
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
              placeholder="Quantity"
              required
            />
            <button className="button-submit" type="submit">Update</button>
          </form>
          {updateSuccess && <p>Update successful!</p>}
        </div>
      </div>
    </div>
  );
};

export default PantryUpdate;