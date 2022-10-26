import EditIcon from '@mui/icons-material/Edit';
import { Box, Button, TextField } from '@mui/material';
import type { FormikProps } from 'formik';
import { useFormik } from 'formik';
import * as React from 'react';
import { useState } from 'react';
import * as yup from 'yup';

import ChangePassword from '@/components/ChangePassword';

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
}
const userData = {
  _id: '6357ea350b29357ff613c14a',
  email: 'tzhang0997@gmail.com',
  lastName: 'ZHANG',
  firstName: 'TING',
  accountId: '6357ea350b29357ff613c14a',
};

const ProfileSettings = () => {
  const [showModal, setShowModal] = useState(false);
  const [editAndSaveButton, setEditAndSaveButton] = useState(true);
  const [loadFormValues, setLoadFormValues] = useState(userData);
  const popUpShowModal = (showModalState: any) => {
    setShowModal(showModalState);
  };

  const onSubmit = async (values: FormValues, actions: any) => {
    try {
      const response = await fetch('/api/porfile-settings', {
        method: 'POST',
        body: JSON.stringify(values),
      });

      const data = await response.json();
      console.log(data);
      // if (response.ok) {
      //   setAlertData({
      //     severity: 'success',
      //     message: (
      //       <div>
      //         Successfully change profile settings, Back to{' '}
      //         {/* <Link href="/login">Login</Link> */}
      //       </div>
      //     ),
      //   });
      // } else {
      //   setAlertData({
      //     severity: 'error',
      //     message: data.message,
      //   });
      // }
    } catch (e: any) {
      // setAlertData({
      //   severity: 'error',
      //   message: e.message,
      // });
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
      firstName: '',
      lastName: '',
      email: '',
    },
    validationSchema: basicSchema,
    onSubmit,
  });

  return (
    <>
      <form
        className="mt-36 flex flex-col items-center justify-center "
        onSubmit={handleSubmit}
      >
        <div className="mb-5 flex w-4/12 flex-col items-end justify-end">
          {editAndSaveButton ? (
            <EditIcon
              type="reset"
              color="secondary"
              fontSize="large"
              onClick={() => {
                setEditAndSaveButton(false);
                setLoadFormValues({
                  ...loadFormValues,
                  email: '',
                  lastName: '',
                  firstName: '',
                });
              }}
            />
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => setEditAndSaveButton(true)}
            >
              Save
            </Button>
          )}
        </div>
        <TextField
          id="firstName"
          onChange={handleChange}
          onBlur={handleBlur}
          value={loadFormValues.firstName || values.firstName}
          label="First Name"
          defaultValue={userData.firstName}
          type="text"
          className="mb-4  w-4/12 "
          error={touched.firstName && Boolean(errors.firstName)}
          helperText={touched.firstName && errors.firstName}
        />
        <TextField
          id="lastName"
          value={loadFormValues.lastName || values.lastName}
          onChange={handleChange}
          onBlur={handleBlur}
          label="Last Name"
          defaultValue={userData.lastName}
          type="text"
          className="mb-4  w-4/12 "
          error={touched.lastName && Boolean(errors.lastName)}
          helperText={touched.lastName && errors.lastName}
        />
        <TextField
          id="email"
          value={loadFormValues.email || values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          label="Email"
          // defaultValue={userData.email}
          type="email"
          className="mb-4  w-4/12 "
          error={touched.email && Boolean(errors.email)}
          helperText={touched.email && errors.email}
        />
        <Box className="flex  w-4/12  flex-col items-center justify-center">
          <Button
            type="button"
            variant="contained"
            color="primary"
            className="mb-4 h-14 w-full"
            onClick={() => setShowModal(true)}
          >
            Change Password
          </Button>
          <Button
            variant="contained"
            color="primary"
            className="mb-4 h-14 w-full"
          >
            switch role
          </Button>
        </Box>
      </form>
      <div className="fixed top-32 left-52 z-10">
        {showModal ? (
          <div>
            <ChangePassword popUpShowModal={popUpShowModal} />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ProfileSettings;
