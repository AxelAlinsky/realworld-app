
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './protectedRoute/ProtectedRoute';


function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
