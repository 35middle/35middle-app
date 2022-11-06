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
            <TextField label="Viedeo title" variant="outlined" />
            <TextField label="Viedeo description" variant="outlined" />
          </div>
          <Button>Upload Video</Button>
        </div>
      </Card>
    </>
  );
};

export default VideoUploadPopUpWindow;
