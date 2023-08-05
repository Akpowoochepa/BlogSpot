import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/login.css";




const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  //Login
  const LoginLogic = async (e) => {
    e.preventDefault();
    console.log('email:', email);
    console.log('password:', password);
  
    try {
      
      const response = await axios.post('http://localhost:3001/login', { email, password });
      if (response.status === 200) {
        navigate('/blogpost');
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };

  const RegisterButton = () => {
    navigate('/register');
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="bg-white p-5 rounded shadow-sm">
        <form>
          <h3 className="text-center mb-4">Login</h3>
  
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" id="email" className="form-control login-input" placeholder="Type in your Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
  
  
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" id="password" className="form-control login-input" placeholder="Type in your Password"  value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
  
       
          <div className="d-grid">
            <button type="button" onClick={LoginLogic} className="btn btn-secondary">log into account</button>
          </div>

          <div className="d-grid" >

            <div className='mb-3'></div>
            <button type="button" onClick={RegisterButton} className="btn btn-secondary">Register Account</button>
          </div>

        </form>
      </div>
    </div>
  );
  
};

export default Login;
