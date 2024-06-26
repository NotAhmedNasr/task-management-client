'use client';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { RegisterFormValues } from '@/lib/types/registration';
import {
  pickFromYupObjectSchema,
  registrationSchema,
} from '@/lib/schema/register';

interface RegistrationFormProps {
  initialValues: RegisterFormValues;
  onSubmit: (values: RegisterFormValues) => Promise<void> | void;
  validate: (
    values: RegisterFormValues,
  ) => Promise<Partial<RegisterFormValues>> | Partial<RegisterFormValues>;
  disabledFields?: string[];
  loginFieldsOnly?: boolean;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({
  initialValues,
  onSubmit,
  validate,
  disabledFields,
  loginFieldsOnly,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={
        loginFieldsOnly
          ? pickFromYupObjectSchema(registrationSchema, [
              'username',
              'email',
              'password',
              'confirmPassword',
            ])
          : registrationSchema
      }
      validate={validate}
    >
      {({ isSubmitting }) => (
        <Form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <Field
              type="text"
              id="username"
              name="username"
              disabled={disabledFields?.includes('username')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
            />
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <Field
              type="text"
              id="email"
              name="email"
              disabled={disabledFields?.includes('email')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500 text-xs mt-1"
            />
          </div>

          <div className="flex gap-4">
            <div className="mb-4 flex-grow-0">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                disabled={disabledFields?.includes('password')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>

            <div className="mb-4 flex-grow-0">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <Field
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                disabled={disabledFields?.includes('confirmPassword')}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </div>
          </div>

          {!loginFieldsOnly && (
            <div className="flex space-x-4">
              <div className="mb-4 grow">
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <Field
                  type="text"
                  id="firstName"
                  name="firstName"
                  disabled={disabledFields?.includes('firstName')}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                />
                <ErrorMessage
                  name="firstName"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>

              <div className="mb-4 grow">
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <Field
                  type="text"
                  id="lastName"
                  name="lastName"
                  disabled={disabledFields?.includes('lastName')}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                />
                <ErrorMessage
                  name="lastName"
                  component="div"
                  className="text-red-500 text-xs mt-1"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gray-800 py-2 px-4 border border-transparent rounded-md text-white font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 disabled:opacity-50 duration-200"
            disabled={isSubmitting}
          >
            Register
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegistrationForm;
