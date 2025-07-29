
import React, { useState, useEffect, createContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar";

import Landing    from "./pages/public/Landing";
import Login      from "./pages/public/Login";
import Register   from "./pages/public/Register";
import About      from "./pages/public/About";
import Features   from "./pages/public/Features";
import Markets    from "./pages/public/Markets";
import Learn      from "./pages/public/Learn";  

import Dashboard  from "./pages/app/Dashboard";
import Market     from "./pages/app/Market";
import Portfolios from "./pages/app/Portfolios";
import Trade      from "./pages/app/Trade";
import Profile    from "./pages/app/Profile";

export const AuthContext = createContext();


export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  useEffect(() => {
    const handleStorage = () => setToken(localStorage.getItem('token'));
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <Navbar />
      <Routes>
        {/* Public pages */}
        <Route path="/"         element={<Landing />} />
        {/* Auth pages */}
        <Route path="/login" element={token ? <Navigate to="/dashboard" replace /> : <Login />} />
        <Route path="/register" element={token ? <Navigate to="/dashboard" replace /> : <Register />} />
        <Route path="/about"     element={<About />} />
        <Route path="/features"  element={<Features />} />
        <Route path="/markets"   element={<Markets />} />
        <Route path="/learn"     element={<Learn />} />
        {/* Protected pages */}
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" replace />} />
        <Route path="/market"    element={token ? <Market /> : <Navigate to="/login" replace />} />
        <Route path="/portfolios" element={token ? <Portfolios /> : <Navigate to="/login" replace />} />
        <Route path="/trade"      element={token ? <Trade /> : <Navigate to="/login" replace />} />
        <Route path="/profile"    element={token ? <Profile /> : <Navigate to="/login" replace />} />
        {/* Catch-all for unfound routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </AuthContext.Provider>
  );
}
