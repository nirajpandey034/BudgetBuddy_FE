import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Tab,
  Tabs,
  Box,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from '@mui/material';
import ExpenseCard from './ExpenseSummary';
import { listExpenses } from '../../services/expenseService';

const MonthlyTabs = () => {
  const currentYear = new Date().getFullYear();
  const years = useMemo(
    () => Array.from({ length: 10 }, (_, index) => currentYear - index),
    [currentYear]
  );

  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [error, setError] = useState(null);
  const [expenseData, setExpenseData] = useState(null);

  const months = useMemo(
    () => [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    []
  );

  const handleMonthChange = useCallback((event, newValue) => {
    setSelectedMonth(newValue);
  }, []);

  const handleYearChange = useCallback((event) => {
    setSelectedYear(event.target.value);
  }, []);

  const fetchExpenses = async () => {
    try {
      const data = await listExpenses({
        month: selectedMonth,
        year: selectedYear,
      });
      setExpenseData(data);
      setError(null);
    } catch {
      setError('No expense record found for this month and year.');
    }
  };

  useEffect(() => {
    console.log(selectedMonth, selectedYear);

    fetchExpenses();
  }, [selectedMonth, selectedYear]);

  return (
    <Box>
      <FormControl fullWidth margin="normal">
        <InputLabel>Year</InputLabel>
        <Select value={selectedYear} onChange={handleYearChange} label="Year">
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Tabs
        value={selectedMonth}
        onChange={handleMonthChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="monthly expense tabs"
      >
        {months.map((month, index) => (
          <Tab label={month} key={index} />
        ))}
      </Tabs>
      {error && <Box sx={{ color: 'red', mt: 2 }}>{error}</Box>}
      {!error && expenseData && <ExpenseCard expenseData={expenseData[0]} />}
    </Box>
  );
};

export default MonthlyTabs;
