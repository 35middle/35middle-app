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
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
// Formik with yup
const schema = yup.object().shape({
  currentPassword: yup.string().required('Please Enter your current password'),
  newPassword: yup
    .string()
    .required('Please Enter your new password')
    .min(8, 'Password should be of minimum 8 characters length')
    .max(16, 'Password should be of maximum 16 characters length'),
  confirmPassword: yup
    .string()
    .required('Please Enter your confirm password')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const ChangePassword = () => {
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (values: any, actions: any) => {
    // console.log(values);
    const token = window.localStorage.getItem('token');
    // console.log("token",token)
    try {
      const response = await fetch('/api/changePassword/', {
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
      currentPassword: '',
      newPassword: '',
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
            <Typography variant="h1">Change password</Typography>
          </Box>
          <form
            className="flex flex-col items-center justify-center"
            onSubmit={handleSubmit}
          >
            <TextField
              InputProps={{ sx: { width: 350 } }}
              id="currentPassword"
              value={values.currentPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Current Password"
              type="password"
              className="mb-4 w-full"
              error={touched.currentPassword && Boolean(errors.currentPassword)}
              helperText={touched.currentPassword && errors.currentPassword}
            />

            <TextField
              InputProps={{ sx: { width: 350 } }}
              id="newPassword"
              value={values.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              label="New Password"
              type="password"
              data-testid="password"
              className="mb-4 w-full"
              error={touched.newPassword && Boolean(errors.newPassword)}
              helperText={touched.newPassword && errors.newPassword}
            />

            <TextField
              InputProps={{ sx: { width: 350 } }}
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
            <Box>
              <Button
                className="items-center justify-between"
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Submit
              </Button>
              <Button
                className="items-center justify-between"
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Cancel
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default ChangePassword;
