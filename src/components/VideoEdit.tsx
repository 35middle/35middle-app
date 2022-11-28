import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import type { FormikProps } from 'formik';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useSWRConfig } from 'swr';
import * as yup from 'yup';

import type { AlertData } from '@/components/Snackbar';
import Snackbar from '@/components/Snackbar';

const basicSchema = yup.object().shape({
  videoTitle: yup.string().required('Video title is required'),
  videoDescription: yup.string().required('Video description is required'),
});

interface FormValues {
  videoTitle: string;
  videoDescription: string;
}

type VideoEntity = {
  id: string;
  videoTitle: string;
  videoDescription: string;
};

type Props = {
  onClose: () => void;
  accountId: string;
  projectId: string;
  videoEntity: VideoEntity;
};

const VideoEdit = ({ onClose, accountId, projectId, videoEntity }: Props) => {
  const [alertData, setAlertData] = useState<AlertData>();
  const { mutate } = useSWRConfig();

  const onSubmit = async (values: FormValues) => {
    try {
      const formData = new FormData();
      formData.append('accountId', accountId);
      formData.append('projectId', projectId);
      formData.append('videoTitle', values.videoTitle);
      formData.append('videoDescription', values.videoDescription);
      formData.append('projectId', videoEntity?.id || '');

      const response = await fetch(
        `/api/account/${accountId}/projects/${projectId}/videos`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        await mutate(`/api/account/${accountId}/projects/${projectId}/videos`);
        onClose();
      } else {
        setAlertData({
          severity: 'error',
          message:
            'Sorry. Your video information edit failed. Please try again later.',
        });
      }
    } catch (e: any) {
      setAlertData({
        severity: 'error',
        message:
          'Sorry. Your video information edit failed. Please try again later.',
      });
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  }: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues: {
      videoTitle: videoEntity?.videoTitle,
      videoDescription: videoEntity?.videoDescription,
    },
    validationSchema: basicSchema,
    onSubmit,
  });

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
          <SettingsOutlinedIcon fontSize="large" color="primary" />
          <Typography variant="h4">Video information edit</Typography>
        </Box>

        <Divider variant="middle" style={{ margin: '1rem 0' }} />

        <form
          style={{
            display: 'flex',
            flex: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onSubmit={handleSubmit}
        >
          <Box
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <TextField
              id="videoTitle"
              label="Video Title"
              type="text"
              style={{
                width: '30rem',
                marginBottom: '2rem',
              }}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.videoTitle}
              error={touched.videoTitle && Boolean(errors.videoTitle)}
              helperText={touched.videoTitle && errors.videoTitle}
            />
            <TextField
              multiline
              rows={4}
              id="videoDescription"
              label="Video Description"
              type="text"
              style={{
                width: '30rem',
                marginBottom: '2rem',
              }}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.videoDescription}
              error={
                touched.videoDescription && Boolean(errors.videoDescription)
              }
              helperText={touched.videoDescription && errors.videoDescription}
            />

            <Box
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '4rem',
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
                type="submit"
                variant="contained"
                color="primary"
                size="medium"
              >
                Save
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </>
  );
};

export default VideoEdit;
