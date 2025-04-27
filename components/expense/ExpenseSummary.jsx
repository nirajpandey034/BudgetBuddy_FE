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

const ExpenseSummary = ({ expenseData }) => {
  const { expenseCategories, expenseTimestamp, totalIncome, deficit } =
    expenseData;

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
                      alignItems: 'center',
                      justifyContent: 'space-between',
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
        </Grid>
      </Grid>
    </Card>
  );
};

export default ExpenseSummary;
