import React from 'react';
import { Grid } from '@mui/material';
import SignupCard from './SignupCard';

export default function Container() {
  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item xs={12} sm={8} md={6} lg={4}>
        <SignupCard />
      </Grid>
    </Grid>
  );
}
