import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';
import { Box, Button, CircularProgress, Grid, Modal } from '@mui/material';
import { useRouter } from 'next/router';
import { useState } from 'react';

import PageAlert from '@/components/PageAlert';
import ProjectCard from '@/components/ProjectCard';
import ProjectEditing from '@/components/ProjectEditing';
import type { ProjectEntity } from '@/hooks/useProjectsByAccountId';
import useProjectsByAccountId from '@/hooks/useProjectsByAccountId';
import AuthorizedLayout from '@/layouts/AuthorizedLayout';
import MainPageLayout from '@/layouts/MainPageLayout';
import type { BasePageProps } from '@/types';

export { getServerSideProps } from '@/core/auth';

type Props = BasePageProps;

const Projects = ({ userSession }: Props) => {
  const router = useRouter();
  const { projects, isLoading, error } = useProjectsByAccountId(
    userSession?.accountId || ''
  );

  const [isProjectEditingOpen, setIsProjectEditingOpen] = useState<{
    open: boolean;
    mode?: 'create' | 'edit';
    selectedProject?: ProjectEntity;
  }>({
    open: false,
    mode: 'create',
    selectedProject: undefined,
  });

  const { accountId } = router.query;
  const isNotAuthorized =
    userSession?.accountId !== accountId ||
    (error && error.message === 'Unauthorized');

  if (isNotAuthorized) {
    return (
      <AuthorizedLayout
        userSession={userSession}
        title="35middle | projects"
        description="Projects list page"
      >
        <MainPageLayout
          icon={<AssignmentIndOutlinedIcon fontSize="large" color="primary" />}
          title={`Welcome back, ${userSession?.firstName}`}
          subtitle="This is where you can edit brand projects"
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
      title="35middle | projects"
      description="Projects list page"
    >
      {isLoading ? (
        <Box className="flex h-full items-center justify-center">
          <CircularProgress />
        </Box>
      ) : (
        <>
          <MainPageLayout
            action={
              <Button
                variant="contained"
                onClick={() =>
                  setIsProjectEditingOpen({
                    open: true,
                    mode: 'create',
                  })
                }
              >
                New Project
              </Button>
            }
            icon={
              <AssignmentIndOutlinedIcon fontSize="large" color="primary" />
            }
            title={`Welcome back, ${userSession?.firstName}`}
            subtitle="This is where you can edit brand projects"
          >
            {projects && projects.length === 0 ? (
              <PageAlert alertMsg="No projects found" />
            ) : (
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {projects.map((project) => (
                  <Grid item xs={2} sm={4} md={4} key={project.id}>
                    <ProjectCard
                      {...project}
                      onEdit={() =>
                        setIsProjectEditingOpen({
                          open: true,
                          mode: 'edit',
                          selectedProject: project,
                        })
                      }
                      onView={() => {
                        router.push(`/${router.asPath}/${project.id}/videos`);
                      }}
                    ></ProjectCard>
                  </Grid>
                ))}
              </Grid>
            )}
          </MainPageLayout>

          <Modal
            open={isProjectEditingOpen.open}
            onClose={() =>
              setIsProjectEditingOpen({
                open: false,
                mode: 'create',
              })
            }
          >
            <Box>
              <ProjectEditing
                mode={isProjectEditingOpen.mode}
                projectEntity={isProjectEditingOpen.selectedProject}
                accountId={userSession?.accountId || ''}
                onClose={() =>
                  setIsProjectEditingOpen({
                    open: false,
                    mode: 'create',
                  })
                }
              />
            </Box>
          </Modal>
        </>
      )}
    </AuthorizedLayout>
  );
};

export default Projects;
