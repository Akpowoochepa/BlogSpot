import React, { useState } from "react";
import axios from "axios";
import "../styles/register.css";
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const RegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/register", { email, username, password });
      console.log(response.data);
      if (response.status === 201) {
        alert('User registered successfully.');
        navigate('/'); // Redirect the user to the login page
      } else {
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      console.error('Error response:', error.response);
      alert(`Registration failed. Error: Enter input to empty fields`);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="bg-white p-5 rounded shadow">
        <form>
          <h3 className="text-center mb-4">Register</h3>
  
          <div className="mb-3">
            <label htmlFor="email" className="form-label Register-input">Email</label>
            <input type="email" id="email" className="form-control" placeholder="Type in your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
  
          <div className="mb-3">

            <label htmlFor="username" className="form-label Register-input">Username</label>
            
            <input type="text" id="username" className="form-control" placeholder="Type in your Username" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
  
          <div className="mb-3">
            <label htmlFor="password" className="form-label Register-input">Password</label>
            <input type="password" id="password" className="form-control" placeholder="Type in your Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
  
       
          <div className="d-grid">
            <button type="button" onClick={RegisterSubmit} className="btn btn-secondary">Register Account</button>
          </div>
        </form>
      </div>
    </div>
  );
  
  
  
};

export default Register;
