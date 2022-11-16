import { Box, Button, Card, TextField, Typography } from '@mui/material';
import type { LinearProgressProps } from '@mui/material/LinearProgress';
import LinearProgress from '@mui/material/LinearProgress';
import { useEffect, useState } from 'react';

import PopUpWindow from '@/pages/popUpWindow';

const UploadButton = () => {
  return (
    <Button
      variant="contained"
      component="label"
      className="p-5"
      // onClick={() => <PopUpWindow />}
    >
      Upload Video
      <input hidden accept="image/*" multiple type="file" />
    </Button>
  );
};
export { UploadButton };

const LinearProgressWithLabel = (
  props: LinearProgressProps & { value: number }
) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          props.value
        )}%`}</Typography>
      </Box>
    </Box>
  );
};

const LinearWithValueLabel = () => {
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress >= 100 ? 10 : prevProgress + 10
      );
    }, 800);
    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <Box sx={{ width: '100%' }}>
      <LinearProgressWithLabel value={progress} />
    </Box>
  );
};
export { LinearWithValueLabel };

const VideoUploadPopUpWindow = () => {
  return (
    <>
      <Card className="flex h-96 w-80 flex-col justify-between">
        <Box className="flex h-16 items-center justify-center bg-slate-100">
          <Typography variant="h5">video upload</Typography>
        </Box>
        <div className="flex h-80 flex-col justify-between p-5">
          <div className="flex h-36 flex-col items-center justify-between">
            <TextField label="Viedeo title" variant="outlined" />
            <TextField label="Viedeo description" variant="outlined" />
          </div>
          <Button
            variant="contained"
            className="p-5"
            component="label"
            onClick={() => <PopUpWindow />}
          >
            Upload Video
          </Button>
          {/* <UploadButton /> */}
          <div className="flex flex-row items-center justify-between">
            <Button className="p-3" variant="contained">
              Cancel
            </Button>
            <Button className="p-3" variant="contained">
              Save
            </Button>
          </div>
        </div>
      </Card>

      <Card className="flex h-96 w-80 flex-col justify-between">
        <Box className="flex h-16 items-center justify-center bg-slate-100">
          <Typography variant="h5">video upload</Typography>
        </Box>
        <div className="flex h-80 w-80 flex-col items-center justify-center bg-gray-300/60 font-bold">
          <p>Congratulations!</p>
          <p>Your video has been uploaded.</p>
          {/* <p>Failed to upload the video.</p>
          <p>Please try again.</p> */}
        </div>
      </Card>

      <LinearWithValueLabel />
    </>
  );
};

export default VideoUploadPopUpWindow;
