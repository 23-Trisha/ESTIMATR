import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try{
    await axios.post("http://localhost:5000/logout",{},{ withCredentials: true });
    // setAuth(false);
    navigate("/login");
    }catch(error){
      console.error("Logout failed:", error.response?.data || error.message)
    }
  };

  return (
    <div>
      <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
  );
};

export default Logout;
