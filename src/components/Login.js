import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom
import { AuthContext } from '../contexts/AuthContext.js';
import credentials from '../data/credentials.json';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // remove value from localStorage
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setMessage('Please enter both username and password');
      return;
    }

    // Search for a user where the input matches either the username or the email
    const user = credentials.users.find((cred) => 
      (cred.username === username || cred.email === username) && cred.password === password
    );
  
    if (user) {
      setIsAuthenticated(true);
      localStorage.setItem('isAuthenticated', 'true'); // set value in localStorage
      navigate('/dashboard', { replace: true });
    } else {
      setMessage('Invalid credentials');
    }
  };

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated'); // get value from localStorage
    if (authStatus) {
      setIsAuthenticated(true);
      navigate('/dashboard', { replace: true });
    }
  }, []);

  if (isAuthenticated) {
    navigate('/dashboard');
  }

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="input-form">
        <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        {message && <p className="error-message">{message}</p>} {/* Apply error-message class here */}
      </form>
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );  
};
export default Login;
