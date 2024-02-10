import { REQUIRED_PASSWORD, REQUIRED_USERNAME } from 'constant/errorMessages';
import * as Yup from 'yup';

// Login page validation schema
export const loginValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required(REQUIRED_USERNAME),
  password: Yup.string()
    .required(REQUIRED_PASSWORD)
});
