// Login page initial value
export const loginInitialValues = {
  username: '',
  password: ''
};

// Login page initial value
export const addGeneralDetailsInitialValues = {
  // course_file: null,
  course_name: '',
  course_description: '',
  course_exp_days: null,
  course_length: '',
  course_total_video: null,
  course_price: null,
  course_doller_price: null,
  course_status: 'Enable',
  course_source: [
    {
      source_type_title: '',
      source_data_type: 'Video',
      source_URL: '',
      source_length: '',
      source_heading: '',
      source_category: 'Main Sessions',
    }
  ]
}

export function convertCourseObject(input) {
  let convertedObject = {
    course_name: input?.course?.course?.course_name || '',
    course_description: input?.course?.course?.course_description || '',
    course_exp_days: parseInt(input?.course?.course?.course_expired_days) || null,
    course_length: input?.course?.course?.course_length || '',
    course_total_video: parseInt(input?.course?.course?.course_total_video) || null,
    course_price: parseFloat(input?.course?.course?.course_price) || null,
    course_doller_price: parseFloat(input?.course?.course?.course_doller_price) || null,
    course_status: input?.course?.course?.course_status || '',
    course_source: []
  };

  input?.course?.courseData?.forEach(courseData => {
    let sourceObject = {
      course_data_id: courseData.course_data_id,
      source_type_title: courseData.course_data_title || '',
      source_data_type: courseData.course_data_type || '',
      source_URL: courseData.course_data_url || '',
      source_length: courseData.course_data_length || '',
      source_heading: courseData.course_data_heading || '',
      source_category: courseData.course_data_category || ''
    };
    convertedObject.course_source.push(sourceObject);
  });

  return convertedObject;
}

export const addCustomerDetailsInitialValues = {
  general: {
    name: "",
    email: "",
    password: "",
    telephone: null,
    status: null
  },
  address: {
    first_name: "",
    last_name: "",
    company: "",
    company_id: null,
    tax_id: null,
    address_1: "",
    address_2: "",
    city: "",
    postcode: null,
    country: null,
    state: null
  },
  payment_details: {
    payment_method: "",
    payment_transaction_id: null
  },
  course_order: [
    { course_id: null }
  ]
}