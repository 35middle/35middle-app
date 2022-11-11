import React from 'react';
import ButtonSettings from '../components/buttonSettings';
import ProgressBar from '../components/progressBar';
import VideoPreview from '../components/video-preview';

const ButtonEdit = () => {
  const [buttonStyle, setButtonStyle] = React.useState({
    name: 'Button 1',
    text: 'Buy me now',
    top: '50',
    left: '50',
    style: 'circle',
    size: 'large',
    url: 'www.myers.com.au',
  });
  return (
    <div className="flex flex-row">
      <div className="m-9 flex w-1/2 flex-col">
        <VideoPreview buttonStyle={buttonStyle} />;
        <ProgressBar />;
      </div>
      <ButtonSettings
        buttonStyle={buttonStyle}
        setButtonStyle={setButtonStyle}
      />

    </div>
  );
};

export default ButtonEdit;
