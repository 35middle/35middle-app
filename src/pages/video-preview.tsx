<<<<<<< HEAD
import { Typography } from '@mui/material';

const VideoPreview = () => {
  return (
    <div className="m-9 flex w-1/2 flex-col">
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
  );
};

export default VideoPreview;
||||||| parent of b03f35a (feat: create button component)
=======
import { useRouter } from 'next/router';
import React from 'react';

import CustomButton from '../components/CustomButton';

const videoPreview = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  return (
    <div className="content">
      <div className="content-video">
        <video width="600" height="400" controls autoPlay muted>
          <source src={`${router.basePath}/demo.mp4`} type="video/mp4" />
        </video>
        <CustomButton name={'ADD TO CART'} />
      </div>
    </div>
  );
};

export default videoPreview;
>>>>>>> b03f35a (feat: create button component)
