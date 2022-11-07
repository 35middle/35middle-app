import ButtonSettings from '../components/buttonSettings';
import ProgressBar from '../components/progressBar';
import VideoPreview from '../components/video-preview';

const ButtonEdit = () => {
  return (
    <div className="flex flex-row">
      <div className="m-9 flex w-1/2 flex-col">
        <VideoPreview />;
        <ProgressBar />;
      </div>
      <ButtonSettings />;
    </div>
  );
};

export default ButtonEdit;
