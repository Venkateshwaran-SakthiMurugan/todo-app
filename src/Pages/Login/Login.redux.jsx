import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/actions/authActions';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.auth);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    try {
      // Dispatch login action
      await dispatch(login({ email, password }));
      // No need to navigate here as it's handled in the auth action
    } catch (error) {
      setError(error.message || 'Login failed. Please try again.');
    }
  };
  
  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2>Login to Your Account</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Don't have an account? <a href="#">Sign up</a></p>
          <p><a href="#">Forgot password?</a></p>
        </div>
      </div>
      
      <div className="login-info">
        <h3>Welcome to Todo App</h3>
        <p>
          This is a demo application. You can use any email and password to login.
          No actual authentication is performed.
        </p>
        <ul>
          <li>Manage your tasks efficiently</li>
          <li>Set due dates and priorities</li>
          <li>Integrate with Google Calendar</li>
          <li>Stay organized and productive</li>
        </ul>
      </div>
    </div>
  );
};

export default Login;