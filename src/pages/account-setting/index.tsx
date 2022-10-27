import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import type { FormikHelpers } from 'formik';
import { useFormik } from 'formik';
import Link from 'next/link';
import * as React from 'react';
import { useEffect, useState } from 'react';
import * as yup from 'yup';

import type { AlertData } from '@/layouts/UnauthorizedLayout';
import UnauthorizedLayout from '@/layouts/UnauthorizedLayout';

interface FormValues {
  companyName: string;
  companyEmail: string;
  companyPhone: string;
}

const basicSchema = yup.object().shape({
  companyName: yup.string().required('Company name is required'),
  companyEmail: yup
    .string()
    .email('Please enter a valid email')
    .required('Company email is required'),
  companyPhone: yup
    .string()
    .matches(/^\d+$/)
    .required('Company phone number is required'),
});

const AccountSetting: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [alertData, setAlertData] = useState<AlertData>();
  const [initialValues, setInitialValues] = useState({
    companyName: '',
    companyEmail: '',
    companyPhone: '',
  });

  const onSubmit = async (
    values: FormValues,
    { setValues }: FormikHelpers<FormValues>
  ) => {
    try {
      setLoading(true);

      const response = await fetch('/api/account-setting', {
        method: 'POST',
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (response.ok) {
        setAlertData({
          severity: 'success',
          message: 'Successfully update your account settings.',
        });
        setValues(data);
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
    }
    setLoading(false);
  };

  const { values, handleChange, handleSubmit } = useFormik<FormValues>({
    initialValues,
    enableReinitialize: true,
    validationSchema: basicSchema,
    onSubmit,
  });

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        const response = await fetch('/api/account-setting', {
          method: 'GET',
        });
        const data = await response.json();

        if (response.ok) {
          setInitialValues(data);
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
      }
      setLoading(false);
    };
    getData();
  }, []);

  return (
    <>
      <UnauthorizedLayout title="Account Settings" alertData={alertData}>
        <Button>
          <Link href="/project">
            <ArrowBackIcon />
          </Link>
        </Button>

        <form
          className="flex flex-col items-center justify-center"
          onSubmit={handleSubmit}
        >
          <Box className="mb-16 flex w-full justify-end">
            <Button
              type="submit"
              variant="contained"
              className="justify-self-end"
              disabled={loading}
            >
              Save
            </Button>
          </Box>
          <TextField
            onChange={handleChange}
            id="companyName"
            label="Company Name"
            type="text"
            className="mb-8 w-full"
            value={values.companyName}
            disabled={loading}
          />
          <TextField
            onChange={handleChange}
            id="companyEmail"
            label="Company Contact Email Address"
            type="email"
            className="mb-8 w-full"
            value={values.companyEmail}
            disabled={loading}
          />
          <TextField
            onChange={handleChange}
            id="companyPhone"
            label="Company Contact Phone Number"
            type="text"
            className="w-full"
            value={values.companyPhone}
            disabled={loading}
          />
        </form>
      </UnauthorizedLayout>

      {loading && <CircularProgress />}
    </>
  );
};

export default AccountSetting;
