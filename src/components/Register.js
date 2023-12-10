import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const { setIsAuthenticated } = useContext(AuthContext);

    const handleRegister = async (e) => {
      e.preventDefault();
      if (!username || !password || !email) {
        setErrorMessage('Please fill in the missing fields');
        return;
      }
      try {
          const response = await fetch('https://realworldapp.herokuapp.com/register', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, email, password }),
          });
          
          if (response.ok) {
            console.log('Registration successful for:', username); // Log after successful registration
              setIsAuthenticated(true); 
              navigate('/dashboard'); 
          } else {
              if (response.status === 409) { 
                  setErrorMessage('Username or email already exists');
              } else {
                  setErrorMessage('Registration failed. Please try again later.');
              }
          }
      } catch (error) {
          console.error('There was an error:', error);
          setErrorMessage('An error occurred during registration');
      }
  };
  

  return (
    <div className="login-container">
      <form onSubmit={handleRegister} className="input-form">
        <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button type="submit">Register</button>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </form>
      <p>
        Already have an account? <Link to="/">Login here</Link>
      </p>
    </div>
);

};

export default Register;
