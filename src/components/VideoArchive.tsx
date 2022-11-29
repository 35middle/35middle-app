import DeleteIcon from '@mui/icons-material/Delete';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import { useSWRConfig } from 'swr';

import type { AlertData } from '@/components/Snackbar';
import Snackbar from '@/components/Snackbar';

type Props = {
  onClose: () => void;
  accountId: string;
  projectId: string;
  videoId: string;
};

const VideoArchive = ({ onClose, accountId, projectId, videoId }: Props) => {
  const [alertData, setAlertData] = useState<AlertData>();
  const { mutate } = useSWRConfig();

  const handleConfirm = async () => {
    try {
      const response = await fetch(
        `/api/account/${accountId}/projects/${projectId}/videos/${videoId}`,
        {
          method: 'DELETE',
        }
      );

      if (response.ok) {
        await mutate(`/api/account/${accountId}/projects/${projectId}/videos`);
        onClose();
      } else {
        setAlertData({
          severity: 'error',
          message: 'Sorry. Your video archive failed. Please try again later.',
        });
      }
    } catch (e: any) {
      setAlertData({
        severity: 'error',
        message: 'Sorry. Your video archive failed. Please try again later.',
      });
    }
  };

  return (
    <>
      <Snackbar alertData={alertData} />

      <Paper
        style={{
          width: '30rem',
          position: 'absolute',
          top: '50%',
          background: 'white',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '2rem',
        }}
      >
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-start',
            alignItems: 'center',
          }}
        >
          <DeleteIcon fontSize="large" color="primary" />
          <Typography variant="h6">
            Are you confirm to delete this video?
          </Typography>
        </Box>

        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '3rem',
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            size="medium"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="medium"
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </Box>
      </Paper>
    </>
  );
};

export default VideoArchive;
