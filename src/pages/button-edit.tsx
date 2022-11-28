import SmartButtonIcon from '@mui/icons-material/SmartButton';
import React from 'react';

import AuthorizedLayout from '@/layouts/AuthorizedLayout';
import MainPageLayout from '@/layouts/MainPageLayout';
import type { BasePageProps } from '@/types';

import ButtonSettings from '../components/buttonSettings';
import ProgressBar from '../components/progressBar';
import VideoPreview from '../components/video-preview';

export { getServerSideProps } from '@/core/auth';

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

type Props = BasePageProps;

const ButtonEdit = ({ userSession }: Props) => {
  const [buttonStyle, setButtonStyle] = React.useState<ButtonStyleType>({
    startTime: 0,
    endTime: 596,
    jumpToTime: undefined,
    name: 'Button 1',
    text: 'Buy me now',
    top: '0',
    left: '0',
    style: 'circle',
    size: 'large',
    url: undefined,
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
    <AuthorizedLayout
      userSession={userSession}
      title="35middle | Button Edit"
      description="Button Edit"
    >
      <MainPageLayout
        icon={<SmartButtonIcon fontSize="large" color="primary" />}
        title={`Button Edit`}
        subtitle={''}
      >
        <div className="flex flex-row items-center p-0">
          <div className="mt-1 mb-2 p-1 flex w-1/2 flex-col justify-center">
            <VideoPreview
              buttonStyle={buttonStyle}
              setButtonStyle={setButtonStyle}
            />
            <ProgressBar onChangeCommitted={onChangeCommitted} />
            {/* <div className="flex flex-row px-5 items-center mt-2">
              <Button size="medium" variant="contained" className="m-2">
                Video Preview
              </Button>
              <Button size="medium" variant="contained" className="m-2">
                Delete
              </Button>
            </div> */}
          </div>
          <div className="mt-1 mb-2 p-1 w-1/2 flex items-center justify-center">
            <ButtonSettings
              buttonStyle={buttonStyle}
              setButtonStyle={setButtonStyle}
            />
          </div>
        </div>
      </MainPageLayout>
    </AuthorizedLayout>
  );
};

export default ButtonEdit;
