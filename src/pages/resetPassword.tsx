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
// TypeScript object type
interface ObjType {
  password: string;
  confirmPassword: string;
}
// Formik with yup
const schema = yup.object({
  password: yup
    .string()
    .required('Please Enter your password')
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
    ),
  confirmPassword: yup
    .string()
    .required('Please Enter your confirm password')
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const ResetPassword = () => {
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (values: any, actions: any) => {
    try {
      const response = await fetch('/api/resetPassword', {
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
        </Alert>
      </Snackbar>
      <Box className="flex h-screen items-center justify-center bg-background">
        <Box className="m-20 flex flex-col items-center justify-center">
          <Box className="flex flex-col items-center justify-center">
            <img
              src="/assets/images/35middle-removebg-preview.png"
              alt="35middle Logo"
              height="240"
              width="240"
            />
            <Typography variant="h3">Reset Passowrd</Typography>
          </Box>
          <form
            className="flex flex-col items-center justify-center"
            onSubmit={handleSubmit}
          >
            <TextField
              id="password"
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              label="New Password"
              type="password"
              data-testid="password"
              // isInvalid={!!errors.password}
              // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              className="my-4 w-full"
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            {/* {error.password && (
            <span className="err text-sm text-red-500">{error.password}</span>
          )} */}

            <TextField
              id="confirmPassword"
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Confirm Password"
              type="Password"
              // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              // isInvalid={!!errors.confirmPassword}
              className="mb-4 w-full"
              error={touched.confirmPassword && Boolean(errors.confirmPassword)}
              helperText={touched.confirmPassword && errors.confirmPassword}
            />
            {/* {error.confirmPassword && (
            <span className="err text-sm text-red-500">
              {error.confirmPassword}
            </span>
          )} */}
          </form>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            className="btn-info btn"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ResetPassword;
