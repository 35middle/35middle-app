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
// import Link from 'next/link';
// TypeScript object type
interface ObjType {
  password: string;
  confirmPassword: string;
}
// Formik with yup
const schema = yup.object().shape({
  password: yup
    .string()
    .required('Please Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .max(16, 'Password should be of maximum 16 characters length'),
  confirmPassword: yup
    .string()
    .required('Please Enter your confirm password')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const ResetPassword = () => {
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (values: any, actions: any) => {
    // console.log(values);
    const token = window.localStorage.getItem('token');
    // console.log("token",token)
    try {
      const response = await fetch('/api/resetPassword/', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok) {
        // jump to login page
        setTimeout(() => {
          // window.location.replace(<Link href='/login'/>);
          window.location.replace('/login');
        }, 3000);
      } else {
        setErrorMsg(data.message);
      }
    } catch (e: any) {
      // console.log('123')
      setErrorMsg(e.message);
      // if (e.response.statusCode === 404) {
      //   setErrorMsg('user not found');
      // } else if (e.response.statusCode === 500) {
      //   setErrorMsg('server error, please try again later');
      // } else {
      //   setErrorMsg('unknown error');
      // }
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
  }: FormikProps<ObjType> = useFormik<ObjType>({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: schema,
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
          {/* {'Reset password failed!'} */}
        </Alert>
      </Snackbar>
      <Box className="flex h-screen items-center justify-center bg-background">
        <Box className="flex flex-col items-center space-y-8">
          <Box className="flex flex-col items-center justify-center">
            <img
              src="/assets/images/35middle-removebg-preview.png"
              alt="35middle Logo"
              height="240"
              width="240"
            />
            <Typography variant="h1">Reset Passowrd</Typography>
          </Box>
          <form
            className="flex flex-col items-center justify-center"
            onSubmit={handleSubmit}
          >
            <TextField
              InputProps={{ sx: { width: 450 } }}
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              label="New Password"
              type="password"
              data-testid="password"
              className="mb-4 w-full"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />

            <TextField
              InputProps={{ sx: { width: 450 } }}
              id="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Confirm Password"
              type="Password"
              className="mb-4 w-full"
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
            />
            <Button
              className="items-center justify-between"
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              Submit
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default ResetPassword;
