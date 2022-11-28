import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined';
import { Box, Button, CircularProgress, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import { useSWRConfig } from 'swr';

import PageAlert from '@/components/PageAlert';
import VideoCard from '@/components/VideoCard';
import useVideosByProjectId from '@/hooks/useVideosByProjectId';
import AuthorizedLayout from '@/layouts/AuthorizedLayout';
import MainPageLayout from '@/layouts/MainPageLayout';
import type { BasePageProps } from '@/types';

export { getServerSideProps } from '@/core/auth';

type Props = BasePageProps;

const Videos = ({ userSession }: Props) => {
  const router = useRouter();
  const { mutate } = useSWRConfig();
  const { projectId, accountId } = router.query;
  const { videos, isLoading, error } = useVideosByProjectId(
    `/api/projects/${projectId}/videos`
  );

  // const [isProjectEditingOpen, setIsProjectEditingOpen] = useState<{
  //   open: boolean;
  //   mode?: 'create' | 'edit';
  //   selectedProject?: ProjectEntity;
  // }>({
  //   open: false,
  //   mode: 'create',
  //   selectedProject: undefined,
  // });

  const handleVideoDelete = async (videoId: string) => {
    const response = await fetch(`/api/videos/${videoId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      await mutate(`/api/projects/${projectId}/videos`);
    }
  };

  const isNotAuthorized =
    userSession?.accountId !== accountId ||
    (error && error.message === 'Unauthorized');

  if (isNotAuthorized) {
    return (
      <AuthorizedLayout
        userSession={userSession}
        title="35middle | videos"
        description="Videos list page"
      >
        <MainPageLayout
          icon={<MovieOutlinedIcon fontSize="large" color="primary" />}
          title={`Video Page`}
          subtitle="This is where you can play magic on your videos"
        >
          <Box className="flex h-full w-full flex-col items-center justify-center">
            <PageAlert alertMsg="No access to this account" />
            <Button href="/login" variant="outlined" className="mt-5">
              Back to login
            </Button>
          </Box>
        </MainPageLayout>
      </AuthorizedLayout>
    );
  }

  return (
    <AuthorizedLayout
      userSession={userSession}
      title="35middle | videos"
      description="Videos list page"
    >
      {isLoading ? (
        <Box className="flex h-full items-center justify-center">
          <CircularProgress />
        </Box>
      ) : (
        <MainPageLayout
          action={
            <Button variant="contained" href="/video/create">
              NEW VIDEO
            </Button>
          }
          icon={<MovieOutlinedIcon fontSize="large" color="primary" />}
          title={`Video Page`}
          subtitle="This is where you can play magic on your videos"
        >
          {videos && videos.length === 0 ? (
            <PageAlert alertMsg="No videos found" />
          ) : (
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {videos.map((video) => (
                <Grid item xs={2} sm={4} md={4} key={video.id}>
                  <VideoCard {...video}>
                    <Grid container justifyContent="space-between">
                      <Grid item>
                        <Button
                          variant="contained"
                          href={`/video/${video.id}/edit`}
                        >
                          EDIT
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          onClick={() => handleVideoDelete(video.id)}
                        >
                          DELETE
                        </Button>
                      </Grid>
                    </Grid>
                  </VideoCard>
                </Grid>
              ))}
            </Grid>
          )}
        </MainPageLayout>
      )}
    </AuthorizedLayout>
  );
};

export default Videos;
