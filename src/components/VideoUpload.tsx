import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import {
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import type { FormikProps } from 'formik';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useSWRConfig } from 'swr';
import * as yup from 'yup';

import LinearWithValueLabel from '@/components/LinearWithValueLabel';
import type { AlertData } from '@/components/Snackbar';
import Snackbar from '@/components/Snackbar';

const basicSchema = yup.object().shape({
  name: yup.string().required('Video title is required'),
  description: yup.string().required('Video description is required'),
  videoFile: yup
    .mixed()
    .required('Please select a video for upload')
    .test('fileType', 'The file should be only in format: .mp4', (value) => {
      return value && ['video/mp4'].includes(value.type);
    })
    .test('fileSize', 'The file is too large, should < 200mb', (value) => {
      return value && value.size < 200 * 1024 * 1024; // 50mb
    }),
});

interface FormValues {
  name: string;
  description: string;
  videoFile: File | null;
}

type Props = {
  onClose: () => void;
  projectId: string;
};

const VideoUpload = ({ onClose, projectId }: Props) => {
  const [alertData, setAlertData] = useState<AlertData>();
  const [progress, setProgress] = useState(0);
  const [uploadSpeed, setUploadSpeed] = useState('');
  const [uploadedSize, setUploadedSize] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const { mutate } = useSWRConfig();

  const onSubmit = async (values: FormValues) => {
    try {
      const startTime = new Date().getTime();
      const formData = new FormData();
      formData.append('projectId', projectId);
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('videoFile', values.videoFile as File);

      const response = await axios.post(
        `/api/projects/${projectId}/videos`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          onUploadProgress: (progressEvent) => {
            setProgress(
              Math.round(
                (progressEvent.loaded * 100) / (progressEvent.total as number)
              )
            );
            const timeDiff = new Date().getTime() - startTime; // ms
            const sizeDiff = progressEvent.loaded;
            const speed = sizeDiff / timeDiff;

            setUploadSpeed(`${(speed / 1024).toFixed(2)} mb/s`);
            setUploadedSize(`${(sizeDiff / 1024 / 1024).toFixed(2)} mb`);

            if (progressEvent.loaded === progressEvent.total) {
              setIsProcessing(true);
            }
          },
        }
      );
      if (response.status === 200) {
        setIsDone(true);
        setTimeout(() => {
          mutate(`/api/projects/${projectId}/videos`);
          onClose();
        }, 500);
      }
    } catch (e: any) {
      setAlertData({
        severity: 'error',
        message: 'Sorry. Your video upload failed. Please try again later.',
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
    setFieldValue,
  }: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues: {
      name: '',
      description: '',
      videoFile: null,
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
              id="name"
              label="Video Title"
              type="text"
              style={{
                width: '30rem',
                marginBottom: '2rem',
              }}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.name}
              error={touched.name && Boolean(errors.name)}
              helperText={touched.name && errors.name}
            />
            <TextField
              multiline
              rows={4}
              id="description"
              label="Video Description"
              type="text"
              style={{
                width: '30rem',
                marginBottom: '2rem',
              }}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              error={touched.description && Boolean(errors.description)}
              helperText={touched.description && errors.description}
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
                htmlFor="videoFile"
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
                <Box
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <CloudUploadOutlinedIcon fontSize="large" color="primary" />

                  <Typography variant="body2" className="mt-5">
                    {values.videoFile?.name || 'Click to upload'}
                  </Typography>
                </Box>
                <input
                  id="videoFile"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={(event) => {
                    setFieldValue('videoFile', event.target.files?.[0]);
                  }}
                />
              </label>
            </div>
            <Typography variant="overline" color="error">
              {touched.videoFile && errors.videoFile}
            </Typography>

            <LinearWithValueLabel
              value={progress}
              isProcessing={isProcessing}
              isDone={isDone}
            />
            {uploadSpeed && (
              <Typography variant="overline" color="error">
                Upload speed: {uploadSpeed}
              </Typography>
            )}
            {uploadedSize && (
              <Typography variant="overline" color="error">
                Uploaded: {uploadedSize}
              </Typography>
            )}
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
      </Paper>
    </>
  );
};

export default VideoUpload;
