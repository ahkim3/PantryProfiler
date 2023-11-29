import React from 'react';
import { useState } from 'react';
import NavBar from './NavBar';
import './style/Update.css';

const EPackUpdate = () => {
        const [inputs, setInputs] = useState({
          EPackLocation: '',
          EPackQuantity: '',
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
        <h1>Request Emergency Food Packs</h1>
        <div class="dynamic-box">
            <div class="form">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="EPackLocation"></label>
              <input
                type="text"
                id="EPackLocation"
                name="EPackLocation"
                value={inputs.EPackLocation}
                onChange={handleChange}
                placeholder="Location"
                required
              />
            </div>
            <div>
              <label htmlFor="EPackQuantity"></label>
              <input
                type="text"
                id="EPackQuantity"
                name="EPackQuantity"
                value={inputs.EPackQuantity}
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

export default EPackUpdate;