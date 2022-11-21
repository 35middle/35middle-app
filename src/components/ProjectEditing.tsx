import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import type { FormikProps } from 'formik';
import { useFormik } from 'formik';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useSWRConfig } from 'swr';
import * as yup from 'yup';

import type { ProjectEntity } from '@/hooks/useProjectsByAccountId';

const basicSchema = yup.object().shape({
  projectName: yup.string().required('Project name is required'),
  projectLogo: yup
    .mixed()
    .test('fileSize', 'The file is too large, should < 500kb', (value) => {
      if (!value) {
        return true;
      }

      return value && value.size <= 500000;
    })
    .test('type', 'The file should be image only: .jpeg, .png', (value) => {
      if (!value) {
        return true;
      }
      return value && ['image/jpeg', 'image/png'].includes(value.type);
    }),
  brandColor: yup
    .string()
    .required()
    .test('hex', 'Invalid hex color', (value) => {
      return !!value && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
    }),
});

interface FormValues {
  projectName: string;
  projectLogo: File | null;
  brandColor: string;
}

type Props = {
  onClose: () => void;
  mode?: 'create' | 'edit';
  projectEntity?: ProjectEntity;
  accountId: string;
};

const ProjectEditing = ({
  onClose,
  accountId,
  mode = 'create',
  projectEntity,
}: Props) => {
  const [preview, setPreview] = useState('');
  const { mutate } = useSWRConfig();

  const onSubmit = async (values: FormValues) => {
    const formData = new FormData();
    formData.append('accountId', accountId);
    formData.append('brandColor', values.brandColor);
    formData.append('projectName', values.projectName);
    if (values.projectLogo) {
      formData.append(
        'projectLogo',
        values.projectLogo!,
        values.projectLogo?.name
      );
    }

    if (mode === 'edit') {
      formData.append('projectId', projectEntity?.id || '');
    }

    const response = await fetch(`/api/account/${accountId}/projects`, {
      method: mode === 'create' ? 'POST' : 'PUT',
      body: formData,
    });

    if (response.ok) {
      await mutate(`/api/account/${accountId}/projects`);
      onClose();
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  }: FormikProps<FormValues> = useFormik<FormValues>({
    initialValues: {
      projectName: mode === 'create' ? '' : projectEntity?.name || '',
      projectLogo: null,
      brandColor:
        mode === 'create' ? '#8249FC' : projectEntity?.brandColor || '#8249FC',
    },
    validationSchema: basicSchema,
    onSubmit,
  });

  useEffect(() => {
    if (!values.projectLogo) {
      setPreview('');
      return;
    }

    const objectUrl = URL.createObjectURL(values.projectLogo);
    setPreview(objectUrl);

    // free memory when ever this component is unmounted
    // eslint-disable-next-line consistent-return
    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [values.projectLogo]);

  return (
    <Paper
      style={{
        width: '30rem',
        position: 'absolute',
        top: '50%',
        background: 'white',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        padding: '2rem',
      }}
    >
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-start',
          alignItems: 'center',
        }}
      >
        {mode === 'create' ? (
          <AddCircleOutlineOutlinedIcon fontSize="large" color="primary" />
        ) : (
          <SettingsOutlinedIcon fontSize="large" color="primary" />
        )}
        <Typography variant="h4">
          {mode === 'create' ? 'Create a new project' : 'Edit project'}
        </Typography>
      </Box>
      <Divider variant="middle" style={{ margin: '1rem 0' }} />
      <form
        className="flex flex-col items-center justify-center"
        onSubmit={handleSubmit}
      >
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <TextField
            id="projectName"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.projectName}
            label="Project Name"
            type="text"
            className="mb-4 w-full"
            error={touched.projectName && Boolean(errors.projectName)}
            helperText={touched.projectName && errors.projectName}
          />
          <input
            accept="image/*"
            id="projectLogo"
            hidden
            type="file"
            onChange={(event) => {
              setFieldValue('projectLogo', event.currentTarget.files?.[0]);
            }}
          />
          <Box
            style={{
              marginTop: '2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <label htmlFor="projectLogo">
              <Button variant="outlined" component="span">
                Upload Logo
              </Button>
            </label>
            {
              <Avatar
                alt="Project Logo"
                src={
                  preview ||
                  (mode === 'create'
                    ? '/assets/images/default-project-logo.png'
                    : `/api/project-logo/${projectEntity?.logoPath}`)
                }
                sx={{ width: 56, height: 56 }}
              />
            }
          </Box>
          <Typography variant="overline" color="error">
            {touched.projectLogo && errors.projectLogo}
          </Typography>
        </Box>
        <Box
          style={{
            marginTop: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <TextField
            id="brandColor"
            onChange={handleChange}
            value={values.brandColor}
            label="Brand Color"
            type="text"
            className="mb-4 w-full"
            error={touched.brandColor && Boolean(errors.brandColor)}
            helperText={touched.brandColor && errors.brandColor}
          />
          <Box
            style={{
              width: '2rem',
              height: '2rem',
              backgroundColor: values.brandColor,
            }}
          />
        </Box>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '4rem',
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            size="medium"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="medium"
          >
            Save
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default ProjectEditing;
