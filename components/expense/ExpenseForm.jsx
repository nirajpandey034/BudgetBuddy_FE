import React, { useState, useMemo, useCallback } from 'react';
import {
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Box,
  Typography,
  Chip,
  Alert,
} from '@mui/material';

const ExpenseForm = ({ categories, loading, onSubmit }) => {
  const [totalIncome, setTotalIncome] = useState('');
  const [expenses, setExpenses] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = useCallback((category, value) => {
    setExpenses((prevExpenses) => ({
      ...prevExpenses,
      [category]: value,
    }));
  }, []);

  const handleAddCategory = useCallback(
    (category) => {
      if (!selectedCategories.includes(category)) {
        setSelectedCategories((prev) => [...prev, category]);
      }
    },
    [selectedCategories]
  );

  const handleRemoveCategory = useCallback((category) => {
    setSelectedCategories((prev) => prev.filter((item) => item !== category));
    setExpenses((prevExpenses) => {
      const newExpenses = { ...prevExpenses };
      delete newExpenses[category];
      return newExpenses;
    });
  }, []);

  const totalExpenses = useMemo(() => {
    return Object.values(expenses).reduce(
      (acc, val) => acc + Number(val || 0),
      0
    );
  }, [expenses]);

  const remainingIncome = useMemo(() => {
    return Number(totalIncome) - totalExpenses;
  }, [totalIncome, totalExpenses]);

  const deficit = useMemo(() => {
    return remainingIncome < 0 ? Math.abs(remainingIncome) : null;
  }, [remainingIncome]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onSubmit(
        {
          totalIncome,
          expenseCategories: expenses,
          deficit,
        },
        resetForm
      );
    },
    [totalIncome, expenses, deficit, onSubmit]
  );

  const resetForm = useCallback(() => {
    setTotalIncome('');
    setExpenses({});
    setSelectedCategories([]);
  }, []);

  const loadingMessage = useMemo(() => <div>Loading categories...</div>, []);

  const categoryOptions = useMemo(
    () =>
      categories?.map((category) => (
        <MenuItem key={category.id} value={category.title}>
          {category.title}
        </MenuItem>
      )),
    [categories]
  );

  const selectedCategoryChips = useMemo(
    () =>
      selectedCategories.length > 0 ? (
        selectedCategories.map((category) => (
          <Chip
            key={category}
            label={category}
            onDelete={() => handleRemoveCategory(category)}
            sx={{ marginRight: 1, marginBottom: 1 }}
          />
        ))
      ) : (
        <Typography variant="body2" color="textSecondary">
          No categories selected yet.
        </Typography>
      ),
    [selectedCategories, handleRemoveCategory]
  );

  const expenseInputs = useMemo(
    () =>
      selectedCategories.map((category) => (
        <Box key={category} sx={{ marginBottom: 2 }}>
          <TextField
            label={`Enter Expense for ${category}`}
            type="number"
            value={expenses[category] || ''}
            onChange={(e) => handleCategoryChange(category, e.target.value)}
            fullWidth
            margin="normal"
            required
          />
        </Box>
      )),
    [selectedCategories, expenses, handleCategoryChange]
  );

  if (loading) {
    return loadingMessage;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Please enter your total monthly income and categorize your expenses.
      </Typography>

      <TextField
        label="Total Income"
        type="number"
        value={totalIncome}
        onChange={(e) => setTotalIncome(e.target.value)}
        fullWidth
        margin="normal"
        required
      />

      <Box sx={{ margin: '20px 0' }}>
        <Typography variant="subtitle1" gutterBottom>
          Select Expense Categories (You can add multiple)
        </Typography>
        <FormControl fullWidth margin="normal">
          <Select
            value=""
            onChange={(e) => handleAddCategory(e.target.value)}
            displayEmpty
            fullWidth
          >
            <MenuItem value="" disabled>
              Select Category
            </MenuItem>
            {categoryOptions}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ marginBottom: 2 }}>
        <Typography variant="subtitle2" color="textSecondary" gutterBottom>
          Selected Categories:
        </Typography>
        {selectedCategoryChips}
      </Box>

      {expenseInputs}

      {/* Summary and Deficit/Surplus Alert */}
      {Object.keys(expenses).length > 0 && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="subtitle1">Summary:</Typography>
          <Typography variant="body2">
            Total Expenses: ₹{totalExpenses}
          </Typography>
          <Typography variant="body2">
            Remaining Income: ₹{remainingIncome}
          </Typography>

          {remainingIncome < 0 ? (
            <Box sx={{ marginTop: 2 }}>
              <Alert severity="error" variant="filled">
                Warning: You are in deficit by ₹{Math.abs(remainingIncome)}
              </Alert>
            </Box>
          ) : (
            <Box sx={{ marginTop: 2 }}>
              <Alert severity="success" variant="filled">
                Great! You have a surplus of ₹{remainingIncome}
              </Alert>
            </Box>
          )}
        </Box>
      )}

      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        sx={{ marginTop: 3 }}
      >
        Submit
      </Button>
    </form>
  );
};

export default ExpenseForm;
