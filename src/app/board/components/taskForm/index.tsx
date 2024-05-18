import PlainButton from '@/components/buttons/plain';
import { Box, Modal } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik';
import { taskSchema } from '@/lib/schema/task';
import _ from 'lodash';
import { openAlertDialog } from '@/components/dialog/alert';
import { useRef } from 'react';
import XButton from '@/components/buttons/x';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { closeTaskForm, editTaskFinished } from '@/lib/store/task/actions';
import { selectEditedTask } from '@/lib/store/task/selectors';
import { Task } from '@/lib/types/task';

interface FormValues {
  title: string;
  description: string;
  dueAt: string;
}

interface Props {
  onClose?: (
    event?: unknown,
    reason?: 'backdropClick' | 'escapeKeyDown',
  ) => void;
  onSubmit: (values: FormValues, id?: Task['id']) => boolean | Promise<boolean>;
  isOpen?: boolean;
}

const TaskForm: React.FC<Props> = ({ isOpen = false, onClose, onSubmit }) => {
  const formRef = useRef<
    FormikProps<{
      title: string;
      description: string;
      dueAt: string | undefined;
    }>
  >(null);
  const dispatch = useAppDispatch();
  const editedTask = useAppSelector(selectEditedTask);

  const initialValues = {
    title: editedTask?.title ?? '',
    description: editedTask?.description ?? '',
    dueAt: editedTask?.dueAt,
  };

  const closeModal: Props['onClose'] = (ev, reason) => {
    onClose?.(ev, reason);
    dispatch(closeTaskForm());
    if (editedTask) dispatch(editTaskFinished());
  };

  const formHasChanges = () => {
    return (
      formRef.current &&
      formRef.current.dirty &&
      !_.isEqual(formRef.current.values, initialValues)
    );
  };

  const onModalClose: Props['onClose'] = (ev, reason) => {
    if (formRef.current?.isSubmitting) return;
    if (formHasChanges()) {
      openAlertDialog({
        title: 'Warning!',
        body: "Changes done won't be saved ",
        onAccept: () => {
          closeModal(ev, reason);
        },
      });
    } else {
      closeModal(ev, reason);
    }
  };

  return (
    <Modal
      open={isOpen}
      onClose={onModalClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="bg-gray-800 mx-10 mt-20 md:mx-30 xl:mx-80 p-10">
        <Formik
          innerRef={formRef}
          initialValues={initialValues}
          onSubmit={async (values, { setSubmitting }) => {
            const shouldClose = await onSubmit(
              {
                title: values.title,
                description: values.description,
                dueAt: new Date(values.dueAt ?? '').toISOString(),
              },
              editedTask?.id,
            );
            setSubmitting(false);
            if (shouldClose) {
              closeModal();
            }
          }}
          validationSchema={taskSchema}
        >
          {({ isSubmitting, setFieldValue, values, submitForm }) => (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                  {editedTask ? 'Edit Task' : 'Create Task'}
                </h2>
                <XButton
                  disabled={isSubmitting}
                  onClick={() => onModalClose()}
                  size={24}
                />
              </div>
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                    popperPlacement="left"
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
                  disabled={isSubmitting || !formHasChanges()}
                  color="blue"
                  additionalStyle="ml-auto"
                  onClick={() => {
                    submitForm();
                  }}
                >
                  {isSubmitting ? 'Saving...' : 'Save'}
                </PlainButton>
              </Form>
            </div>
          )}
        </Formik>
      </Box>
    </Modal>
  );
};

export default TaskForm;
