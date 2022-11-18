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
interface SetModalProps {
  popUpShowModal: any;
}
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
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match'),
});

const ChangePassword: React.FC<SetModalProps> = ({ popUpShowModal }) => {
  const [errorMsg, setErrorMsg] = useState('');
  // const [loading, setLoading] = useState('');
  // const [isBoxOpen, setIsBoxOpen] = useState(false);
  // open changePassword box
  // open={isBoxOpen}
  // const [oldPassword, setOldPassword] = useState('');

  const onSubmit = async (values: any, actions: any) => {
    try {
      const response = await fetch('/api/changePassword/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const data = await response.json();
      if (response.ok) {
        setTimeout(() => {
          window.location.replace('/profileSettings');
        }, 3000);
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
          {/* {'Change password failed!'} */}
        </Alert>
      </Snackbar>
      <Box className="flex  items-center justify-center bg-background opacity-100">
        <Box
          sx={{
            width: 500,
            height: 600,
            borderRadius: '5%',
            overflow: 'hidden',
          }}
          className="flex flex-col items-center space-y-8 bg-slate-100"
        >
          <Box
            sx={{ width: '100%', height: '15%' }}
            className="flex flex-row items-center bg-slate-200"
          >
            <Typography className="pl-8" variant="h4">
              Change password
            </Typography>
          </Box>
          <form
            className="flex flex-col items-center justify-center"
            onSubmit={handleSubmit}
          >
            <TextField
              InputProps={{ sx: { width: 300 } }}
              id="currentPassword"
              value={values.currentPassword}
              // onChange={(e) => setOldPassword(e.target.value)}
              onChange={handleChange}
              onBlur={handleBlur}
              label="Current Password"
              type="password"
              className="mb-4 mt-10 w-full"
              error={touched.currentPassword && Boolean(errors.currentPassword)}
              helperText={touched.currentPassword && errors.currentPassword}
            />

            <TextField
              InputProps={{ sx: { width: 300 } }}
              id="newPassword"
              value={values.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              label="New Password"
              type="password"
              // data-testid="password"
              className="mb-4 w-full"
              error={touched.newPassword && Boolean(errors.newPassword)}
              helperText={touched.newPassword && errors.newPassword}
            />

            <TextField
              InputProps={{ sx: { width: 300 } }}
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
                className="items-center justify-between px-8"
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                Save
              </Button>
              <Button
                className="m-4 items-center justify-between"
                // type="submit"
                variant="contained"
                color="primary"
                size="large"
                onClick={() => popUpShowModal(false)}
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
