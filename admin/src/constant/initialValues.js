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
    status: "1"
  },
  address: {
    first_name: "",
    last_name: "",
    company: "",
    company_id: "",
    tax_id: "",
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

export function convertCustomerData(customerData) {
  // Extracting relevant information from the input object
  // eslint-disable-next-line
  const { name, email, telephone, password, status, first_name, last_name, company, company_id, tax_id, address_1, address_2, city, postcode, country, state, payment_method, payment_transaction_id, customer_order_courses } = customerData;

  // Creating the transformed object structure
  const transformedData = {
    general: {
      name: name || "",
      email: email || "",
      password: "",
      telephone: telephone || null,
      status: status || null
    },
    address: {
      first_name: first_name || "",
      last_name: last_name || "",
      company: company || "",
      company_id: company_id || "",
      tax_id: tax_id || "",
      address_1: address_1 || "",
      address_2: address_2 || "",
      city: city || "",
      postcode: postcode || null,
      country: country || null,
      state: state || null
    },
    payment_details: {
      payment_method: payment_method || "",
      payment_transaction_id: payment_transaction_id || null
    },
    course_order: customer_order_courses.map(course => ({
      title: course.course_name || "",
      id: course.course_id || null,
      status: "Enable", // Assuming status is always 'Enable' based on the provided format
      price: course.course_price || null,
      customer_order_courses_expired_date: course.customer_order_courses_expired_date || null,
      create_at: course.create_at || null,
    }))
  };

  return transformedData;
}



export function convertDateFormat(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(-2);
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  return `${day}/${month}/${year}`;
}




export function ConvertCustomerData(jsonData) {
  // Extracting data from the input JSON
  const {
    general,
    address,
    payment_details,
    course_order,
    customer_id
  } = jsonData;

  // Creating the new object structure
  const convertedData = {
    customer_id: general ? general.customer_id : null,
    name: general ? general.name : null,
    email: general ? general.email : null,
    telephone: general ? general.telephone : null,
    password: general ? general.password : null,
    status: general ? general.status : null,
    token: null, // Setting default value as null
    create_at: general ? general.create_at : null, // If available
    update_at: null, // Setting default value as null
    device_info: null, // Setting default value as null
    payment_method: payment_details ? payment_details.payment_method : null,
    payment_transaction_id: payment_details ? payment_details.payment_transaction_id : null,
    customer_address_id: customer_id ? customer_id : null,
    first_name: address ? address.first_name : null,
    last_name: address ? address.last_name : null,
    company: address ? address.company : null,
    company_id: address ? address.company_id : null,
    tax_id: address ? address.tax_id : null,
    address_1: address ? address.address_1 : null,
    address_2: address ? address.address_2 : null,
    city: address ? address.city : null,
    postcode: address ? address.postcode : null,
    country: address ? address.country : null,
    state: address ? address.state : null,
    customer_order_courses: course_order ? course_order.map(course => ({
      course_id: course.id,
      customer_id: customer_id ? customer_id : null,
      customer_order_courses_expired_date: null, // Setting default value as null
      create_at: course.create_at ? course.create_at : null,
      course_name: course.title,
      course_price: course.price
    })) : []
  };

  return convertedData;
}
