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
  course_length: Yup.string()
    .required('Course length is required'),
  course_total_video: Yup.number().required('Total videos is required').positive('Total videos must be a positive number'),
  course_price: Yup.number().required('Course price is required').positive('Course price must be a positive number'),
  course_doller_price: Yup.number().required('Dollar price is required').positive('Dollar price must be a positive number'),
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


// Add General Details Validation Schema
export const addCustomerDetailsValidationSchema = Yup.object().shape({
  general: Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    telephone: Yup.number().required('Telephone is required'),
    status: Yup.number().required('Status is required')
  }),
  address: Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    company: Yup.string().required('Company is required'),
    company_id: Yup.number(),
    tax_id: Yup.number(),
    address_1: Yup.string().required('Address line 1 is required'),
    address_2: Yup.string(),
    city: Yup.string().required('City is required'),
    postcode: Yup.number().required('Postcode is required'),
    country: Yup.number().required('Country is required'),
    state: Yup.number().required('State is required')
  }),
  payment_details: Yup.object().shape({
    payment_method: Yup.string().required('Payment method is required'),
    payment_transaction_id: Yup.number().required('Payment transaction ID is required')
  }),
  course_order: Yup.array().of(
    Yup.object().shape({
      id: Yup.number().required('Course ID is required')
    })
  )
});
export const addCustomerDetailsValidationSchemanew = Yup.object().shape({
  general: Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters'),
    telephone: Yup.number().required('Telephone is required'),
    status: Yup.number().required('Status is required')
  }),
  address: Yup.object().shape({
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
    company: Yup.string().required('Company is required'),
    company_id: Yup.number(),
    tax_id: Yup.number(),
    address_1: Yup.string().required('Address line 1 is required'),
    address_2: Yup.string(),
    city: Yup.string().required('City is required'),
    postcode: Yup.number().required('Postcode is required'),
    country: Yup.number().required('Country is required'),
    state: Yup.number().required('State is required')
  }),
  payment_details: Yup.object().shape({
    payment_method: Yup.string().required('Payment method is required'),
    payment_transaction_id: Yup.number().required('Payment transaction ID is required')
  }),
  course_order: Yup.array().of(
    Yup.object().shape({
      id: Yup.number().required('Course ID is required')
    })
  )
});