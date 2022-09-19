import React from 'react'
// import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const resetPassword = () => (
  <div>
    <div className='flex flex-col items-center justify-center m-20'>
    <img className='p-5' src="" alt="35middle Logo" />
    <TextField className='bg-gradient-to-r from-blue-300 to bule-200 .rounded-lg m-2'
          id="outlined-password-input"
          label="New Password"
          type="password"
          // autoComplete="current-password"
        />
        <TextField className='bg-gradient-to-r from-blue-300 to bule-200 .rounded-lg m-2'
          id="outlined-password-input"
          label="Confirm Password"
          type="password"
          autoComplete="current-password"
        />
    <Button className='bg-bule-100 .rounded-lg text-gray-800 hover:text-gray-200' variant="contained">Submit</Button>
    </div>
  </div>
);

export default resetPassword;