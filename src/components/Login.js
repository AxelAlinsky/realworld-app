import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import credentials from '../credentials.json';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = credentials.find((cred) => cred.username === username && cred.password === password);
    if (user) {
      setIsAuthenticated(true);
      navigate('/dashboard');
    } else {
      setMessage('Invalid credentials');
    }
  };

  if (isAuthenticated) {
    navigate('/dashboard');
  }

  return (
    <div className="login-container ">
      <form onSubmit={handleLogin} className="input-form">
        <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
export default Login;
