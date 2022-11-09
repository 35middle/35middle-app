import { Typography } from '@mui/material';

const VideoPreview = () => {
  return (
    // <div className="m-9 flex w-1/2 flex-col">
    <div>
      <Typography variant="h6" className="mb-4">
        Video Preview
      </Typography>
      <video className="mx-16" controls>
        <source
          src="https://file-examples.com/storage/fea4ef07a863619cfa0b308/2017/04/file_example_MP4_480_1_5MG.mp4"
          type="video/mp4"
        />
        Your browser does not support HTML5 video.
      </video>
    </div>
    // </div>
  );
};

export default VideoPreview;
