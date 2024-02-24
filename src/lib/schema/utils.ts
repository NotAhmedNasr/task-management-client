import * as Yup from 'yup';
import {
  ALPHA_REGEX,
  EMAIL_REGEX,
  LOWER_ALPHA_NUMERIC_REGEX,
  LOWER_REGEX,
  NUMBER_REGEX,
  SPECIAL_REGEX,
  UPPER_REGEX,
  lOWER_START_REGEX,
} from '../../app/constants';

export const registrationSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, 'Minimum 2 characters')
    .max(50, 'Maximum 50 characters')
    .matches(lOWER_START_REGEX, 'Starts with lowercase letter')
    .matches(
      LOWER_ALPHA_NUMERIC_REGEX,
      'Contains only lowercase letters and numbers',
    )
    .required('* Required'),
  email: Yup.string()
    .matches(EMAIL_REGEX, 'Invalid Email')
    .required('* Required'),
  password: Yup.string()
    .min(8, 'Minimum 8 characters')
    .max(50, 'Maximum 50 characters')
    .matches(LOWER_REGEX, 'Must contain a lowercase letter')
    .matches(UPPER_REGEX, 'Must contain an uppercase letter')
    .matches(NUMBER_REGEX, 'Must contain a number')
    .matches(SPECIAL_REGEX, 'Must contain a special character !@#$%^&*')
    .required('* Required'),
  confirmPassword: Yup.string().required('* Required'),
  firstName: Yup.string()
    .min(2, 'Minimum 2 characters')
    .max(100, 'Maximum 100 characters')
    .matches(ALPHA_REGEX, 'Only alphabetical letters')
    .required('* Required'),
  lastName: Yup.string()
    .min(2, 'Minimum 2 characters')
    .max(100, 'Maximum 100 characters')
    .matches(ALPHA_REGEX, 'Only alphabetical letters')
    .required('* Required'),
});
