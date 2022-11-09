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

import ButtonPosition from '@/pages/button/buttonPosition';

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
        className="m-5 flex justify-center px-10 py-5"
        sx={{ width: 400, height: 700, flexDirection: 'column' }}
      >
        <Typography variant="h3" align="center" className="mb-2 flex">
          Button Settings
        </Typography>
        <Box className="my-4 flex items-center">
          <TextField
            id="outlined-basic"
            label="button name"
            variant="outlined"
            sx={{ mr: 2 }}
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
              direction="row"
              spacing={4}
            >
              <Paper
                sx={{
                  width: 100,
                  height: 30,
                  borderRadius: 50,
                  backgroundColor: '#CA4F79',
                  cursor: 'pointer',
                }}
                onClick={handleClickButtonStyle}
                // style={{ click == !true ? buttonStyle.Clickable : ''}}
                {...(click === !click ? buttonStyle.Clickable : '')}
              />
              <Paper
                sx={{
                  width: 100,
                  height: 30,
                  backgroundColor: '#CA4F79',
                  cursor: 'pointer',
                }}
                onClick={handleClickButtonStyle}
              />
            </Stack>
          </Box>
          <Box className="my-4">
            <Typography>Button Size</Typography>
            <Stack
              direction="row"
              spacing={4}
              className="my-4 flex items-center"
            >
              <Paper
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: 50,
                  backgroundColor: '#CA4F79',
                  cursor: 'pointer',
                }}
                onClick={handleClickButtonStyle}
              />
              <Paper
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 50,
                  backgroundColor: '#CA4F79',
                  cursor: 'pointer',
                }}
                onClick={handleClickButtonStyle}
              />
              <Paper
                sx={{
                  width: 25,
                  height: 25,
                  borderRadius: 50,
                  backgroundColor: '#CA4F79',
                  cursor: 'pointer',
                }}
                onClick={handleClickButtonStyle}
              />
            </Stack>
          </Box>
          <Box>
            <Typography>Button Action</Typography>
            <Box className="my-4 flex items-center" flexDirection={'column'}>
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
        <Stack className="my-4 flex items-start" direction="row" spacing={2}>
          <Button
            size="large"
            variant="contained"
            sx={{ backgroundColor: '#F3F3F3', color: '#CA4F79' }}
          >
            Cancel
          </Button>
          <Button
            size="large"
            variant="contained"
            sx={{ width: 110, backgroundColor: '#CA4F79' }}
          >
            Save
          </Button>
        </Stack>
      </Card>
    </>
  );
};

export default ButtonSettings;
