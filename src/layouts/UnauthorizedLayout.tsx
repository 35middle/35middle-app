import { Alert, Box, Snackbar, Typography } from '@mui/material';
import Image from 'next/image';
import * as React from 'react';
import { useEffect, useState } from 'react';

export type AlertData = {
  severity: 'error' | 'success' | 'info' | 'warning';
  message: React.ReactNode;
};

type Props = {
  alertData?: AlertData;
  title: string;
  children: React.ReactNode;
};

const UnauthorizedLayout = ({ title, alertData, children }: Props) => {
  const [isAlertOpen, setIsAlertOpen] = useState(!!alertData);

  useEffect(() => {
    if (alertData) {
      setIsAlertOpen(true);
    }
  }, [alertData]);

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isAlertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity={alertData?.severity}
          sx={{ width: '100%' }}
        >
          {alertData?.message}
        </Alert>
      </Snackbar>
      <Box className="flex h-screen items-center justify-center bg-background">
        <Box className="w-full max-w-lg space-y-8">
          <Box className="flex flex-col items-center justify-center">
            <Image
              src="/assets/images/auth-page-logo.svg"
              alt="logo"
              width="240"
              height="240"
            />
            <Typography variant="h3" className="mt-10 font-luckiestGuy">
              {title}
            </Typography>
          </Box>
          {children}
        </Box>
      </Box>
    </>
  );
};

export default UnauthorizedLayout;
