import { Button } from '@mui/material';
import React from 'react';

import ButtonSettings from '../components/buttonSettings';
import ProgressBar from '../components/progressBar';
import VideoPreview from '../components/video-preview';

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

const ButtonEdit = () => {
  const [buttonStyle, setButtonStyle] = React.useState<ButtonStyleType>({
    startTime: 0,
    endTime: 596,
    name: 'Button 1',
    text: 'Buy me now',
    top: '0',
    left: '0',
    style: 'circle',
    size: 'large',
    url: 'www.myers.com.au',
  });
  const onChangeCommitted = (
    __event: React.SyntheticEvent | Event,
    value: number | Array<number>
  ) => {
    if (Array.isArray(value)) {
      setButtonStyle({
        ...buttonStyle,
        startTime: value[0],
        endTime: value[1],
      });
    }
  };

  return (
    <div className="flex flex-row items-center">
      <div className="mt-5 mb-2 flex w-1/2 flex-col justify-center">
        <VideoPreview
          buttonStyle={buttonStyle}
          setButtonStyle={setButtonStyle}
        />
        <ProgressBar onChangeCommitted={onChangeCommitted} />;
        <div className="flex flex-row px-5 items-center mt-4">
          <Button size="large" variant="contained" className="m-2">
            Video Preview
          </Button>
          <Button size="large" variant="contained" className="m-2">
            Delete
          </Button>
        </div>
      </div>
      <div className="mt-5 mb-2 w-1/2 flex items-center justify-center">
        <ButtonSettings
          buttonStyle={buttonStyle}
          setButtonStyle={setButtonStyle}
        />
      </div>
    </div>
  );
};

export default ButtonEdit;
