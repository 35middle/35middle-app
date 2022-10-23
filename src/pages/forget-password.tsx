import { Button, TextField } from '@mui/material';
import type { FormikProps } from 'formik';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useState } from 'react';
import * as React from 'react';
import * as yup from 'yup';

import type { AlertData } from '@/layouts/UnauthorizedLayout';
import UnauthorizedLayout from '@/layouts/UnauthorizedLayout';

const ForgetPasswordSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Required'),
});

interface FormValues {
  email: string;
}

const ForgetPassword = () => {
  const [alertData, setAlertData] = useState<AlertData>();

  const onSubmit = async (values: FormValues, actions: any) => {
    try {
      const response = await fetch('/api/forgetPassword', {
        method: 'POST',
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok) {
        setAlertData({
          severity: 'success',
          message: (
            <>
              Please check your email for password reset link. Back to{' '}
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
      email: '',
    },
    validationSchema: ForgetPasswordSchema,
    onSubmit,
  });

  return (
    <>
      <UnauthorizedLayout
        title="Get forget password link"
        alertData={alertData}
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Submit
          </Button>
        </form>
      </UnauthorizedLayout>
    </>
  );
};

export default ForgetPassword;
