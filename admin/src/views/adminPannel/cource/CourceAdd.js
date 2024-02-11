import { Box, Button, FormControl, Grid, Input, Tab, Tabs, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { CustomButton, CustomInput } from 'components';
import { addGeneralDetailsInitialValues } from 'constant/initialValues';
import { AdminPanelRouteOfEndpoint } from 'constant/routesEndPoint';
import { addGeneralDetailsValidationSchema } from 'constant/validationSchema';
import { useFormik } from 'formik';
import { errorNotification, successNotification } from 'helper/notification';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'utils/localStorage/getCurrentUser';
import { UserAddProfileDetailsStyle } from './UserAddProfileDetails.style';

function CourceAdd() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [valueExportTab, setValueExportTab] = useState(0);
  const BASE_URL = process.env.REACT_APP_BASE_URL;

  const handleExportModalTabChange = (event, newValue) => {
    setValueExportTab(newValue);
  };

  const formik = useFormik({
    initialValues: addGeneralDetailsInitialValues,
    validationSchema: addGeneralDetailsValidationSchema,
    onSubmit: async (values) => {
      delete values["course_file"];
      if (selectedFile === null) {
        errorNotification("Please select a file.");
        return;
      }
      const formData = new FormData();
      formData.append("course_file", selectedFile);
      formData.append("course_data", JSON.stringify(values));
      // Flatten nested objects before appending to FormData
      flattenObject(values, formData);
      try {
        setLoading(true);
        const token = getCurrentUser()?.token;
        const response = await axios.post(BASE_URL + 'api/course/add', formData, {
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
          // Handle server response indicating failure
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

  // Function to flatten nested objects
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
          source_data_type: "",
          source_URL: "",
          source_length: "",
          source_heading: "",
          source_heading: ""

        },
      ],
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/jpeg') {
      setSelectedFile(file);
    } else {
      alert('Please select a valid JPG file.');
    }
  };

  const handleRemoveCource = (e) => {
    const updatedCourseOrder = formik.values.course_source.filter((value, j) => j !== e);
    formik.setValues({
      ...formik.values,
      course_source: updatedCourseOrder,
    });
  }

  console.log(formik.errors)

  return (
    <Box p={2}>
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <Typography variant="h5" paddingLeft={2}>Cource Add</Typography>
        <Tabs textColor="inherit" TabIndicatorProps={{ sx: UserAddProfileDetailsStyle.tabsColor }} value={valueExportTab} onChange={handleExportModalTabChange} aria-label="Tabs example" style={UserAddProfileDetailsStyle.exportModalTab}>
          <Tab label="Genral" />
          <Tab label="Source" />
        </Tabs>
        {valueExportTab === 0 &&
          <>
            <Grid container columnSpacing={2} mt={2}>
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
                  label="Course total video "
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
                  label="Course length "
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
                  label="Course price "
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
                  id="course_Doller_price"
                  name="course_Doller_price"
                  label="Course doller price "
                  type="number"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.course_Doller_price}
                  error={formik.touched.course_Doller_price && Boolean(formik.errors.course_Doller_price)}
                  helperText={formik.touched.course_Doller_price && formik.errors.course_Doller_price}
                  sx={{ width: '100%', my: '15px' }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xxl={3}>
                <FormControl>
                  <Input
                    type="file"
                    id="fileInput"
                    inputProps={{ accept: 'image/jpeg' }}
                    onChange={handleFileChange}
                    sx={{ width: '100%', my: '15px' }}
                  />
                </FormControl>
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
                  <option value="Disable">Disable</option>
                  <option value="Enable">Enable</option>
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
                    id={`source_type_title_${index}`}
                    name={`course_source[${index}].source_type_title`}
                    label="Source type title "
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
                    id={`source_data_type_${index}`}
                    name={`course_source[${index}].source_data_type`}
                    label="Source data type "
                    size="small"
                    type="text"
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                    value={course_source.source_data_type}
                    error={formik.touched.course_source && formik.errors.course_source && Boolean(formik.errors.course_source[index]?.source_data_type)}
                    helperText={formik.touched.course_source && formik.errors.course_source && formik.errors.course_source[index]?.source_data_type}
                    sx={{ width: '100%', my: '15px' }}
                  />
                </Grid>
                <Grid item xs={6} lg={3.4} xxl={1.8}>
                  <CustomInput
                    id={`source_URL_${index}`}
                    name={`course_source[${index}].source_URL`}
                    label="Source URL "
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
                    id={`source_heading_${index}`}
                    name={`course_source[${index}].source_heading`}
                    label="Source heading "
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
                    id={`source_category_${index}`}
                    name={`course_source[${index}].source_category`}
                    select
                    variant="outlined"
                    label="Source category "
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
                    <option value="Bidmate">Bidmate</option>
                    <option value="Nova">Nova</option>
                  </CustomInput>
                </Grid>
                <Grid item xs={6} lg={3.4} xxl={1.8}>
                  <CustomInput
                    id={`source_length_${index}`}
                    name={`course_source[${index}].source_length`}
                    label="Source length "
                    size="small"
                    type="number"
                    fullWidth
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={course_source.source_length}
                    error={formik.touched.course_source && formik.errors.course_source && Boolean(formik.errors.course_source[index]?.source_length)}
                    helperText={formik.touched.course_source && formik.errors.course_source && formik.errors.course_source[index]?.source_length}
                    sx={{ width: '100%', my: '15px' }}
                  />
                </Grid>
                <Grid item xs={12} lg={1} xxl={1} mb={{ lg: '0px', xs: '10px' }} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {index !== 0 &&
                    <Box
                      component="div"
                      onClick={() => handleRemoveCource(index)}
                      style={{ width: '20px', background: 'white', height: '25px', border: '1px solid black', cursor: 'pointer', borderRadius: '4px', textAlign: 'center' }}
                    >
                      -
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
              style={{ width: '20px', background: 'white', height: '25px', border: '1px solid black', cursor: 'pointer', borderRadius: '4px', textAlign: 'center' }}
            >
              +
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

export default CourceAdd;
