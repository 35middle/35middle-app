import { Box, Button, Card, TextField, Typography } from '@mui/material';
import type { FormikProps } from 'formik';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';

import type { AlertData } from '@/components/Snackbar';
import Snackbar from '@/components/Snackbar';

// import LinearWithValueLabel from './LinearWithValueLabel';

const basicSchema = yup.object().shape({
  videoTitle: yup.string().required('Required'),
  videoDescription: yup.string().required('Required'),
});
interface FormValues {
  videoTitle: string;
  videoDescription: string;
}

const VideoUploadPopUpWindow = () => {
  const [alertData, setAlertData] = useState<AlertData>();
  const [openNotice, setOpenNotice] = useState<boolean>(false);
  const [file, setFile] = useState<any>();
  // const [isUploading, setUploading] = useState<boolean>(false);

  const handleOnChange = (event: any): void => {
    setFile(event.target.files[0]);
  };

  // const openNoticeFunc = () => setOpenNotice(true);

  useEffect(() => {
    if (openNotice) {
      setTimeout(() => {
        setOpenNotice(false);
      }, 3000);
    }
  }, [openNotice]);

  const handleCancel = () => {
    // jump back to video page
  };

  const onSubmit = async (values: FormValues, actions: any) => {
    try {
      const response = await fetch(`/api/video`, {
        method: 'POST',
        body: JSON.stringify({ ...values }),
      });

      const data = await response.json();
      if (response.ok) {
        // console.log(data);
        // jump into video page
      } else {
        setAlertData({
          severity: 'error',
          message: data.message,
        });
      }
    } catch (e: any) {
      setAlertData({
        severity: 'error',
        message: e.message,
      });
    } finally {
      actions.resetForm();
    }
  };

  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
  }: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues: {
      videoTitle: '',
      videoDescription: '',
    },
    validationSchema: basicSchema,
    onSubmit,
  });

  return (
    <>
      <Snackbar alertData={alertData} />

      <Box className="flex items-center justify-center">
        <Card className="flex h-96 w-80 flex-col justify-between">
          <Box className="flex h-16 items-center justify-center bg-slate-100">
            <Typography variant="h5">video upload</Typography>
          </Box>
          <form
            className="flex h-80 flex-col justify-between p-5"
            onSubmit={handleSubmit}
          >
            <div className="flex h-36 flex-col items-center justify-between">
              <TextField
                id="videoTitle"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.videoTitle}
                label="Video title"
                variant="outlined"
                type="text"
                className="mb-4 w-full"
              />
              <TextField
                id="videoDescription"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.videoDescription}
                label="Video description"
                variant="outlined"
                type="text"
                className="mb-4 w-full"
              />
            </div>

            <Card className="mt-5 flex h-96 w-96 flex-col items-center justify-center">
              <div className="flex h-48 w-64 items-center justify-center">
                <label
                  htmlFor="dropzone-file"
                  className="flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      aria-hidden="true"
                      className="mb-3 h-10 w-10 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      {file?.name || (
                        <>
                          <span className="font-semibold">Click to upload</span>{' '}
                          or drag and drop
                        </>
                      )}
                    </p>
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleOnChange}
                  />
                </label>
              </div>
            </Card>

            <div className="flex flex-row items-center justify-between">
              <Button
                className="p-3"
                variant="contained"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button className="p-3" variant="contained" type="submit">
                Save
              </Button>
            </div>
          </form>
        </Card>

        {openNotice && (
          <Card className="absolute z-50 flex h-96 w-80 flex-col justify-between opacity-75">
            <Box className="flex h-16 items-center justify-center bg-slate-100">
              <Typography variant="h5">video upload</Typography>
            </Box>
            <div className="flex h-full w-80 flex-col items-center justify-center bg-gray-300/60 font-bold">
              {/* {videoId ? (
                <>
                  <p>Congratulations!</p>
                  <p>Your video has been uploaded.</p>
                </>
              ) : (
                <>
                  <p>Sorry,</p>
                  <p>Your video upload failed.</p>
                  <p>Please try again later.</p>
                </>
              )} */}
            </div>
          </Card>
        )}
      </Box>
    </>
  );
};

export default VideoUploadPopUpWindow;
