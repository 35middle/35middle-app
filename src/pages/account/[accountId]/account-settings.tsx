import ContactPageIcon from '@mui/icons-material/ContactPage';
import { Box, Button, TextField } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import type { FormikHelpers, FormikProps } from 'formik';
import { useFormik } from 'formik';
import * as React from 'react';
import { useEffect, useState } from 'react';
import * as yup from 'yup';

import type { AlertData } from '@/components/Snackbar';
import Snackbar from '@/components/Snackbar';
import AuthorizedLayout from '@/layouts/AuthorizedLayout';
import MainPageLayout from '@/layouts/MainPageLayout';
import type { BasePageProps } from '@/types';

export { getServerSideProps } from '@/core/auth';

interface FormValues {
  companyName: string;
  companyEmail: string;
  companyPhone: string;
}

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const basicSchema = yup.object().shape({
  companyName: yup.string().required('Company name is required'),
  companyEmail: yup
    .string()
    .email('Please enter a valid email')
    .required('Company email is required'),
  companyPhone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, 'too short')
    .max(10, 'too long')
    .required('Company phone number is required'),
});

const AccountSettings: React.FC<BasePageProps> = ({ userSession }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [alertData, setAlertData] = useState<AlertData>();
  const [initialValues, setInitialValues] = useState({
    companyName: '',
    companyEmail: '',
    companyPhone: '',
  });

  const accountId = userSession?.accountId;

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `/api/account/${accountId}/account-settings`,
          {
            method: 'GET',
          }
        );
        const accountData = await response.json();

        if (response.ok) {
          setInitialValues(accountData);
        } else {
          setAlertData({
            severity: 'error',
            message: accountData.message,
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

  const onSubmit = async (
    values: FormValues,
    { setValues }: FormikHelpers<FormValues>
  ) => {
    try {
      setLoading(true);

      const response = await fetch(
        `/api/account/${accountId}/account-settings`,
        {
          method: 'POST',
          body: JSON.stringify(values),
        }
      );
      const accountData = await response.json();

      if (response.ok) {
        setAlertData({
          severity: 'success',
          message: 'Successfully update your account settings.',
        });
        setValues(accountData);
      } else {
        setAlertData({
          severity: 'error',
          message: accountData.message,
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

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  }: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues,
    validationSchema: basicSchema,
    onSubmit,
  });

  return (
    <>
      <Snackbar alertData={alertData} />

      <AuthorizedLayout
        userSession={userSession}
        title="35middle | Account Settings"
        description="Account settings page"
      >
        <MainPageLayout
          icon={<ContactPageIcon fontSize="large" color="primary" />}
          title={`Manage ${userSession?.firstName}'s account`}
          subtitle="This is where you can manage account information"
        >
          <Box className="flex h-full flex-col items-center justify-center ">
            {loading ? (
              <CircularProgress />
            ) : (
              <form onSubmit={handleSubmit} className="flex w-1/3 flex-col">
                <TextField
                  id="companyName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.companyName}
                  label="Company Name"
                  type="text"
                  className="mt-2"
                  error={touched.companyName && Boolean(errors.companyName)}
                  helperText={touched.companyName && errors.companyName}
                />
                <TextField
                  id="companyEmail"
                  value={values.companyEmail}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Company Email"
                  type="email"
                  className="mt-10"
                  error={touched.companyEmail && Boolean(errors.companyEmail)}
                  helperText={touched.companyEmail && errors.companyEmail}
                />
                <TextField
                  id="companyPhone"
                  value={values.companyPhone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Company Phone"
                  type="text"
                  className="mt-10"
                  error={touched.companyPhone && Boolean(errors.companyPhone)}
                  helperText={touched.companyPhone && errors.companyPhone}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  className="mt-10"
                >
                  Save
                </Button>
              </form>
            )}
          </Box>
        </MainPageLayout>
      </AuthorizedLayout>
    </>
  );
};

export default AccountSettings;
