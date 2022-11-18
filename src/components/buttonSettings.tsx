import {
  Box,
  Button,
  Card,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import * as React from 'react';

// import ButtonPosition from '@/pages/button/buttonPosition';

const ButtonSettings = (props: any) => {
  // const [click, setClick] = React.useState(false);
  // // console.log(click);
  // const handleClickButtonStyle = () => {
  //   setClick(!click);
  // };
  const { buttonStyle, setButtonStyle } = props;
  const { name, text, top, left, url } = buttonStyle;

  const NamehandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setButtonStyle((v: any) => ({ ...v, name: value }));
  };
  const TexthandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setButtonStyle((v: any) => ({ ...v, text: value }));
  };
  const TophandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setButtonStyle((v: any) => ({ ...v, top: value }));
  };
  const LefthandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setButtonStyle((v: any) => ({ ...v, left: value }));
  };

  const UrlhandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setButtonStyle((v: any) => ({ ...v, url: value }));
  };

  const handleClickButtonStyle = (value: string) => {
    setButtonStyle((v: any) => ({ ...v, style: value }));
  };

  const handleClickButtonSize = (value: string) => {
    setButtonStyle((v: any) => ({ ...v, size: value }));
  };

  const border = {
    // Clickable: {
    border: '3px solid #000',
    // },
  };

  return (
    <>
      <Card
        className="flex justify-center px-5"
        sx={{ width: 500, flexDirection: 'column' }}
      >
        <Typography variant="h5" align="center" className="mb-4 flex">
          Button Settings
        </Typography>
        <Box className="my-2 flex items-center justify-between">
          <TextField
            fullWidth
            id="outlined-basic"
            label="button name"
            variant="outlined"
            className="mx-2"
            value={name}
            onChange={NamehandleChange}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="button text"
            variant="outlined"
            value={text}
            onChange={TexthandleChange}
          />
        </Box>

        {/* button position */}
        <div>
          <Typography variant="h6" align="center" className="my-2 flex">
            Button Position
          </Typography>
          <Box className="my-2 flex items-center justify-between">
            <TextField
              fullWidth
              label="from top to bottom"
              type="number"
              variant="outlined"
              className="mx-2"
              InputProps={{
                inputProps: { min: 0, max: 100 },
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              value={top}
              onChange={TophandleChange}
            />
            <TextField
              fullWidth
              label="from left to right"
              type="number"
              variant="outlined"
              InputProps={{
                inputProps: { min: 0, max: 100 },
                endAdornment: <InputAdornment position="end">%</InputAdornment>,
              }}
              value={left}
              onChange={LefthandleChange}
            />
          </Box>
        </div>

        {/* button style */}
        <div>
          <Typography variant="h6" align="center" className="my-2 flex">
            Button Style
          </Typography>
          <Box className="my-1 flex items-center justify-between">
            <Stack
              className="mt-1 flex items-start justify-center"
              direction="row"
              spacing={4}
              direction={'row'}
            >
              <Paper
                className="h-8 w-24 cursor-pointer rounded-full"
                style={buttonStyle.style === 'circle' ? border : {}}
                onClick={() => handleClickButtonStyle('circle')}
                sx={{ bgcolor: 'primary.main' }}
              />
              <Paper
                className="h-8 w-24 cursor-pointer"
                style={buttonStyle.style === 'party' ? border : {}}
                onClick={() => handleClickButtonStyle('party')}
                sx={{ bgcolor: 'primary.main' }}
              />
            </Stack>
          </Box>
        </div>

        {/* button size */}
        <div>
          <Typography variant="h6" align="center" className="my-2 flex">
            Button Size
          </Typography>
          <Box className="my-1 flex items-center justify-between">
            <Stack
              spacing={4}
              className="my-1 flex items-center"
            >
              <Paper
                className="h-14 w-14 cursor-pointer rounded-full"
                onClick={() => handleClickButtonSize('large')}
                style={buttonStyle.size === 'large' ? border : {}}
                sx={{ bgcolor: 'primary.main' }}
              />
              <Paper
                className="h-10 w-10 cursor-pointer rounded-full"
                onClick={() => handleClickButtonSize('medium')}
                style={buttonStyle.size === 'medium' ? border : {}}
                sx={{ bgcolor: 'primary.main' }}
              />
              <Paper
                className="h-6 w-6 cursor-pointer rounded-full"
                onClick={() => handleClickButtonSize('small')}
                style={buttonStyle.size === 'small' ? border : {}}
                sx={{ bgcolor: 'primary.main' }}
              />
            </Stack>
          </Box>
        </div>

        {/* button Action */}
        <div>
          <Typography variant="h6" align="center" className="my-2 flex">
            Button Action
          </Typography>
          <Box className="items-center justify-between">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Link to"
              variant="outlined"
              sx={{ my: 1 }}
              value={url}
              onChange={UrlhandleChange}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Jump to video"
              variant="outlined"
            />
          </Box>
        </div>

        <Stack className="my-4 flex items-start" direction="row" spacing={2}>
          <Button size="large" variant="contained">
            Cancel
          </Button>
          <Button size="large" variant="contained">
            Save
          </Button>
        </Stack>
      </Card>
    </>
  );
};

export default ButtonSettings;
