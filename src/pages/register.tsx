import type { FormikProps } from 'formik';
import { useFormik } from 'formik';
import Image from 'next/image';
import * as React from 'react';
import * as yup from 'yup';

// yup validation schema

const passwordRules =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,16}$/;

const basicSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email').required('Required'),
  firstName: yup.string().required('Required'),
  lastName: yup.string().required('Required'),
  password: yup
    .string()
    .min(5)
    .max(16)
    .matches(passwordRules, { message: 'Please creat a strong password' })
    .required('Required'),
});

// form with formik

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const onSubmit = async (values: any, actions: any) => {
  console.log(values);
  await new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
  actions.resetForm();
};

const Register = () => {
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
      password: '',
    },
    validationSchema: basicSchema,
    onSubmit,
  });

  return (
    <div className="flex min-h-full items-center justify-center py-2 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center">
          <Image
            src="/assets/images/35middle.png"
            alt="logo"
            width="240"
            height="240"
          />
          <h2 className="mt-2 text-center text-2xl font-bold tracking-tight text-gray-900">
            Welcome to Register
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName" className="sr-only">
            First name
          </label>
          <input
            id="firstName"
            type="text"
            value={values.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your first name"
            className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
          <label htmlFor="lastName" className="sr-only">
            Last name
          </label>
          <input
            id="lastName"
            type="text"
            value={values.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter your last name"
            className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
          <label htmlFor="email" className="sr-only">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
          {errors.email && touched.email && <p>{errors.email}</p>}
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
          />
          {errors.password && touched.password && (
            <p>
              {`Minimum five characters, at least one uppercase letter, one
              lowercase letter, one number and one special character @$!%*?&`}
            </p>
          )}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Already registered?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
