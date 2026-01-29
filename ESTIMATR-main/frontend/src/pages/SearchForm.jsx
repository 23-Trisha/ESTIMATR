import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logout from './Logout';

const SearchForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    item_name: '',
    item_type: '',
    make: '',
    model: ''
  });

  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/results?item_name=${formData.item_name}&item_type=${formData.item_type}&make=${formData.make}&model=${formData.model}`);

  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-r from-sky-100 to-blue-100">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Automated Price Finder</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="item-name" className="block text-sm font-medium text-gray-700">Item Name:</label>
          <input type="text" id="item-name" name="item_name" required onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="item-type" className="block text-sm font-medium text-gray-700">Item Type:</label>
          <select id="item-type" name="item_type" required onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2">
            <option value="">Select...</option>
            <option value="Computers & Peripherals">Computers & Peripherals</option>
            <option value="Mobile & Accessories">Mobile & Accessories</option>
            <option value="Office Supplies">Office Supplies</option>
            <option value="Furniture, Decor & Furnishing">Furniture, Decor & Furnishing</option>
            <option value="Cleaning and Sanitation">Cleaning and Sanitation</option>
            <option value="Tools & Instruments">Tools & Instruments</option>
            <option value="Security & Safety Products">Security & Safety Products</option>
            <option value="Books & Sports">Books & Sports</option>
            <option value="Automotive">Automotive</option>
            <option value="Health & Personal Care">Health & Personal Care</option>
            <option value="Other Services">Other Services</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="make" className="block text-sm font-medium text-gray-700">Make:</label>
          <input type="text" id="make" name="make" onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
        </div>
        <div className="mb-4">
          <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model:</label>
          <input type="text" id="model" name="model" onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md p-2" />
        </div>
        
        <div className="flex flex-col gap-3 mt-4">
  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
  >
    Search
  </button>

  <div className="w-full flex justify-center">
    <Logout />
  </div>
</div>

        
      </form>
      
    </div>
  );
};

export default SearchForm;
