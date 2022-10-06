import { Box, Button, TextField, Typography } from '@mui/material';
import type { FormikProps } from 'formik';
import { useFormik } from 'formik';
import * as React from 'react';
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

const onSubmit = async (values: any, actions: any) => {
  console.log(values);
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  actions.resetForm();
};

const Login = () => {
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
            >
              SIGN UP
            </Button>
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
  );
};

export default Login;
