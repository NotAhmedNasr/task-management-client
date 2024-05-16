import PlainButton from '@/components/buttons/plain';
import { Task } from '@/lib/types/task';
import { Box, Modal } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import { taskSchema } from '@/lib/schema/task';
import _ from 'lodash';
import { openAlertDialog } from '@/components/dialog/alert';
import { useRef } from 'react';

interface FormValues {
  title: string;
  description: string;
  dueAt: string;
}

interface Props {
  onClose: (
    event?: unknown,
    reason?: 'backdropClick' | 'escapeKeyDown',
  ) => void;
  onSubmit: (values: FormValues) => boolean | Promise<boolean>;
  task?: Task;
  isOpen?: boolean;
}

const TaskForm: React.FC<Props> = ({
  task,
  isOpen = false,
  onClose,
  onSubmit,
}) => {
  const formRef = useRef<
    FormikProps<{
      title: string;
      description: string;
      dueAt: string | undefined;
    }>
  >(null);

  const initialValues = {
    title: task?.title ?? '',
    description: task?.description ?? '',
    dueAt: task?.dueAt,
  };

  return (
    <Modal
      open={isOpen}
      onClose={(ev, reason) => {
        if (
          formRef.current &&
          formRef.current.dirty &&
          !_.isEqual(formRef.current.values, initialValues)
        ) {
          openAlertDialog({
            title: 'Warning!',
            body: "Changes done won't be saved ",
            onAccept: () => {
              onClose(ev, reason);
            },
          });
        } else {
          onClose(ev, reason);
        }
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="bg-gray-800 mx-10 mt-20 md:mx-30 xl:mx-80 p-10">
        <div>
          <h2 className="text-xl font-semibold mb-4">Create Task</h2>
          <Formik
            innerRef={formRef}
            initialValues={initialValues}
            onSubmit={async (values, { setSubmitting }) => {
              const shouldClose = await onSubmit({
                title: values.title,
                description: values.description,
                dueAt: new Date(values.dueAt ?? '').toISOString(),
              });
              setSubmitting(false);
              if (shouldClose) {
                onClose();
              }
            }}
            validationSchema={taskSchema}
          >
            {({ isSubmitting, setFieldValue, values, submitForm }) => (
              <Form className="flex flex-col">
                <div className="mb-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-200"
                  >
                    Title
                  </label>
                  <Field
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Ex: Schedule a meeting with John Doe"
                    className="mt-1 block w-full px-3 py-2 bg-gray-700 transition duration-200 border border-gray-700 focus:border focus:border-gray-200 rounded-sm shadow-sm focus:outline-none  sm:text-sm text-gray-200"
                  />
                  <ErrorMessage
                    name="title"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-200"
                  >
                    Description
                  </label>
                  <Field
                    as="textarea"
                    rows={10}
                    id="description"
                    name="description"
                    placeholder="Describe what needs to be done"
                    className="mt-1 block w-full px-3 py-2 bg-gray-700 border transition duration-200 border-gray-700 focus:border focus:border-gray-200 rounded-sm shadow-sm focus:outline-none  sm:text-sm text-gray-200"
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="mb-4 self-end">
                  <label
                    htmlFor="dueAt"
                    className="block text-sm font-medium text-gray-200"
                  >
                    Due Date
                  </label>
                  <DatePicker
                    selected={values.dueAt ? new Date(values.dueAt) : null}
                    showTimeSelect
                    timeIntervals={5}
                    popperPlacement="right"
                    dateFormat="MMMM d, yyyy h:mm aa"
                    onChange={(date) => setFieldValue('dueAt', date, true)}
                    className="mt-1 block px-3 py-2 bg-gray-700 border transition duration-200 border-gray-700 focus:border focus:border-gray-200 rounded-sm shadow-sm focus:outline-none sm:text-sm text-gray-200"
                  />
                  <ErrorMessage
                    name="dueAt"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <PlainButton
                  disabled={isSubmitting}
                  color="blue"
                  additionalStyle="ml-auto"
                  onClick={() => {
                    submitForm();
                  }}
                >
                  {isSubmitting ? 'Creating...' : 'Create'}
                </PlainButton>
              </Form>
            )}
          </Formik>
        </div>
      </Box>
    </Modal>
  );
};

export default TaskForm;
