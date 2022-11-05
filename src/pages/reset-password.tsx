import { Button, TextField } from '@mui/material';
import type { FormikProps } from 'formik';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import * as React from 'react';
import { useState } from 'react';
import * as yup from 'yup';

import type { AlertData } from '@/layouts/UnauthorizedLayout';
import UnauthorizedLayout from '@/layouts/UnauthorizedLayout';

interface FormValues {
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
  const router = useRouter();
  const [alertData, setAlertData] = useState<AlertData>();

  const onSubmit = async (values: FormValues, actions: any) => {
    const { token } = router.query;
    try {
      const response = await fetch('/api/resetPassword', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          password: values.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setAlertData({
          severity: 'success',
          message: (
            <>
              Successfully reset password. Back to{' '}
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
      password: '',
      confirmPassword: '',
    },
    validationSchema: schema,
    onSubmit,
  });

  return (
    <UnauthorizedLayout title="Please reset password" alertData={alertData}>
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
          className="mb-4 w-full"
          error={touched.password && Boolean(errors.password)}
          helperText={touched.password && errors.password}
        />

        <TextField
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
    </UnauthorizedLayout>
  );
};

export default ResetPassword;
