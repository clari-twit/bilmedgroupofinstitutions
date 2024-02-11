import { REQUIRED_PASSWORD, REQUIRED_USERNAME } from 'constant/errorMessages';
import * as Yup from 'yup';

// Login page validation schema
export const loginValidationSchema = Yup.object().shape({
  username: Yup.string()
    .required(REQUIRED_USERNAME),
  password: Yup.string()
    .required(REQUIRED_PASSWORD)
});

// Add General Details Validation Schema
export const addGeneralDetailsValidationSchema = Yup.object().shape({
  course_name: Yup.string().required('Course name is required'),
  course_description: Yup.string().required('Course description is required'),
  // course_file: Yup.mixed().required('Course file is required'),
  course_exp_days: Yup.number().required('Course expiration days is required').positive('Course expiration days must be a positive number'),
  course_length: Yup.number()
    .required('Course length is required')
    .typeError('Course length must be a valid number'),
  course_total_video: Yup.number().required('Total videos is required').positive('Total videos must be a positive number'),
  course_price: Yup.number().required('Course price is required').positive('Course price must be a positive number'),
  course_Doller_price: Yup.number().required('Dollar price is required').positive('Dollar price must be a positive number'),
  course_status: Yup.string().required('Course status is required'),
  course_source: Yup.array().of(
    Yup.object().shape({
      source_type_title: Yup.string().required('Source type title is required'),
      source_data_type: Yup.string().required('Source data type is required'),
      source_URL: Yup.string().required('Source URL is required'),
      source_length: Yup.string().required('Source length is required'),
      source_category: Yup.string().required('Source category is required'),
      source_heading: Yup.string().required('Source heading title is required')
    })
  )
});
