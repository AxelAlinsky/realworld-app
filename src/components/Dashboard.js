import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Dashboard = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;