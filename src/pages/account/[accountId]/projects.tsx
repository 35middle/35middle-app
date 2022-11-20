import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import { Box, Button, CircularProgress, Grid, Paper } from '@mui/material';
import { useRouter } from 'next/router';

import PageAlert from '@/components/PageAlert';
import PageHeader from '@/components/PageHeader';
import ProjectCard from '@/components/ProjectCard';
import useProjectsByAccountId from '@/hooks/useProjectsByAccountId';
import AuthorizedLayout from '@/layouts/AuthorizedLayout';
import type { BasePageProps } from '@/types';

export { getServerSideProps } from '@/core/auth';

type Props = BasePageProps;

const Projects = ({ userSession }: Props) => {
  const router = useRouter();
  const { projects, isLoading, isError } = useProjectsByAccountId(
    userSession?.accountId || ''
  );

  const { accountId } = router.query;
  const isAuthorized = userSession?.accountId === accountId;

  if (!isAuthorized) {
    return (
      <AuthorizedLayout
        userSession={userSession}
        title="35middle | projects"
        description="Projects list page"
      >
        <Box className="box-border h-full py-10">
          <Box className="mx-auto flex h-full w-full max-w-screen-xl flex-col ">
            <Box className="flex items-center justify-between">
              <PageHeader
                icon={
                  <AssignmentIndOutlinedIcon fontSize="large" color="primary" />
                }
                title={`Welcome back, ${userSession?.firstName}`}
                subtitle="This is where you can edit brand projects"
              />
            </Box>

            <Paper elevation={3} className="mt-5 grow p-5">
              <PageAlert alertMsg="No access to this account" />
            </Paper>
          </Box>
        </Box>
      </AuthorizedLayout>
    );
  }

  return (
    <AuthorizedLayout
      userSession={userSession}
      title="35middle | projects"
      description="Projects list page"
    >
      {isLoading ? (
        <Box className="flex h-full items-center justify-center">
          <CircularProgress />
        </Box>
      ) : (
        <Box className="box-border h-full py-10">
          <Box className="mx-auto flex h-full w-full max-w-screen-xl flex-col ">
            <Box className="flex items-center justify-between">
              <PageHeader
                icon={
                  <AssignmentIndOutlinedIcon fontSize="large" color="primary" />
                }
                title={`Welcome back, ${userSession?.firstName}`}
                subtitle="This is where you can edit brand projects"
              />
              <Button variant="contained">New Project</Button>
            </Box>

            <Paper
              elevation={3}
              className="mt-5 h-1 grow overflow-y-scroll p-5"
            >
              {isError || projects.length === 0 ? (
                <PageAlert alertMsg="No projects found" />
              ) : (
                <Grid
                  container
                  spacing={{ xs: 2, md: 3 }}
                  columns={{ xs: 4, sm: 8, md: 12 }}
                >
                  {projects.map((project) => (
                    <Grid item xs={2} sm={4} md={4} key={project.id}>
                      <ProjectCard {...project}></ProjectCard>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Paper>
          </Box>
        </Box>
      )}
    </AuthorizedLayout>
  );
};

export default Projects;
