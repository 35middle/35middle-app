import {
  Alert,
  Box,
  Button,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import type { FormikProps } from 'formik';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as React from 'react';
import * as yup from 'yup';

const ForgetPasswordSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Required'),
});

interface FormValues {
  email: string;
}

const ForgetPassword = () => {
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (values: any, actions: any) => {
    try {
      const response = await fetch('/api/forgetPassword', {
        method: 'POST',
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok) {
        // jump to login page
      } else {
        setErrorMsg(data.message);
      }
    } catch (e: any) {
      setErrorMsg(e.message);
    } finally {
      actions.resetForm();
    }
  };

  const handleAlertClose = () => {
    setErrorMsg('');
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
      email: '',
    },
    validationSchema: ForgetPasswordSchema,
    onSubmit,
  });

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={!!errorMsg}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <Alert
          onClose={handleAlertClose}
          severity="error"
          sx={{ width: '100%' }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
      <Box className="flex h-screen items-center justify-center bg-background">
        <Box className="w-full max-w-md space-y-8">
          <Box className="flex flex-col items-center justify-center">
            <img
              src="/assets/images/35middle.png"
              alt="logo"
              width="240"
              height="240"
            />
            <Typography variant="h2">
              Get magic link to reset password
            </Typography>
          </Box>
          <form
            className="flex flex-col items-center justify-center"
            onSubmit={handleSubmit}
          >
            <TextField
              id="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Email"
              type="email"
              className="mb-4 w-full"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <Box className="mt-4 flex w-full items-center justify-between">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default ForgetPassword;
