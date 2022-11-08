import {
  Box,
  Button,
  Card,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import * as React from 'react';

const ButtonSettings = () => {
  const [click, setClick] = React.useState(false);
  // console.log(click);
  const handleClickButtonStyle = () => {
    setClick(!click);
  };

  const buttonStyle = {
    Clickable: {
      border: '2px solid #000',
    },
  };

  return (
    <>
      <Card
        className="m-5 flex flex-col justify-center px-10 py-5"
        sx={{ width: 400, height: 700 }}
      >
        <Typography variant="h3" align="center" className="mb-2 flex">
          Button Settings
        </Typography>
        <Box className="my-4 flex items-center">
          <TextField
            id="outlined-basic"
            label="button name"
            variant="outlined"
            // sx={{ mr: 2 }}
          />
          <TextField
            id="outlined-basic"
            label="button text"
            variant="outlined"
          />
        </Box>
        <Box className="flex flex-col items-start">
          <Box className="my-4">
            <Typography>Button Style</Typography>
            <Stack
              className="mt-8 flex items-start justify-center"
              spacing={4}
              direction={'row'}
            >
              <Paper
                className="h-8 w-24 cursor-pointer rounded-full bg-pink"
                onClick={handleClickButtonStyle}
                // style={{ click == !true ? buttonStyle.Clickable : ''}}
                {...(click === !click ? buttonStyle.Clickable : '')}
              />
              <Paper
                className="h-8 w-24 cursor-pointer bg-pink"
                onClick={handleClickButtonStyle}
              />
            </Stack>
          </Box>
          <Box className="my-4">
            <Typography>Button Size</Typography>
            <Stack
              spacing={4}
              direction={'row'}
              className="my-4 flex items-center"
            >
              <Paper
                className="h-14 w-14 cursor-pointer rounded-full bg-pink"
                onClick={handleClickButtonStyle}
              />
              <Paper
                className="h-10 w-10 cursor-pointer rounded-full bg-pink"
                onClick={handleClickButtonStyle}
              />
              <Paper
                className="h-6 w-6 cursor-pointer rounded-full bg-pink"
                onClick={handleClickButtonStyle}
              />
            </Stack>
          </Box>
          <Box>
            <Typography>Button Action</Typography>
            <Box className="my-4 flex flex-col items-center">
              <TextField
                id="outlined-basic"
                label="Link to"
                variant="outlined"
                sx={{ my: 2 }}
              />
              <TextField
                id="outlined-basic"
                label="Jump to video"
                variant="outlined"
              />
            </Box>
          </Box>
        </Box>
        <Stack className="my-4 flex items-start" spacing={2} direction={'row'}>
          <Button
            size="large"
            variant="contained"
            className="bg-slate-50 text-pink"
          >
            Cancel
          </Button>
          <Button size="large" variant="contained" className="w-28 bg-pink">
            Save
          </Button>
        </Stack>
      </Card>
    </>
  );
};

export default ButtonSettings;
