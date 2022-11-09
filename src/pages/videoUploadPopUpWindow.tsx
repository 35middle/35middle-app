import { Box, Button, Card, TextField, Typography } from '@mui/material';

const VideoUploadPopUpWindow = () => {
  return (
    <>
      <Card>
        <Box className="bg-white p-10">
          <Typography variant="h5">video upload</Typography>
        </Box>
        <div className="flex flex-col p-10">
          <div>
            <TextField label="Video title" variant="outlined" />
            <TextField label="Video description" variant="outlined" />
          </div>
          <Button>Upload Video</Button>
        </div>
      </Card>
    </>
  );
};

export default VideoUploadPopUpWindow;
