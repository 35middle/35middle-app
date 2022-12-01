import SmartButtonIcon from '@mui/icons-material/SmartButton';
import { Box, CircularProgress } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import ButtonSettings from '@/components/buttonSettings';
import ProgressBar from '@/components/progressBar';
import VideoPreview from '@/components/video-preview';
import useVideoById from '@/hooks/useVideoById';
import AuthorizedLayout from '@/layouts/AuthorizedLayout';
import MainPageLayout from '@/layouts/MainPageLayout';
import type { BasePageProps } from '@/types';

export { getServerSideProps } from '@/core/auth';

type Props = BasePageProps;

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

const PinButtonPage = ({ userSession }: Props) => {
  const router = useRouter();
  const { videoId } = router.query;
  const { video, isLoading } = useVideoById(`/api/videos/${videoId}`);

  const [buttonStyle, setButtonStyle] = useState<ButtonStyleType>({
    startTime: 0,
    endTime: video?.length,
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
      title="35middle | video | pin"
      description="Pin video button"
    >
      {isLoading ? (
        <Box className="flex h-full items-center justify-center">
          <CircularProgress />
        </Box>
      ) : (
        <MainPageLayout
          icon={<SmartButtonIcon fontSize="large" color="primary" />}
          title={`Button Edit`}
          subtitle={''}
        >
          <div className="flex flex-row items-center p-0">
            <div className="mt-1 mb-2 p-1 flex w-1/2 flex-col justify-center">
              <VideoPreview
                videoUrl={video?.videoUrl || ''}
                buttonStyle={buttonStyle}
                setButtonStyle={setButtonStyle}
              />
              <ProgressBar
                onChangeCommitted={onChangeCommitted}
                duration={video?.length || 0}
              />
            </div>
            <div className="mt-1 mb-2 p-1 w-1/2 flex items-center justify-center">
              <ButtonSettings
                videoUrl={video?.videoUrl || ''}
                buttonStyle={buttonStyle}
                setButtonStyle={setButtonStyle}
              />
            </div>
          </div>
        </MainPageLayout>
      )}
    </AuthorizedLayout>
  );
};

export default PinButtonPage;
