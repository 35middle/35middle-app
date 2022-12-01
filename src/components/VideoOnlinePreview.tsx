import { Box } from '@mui/material';
import React from 'react';

import CustomButtonPreview from '@/components/CustomButtonPreview';
import type { BasePageProps } from '@/types';

export { getServerSideProps } from '@/core/auth';

// eslint-disable-next-line @typescript-eslint/naming-convention
interface buttonPreviewStyleType {
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

type Props = BasePageProps & {
  buttonPreviewStyle: buttonPreviewStyleType;
  videoUrl: string;
};

const VideoOnlinePreview = ({ buttonPreviewStyle, videoUrl }: Props) => {
  const [isButtonOn, setIsButtonOn] = React.useState(false);
  // const [buttonPreviewStyle] = React.useState<buttonPreviewStyleType>({
  //   startTime: 5,
  //   endTime: 10,
  //   jumpToTime: 300,
  //   name: 'Button 1',
  //   text: 'Buy me now',
  //   top: '50',
  //   left: '50',
  //   style: 'circle',
  //   size: 'large',
  //   url: undefined,
  // });

  const videoEl = React.useRef<HTMLVideoElement>(null!);

  const videoTimeChange = () => {
    const video: any = videoEl.current;

    if (
      buttonPreviewStyle.startTime !== undefined &&
      video.currentTime > buttonPreviewStyle.startTime
    ) {
      setIsButtonOn(true);
      buttonPreviewStyle.startTime = 596;
    }

    if (
      buttonPreviewStyle.endTime !== undefined &&
      video.currentTime > buttonPreviewStyle.endTime
    ) {
      setIsButtonOn(false);
      buttonPreviewStyle.endTime = 596;
    }
  };

  const onClick = (event: any) => {
    event.preventDefault();
    event.stopPropagation();
    if (buttonPreviewStyle.url !== undefined) {
      window.open(`https://${buttonPreviewStyle.url}`);
    } else if (buttonPreviewStyle.jumpToTime !== undefined) {
      videoEl.current.currentTime = buttonPreviewStyle.jumpToTime;
      videoEl.current.play();
    }
  };

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box className="flex flex-col justify-center px-5">
        <Box style={{ position: 'relative', width: 600, height: '400px' }}>
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
          {isButtonOn ? (
            <CustomButtonPreview
              onClick={onClick}
              buttonPreviewStyle={buttonPreviewStyle}
              // draggleRef={() => {}}
              // setbuttonPreviewStyle={setbuttonPreviewStyle}
            />
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default VideoOnlinePreview;
