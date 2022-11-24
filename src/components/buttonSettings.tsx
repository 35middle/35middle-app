import {
  Box,
  Button,
  InputAdornment,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import * as React from 'react';

// import ButtonPosition from '@/pages/button/buttonPosition';

const ButtonSettings = (props: any) => {
  const [isJumpToVideo, setIsJumpToVideo] = React.useState(false);
  const [isUrl, setIsUrl] = React.useState(true);

  // const [click, setClick] = React.useState(false);
  // // console.log(click);
  // const handleClickButtonStyle = () => {
  //   setClick(!click);
  // };
  const { buttonStyle, setButtonStyle } = props;
  const { name, text, top, left } = buttonStyle;

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
    if (value !== '') {
      setButtonStyle((v: any) => ({ ...v, url: value }));
      setIsUrl(true);
    } else {
      setButtonStyle((v: any) => ({ ...v, url: undefined }));
      setIsUrl(false);
    }
  };

  const JumpToTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.includes(':')) {
      const timeArray: Array<string> = value.split(':');
      if (timeArray[0] !== undefined && timeArray[1] !== undefined) {
        const jumpToTimeSeconds: number = +timeArray[0] * 60 + +timeArray[1];
        setButtonStyle((v: any) => ({ ...v, jumpToTime: jumpToTimeSeconds }));
        setIsJumpToVideo(true);
      }
    } else {
      setIsJumpToVideo(false);
    }
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
      <div className="flex flex-col justify-center px-5" style={{ width: 500 }}>
        <Typography variant="h5" align="center" className="mt-0 mb-1 flex">
          Button Settings
        </Typography>
        <Box className="my-1 flex items-center justify-between">
          <TextField
            fullWidth
            id="outlined-basic"
            label="button name"
            variant="outlined"
            className="m-1"
            value={name}
            size="small"
            onChange={NamehandleChange}
          />
          <TextField
            fullWidth
            id="outlined-basic"
            label="button text"
            variant="outlined"
            className="m-1"
            value={text}
            size="small"
            onChange={TexthandleChange}
          />
        </Box>

        {/* button position */}
        <div>
          <Typography variant="h6" align="center" className="my-1 flex">
            Button Position
          </Typography>
          <Box className="my-1 flex items-center justify-between">
            <TextField
              fullWidth
              label="from top to bottom"
              type="number"
              variant="outlined"
              className="m-1"
              size="small"
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
              size="small"
              variant="outlined"
              className="m-1"
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
          <Typography variant="h6" align="center" className="my-1 flex">
            Button Style
          </Typography>
          <Box className="my-1 flex items-center justify-between">
            <Stack
              className="mt-1 flex items-start justify-center"
              direction="row"
              spacing={4}
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
          <Typography variant="h6" align="center" className="my-1 flex">
            Button Size
          </Typography>
          <Box className="my-2 flex items-center justify-between">
            <Stack
              direction="row"
              spacing={4}
              className="my-1 flex items-center"
            >
              <Paper
                className="h-12 w-12 cursor-pointer rounded-full my-1"
                onClick={() => handleClickButtonSize('large')}
                style={buttonStyle.size === 'large' ? border : {}}
                sx={{ bgcolor: 'primary.main' }}
              />
              <Paper
                className="h-8 w-8 cursor-pointer rounded-full"
                onClick={() => handleClickButtonSize('medium')}
                style={buttonStyle.size === 'medium' ? border : {}}
                sx={{ bgcolor: 'primary.main' }}
              />
              <Paper
                className="h-5 w-5 cursor-pointer rounded-full"
                onClick={() => handleClickButtonSize('small')}
                style={buttonStyle.size === 'small' ? border : {}}
                sx={{ bgcolor: 'primary.main' }}
              />
            </Stack>
          </Box>
        </div>

        {/* button Action */}
        <div>
          <Typography variant="h6" align="center" className="my-1 flex">
            Button Action
          </Typography>
          <Box className="items-center justify-between">
            <TextField
              fullWidth
              id="outlined-basic"
              label="Link to"
              variant="outlined"
              size="small"
              onChange={UrlhandleChange}
              className="m-1"
              disabled={isJumpToVideo}
            />
            <TextField
              fullWidth
              id="outlined-basic"
              label="Jump to video"
              size="small"
              variant="outlined"
              onChange={JumpToTimeChange}
              className="m-1"
              disabled={isUrl}
            />
          </Box>
        </div>

        <Stack
          className="mt-1 mb-0 flex items-start"
          direction="row"
          spacing={2}
        >
          <Button size="medium" variant="contained">
            Cancel
          </Button>
          <Link href={`/video-preview`}>
            <Button size="medium" variant="contained">
              Video Preview
            </Button>
          </Link>
        </Stack>
      </div>
    </>
  );
};

export default ButtonSettings;
