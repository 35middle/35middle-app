import { Typography } from '@mui/material';
import * as React from 'react';

import CustomButton from './CustomButton';

interface ButtonStyleType {
  startTime: number | undefined;
  endTime: number | undefined;
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
  setButtonStyle: Function;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({
  buttonStyle,
  setButtonStyle,
}) => {
  const videoEl = React.useRef<HTMLVideoElement>(null!);

  React.useEffect(() => {
    if (buttonStyle.startTime !== 0 && buttonStyle.startTime !== undefined) {
      videoEl.current.currentTime = buttonStyle.startTime;
      videoEl.current.play();
    }
  });
  const draggleRef = React.useRef(null);

  const videoTimeChange = () => {
    const video: any = videoEl.current;
    if (
      buttonStyle.endTime !== undefined &&
      video.currentTime > buttonStyle.endTime
    ) {
      video.pause();
    }
  };

  return (
    <div className="flex flex-col justify-center px-5">
      <Typography variant="h5" className="mb-0">
        Video Preview
      </Typography>

      <div
        style={{ position: 'relative', width: 600, height: '400px' }}
        ref={draggleRef}
      >
        <video
          width="600"
          height="400"
          controls
          ref={videoEl}
          onTimeUpdate={videoTimeChange}
          style={{ objectFit: 'fill' }}
        >
          <source
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
          Your browser does not support HTML5 video.
        </video>

        <CustomButton
          buttonStyle={buttonStyle}
          draggleRef={draggleRef}
          setButtonStyle={setButtonStyle}
        />
      </div>
    </div>
  );
};

export default VideoPreview;
