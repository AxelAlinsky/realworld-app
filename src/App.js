import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register'; // Import the Register component
import Dashboard from './components/Dashboard';
import ProtectedRoute from './protectedRoute/ProtectedRoute';
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
