import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { AuthContext } from '../contexts/AuthContext.js';
import credentials from '../data/credentials.json';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  // const handleLogout = () => {
  //   setIsAuthenticated(false);
  //   localStorage.removeItem('isAuthenticated'); 
  // };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage('Please enter both username and password');
      return;
    }

    const user = credentials.users.find((cred) => 
      (cred.username === username || cred.email === username) && cred.password === password
    );
  
    if (user) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true'); 
      navigate('/dashboard', { replace: true });
    } else {
      setMessage('Invalid credentials');
    }
  };

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated'); 
    if (authStatus) {
      setIsAuthenticated(true);
      navigate('/dashboard', { replace: true });
    }
  }, [setIsAuthenticated, navigate]); // Added missing dependencies


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
