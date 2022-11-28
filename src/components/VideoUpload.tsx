import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
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

import LinearWithValueLabel from '@/components/LinearWithValueLabel';
import type { AlertData } from '@/components/Snackbar';
import Snackbar from '@/components/Snackbar';

const basicSchema = yup.object().shape({
  videoTitle: yup.string().required('Video title is required'),
  videoDescription: yup.string().required('Video description is required'),
  videoUpload: yup
    .mixed()
    .required('Please select a video for upload')
    .test(
      'fileType',
      'The file should be only in format: .mp4, .x-m4v',
      (value) => {
        return (
          value && ['video/mp4', 'video/x-m4v'].includes(value.type)
          // doesn't work with 'video/.mov'. '.mov' is just a container. So maybe the mime type / codec is still wrong. You should first verify this with a tool like this: https://mediaarea.net/
        );
      }
    )
    .test('fileSize', 'The file is too large, should < 50mb', (value) => {
      return value && value.size < 50000000;
      // fileSize ?
    }),
});

interface FormValues {
  videoTitle: string;
  videoDescription: string;
  videoUpload: File | null;
}

type Props = {
  onClose: () => void;
  accountId: string;
  projectId: string;
};

const VideoUpload = ({ onClose, accountId, projectId }: Props) => {
  const [alertData, setAlertData] = useState<AlertData>();
  const [openProgress, setOpenProgress] = useState<boolean>(false);
  const { mutate } = useSWRConfig();

  const onSubmit = async (values: FormValues, actions: any) => {
    try {
      setOpenProgress(true);
      const responseAddress = await fetch(
        `/api/account/${accountId}/projects/${projectId}/videos`,
        {
          method: 'POST',
          body: values.videoUpload,
        }
      );

      const data = await responseAddress.json();
      if (responseAddress.ok) {
        const { videoAddress } = data;

        setAlertData({
          severity: 'success',
          message: 'Congratulations! Your video has been uploaded.',
        });

        const formData = new FormData();
        formData.append('accountId', accountId);
        formData.append('projectId', projectId);
        formData.append('videoTitle', values.videoTitle);
        formData.append('videoDescription', values.videoDescription);
        formData.append('videoAddress', videoAddress);

        const response = await fetch(
          `/api/account/${accountId}/projects/${projectId}/videos`,
          {
            method: 'POST',
            body: formData,
          }
        );

        if (response.ok) {
          actions.resetForm();
          await mutate(
            `/api/account/${accountId}/projects/${projectId}/videos`
          );
          onClose();
        }
      } else {
        setAlertData({
          severity: 'error',
          message: 'Sorry. Your video upload failed. Please try again later.',
        });
      }
    } catch (e: any) {
      setAlertData({
        severity: 'error',
        message: 'Sorry. Your video upload failed. Please try again later.',
      });
    } finally {
      setOpenProgress(false);
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  }: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues: {
      videoTitle: '',
      videoDescription: '',
      videoUpload: null,
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
          <AddCircleOutlineOutlinedIcon fontSize="large" color="primary" />
          <Typography variant="h4">Video upload</Typography>
        </Box>

        <Divider variant="middle" style={{ margin: '1rem 0' }} />

        {openProgress ? (
          <LinearWithValueLabel />
        ) : (
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
              <div
                style={{
                  display: 'flex',
                  height: '12rem',
                  width: '16rem',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <label
                  htmlFor="videoUpload"
                  style={{
                    display: 'flex',
                    height: '12rem',
                    width: '100%',
                    cursor: 'pointer',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '0.5rem',
                    borderWidth: '2px',
                    borderStyle: 'dashed',
                    borderColor: 'rgb(209 213 219)',
                    backgroundColor: 'rgb(243 244 246)',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <svg
                      aria-hidden="true"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{
                        marginBottom: '0.75rem',
                        height: '2.5rem',
                        width: '2.5rem',
                        color: 'rgb(156 163 175)',
                      }}
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p
                      style={{
                        marginBottom: '0.5rem',
                        fontSize: '0.875rem',
                        lineHeight: '1.25rem',
                        color: 'rgb(107 114 128)',
                      }}
                    >
                      {values.videoUpload?.name || (
                        <span
                          style={{
                            fontWeight: '600',
                          }}
                        >
                          Click to upload
                        </span>
                      )}
                    </p>
                  </div>
                  <input
                    id="videoUpload"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={(event) => {
                      setFieldValue('videoUpload', event.target.files?.[0]);
                    }}
                  />
                </label>
              </div>
              <Typography variant="overline" color="error">
                {touched.videoUpload && errors.videoUpload}
              </Typography>

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
                  Upload
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Paper>
    </>
  );
};

export default VideoUpload;
