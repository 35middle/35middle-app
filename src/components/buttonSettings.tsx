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
        className="m-5 flex justify-center px-10 py-5"
        sx={{ width: 400, height: 800, flexDirection: 'column' }}
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
            value={name}
            onChange={NamehandleChange}
          />
          <TextField
            id="outlined-basic"
            label="button text"
            variant="outlined"
            value={text}
            onChange={TexthandleChange}
          />
        </Box>
        {/* button position */}
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
              InputProps={{ inputProps: { min: 0, max: 100 } }}
              value={top}
              onChange={TophandleChange}
            />
            <TextField
              label="from left to right"
              type="number"
              variant="outlined"
              InputProps={{ inputProps: { min: 0, max: 100 } }}
              value={left}
              onChange={LefthandleChange}
            />
          </div>
        </Box>
        {/* button style */}
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
                // onClick={handleClickButtonStyle}
                // // style={{ click == !true ? buttonStyle.Clickable : ''}}
                // {...(click === !click ? buttonStyle.Clickable : '')}
                style={buttonStyle.style === 'circle' ? border : {}}
                onClick={() => handleClickButtonStyle('circle')}
              />
              <Paper
                className="h-8 w-24 cursor-pointer bg-pink"
                // onClick={handleClickButtonStyle}
                style={buttonStyle.style === 'party' ? border : {}}
                onClick={() => handleClickButtonStyle('party')}
              />
            </Stack>
          </Box>
          {/* button size */}
          <Box className="my-4">
            <Typography>Button Size</Typography>
            <Stack
              spacing={4}
              direction={'row'}
              className="my-4 flex items-center"
            >
              <Paper
                className="h-14 w-14 cursor-pointer rounded-full bg-pink"
                // onClick={handleClickButtonStyle}
                onClick={() => handleClickButtonSize('large')}
                style={buttonStyle.size === 'large' ? border : {}}
              />
              <Paper
                className="h-10 w-10 cursor-pointer rounded-full bg-pink"
                // onClick={handleClickButtonStyle}
                onClick={() => handleClickButtonSize('medium')}
                style={buttonStyle.size === 'medium' ? border : {}}
              />
              <Paper
                className="h-6 w-6 cursor-pointer rounded-full bg-pink"
                // onClick={handleClickButtonStyle}
                onClick={() => handleClickButtonSize('small')}
                style={buttonStyle.size === 'small' ? border : {}}
              />
            </Stack>
          </Box>
          {/* button action */}
          <Box>
            <Typography>Button Action</Typography>
            <Box className="my-4 flex flex-col items-center">
              <TextField
                id="outlined-basic"
                label="Link to"
                variant="outlined"
                sx={{ my: 2 }}
                value={url}
                onChange={UrlhandleChange}
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
