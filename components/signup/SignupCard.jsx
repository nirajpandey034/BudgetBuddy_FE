import React, { useState } from 'react';
import { registerUser } from '../../services/userService'; // Import the register service
import styles from './style.js'; // Import styles from the style.js file
import CircularProgress from '@mui/material/CircularProgress'; // Import MUI loader

export default function SignupCard() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    profession: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loader state

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

    if (
      !formData.email ||
      !formData.password ||
      !formData.name ||
      !formData.profession
    ) {
      alert('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true); // Start loading
      await registerUser(
        formData.email,
        formData.password,
        formData.name,
        formData.profession
      );
      alert('Registration successful!');
      window.location.href = '/user/login';
    } catch (err) {
      setError(
        err.response?.data?.message || 'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Your Account</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {/* Name Input */}
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />

          {/* Profession Input */}
          <input
            type="text"
            name="profession"
            placeholder="Enter your profession"
            value={formData.profession}
            onChange={handleChange}
            style={styles.input}
            required
          />

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

          {/* Register Button */}
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
              'Register'
            )}
          </button>

          <div style={styles.links}>
            <a href="/user/login" style={styles.link}>
              Already have an account? Login here
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
