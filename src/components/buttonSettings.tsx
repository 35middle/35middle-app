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
        className="m-5 flex justify-center px-10 py-5 h-screen"
        sx={{ width: 400, flexDirection: 'column' }}
      >
        <Typography variant="h6" align="center" className="mb-2 flex">
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
              direction="row"
              spacing={4}
            >
              <Paper
                className="bg-pink h-8 w-24 cursor-pointer rounded-full"
                // onClick={handleClickButtonStyle}
                // // style={{ click == !true ? buttonStyle.Clickable : ''}}
                // {...(click === !click ? buttonStyle.Clickable : '')}
                style={buttonStyle.style === 'circle' ? border : {}}
                onClick={() => handleClickButtonStyle('circle')}
              />
              <Paper
                className="bg-pink h-8 w-24 cursor-pointer"
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
              direction="row"
              spacing={4}
              className="my-4 flex items-center"
            >
              <Paper
                className="bg-pink h-14 w-14 cursor-pointer rounded-full"
                // onClick={handleClickButtonStyle}
                onClick={() => handleClickButtonSize('large')}
                style={buttonStyle.size === 'large' ? border : {}}
              />
              <Paper
                className="bg-pink h-10 w-10 cursor-pointer rounded-full"
                // onClick={handleClickButtonStyle}
                onClick={() => handleClickButtonSize('medium')}
                style={buttonStyle.size === 'medium' ? border : {}}
              />
              <Paper
                className="bg-pink h-6 w-6 cursor-pointer rounded-full"
                // onClick={handleClickButtonStyle}
                onClick={() => handleClickButtonSize('small')}
                style={buttonStyle.size === 'small' ? border : {}}
              />
            </Stack>
          </Box>
          {/* button action */}
          <Box>
            <Typography>Button Action</Typography>
            <Box className="my-4 flex items-center" flexDirection={'column'}>
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
