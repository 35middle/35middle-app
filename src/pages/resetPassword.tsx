import { Box, Button, TextField, Typography } from '@mui/material';
import type { FormikProps } from 'formik';
import { useFormik } from 'formik';
import * as React from 'react';
import * as yup from 'yup';

interface ObjType {
  password: string;
  confirmPassword: string;
}

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

const onSubmit = async (actions: any) => {
  // console.log(values);
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  actions.resetForm();
};

const ResetPassword = () => {
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
    <Box className="flex h-screen items-center justify-center bg-background">
      <Box className="m-20 flex flex-col items-center justify-center">
        <Box className="flex flex-col items-center justify-center">
          <img
            src="/assets/images/35middle.png"
            alt="35middle Logo"
            height="240"
            width="240"
          />
          <Typography variant="h4">Reset Passowrd</Typography>
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
            label="Password"
            type="password"
            data-testid="password"
            // isInvalid={!!errors.password}
            // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            className="mb-4 w-full"
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
  );
};

export default ResetPassword;
