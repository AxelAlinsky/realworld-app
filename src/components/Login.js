import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom
import { AuthContext } from '../contexts/AuthContext';
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
    const user = credentials.find((cred) => cred.username === username && cred.password === password);
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
      </form>
      {message && <p>{message}</p>}
      <p>
        Don't have an account? <Link to="/register">Register here</Link>
      </p> {/* Add this line for the register link */}
    </div>
  );
};
export default Login;
