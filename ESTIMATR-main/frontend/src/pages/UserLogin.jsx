import React, { useState } from 'react';
import { Link,useNavigate} from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const UserLogin = ({ setAuth }) => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

// UserLogin.jsx
const submitHandler = async (e) => {
   e.preventDefault();

  try {
      await axios.post("http://localhost:5000/login", { username, password });
      setAuth(true);
      navigate("/home");
    } catch (err) {
      alert("Login failed");
    }
};


  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-800 via-blue-700 to-green-500">
       {/* Floating 3D Elements */}
       <motion.div
         className='absolute top-10 left-10 w-24 h-24 bg-purple-600 rounded-full opacity-60'
         animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
         transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
       />
       <motion.div
         className='absolute top-50 left-44 w-32 h-32 bg-red-600 rounded-full opacity-60'
         animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
         transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
       />
       <motion.div
         className='absolute bottom-20 right-10 w-32 h-32 bg-green-500 rounded-full opacity-60'
         animate={{ y: [0, -15, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
   />
   {/* <div className='w-full max-w-lg bg-white bg-opacity-10 backdrop-blur-md p-8 rounded-lg shadow-lg text-white flex flex-col items-center'> */}
   <div className="m-10 relative flex flex-col md:flex-row bg-white bg-opacity-10 backdrop-blur-md shadow-lg rounded-lg overflow-hidden p-3 md:p-8 w-full max-w-3xl">
        {/* Left Image Section (Hidden on Mobile) */}
        <div className="  hidden md:flex flex-1 justify-center items-center">
          <img src="../public/login.png" alt="Illustration" className="w-3/4" />
        </div>
        
        {/* Right Login Section */}
        <div className="flex-1 flex flex-col justify-center p-6 md:p-10">
          <img className="w-24 mx-auto mb-4" src="../public/logo.png" alt="Logo" />
          <h3 className="text-2xl font-semibold text-center text-gray-800 ">Welcome Back</h3>
          <form onSubmit={submitHandler} className="flex flex-col">
            
            <label className='block text-lg mt-5 mb-1'>Username</label>
            <input  placeholder="Enter your username" required value={username} onChange={(e) => setUsername(e.target.value)} className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" />
            <label className='block text-lg mb-1 mt-5'>Password</label>
            <input type="password" placeholder="Enter your password" required value={password} onChange={(e) => setPassword(e.target.value)} className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" />
            <button type="submit" className=" py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition mt-8">Login</button>
          </form>
          <p className="text-center text-sm text-gray-900 mt-4">New here? <Link to="/register" className="text-blue-900 font-semibold hover:underline">Create new account</Link></p>
        </div>
      </div>
      
      {/* Motion Div with Blurred Edge */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-blue-400 rounded-full blur-2xl opacity-50 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-400 rounded-full blur-3xl opacity-50 animate-bounce"></div>
    </div>
  );
};

export default UserLogin;