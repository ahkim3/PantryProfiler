import React from 'react';
import { useState } from 'react';
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
        const response = await axios.post('http://20.12.134.62:3000/api/epacks/query');
        const options = response.data.map((location) => ({
          label: location.location_name,
          value: location.id,
          location_id: location.location_id,
          new_stock_level: location.new_stock_level, 
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
      console.error('Please select an EPack and enter quantity.');
      return;
    }

    // Calculate new stock level
    const currentStockLevel = selectedOption.new_stock_level || 0;
    const newStockLevel = currentStockLevel + parseInt(addQuantity);

    const response = await axios.put('http://20.12.134.62:3000/api/epacks/update', {
      pack_id: selectedOption.value,
      location_id: selectedOption.location_id,
      new_stock_level: newStockLevel,
    });

    // Handle success - check response status or log response data
    console.log('Data updated successfully:', response.data);

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
    willChange: 'transform','&:hover': {border: '4px solid #dbd5cd'}
  }),
};

  return (
<div>
      <NavBar />
      <h1>Update Pantry Inventory</h1>
      <div className="dynamic-box">
        <div className="form">
          <form onSubmit={handleSubmit}>
            <Select className="react-select"
              options={options}
              value={selectedOption}
              onChange={handleChangeSelect}
              placeholder="Select Pantry Item "
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
            <button className="button-submit" type="submit">
              Update
            </button>
          </form>
          {updateSuccess && <p>Update successful!</p>}
        </div>
      </div>
    </div>
  );
};
      
export default PantryUpdate;