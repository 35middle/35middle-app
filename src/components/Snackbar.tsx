import { Alert, Snackbar as MuiSnackbar } from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';

export type AlertData = {
  severity: 'error' | 'success' | 'info' | 'warning';
  message: React.ReactNode;
};

type Props = {
  alertData?: AlertData;
};

const Snackbar: React.FC<Props> = ({ alertData }) => {
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
    <MuiSnackbar
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
    </MuiSnackbar>
  );
};

export default Snackbar;
