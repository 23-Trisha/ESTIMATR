import React, { useState,useEffect } from 'react';
import {Routes, Route, Navigate } from "react-router-dom";
import axios from 'axios';
import Home from './pages/Home'
import UserSignup from './pages/UserSignup';
import UserLogin from './pages/UserLogin';
import SearchForm from './pages/SearchForm';
import Results from './pages/Results';
import Hero from './pages/Hero';
import ProtectedRoute from './ProtectedRoute';


axios.defaults.withCredentials = true;

export default function App() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/home", {
      withCredentials: true
    }).then((res) => {
      if (res.data.success) setAuth(true);
      else setAuth(false);
    }).catch(() => setAuth(false));
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Hero/>} />
        <Route path='/login' element={<UserLogin setAuth={setAuth}/>}/>
        <Route path='/register' element={<UserSignup/>}/>
         <Route
          path="/home"
          element={
            <ProtectedRoute auth={auth}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/searchinput"
          element={
            <ProtectedRoute auth={auth}>
              <SearchForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/results"
          element={
            // <ProtectedRoute auth={auth}>
              <Results />
            // </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}