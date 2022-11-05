import { Box, Paper } from '@mui/material';
import React from 'react';

import PageHeader from '@/components/PageHeader';

type Props = {
  children?: React.ReactNode;
  title: string;
  subtitle: string;
  icon: JSX.Element;
  action?: JSX.Element;
};

const MainPageLayout = ({ children, title, subtitle, action, icon }: Props) => {
  return (
    <Box className="box-border h-full py-5">
      <Box className="mx-auto flex h-full w-full max-w-screen-xl flex-col ">
        <Box className="flex items-center justify-between">
          <PageHeader icon={icon} title={title} subtitle={subtitle} />
          <Box>{action}</Box>
        </Box>

        <Paper elevation={3} className="mt-1 h-1 grow overflow-y-scroll p-3">
          {children}
        </Paper>
      </Box>
    </Box>
  );
};

export default MainPageLayout;
