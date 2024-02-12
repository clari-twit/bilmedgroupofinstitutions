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
  course_exp_days: 0,
  course_length: '',
  course_total_video: 0,
  course_price: 0,
  course_doller_price: 0,
  course_status: '',
  course_source: [
    {
      source_type_title: '',
      source_data_type: '',
      source_URL: '',
      source_length: '',
      source_heading: '',
      source_category: '',
    }
  ]
}

export function convertCourseObject(input) {
  let convertedObject = {
    course_name: input?.course?.course?.course_name || '',
    course_description: input?.course?.course?.course_description || '',
    course_exp_days: parseInt(input?.course?.course?.course_expired_days) || 0,
    course_length: input?.course?.course?.course_length || '',
    course_total_video: parseInt(input?.course?.course?.course_total_video) || 0,
    course_price: parseFloat(input?.course?.course?.course_price) || 0,
    course_doller_price: parseFloat(input?.course?.course?.course_doller_price) || 0,
    course_status: input?.course?.course?.course_status || '',
    course_source: []
  };

  input?.course?.courseData?.forEach(courseData => {
    let sourceObject = {
      course_data_id: courseData.course_data_id,
      source_type_title: courseData.course_data_type || '',
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