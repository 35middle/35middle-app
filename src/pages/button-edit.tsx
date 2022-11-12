import React from 'react';

import ButtonSettings from '../components/buttonSettings';
import ProgressBar from '../components/progressBar';
import VideoPreview from '../components/video-preview';

interface ButtonStyleType {
  name: string;
  text: string;
  top: string;
  left: string;
  url: string;
  size: 'small' | 'medium' | 'large';
  style: 'circle' | 'party';
}

const ButtonEdit = () => {
  const [videoCurrentTime, setVideoCurrentTime] = React.useState([0, 596]);
  const [buttonStyle, setButtonStyle] = React.useState<ButtonStyleType>({
    name: 'Button 1',
    text: 'Buy me now',
    top: '50',
    left: '50',
    style: 'circle',
    size: 'large',
    url: 'www.myers.com.au',
  });
  const handleChangeVideoTime = (value: any) => {
    setVideoCurrentTime(value);
  };

  return (
    <div className="flex flex-row">
      <div className="m-9 flex w-1/2 flex-col">
        <VideoPreview
          buttonStyle={buttonStyle}
          videoCurrentTime={videoCurrentTime}
        />
        <ProgressBar handleChangeVideoTime={handleChangeVideoTime} />;
      </div>
      <ButtonSettings
        buttonStyle={buttonStyle}
        setButtonStyle={setButtonStyle}
      />
    </div>
  );
};

export default ButtonEdit;
