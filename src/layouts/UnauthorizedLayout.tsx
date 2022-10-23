import { Box, Typography } from '@mui/material';
import * as React from 'react';

type Props = {
  title: string;
  children: React.ReactNode;
};

const UnauthorizedLayout = ({ title, children }: Props) => {
  return (
    <>
      <Box className="flex h-screen items-center justify-center bg-background">
        <Box className="w-full max-w-md space-y-8">
          <Box className="flex flex-col items-center justify-center">
            <img
              src="/assets/images/35middle.png"
              alt="logo"
              width="240"
              height="240"
            />
            <Typography variant="h3">{title}</Typography>
          </Box>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default UnauthorizedLayout;
