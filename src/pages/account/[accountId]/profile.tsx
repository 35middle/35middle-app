import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import { Box, Button, TextField } from '@mui/material';
import type { FormikProps } from 'formik';
import { useFormik } from 'formik';
import * as React from 'react';
import { useState } from 'react';
import * as yup from 'yup';

import ChangePassword from '@/components/ChangePassword';
import AuthorizedLayout from '@/layouts/AuthorizedLayout';
import MainPageLayout from '@/layouts/MainPageLayout';
import type { BasePageProps } from '@/types';

export { getServerSideProps } from '@/core/auth';

const basicSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please enter a valid email')
    .required('Email is required'),
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
});

// form with formik

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
}

type Props = BasePageProps;

const Profile = ({ userSession }: Props) => {
  const [showModal, setShowModal] = useState(false);
  const popUpShowModal = (showModalState: any) => {
    setShowModal(showModalState);
  };

  const onSubmit = async (values: FormValues, actions: any) => {
    console.log(values);
    setTimeout(() => {
      console.log(values);
    }, 1000);
    actions.resetForm();
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
      firstName: userSession?.firstName || '',
      lastName: userSession?.lastName || '',
      email: userSession?.email || '',
    },
    validationSchema: basicSchema,
    onSubmit,
  });

  return (
    <AuthorizedLayout
      userSession={userSession}
      title="35middle | Profile"
      description="Profile management page"
    >
      <MainPageLayout
        icon={<ManageAccountsOutlinedIcon fontSize="large" color="primary" />}
        title={`Manage ${userSession?.firstName}'s profile`}
        subtitle="This is where you can manage profile information"
      >
        <Box
          className="flex h-full flex-col items-center justify-center"
          style={{ position: 'relative' }}
        >
          <form onSubmit={handleSubmit} className="flex w-1/3 flex-col">
            <TextField
              id="firstName"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.firstName}
              label="First Name"
              type="text"
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
              className="mt-10"
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
              className="mt-10"
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <Button
              type="button"
              variant="outlined"
              color="primary"
              size="large"
              className="mt-5"
              onClick={() => setShowModal(true)}
            >
              Change Password
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              className="mt-5"
            >
              Save
            </Button>
          </form>
          <Box
            className="z-10 flex items-center justify-center bg-background"
            style={{ position: 'absolute', borderRadius: '5%' }}
          >
            {showModal ? (
              <div>
                <ChangePassword popUpShowModal={popUpShowModal} />
              </div>
            ) : null}
          </Box>
        </Box>
      </MainPageLayout>
    </AuthorizedLayout>
  );
};

export default Profile;
