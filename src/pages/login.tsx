import { Alert, Box, Button, Snackbar, TextField } from '@mui/material';
import type { FormikProps } from 'formik';
import { useFormik } from 'formik';
import Link from 'next/link';
import * as React from 'react';
import { useState } from 'react';
import * as yup from 'yup';
import YupPassword from 'yup-password';

import UnauthorizedLayout from '@/layouts/UnauthorizedLayout';

YupPassword(yup);

export const validateInput = (str = '') => str.includes('@');

const basicSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  password: yup.string().required('Required'),
});

// form with formik

interface FormValues {
  email: string;
  password: string;
}

const Login = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const [open, setOpen] = useState(false);

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data);
        // jump into main page
      } else if (data.statusCode === 401) {
        setOpen(true);
        setErrorMsg('Email or password is incorrect');
      }
    } catch (e: any) {
      setOpen(true);
      setErrorMsg(e.message);
    }
  };

  const handleAlertClose = () => {
    setOpen(false);
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
        open={open}
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
      <UnauthorizedLayout title="Welcome to 35middle">
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
          <Box className="mt-4  flex w-full items-center justify-between">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              LOGIN
            </Button>
            <Link href="/register">
              <Button variant="contained" color="primary" size="large">
                SIGN UP
              </Button>
            </Link>
            <Button variant="text" color="primary" size="large" className="p-0">
              Forget Password
            </Button>
          </Box>
        </form>
      </UnauthorizedLayout>
    </>
  );
};

export default Login;
