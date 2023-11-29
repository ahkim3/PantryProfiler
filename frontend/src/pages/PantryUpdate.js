import React from 'react';
import { useState } from 'react';
import NavBar from './NavBar';
import './style/Update.css';

const PantryUpdate = () => {
    const [inputs, setInputs] = useState({
        PantryItemName: '',
        PantrySection: '',
        PantryQuantity: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Do something with the form data, like sending it to a server
        console.log('Form submitted:', inputs);
      };
    
  return (
    <div>
        <NavBar />
      <h1>Pantry Update</h1>

      <div class="dynamic-box">
            <div class="form">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="PantryItemName"></label>
              <input
                type="text"
                id="PantryItemName"
                name="PantryItemName"
                value={inputs.PantryItemName}
                onChange={handleChange}
                placeholder="Item Name"
                required
              />
            </div>
            <div>
              <label htmlFor="PantrySection"></label>
              <input
                type="text"
                id="PantrySection"
                name="PantrySection"
                value={inputs.PantrySection}
                onChange={handleChange}
                placeholder="Pantry Section"
                required
              />
            </div>
            <div>
              <label htmlFor="PantryQuantity"></label>
              <input
                type="text"
                id="PantryQuantity"
                name="PantryQuantity"
                value={inputs.PantryQuantity}
                onChange={handleChange}
                placeholder="Quantity"
                required
              />
            </div>
            <button class="button-submit" type="submit">Update</button>
          </form>
          </div>
          </div>
          </div>
        );
      };
      
export default PantryUpdate;