import { Typography } from '@mui/material';
import * as React from 'react';

import CustomButton from './CustomButton';

interface ButtonStyleType {
  name: string;
  text: string;
  top: string;
  left: string;
  url: string;
  size: 'small' | 'medium' | 'large';
  style: 'circle' | 'party';
}
interface VideoPreviewProps {
  buttonStyle: ButtonStyleType;
  videoCurrentTime: Array<number>;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({
  buttonStyle,
  videoCurrentTime,
}) => {
  const videoEl = React.useRef<HTMLVideoElement>(null!);
  const startTime: number | undefined = videoCurrentTime[0];
  const endTime: number | undefined = videoCurrentTime[1];

  const setVideoCurrentTime = () => {
    const video: any = videoEl.current;
    if (!video) return;
    video.currentTime = startTime;
  };

  const videoTimeChange = () => {
    const video: any = videoEl.current;
    if (video.currentTime > endTime!) {
      video.pause();
    }
  };

  return (
    <div>
      <Typography variant="h6" className="mb-4">
        Video Preview
      </Typography>
      <div style={{ position: 'relative', width: 600 }}>
        <video
          width="600"
          height="400"
          controls
          ref={videoEl}
          onClick={setVideoCurrentTime}
          onTimeUpdate={videoTimeChange}
        >
          <source
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
          Your browser does not support HTML5 video.
        </video>
        <CustomButton buttonStyle={buttonStyle} />
      </div>
    </div>
  );
};

export default VideoPreview;
