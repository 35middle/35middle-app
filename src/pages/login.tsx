import { Box, Button, TextField } from '@mui/material';
import type { FormikProps } from 'formik';
import { useFormik } from 'formik';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';
import * as yup from 'yup';
import YupPassword from 'yup-password';

import type { AlertData } from '@/layouts/UnauthorizedLayout';
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
  const router = useRouter();
  const [alertData, setAlertData] = useState<AlertData>();
  const [isLogin, setIsLogin] = useState(false);

  const onSubmit = async (values: FormValues) => {
    try {
      setIsLogin(true);
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const data = await response.json();
        const { accountId } = data;
        await router.replace(`/account/${accountId}/projects`);
      } else if (response.status === 401) {
        setAlertData({
          severity: 'error',
          message: 'Email or password is incorrect',
        });
      }
    } catch (e: any) {
      setAlertData({
        severity: 'error',
        message: e.message,
      });
    } finally {
      setIsLogin(false);
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
      email: '',
      password: '',
    },
    validationSchema: basicSchema,
    onSubmit,
  });

  return (
    <>
      <Head>
        <title>35middle | Login</title>
      </Head>
      <UnauthorizedLayout
        title="Welcome to 35middle"
        alertData={alertData}
        loading={isLogin}
      >
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

            <Link href="/forget-password" className="no-underline">
              <Button color="primary">Forget Password?</Button>
            </Link>

            <Link href="/register" className="no-underline">
              <Button color="primary" variant="outlined" size="large">
                SIGN UP
              </Button>
            </Link>
          </Box>
        </form>
      </UnauthorizedLayout>
    </>
  );
};

export default Login;
