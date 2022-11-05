import { Box, TextField, Typography } from '@mui/material';
import * as React from 'react';

const ButtonPosition = () => {
  return (
    <>
      <Box className="flex h-48 w-3/5 flex-col items-center justify-center bg-white">
        <Typography variant="h5" className="mb-8">
          Button Position
        </Typography>
        <div className="flex flex-row">
          <TextField
            label="from top to bottom"
            type="number"
            variant="outlined"
            className="mx-2"
          />
          <TextField
            label="from left to right"
            type="number"
            variant="outlined"
          />
        </div>
      </Box>
    </>
  );
};

export default ButtonPosition;
