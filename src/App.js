import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login.js';
import Register from './components/Register.js'; // Import the Register component
import Dashboard from './components/Dashboard.js';
import ProtectedRoute from './protectedRoute/ProtectedRoute.js';
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/dashboard" element={<Dashboard />} />
        {/* You can also include ProtectedRoute for routes that require authentication */}
      </Routes>
    </Router>
  );
}

export default App;
