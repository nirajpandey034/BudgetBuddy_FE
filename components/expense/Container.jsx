import React, { useState, useEffect, useCallback } from 'react';
import { Tab, Tabs, Box, Typography, Button } from '@mui/material';
import ExpenseForm from './ExpenseForm'; // your existing form
import { fetchCategories } from '../../services/categoryService';
import { addExpense } from '../../services/expenseService';
import MonthlyTabs from './MonthlyTabs';

export default function Container() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (e) {
        console.error('Error fetching categories', e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleFormSubmit = useCallback(async (formData, resetForm) => {
    try {
      await addExpense(formData);
      alert('Expense added successfully!');
      resetForm(); // Reset form after successful submission
    } catch (error) {
      console.error('Error submitting form', error);
    }
  }, []);

  const handleLogout = () => {
    // Clear all cookies
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
    });

    // Redirect to login page
    window.location.href = '/user/login';
  };

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Tabs
        value={activeTab}
        onChange={(_, newVal) => setActiveTab(newVal)}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Add Expense" />
        <Tab label="Monthly View" />
      </Tabs>

      {/* Tab 1: Add Expense */}
      <Box role="tabpanel" hidden={activeTab !== 0} sx={{ p: 3 }}>
        {activeTab === 0 && (
          <ExpenseForm
            categories={categories}
            loading={loading}
            onSubmit={handleFormSubmit}
          />
        )}
      </Box>

      {/* Tab 2: Monthly View (placeholder) */}
      <Box role="tabpanel" hidden={activeTab !== 1} sx={{ p: 3 }}>
        {activeTab === 1 && (
          <Typography color="textSecondary">
            {/* Your monthly-view component goes here */}
            Monthly expenses will be displayed here.
            <MonthlyTabs />
          </Typography>
        )}
      </Box>

      {/* Logout Button */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleLogout}
          sx={{
            padding: '10px 20px',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '8px',
            textTransform: 'none',
            boxShadow: 3,
            '&:hover': {
              backgroundColor: '#ff3d00',
              color: '#fff',
            },
          }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}
