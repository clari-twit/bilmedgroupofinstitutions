import { Add as AddIcon } from '@mui/icons-material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { Box, FormControl, Grid, Tab, Tabs, TextField } from '@mui/material';
import { CustomButton, CustomInput } from 'components';
import CustomSelectInput from 'components/CustomSelectInput';
import { addGeneralDetailsInitialValues } from 'constant/initialValues';
import { addGeneralDetailsValidationSchema } from 'constant/validationSchema';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { errorNotification } from 'helper/notification';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAddProfileDetailsStyle } from './UserAddProfileDetails.style';

function CourceAdd() {
  const navigate = useNavigate();
  const [valueExportTab, setValueExportTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const requiredField = addGeneralDetailsValidationSchema._nodes;

  const handleExportModalTabChange = (event, newValue) => {
    setValueExportTab(newValue);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (values) {
        const formData = new FormData();
        const keysToInclude = ['course_file', 'course_name', 'course_description', 'course_exp_days', 'course_length', 'course_total_video', 'course_price', 'course_Doller_price', 'course_status'];
        keysToInclude?.forEach(key => formData?.append(key, values[key]));
        await console.log(values, navigate, setLoading);
      }
    } catch (error) {
      console.error('Error:', error);
      errorNotification('Add a proper user data');
    } finally {
      setSubmitting(false);
    }
  };

  const hiddenFileInput = useRef(null);
  const handleClick = event => {
    hiddenFileInput.current.click();
  };

  // Entity Type options for
  const coursStatus = ([
    { id: 1, name: 'Enable', value: 'Enable' },
    { id: 2, name: 'Disable', value: 'Disable' },
  ]);

  return (
    <Box p={2}>
      <Formik
        initialValues={addGeneralDetailsInitialValues}
        validationSchema={addGeneralDetailsValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, isSubmitting, setFieldValue, handleChange, values }) => (
          <Form autoComplete="off">
            <Grid item xs={12}>
              <CustomButton
                isLoading={loading}
                variant="contained"
                height="52px"
                width="104.17px"
                backgroundColor="var(--black)"
                margin="20px 0 0 0"
                labelFontSize="18px"
                labelFontWeight={400}
                label={loading ? undefined : 'Submit'}
                type="submit"
                disabled={
                  loading ||
                  isSubmitting ||
                  Object.keys(values).some((key) => {
                    const value = values[key];
                    return requiredField.includes(key) && (!value || (typeof value === 'string' && value.trim() === ''));
                  }) ||
                  !isValid
                }
              />
            </Grid>
            <Tabs textColor="inherit" TabIndicatorProps={{ sx: UserAddProfileDetailsStyle.tabsColor }} value={valueExportTab} onChange={handleExportModalTabChange} aria-label="Tabs example" style={UserAddProfileDetailsStyle.exportModalTab}>
              <Tab label="Genral" />
              <Tab label="Source" />
            </Tabs>
            {valueExportTab === 0 &&
              <>
                <Grid container sx={UserAddProfileDetailsStyle.uploadImageMain}>
                  <Grid item>
                    {values.course_file !== '' ?
                      <img src={values.course_file && URL.createObjectURL(values.course_file)} name="course_file" alt="profile" style={UserAddProfileDetailsStyle.profileImage} /> :
                      <AddPhotoAlternateIcon style={UserAddProfileDetailsStyle.profileImage} />}
                  </Grid>
                  <Grid item sx={UserAddProfileDetailsStyle.uploadButton}>
                    <input
                      type="file"
                      name="course_file"
                      accept=".jpg, .jpeg, .png"
                      onChange={(e) => { setFieldValue('course_file', e.currentTarget.files[0]) }}
                      ref={hiddenFileInput}
                      style={{ display: 'none' }}
                    />
                    <CustomButton
                      variant="contained"
                      label="Upload Profile Image"
                      backgroundColor="var(--black)"
                      labelFontWeight={400}
                      startIcon={<AddIcon />}
                      onClick={handleClick}
                    />
                  </Grid>
                  <Grid item my={0.5}>
                    <CustomButton
                      variant="outline"
                      label="Remove"
                      border="1px solid var(--gray)"
                      labelFontSize="12px"
                      labelFontWeight={400}
                      onClick={() => setFieldValue('course_file', '')}
                    />
                  </Grid>
                </Grid>
                <Grid container columnSpacing={2}>
                  <Grid item xs={12} lg={6}>
                    <Field
                      as={CustomInput}
                      placeholder="Enter your course name"
                      label="Cource Name"
                      requiredLabel
                      name="course_name"
                      borderColorName="var(--darkGray)"
                      type="text"
                      sx={UserAddProfileDetailsStyle.field}
                    />
                    <ErrorMessage name="course_name" component="div" style={UserAddProfileDetailsStyle.errorMessage} />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field
                      as={CustomInput}
                      placeholder="Enter your cource description"
                      label="Course Description"
                      requiredLabel
                      name="course_description"
                      borderColorName="var(--darkGray)"
                      type="text"
                      sx={UserAddProfileDetailsStyle.field}
                    />
                    <ErrorMessage name="course_description" component="div" style={UserAddProfileDetailsStyle.errorMessage} />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field
                      as={CustomInput}
                      placeholder="Enter your cource expiry day"
                      label="Course Expiry Day"
                      requiredLabel
                      name="course_exp_days"
                      borderColorName="var(--darkGray)"
                      type="number"
                      sx={UserAddProfileDetailsStyle.field}
                    />
                    <ErrorMessage name="course_exp_days" component="div" style={UserAddProfileDetailsStyle.errorMessage} />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field
                      as={CustomInput}
                      placeholder="Enter your cource length"
                      label="Course Length"
                      requiredLabel
                      name="course_length"
                      borderColorName="var(--darkGray)"
                      type="text"
                      sx={UserAddProfileDetailsStyle.field}
                    />
                    <ErrorMessage name="course_length" component="div" style={UserAddProfileDetailsStyle.errorMessage} />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field
                      as={CustomInput}
                      placeholder="Enter your cource total video"
                      label="Course Total Video"
                      requiredLabel
                      name="course_total_video"
                      borderColorName="var(--darkGray)"
                      type="number"
                      sx={UserAddProfileDetailsStyle.field}
                    />
                    <ErrorMessage name="course_total_video" component="div" style={UserAddProfileDetailsStyle.errorMessage} />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field
                      as={CustomInput}
                      placeholder="Enter your cource price"
                      label="Course Price"
                      requiredLabel
                      name="course_price"
                      borderColorName="var(--darkGray)"
                      type="number"
                      sx={UserAddProfileDetailsStyle.field}
                    />
                    <ErrorMessage name="course_price" component="div" style={UserAddProfileDetailsStyle.errorMessage} />
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Field
                      as={CustomInput}
                      placeholder="Enter your cource doller price"
                      label="Course Doller Price"
                      requiredLabel
                      name="course_Doller_price"
                      borderColorName="var(--darkGray)"
                      type="number"
                      sx={UserAddProfileDetailsStyle.field}
                    />
                    <ErrorMessage name="course_Doller_price" component="div" style={UserAddProfileDetailsStyle.errorMessage} />
                  </Grid>
                  <Grid item xs={12} lg={6} mt="40px">
                    <FormControl fullWidth focused="true">
                      <CustomSelectInput
                        ListboxProps={{ style: UserAddProfileDetailsStyle.listBox }}
                        fullWidth
                        name="course_status"
                        disableClearable
                        options={coursStatus}
                        getOptionLabel={(option) => option.name}
                        onChange={(event, newValue) => {
                          handleChange({ target: { name: 'course_status', value: newValue?.value || '' } });
                        }}
                        value={coursStatus.find((option) => option.value === values?.course_status) || null}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Entity Type "
                            placeholder="Select course status"
                            focused="true"
                            requiredLabel
                          />
                        )}
                      />
                    </FormControl>
                    <ErrorMessage name="course_status" component="div" style={UserAddProfileDetailsStyle.errorMessage} />
                  </Grid>
                </Grid>
              </>}
            {valueExportTab === 1 &&
              <Box>Hello</Box>}
          </Form>
        )}
      </Formik>
    </Box>
  )
}

export default CourceAdd;
