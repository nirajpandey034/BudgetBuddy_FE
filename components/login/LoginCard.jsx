import React, { useState } from 'react';
import { loginUser } from '../../services/userService'; // Import the login service
import styles from './style.js'; // Import styles from the style.js file
import CircularProgress from '@mui/material/CircularProgress'; // Add MUI loader

export default function LoginCard() {
  // State for email and password
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Check for empty fields
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true); // Start loading
      await loginUser(formData.email, formData.password); // Call the login service
      window.location.href = '/user/expense'; // Redirect after success
    } catch (err) {
      setError(
        err.response?.data?.message || 'Login failed. Please try again.'
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login to Your Account</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Email Input */}
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* Password Input */}
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* Login Button */}
          <button
            type="submit"
            style={{ ...styles.button, position: 'relative' }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress
                size={24}
                color="inherit"
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: -12,
                  marginLeft: -12,
                }}
              />
            ) : (
              'Login'
            )}
          </button>

          <div style={styles.links}>
            <a href="/user/signup" style={styles.link}>
              Don't have an account? Register here
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
