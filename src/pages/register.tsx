import { Alert, Box, Button, Snackbar, TextField } from '@mui/material';
import type { FormikProps } from 'formik';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';
import * as yup from 'yup';

import UnauthorizedLayout from '@/layouts/UnauthorizedLayout';

const basicSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  password: yup
    .string()
    .min(8, 'Password should be of minimum 8 characters length')
    .max(16, 'Password should be of maximum 16 characters length')
    .required('Password is required')
    .required('Required'),
});

// form with formik

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const Register = () => {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (values: FormValues, actions: any) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok) {
        await router.push('/login');
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
      firstName: '',
      lastName: '',
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
      <UnauthorizedLayout title="Welcome to register 35middle">
        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <TextField
            id="firstName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
            label="First Name"
            type="text"
            className="mb-4 w-full"
            error={touched.firstName && Boolean(errors.firstName)}
            helperText={touched.firstName && errors.firstName}
          />
          <TextField
            id="lastName"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Last Name"
            type="text"
            className="mb-4 w-full"
            error={touched.lastName && Boolean(errors.lastName)}
            helperText={touched.lastName && errors.lastName}
          />
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
          <Box className="mt-4 flex w-full items-center justify-between">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Register
            </Button>
            <Link href="/login">
              <Button
                variant="text"
                color="primary"
                size="large"
                className="p-0"
              >
                Already registered?
              </Button>
            </Link>
          </Box>
        </form>
      </UnauthorizedLayout>
    </>
  );
};

export default Register;
