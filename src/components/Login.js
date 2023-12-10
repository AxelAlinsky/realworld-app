import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { AuthContext } from '../contexts/AuthContext.js';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();



  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
        setMessage('Please enter both username and password');
        return;
    }

    try {
        const response = await fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        try {
            const data = await response.json(); // Attempt to parse the response as JSON
            if (response.ok) {
                if (data.isAuthenticated) {
                    setIsAuthenticated(true);
                    localStorage.setItem('isAuthenticated', 'true');
                    navigate('/dashboard', { replace: true });
                } else {
                    setMessage(data.message || 'Invalid credentials');
                }
            } else {
                setMessage(data.message || 'Login failed. Please try again later.');
            }
        } catch (error) {
            console.error('Error parsing response:', error);
            setMessage('An error occurred during login');
        }
    } catch (error) {
        console.error('There was an error:', error);
        setMessage('An error occurred during login');
    }
};



  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated'); 
    if (authStatus) {
      setIsAuthenticated(true);
      navigate('/dashboard', { replace: true });
    }
  }, [setIsAuthenticated, navigate]);

  if (isAuthenticated) {
    navigate('/dashboard');
  }

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="input-form">
        <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        {message && <p className="error-message">{message}</p>}
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
};

export default Login;
