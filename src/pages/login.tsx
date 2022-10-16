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
import * as React from 'react';
import { useState } from 'react';
import * as yup from 'yup';
import YupPassword from 'yup-password';

YupPassword(yup);

export const validateInput = (str = '') => str.includes('@');

const basicSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .max(16, 'Password should be of maximum 16 characters length')
    .minLowercase(1, 'password must contain at least 1 lower case letter')
    .minUppercase(1, 'password must contain at least 1 upper case letter')
    .minNumbers(1, 'password must contain at least 1 number')
    .minSymbols(1, 'password must contain at least 1 special character')
    .required('Password is required')
    .required('Required'),
});

// form with formik

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (values: any, actions: any) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok) {
        // jump to customer page
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
      password: '',
    },
    validationSchema: basicSchema,
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
            <Typography variant="h1">Welcome to 35 middle</Typography>
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
            <TextField
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Password"
              type="password"
              className="w-full"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            <Box className="mt-4 inline-block w-full items-center justify-between">
              <Button
                className="mr-8"
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                LOGIN
              </Button>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                href="register"
              >
                SIGN UP
              </Button>

              {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
              <a
                href="#"
                className="font-sans text-sm font-medium text-primary no-underline"
              >
                <Typography variant="button" className="ml-12">
                  Forget Password
                </Typography>
              </a>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default Login;
