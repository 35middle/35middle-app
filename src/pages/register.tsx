import { Box, Button, TextField, Typography } from '@mui/material';
import type { FormikProps } from 'formik';
import { useFormik } from 'formik';
import * as React from 'react';
import * as yup from 'yup';

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

const onSubmit = async (values: any, actions: any) => {
  console.log(values);
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  actions.resetForm();
};

const Register = () => {
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
    <Box className="flex h-screen items-center justify-center bg-background">
      <Box className="w-full max-w-md space-y-8">
        <Box className="flex flex-col items-center justify-center">
          <img
            src="/assets/images/35middle.png"
            alt="logo"
            width="240"
            height="240"
          />
          <Typography variant="h1">Welcome to Registersdfasdfsdfsdf</Typography>
        </Box>
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
              Register....
            </Button>
            <a
              href="#"
              className="font-sans text-sm font-medium text-primary no-underline"
            >
              <Typography variant="button">Already registered?</Typography>
            </a>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Register;
