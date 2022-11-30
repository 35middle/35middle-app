// import { Typography } from '@mui/material';
import * as React from 'react';

import CustomButton from './CustomButton';

interface ButtonStyleType {
  startTime: number | undefined;
  endTime: number | undefined;
  jumpToTime: number | undefined;
  name: string;
  text: string;
  top: string;
  left: string;
  url: string | undefined;
  size: 'small' | 'medium' | 'large';
  style: 'circle' | 'party';
}
interface VideoPreviewProps {
  videoUrl: string;
  buttonStyle: ButtonStyleType;
  setButtonStyle: any;
}

const VideoPreview: React.FC<VideoPreviewProps> = ({
  videoUrl,
  buttonStyle,
  setButtonStyle,
}) => {
  const videoEl = React.useRef<HTMLVideoElement>(null!);

  React.useEffect(() => {
    if (buttonStyle.startTime) {
      videoEl.current.currentTime = buttonStyle.startTime;
    }
  }, [buttonStyle.startTime]);
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

  const onClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    if (buttonStyle.url !== undefined) {
      window.open(`https://${buttonStyle.url}`);
    } else if (buttonStyle.jumpToTime !== undefined) {
      videoEl.current.currentTime = buttonStyle.jumpToTime;
      videoEl.current.play();
    }
  };

  return (
    <div className="flex flex-col justify-center px-5">
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
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>

        <CustomButton
          onClick={onClick}
          buttonStyle={buttonStyle}
          draggleRef={draggleRef}
          setButtonStyle={setButtonStyle}
        />
      </div>
    </div>
  );
};

export default VideoPreview;
