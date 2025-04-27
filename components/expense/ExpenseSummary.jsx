import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Grid,
  Chip,
  Divider,
  Stack,
} from '@mui/material';

const ExpenseSummary = ({ expenseData, setActiveTab }) => {
  const { expenseCategories, expenseTimestamp, totalIncome, deficit } =
    expenseData;

  const saveDataForEdit = () => {
    // Logic to save data for editing
    localStorage.setItem('BB_EXPENSE_DATA', JSON.stringify(expenseData));
    setActiveTab(0);
  };
  return (
    <Card
      sx={{
        maxWidth: 800,
        margin: 'auto',
        mt: 4,
        borderRadius: 3,
        boxShadow: 4,
        p: 2,
      }}
    >
      <Grid container spacing={4}>
        {/* Left Side (30%) */}
        <Grid item xs={12} sm={4}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                Date
              </Typography>
              <Typography variant="body1">{expenseTimestamp}</Typography>
            </Box>

            <Divider />

            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                Total Income
              </Typography>
              <Typography variant="h6" color="success.main">
                ₹{totalIncome?.toFixed(2)}
              </Typography>
            </Box>

            <Divider />

            <Box>
              <Typography variant="subtitle2" color="textSecondary">
                Deficit
              </Typography>
              <Typography
                variant="h6"
                color={deficit ? 'error.main' : 'textSecondary'}
              >
                {deficit ? `₹${deficit.toFixed(2)}` : 'No Deficit'}
              </Typography>
            </Box>
          </Stack>
        </Grid>

        {/* Right Side (70%) */}
        <Grid item xs={12} sm={8}>
          <Typography variant="h6" gutterBottom>
            Expenses Breakdown
          </Typography>
          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            {Object.entries(expenseCategories || {}).map(
              ([category, amount]) => (
                <Grid item xs={12} sm={6} key={category}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                      justifyContent: 'flex-start',
                      p: 1,
                      borderRadius: 2,
                      bgcolor: 'grey.100',
                    }}
                  >
                    <Chip label={category} color="primary" size="small" />
                    <Typography variant="body1">
                      ₹{amount?.toFixed(2)}
                    </Typography>
                  </Box>
                </Grid>
              )
            )}
          </Grid>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              mt: 2,
            }}
          >
            <button
              type="button"
              onClick={saveDataForEdit}
              style={{
                backgroundColor: '#1976d2',
                color: '#ffffff',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              Edit
            </button>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ExpenseSummary;
