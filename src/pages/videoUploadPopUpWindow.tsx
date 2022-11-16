// import { useState } from 'react';
import { Box, Button, Card, TextField, Typography } from '@mui/material';

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
    </>
  );
};

export default VideoUploadPopUpWindow;
