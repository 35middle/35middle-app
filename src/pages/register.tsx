import { LoadingButton } from '@mui/lab';
import { Box, Button, TextField } from '@mui/material';
import type { FormikProps } from 'formik';
import { useFormik } from 'formik';
import Head from 'next/head';
import Link from 'next/link';
import * as React from 'react';
import { useState } from 'react';
import * as yup from 'yup';

import type { AlertData } from '@/layouts/UnauthorizedLayout';
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
  const [alertData, setAlertData] = useState<AlertData>();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: FormValues, actions: any) => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/register', {
        method: 'POST',
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok) {
        setAlertData({
          severity: 'success',
          message: (
            <>
              Successfully registered to 35middle. Back to{' '}
              <Link href="/login">Login</Link>
            </>
          ),
        });
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
      setIsLoading(false);
      actions.resetForm();
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
      <Head>
        <title>35middle | Register</title>
      </Head>
      <UnauthorizedLayout
        title="Welcome to register 35middle"
        alertData={alertData}
      >
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
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
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
            disabled={isLoading}
          />
          <Box className="mt-4 flex w-full items-center justify-between">
            <LoadingButton
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              loading={isLoading}
            >
              Register
            </LoadingButton>
            <Link href="/login" className="no-underline">
              <Button
                variant="text"
                color="primary"
                size="large"
                className="p-0"
                disabled={isLoading}
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
