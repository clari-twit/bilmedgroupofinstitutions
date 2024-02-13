import { Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import axios from 'axios';
import { CustomButton, CustomInput } from 'components';
import { convertCourseObject } from 'constant/initialValues';
import { AdminPanelRouteOfEndpoint } from 'constant/routesEndPoint';
import { addGeneralDetailsValidationSchema } from 'constant/validationSchema';
import { useFormik } from 'formik';
import { errorNotification, successNotification } from 'helper/notification';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCurrentUser } from 'utils/localStorage/getCurrentUser';
import { UserAddProfileDetailsStyle } from './UserAddProfileDetails.style';

function CourceEdit() {
  const navigate = useNavigate();
  const [costomersData, setCostomersData] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [valueExportTab, setValueExportTab] = useState(0);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { editDataId } = useParams();
  // eslint-disable-next-line
  const [show, setShow] = useState(false);
  const [defultFile, setDefultFile] = useState(false);

  const handleExportModalTabChange = (event, newValue) => {
    setValueExportTab(newValue);
  };

  const getByIdCourceData = async () => {
    try {
      const token = getCurrentUser()?.token;
      const data = await axios.get(BASE_URL + `api/course/details?course_id=${editDataId}`, {
        headers: {
          'x-access-token': token,
        },
        withCredentials: true,
      });
      if (data?.data) {
        setDefultFile(data.data.course.course.course_image)
        setCostomersData(convertCourseObject(data.data));
      }
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    getByIdCourceData();
  }, []);

  const formik = useFormik({
    initialValues: costomersData,
    validationSchema: addGeneralDetailsValidationSchema,
    onSubmit: async (values) => {
      delete values["course_file"];
      // Add course_id to values
      values.course_id = editDataId;
      const formData = new FormData();
      if (selectedFile !== null) {
        formData.append("course_file", selectedFile);
      }
      formData.append("course_data", JSON.stringify(values));
      flattenObject(values, formData);
      try {
        setLoading(true);
        const token = getCurrentUser()?.token;
        const response = await axios.put(BASE_URL + 'api/course/update', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-access-token': token,
          },
        });

        if (response.data.status === true) {
          successNotification("Course added successfully.");
          setLoading(false);
          navigate(AdminPanelRouteOfEndpoint.COURCE_ROUTE);
        } else {
          errorNotification("Failed to add course.");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error:", error);
        errorNotification("An error occurred. Please try again later.");
        setLoading(false);
      }
    }
  });

  useEffect(() => {
    formik.setValues(costomersData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [costomersData]);

  function flattenObject(obj, formData, prefix = '') {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];
        if (typeof value === 'object' && value !== null) {
          flattenObject(value, formData, prefix + key + '.');
        } else {
          formData.append(prefix + key, value);
        }
      }
    }
  }

  const handleAddCourseData = () => {
    formik.setValues({
      ...formik.values,
      course_source: [
        ...formik.values.course_source,
        {
          source_type_title: "",
          source_data_type: "Video",
          source_URL: "",
          source_length: "",
          source_heading: "",
          source_category: "Main Sessions"
        },
      ],
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setDefultFile()
    setSelectedFile(file);
  };

  const handleRemoveCource = (e) => {
    const updatedCourseOrder = formik.values.course_source.filter((value, j) => j !== e);
    formik.setValues({
      ...formik.values,
      course_source: updatedCourseOrder,
    });
  }

  return (
    <Box p={2}>
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <Typography variant="h5" paddingLeft={2}>Cource Edit</Typography>
        <Tabs textColor="inherit" TabIndicatorProps={{ sx: UserAddProfileDetailsStyle.tabsColor }} value={valueExportTab} onChange={handleExportModalTabChange} aria-label="Tabs example" style={UserAddProfileDetailsStyle.exportModalTab}>
          <Tab label="Course" />
          <Tab label="Data" />
        </Tabs>
        {valueExportTab === 0 &&
          <>
            <Grid container columnSpacing={2} mt={2}>
              <Grid item xs={12} md={6} lg={4} xxl={3}>

                <div className="upload_file">
                  <label htmlFor="actual-btn" className="upload_label pointer">

                    {defultFile === undefined && <img className='pointer edit-ico' src={URL.createObjectURL(selectedFile)} alt="profile1" />}
                    {defultFile !== undefined && <img className='pointer edit-ico' src={`${BASE_URL}api/${defultFile}`} alt="profile2" />}
                    {show && (
                      <span className="edit_cover">
                        {/* <img src={profileEdit} alt="profile" /> */}
                      </span>
                    )}
                  </label>
                  <input
                    id="actual-btn"
                    accept=".jpg"
                    onChange={handleFileChange}
                    type="file"
                    hidden
                  />
                </div>
              </Grid>
              <Grid item xs={12} md={6} lg={4} xxl={3}>
                <CustomInput
                  id="course_name"
                  name="course_name"
                  label="Course Name "
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.course_name}
                  error={formik.touched.course_name && Boolean(formik.errors.course_name)}
                  helperText={formik.touched.course_name && formik.errors.course_name}
                  sx={{ width: '100%', my: '15px' }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xxl={3} >
                <CustomInput
                  id="course_description"
                  name="course_description"
                  label="Course Description "
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.course_description}
                  error={formik.touched.course_description && Boolean(formik.errors.course_description)}
                  helperText={formik.touched.course_description && formik.errors.course_description}
                  sx={{ width: '100%', my: '15px' }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xxl={3}>
                <CustomInput
                  id="course_exp_days"
                  name="course_exp_days"
                  label="Course Expired days "
                  type="number"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.course_exp_days}
                  error={formik.touched.course_exp_days && Boolean(formik.errors.course_exp_days)}
                  helperText={formik.touched.course_exp_days && formik.errors.course_exp_days}
                  sx={{ width: '100%', my: '15px' }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xxl={3}>
                <CustomInput
                  id="course_total_video"
                  name="course_total_video"
                  label="Course Total Video "
                  type="number"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.course_total_video}
                  error={formik.touched.course_total_video && Boolean(formik.errors.course_total_video)}
                  helperText={formik.touched.course_total_video && formik.errors.course_total_video}
                  sx={{ width: '100%', my: '15px' }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xxl={3}>
                <CustomInput
                  id="course_length"
                  name="course_length"
                  label="Course Length "
                  type="text"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.course_length}
                  error={formik.touched.course_length && Boolean(formik.errors.course_length)}
                  helperText={formik.touched.course_length && formik.errors.course_length}
                  sx={{ width: '100%', my: '15px' }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xxl={3}>
                <CustomInput
                  id="course_price"
                  name="course_price"
                  label="Course Price "
                  type="number"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.course_price}
                  error={formik.touched.course_price && Boolean(formik.errors.course_price)}
                  helperText={formik.touched.course_price && formik.errors.course_price}
                  sx={{ width: '100%', my: '15px' }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xxl={3}>
                <CustomInput
                  id="course_doller_price"
                  name="course_doller_price"
                  label="Course Doller Price "
                  type="number"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.course_doller_price}
                  error={formik.touched.course_doller_price && Boolean(formik.errors.course_doller_price)}
                  helperText={formik.touched.course_doller_price && formik.errors.course_doller_price}
                  sx={{ width: '100%', my: '15px' }}
                />
              </Grid>

              <Grid item xs={12} md={6} lg={4} xxl={3}>
                <CustomInput
                  id="status"
                  name="course_status"
                  select
                  variant="outlined"
                  label="Status "
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.course_status}
                  SelectProps={{ native: true }}
                  error={formik.touched?.course_status && Boolean(formik.errors?.course_status)}
                  helperText={formik.touched?.course_status && formik.errors?.course_status}
                  fullWidth
                  margin="normal"
                  sx={{ my: '15px' }}
                >
                  <option value="Enable">Enable</option>
                  <option value="Disable">Disable</option>
                </CustomInput>
              </Grid>
            </Grid>
          </>}
        {valueExportTab === 1 && <>
          {formik.values.course_source.map((course_source, index) => (
            <div className='add_cource_data' key={index}>
              <Grid container columnSpacing={2}>
                <Grid item xs={6} lg={3.4} xxl={1.8}>
                  <CustomInput
                    id={`source_category_${index}`}
                    name={`course_source[${index}].source_category`}
                    select
                    variant="outlined"
                    label="Category "
                    size="small"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={course_source.source_category}
                    SelectProps={{ native: true }}
                    error={formik.touched.course_source && formik.errors.course_source && Boolean(formik.errors.course_source[index]?.source_category)}
                    helperText={formik.touched.course_source && formik.errors.course_source && formik.errors.course_source[index]?.source_category}
                    fullWidth
                    margin="normal"
                    sx={{ my: '15px', height: '34.25px' }}
                  >
                    <option value="Main Sessions">Main Sessions</option>
                    <option value="Interactive sessions">Interactive sessions</option>
                  </CustomInput>
                </Grid>
                <Grid item xs={6} lg={3.4} xxl={1.8}>
                  <CustomInput
                    id={`source_heading_${index}`}
                    name={`course_source[${index}].source_heading`}
                    label="Heading "
                    size="small"
                    type="text"
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                    value={course_source.source_heading}
                    error={formik.touched.course_source && formik.errors.course_source && Boolean(formik.errors.course_source[index]?.source_heading)}
                    helperText={formik.touched.course_source && formik.errors.course_source && formik.errors.course_source[index]?.source_heading}
                    sx={{ width: '100%', my: '15px' }}
                  />
                </Grid>
                <Grid item xs={6} lg={3.4} xxl={1.8}>
                  <CustomInput
                    id={`source_type_title_${index}`}
                    name={`course_source[${index}].source_type_title`}
                    label="Title "
                    size="small"
                    fullWidth
                    type="text"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={course_source.source_type_title}
                    helperText={formik.touched.course_source && formik.errors.course_source && formik.errors.course_source[index]?.source_type_title}
                    sx={{ width: '100%', my: '15px' }}
                  />
                </Grid>
                <Grid item xs={6} lg={3.4} xxl={1.8}>
                  <CustomInput
                    id={`source_URL_${index}`}
                    name={`course_source[${index}].source_URL`}
                    label="URL "
                    size="small"
                    type="text"
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                    value={course_source.source_URL}
                    error={formik.touched.course_source && formik.errors.course_source && Boolean(formik.errors.course_source[index]?.source_URL)}
                    helperText={formik.touched.course_source && formik.errors.course_source && formik.errors.course_source[index]?.source_URL}
                    sx={{ width: '100%', my: '15px' }}
                  />
                </Grid>
                <Grid item xs={6} lg={3.4} xxl={1.8}>
                  <CustomInput
                    id={`source_length_${index}`}
                    name={`course_source[${index}].source_length`}
                    label="Time"
                    size="small"
                    type="text"
                    fullWidth
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={course_source.source_length}
                    error={formik.touched.course_source && formik.errors.course_source && Boolean(formik.errors.course_source[index]?.source_length)}
                    helperText={formik.touched.course_source && formik.errors.course_source && formik.errors.course_source[index]?.source_length}
                    sx={{ width: '100%', my: '15px' }}
                  />
                </Grid>
                <Grid item xs={6} lg={3.4} xxl={1.8}>
                  <CustomInput
                    id={`source_data_type_${index}`}
                    name={`course_source[${index}].source_data_type`}
                    select
                    variant="outlined"
                    label="Data Type"
                    size="small"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={course_source.source_data_type}
                    SelectProps={{ native: true }}
                    error={formik.touched.course_source && formik.errors.course_source && Boolean(formik.errors.course_source[index]?.source_data_type)}
                    helperText={formik.touched.course_source && formik.errors.course_source && formik.errors.course_source[index]?.source_data_type}
                    fullWidth
                    margin="normal"
                    sx={{ my: '15px', height: '34.25px' }}
                  >
                    <option value="Video">Videos</option>
                    <option value="PDF">PDF</option>
                  </CustomInput>
                </Grid>
                <Grid item xs={12} lg={1} xxl={1} mb={{ lg: '0px', xs: '10px' }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {index !== 0 &&
                    <Box
                      component="div"
                      onClick={() => handleRemoveCource(index)}
                      style={{ width: '70px', background: 'white', height: '20px', border: '1px solid black', cursor: 'pointer', borderRadius: '4px', textAlign: 'center' }}
                    >
                      <Typography fontSize="12px">Remove</Typography>
                    </Box>}
                </Grid>
              </Grid>
            </div>
          ))}
        </>}
        <div>
          {valueExportTab !== 0 &&
            <Box
              component="div"
              onClick={handleAddCourseData}
              style={{ width: '60px', background: 'white', height: '20px', border: '1px solid black', cursor: 'pointer', borderRadius: '4px', textAlign: 'center', marginLeft: '22px' }}
            >
              <Typography fontSize="12px">Add</Typography>
            </Box>}
          <Grid item xs={12} textAlign="end">
            <CustomButton
              isLoading={loading}
              variant="contained"
              height="30px"
              width="104.17px"
              backgroundColor="var(--black)"
              margin="10px 0 0 0"
              labelFontWeight={400}
              label={loading ? undefined : 'Submit'}
              type="submit"
              disabled={loading}
            />
            <CustomButton
              variant="contained"
              height="30px"
              width="104.17px"
              margin="10px 0 0 10px"
              border="1px solid var(--black)"
              labelFontWeight={400}
              label="Cancel"
              onClick={() => navigate(AdminPanelRouteOfEndpoint.COURCE_ROUTE)}
            />
          </Grid>
        </div>
      </form>
    </Box >
  )
}

export default CourceEdit;
