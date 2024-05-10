import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

interface EditableFieldProps {
  name: string;
  initialValue: string;
  fieldClassName?: string;
  getButtonClassName?: (disable: boolean) => string;
  fieldSchema?: object;
  validate?: <FieldValueType>(fieldValue: FieldValueType) => void;
  onSave: (value: string) => Promise<void>;
}

const SingleFieldForm: React.FC<EditableFieldProps> = ({
  name,
  initialValue,
  validate = () => ({}),
  fieldSchema,
  onSave,
  fieldClassName,
  getButtonClassName,
}) => {
  const defaultFieldClassName =
    fieldClassName ?? 'border border-gray-300 rounded-md px-3 py-2 w-full';
  const defaultGetButtonClassName =
    typeof getButtonClassName === 'function'
      ? getButtonClassName
      : (disabled: boolean) =>
          `${
            disabled
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600'
          } text-white px-4 py-2 rounded-md ml-2`;
  return (
    <div>
      <Formik
        initialValues={{ [name]: initialValue }}
        validate={(values) => validate?.(values[name])}
        validationSchema={fieldSchema}
        onSubmit={(values, { setSubmitting }) => {
          onSave(values[name]).finally(() => {
            setSubmitting(false);
          });
        }}
      >
        {({ isSubmitting, values }) => {
          const disabled = isSubmitting || values[name] === initialValue;
          return (
            <Form>
              <div className="flex gap-3 flex-col sm:flex-row">
                <Field
                  type="text"
                  name={name}
                  className={defaultFieldClassName}
                />
                <button
                  type="submit"
                  className={`${defaultGetButtonClassName(disabled)}`}
                  disabled={disabled}
                >
                  Save
                </button>
              </div>
              <ErrorMessage
                name={name}
                component="div"
                className="text-red-500 text-xs mt-1"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SingleFieldForm;
