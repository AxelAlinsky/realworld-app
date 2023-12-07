import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom


const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState(''); // Assuming you want to collect email
    // You can also include state for error messages or confirmation messages
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        // Implement your registration logic here
        // On successful registration, you might want to navigate to the login page or dashboard
      };

      return (
        <div className="login-container"> {/* Consider renaming this class to a more generic name like 'auth-container' */}
          <form onSubmit={handleRegister} className="input-form">
            <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
            <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
            <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            <button type="submit">Register</button>
          </form>
          <p>
            Already have an account? <Link to="/">Login here</Link> {/* Add this line for the login link */}
          </p>
        </div>
      );
    };

export default Register;
