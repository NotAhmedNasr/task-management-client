import * as Yup from 'yup';

export const taskSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Minimum 2 characters')
    .max(100, 'Maximum 100 characters')
    .required('* Required'),
  description: Yup.string()
    .min(2, 'Minimum 8 characters')
    .max(2000, 'Maximum 2000 characters')
    .required('* Required'),
  dueAt: Yup.date()
    .min(new Date(), 'Due date must be in the future')
    .required('* Required'),
});
