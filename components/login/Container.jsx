import React from 'react';
import { Grid } from '@mui/material';
import LoginCard from './LoginCard';

export default function Container() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ backgroundColor: '#f0f0f0' }}
    >
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <LoginCard />
      </Grid>
    </Grid>
  );
}
