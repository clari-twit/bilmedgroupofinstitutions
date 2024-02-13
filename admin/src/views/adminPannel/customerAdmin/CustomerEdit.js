import { Autocomplete, Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { UserAddProfileDetailsStyle } from '../cource/UserAddProfileDetails.style';
import { CustomButton, CustomInput } from 'components';
import { useFormik } from 'formik';
import { addCustomerDetailsInitialValues } from 'constant/initialValues';
import { errorNotification, successNotification } from 'helper/notification';
import { addCustomerDetailsValidationSchema } from 'constant/validationSchema';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminPanelRouteOfEndpoint } from 'constant/routesEndPoint';
import { getCurrentUser } from 'utils/localStorage/getCurrentUser';
import axios from 'axios';

function CustomerEdit() {
  const [valueExportTab, setValueExportTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allCourceName, setAllCourceName] = useState([]);
  const [contries, setContries] = useState();
  const [allState, setAllState] = useState();
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { editDataId } = useParams();
console.log(editDataId)

  const handleExportModalTabChange = (event, newValue) => {
    setValueExportTab(newValue);
  };

 

  const formik = useFormik({
    initialValues: addCustomerDetailsInitialValues,
    validationSchema: addCustomerDetailsValidationSchema,
    onSubmit: async (values) => {
      values.course_order.forEach(order => {
        order.course_id = order.id;
        delete order.title;
        delete order.id;
      });
      const convertedData = values;
      convertedData.address.state = parseInt(convertedData.address.state);
      convertedData.address.country = parseInt(convertedData.address.country);
      convertedData.general.status = parseInt(convertedData.general.status);
      convertedData.course_order = convertedData.course_order.filter(item => item.id !== item.course_id);
      console.log("convertedData", convertedData)
      try {
        setLoading(true);
        const token = getCurrentUser()?.token;
        const response = await axios.put(BASE_URL + 'api/customer/update', JSON.stringify(convertedData), {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
          },
        });
        if (response.data.status === true) {
          successNotification("Course added successfully.");
          setLoading(false);
          navigate(AdminPanelRouteOfEndpoint.CUSTOMER_ADMIN_ROUTE);
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

  function convertToNewFormat(originalArray) {
    let newArray = [];
    originalArray.forEach(obj => {
      let newName = obj.course_name;
      let newId = obj.course_id;
      let newObj = { title: newName, id: newId };
      newArray.push(newObj);
    });
    return newArray;
  }

  const getAllReworkData = async () => {
    setLoading(true);
    try {
      const token = getCurrentUser()?.token;
      const data = await axios.get(BASE_URL + 'api/course', {
        headers: {
          'x-access-token': token,
        },
        withCredentials: true,
      });
      setAllCourceName(convertToNewFormat(data?.data?.aaData))
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err)
    }
  };

  useEffect(() => {
    getAllReworkData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = getCurrentUser()?.token;
        const response = await axios.get(BASE_URL + 'api/customer/country', {
          headers: {
            'x-access-token': token,
          },
          withCredentials: true,
        });
        setContries(response.data.country);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const fetchData = async (e) => {
      try {
        const token = getCurrentUser()?.token;
        const response = await axios.get(BASE_URL + `api/customer/state?country_id=${e}`, {
          headers: {
            'x-access-token': token,
          },
          withCredentials: true,
        });
        setAllState(response.data.states);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(formik.values.address.country);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values.address.country]);

  return (
    <Box p={2}>
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <Typography variant="h5" paddingLeft={2}>Coustomer Edit</Typography>
        <Tabs textColor="inherit" TabIndicatorProps={{ sx: UserAddProfileDetailsStyle.tabsColor }} value={valueExportTab} onChange={handleExportModalTabChange} aria-label="Tabs example" style={UserAddProfileDetailsStyle.exportModalTab}>
          <Tab label="Information" />
          <Tab label="Address" />
          <Tab label="Payment" />
          <Tab label="Cource Order" />
        </Tabs>
        {valueExportTab === 0 &&
          <>
            <Grid container columnSpacing={2} mt={2}>
              <Grid item xs={12} md={6} lg={4} xxl={3}>
                <CustomInput
                  id="name"
                  name="general.name" // Corrected naming convention for nested field
                  label="Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.general.name} // Corrected access to nested field
                  error={formik.touched.general?.name && Boolean(formik.errors.general?.name)}
                  helperText={formik.touched.general?.name && formik.errors.general?.name}
                  sx={{ width: '100%', my: '15px' }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xxl={3}>
                <CustomInput
                  id="email"
                  name="general.email" // Corrected naming convention for nested field
                  label="Email"
                  type="email"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.general.email} // Corrected access to nested field
                  error={formik.touched.general?.email && Boolean(formik.errors.general?.email)}
                  helperText={formik.touched.general?.email && formik.errors.general?.email}
                  sx={{ width: '100%', my: '15px' }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xxl={3}>
                <CustomInput
                  id="password"
                  name="general.password" // Corrected naming convention for nested field
                  label="Password"
                  type="password"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.general.password} // Corrected access to nested field
                  error={formik.touched.general?.password && Boolean(formik.errors.general?.password)}
                  helperText={formik.touched.general?.password && formik.errors.general?.password}
                  sx={{ width: '100%', my: '15px' }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xxl={3}>
                <CustomInput
                  id="telephone"
                  name="general.telephone" // Corrected naming convention for nested field
                  label="Telephone"
                  type="number"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.general.telephone} // Corrected access to nested field
                  error={formik.touched.general?.telephone && Boolean(formik.errors.general?.telephone)}
                  helperText={formik.touched.general?.telephone && formik.errors.general?.telephone}
                  sx={{ width: '100%', my: '15px' }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xxl={3}>
                <CustomInput
                  id="status"
                  name="general.status" // Assuming status belongs to the general section
                  select
                  variant="outlined"
                  label="Status"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.general.status || 1} // Using general.status as the value
                  SelectProps={{ native: true }}
                  error={formik.touched.general?.status && Boolean(formik.errors.general?.status)}
                  helperText={formik.touched.general?.status && formik.errors.general?.status}
                  fullWidth
                  margin="normal"
                  sx={{ my: '15px' }}
                >
                  <option value={1}>Enable</option>
                  <option value={0}>Disable</option>
                </CustomInput>
              </Grid>
            </Grid>
          </>}
        {valueExportTab === 1 &&
          <>
            <Grid container columnSpacing={2} mt={2}>
              <Grid item xs={12} md={6} lg={4} xxl={3}>
                <CustomInput
                  id="first_name"
                  name="address.first_name"
                  label="First Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.address.first_name} // Corrected access to nested field
                  error={formik.touched.address?.first_name && Boolean(formik.errors.address?.first_name)}
                  helperText={formik.touched.address?.first_name && formik.errors.address?.first_name}
                  sx={{ width: '100%', my: '15px' }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xxl={3}>
                <CustomInput
                  id="last_name"
                  name="address.last_name"
                  label="Last Name"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.address.last_name}
                  error={formik.touched.address?.last_name && Boolean(formik.errors.address?.last_name)}
                  helperText={formik.touched.address?.last_name && formik.errors.address?.last_name}
                  sx={{ width: '100%', my: '15px' }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xxl={3}>
                <CustomInput
                  id="company"
                  name="address.company"
                  label="Company"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.address?.company}
                  error={formik.touched.address?.company && Boolean(formik.errors.address?.company)}
                  helperText={formik.touched.address?.company && formik.errors.address?.company}
                  sx={{ width: '100%', my: '15px' }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xxl={3}>
                <CustomInput
                  id="company_id"
                  name="address.company_id"
                  label="Company Id"
                  variant="outlined"
                  size="small"
                  type="number"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.address?.company_id}
                  error={formik.touched.address?.company_id && Boolean(formik.errors.address?.company_id)}
                  helperText={formik.touched.address?.company_id && formik.errors.address?.company_id}
                  sx={{ width: '100%', my: '15px' }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xxl={3}>
                <CustomInput
                  id="tax_id"
                  name="address.tax_id"
                  label="Tax Id"
                  variant="outlined"
                  size="small"
                  type="number"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.address?.tax_id}
                  error={formik.touched.address?.tax_id && Boolean(formik.errors.address?.tax_id)}
                  helperText={formik.touched.address?.tax_id && formik.errors.address?.tax_id}
                  sx={{ width: '100%', my: '15px' }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xxl={3}>
                <CustomInput
                  id="address_1"
                  name="address.address_1"
                  label="Address 1"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.address?.address_1}
                  error={formik.touched.address?.address_1 && Boolean(formik.errors.address?.address_1)}
                  helperText={formik.touched.address?.address_1 && formik.errors.address?.address_1}
                  sx={{ width: '100%', my: '15px' }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xxl={3}>
                <CustomInput
                  id="address_2"
                  name="address.address_2"
                  label="Address 2"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.address?.address_2}
                  error={formik.touched.address?.address_2 && Boolean(formik.errors.address?.address_2)}
                  helperText={formik.touched.address?.address_2 && formik.errors.address?.address_2}
                  sx={{ width: '100%', my: '15px' }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xxl={3}>
                <CustomInput
                  id="city"
                  name="address.city"
                  label="City"
                  variant="outlined"
                  size="small"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.address?.city}
                  error={formik.touched.address?.city && Boolean(formik.errors.address?.city)}
                  helperText={formik.touched.address?.city && formik.errors.address?.city}
                  sx={{ width: '100%', my: '15px' }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xxl={3}>
                <CustomInput
                  id="postcode"
                  name="address.postcode"
                  label="Postcode"
                  variant="outlined"
                  size="small"
                  fullWidth
                  type="number"
                  onChange={formik.handleChange}
                  value={formik.values.address?.postcode}
                  error={formik.touched.address?.postcode && Boolean(formik.errors.address?.postcode)}
                  helperText={formik.touched.address?.postcode && formik.errors.address?.postcode}
                  sx={{ width: '100%', my: '15px' }}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={4} xxl={3}>
                <CustomInput
                  id="country"
                  name="address.country"
                  select
                  variant="outlined"
                  label="Country"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address?.country || "Select your country"}
                  SelectProps={{ native: true }}
                  error={formik.touched.address?.country && Boolean(formik.errors.address?.country)}
                  helperText={formik.touched.address?.country && formik.errors.address?.country}
                  fullWidth
                  margin="normal"
                  sx={{ my: '15px' }}
                >
                  <option value="Select your country">Select your country</option>
                  {contries?.map((i, j) => <option key={j} value={i.country_id} label={i.name}  > </option>)}
                </CustomInput>
              </Grid>
              <Grid item xs={12} md={6} lg={4} xxl={3}>
                <CustomInput
                  id="state"
                  name="address.state"
                  select
                  variant="outlined"
                  label="Region/State"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.address?.state || "Select your state"}
                  SelectProps={{ native: true }}
                  error={formik.touched.address?.state && Boolean(formik.errors.address?.state)}
                  helperText={formik.touched.address?.state && formik.errors.address?.state}
                  fullWidth
                  margin="normal"
                  sx={{ my: '15px' }}
                >
                  <option value="Select your state">Select your state</option>
                  {allState?.map((i, j) => <option key={j} value={i.state_id} label={i.name}  > </option>)}
                </CustomInput>
              </Grid>
            </Grid>
          </>}
        {
          valueExportTab === 2 &&
          <>
            <Grid container columnSpacing={2} mt={2}>
              <Grid item xs={12} md={6} lg={4} xxl={3}>
                <CustomInput
                  id="payment_method"
                  name="payment_details.payment_method" // Ensure that the name corresponds to the correct path in formik values
                  select
                  variant="outlined"
                  label="Payment Method"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.payment_details?.payment_method || ""} // Set a default value if necessary
                  SelectProps={{ native: true }}
                  error={formik.touched.payment_details?.payment_method && Boolean(formik.errors.payment_details?.payment_method)}
                  helperText={formik.touched.payment_details?.payment_method && formik.errors.payment_details?.payment_method}
                  fullWidth
                  margin="normal"
                  sx={{ my: '15px' }}
                >
                  <option value="">Select your payment method</option>
                  <option value="Online">Online</option>
                  <option value="Cash on delivery">Cash on delivery</option>
                </CustomInput>
              </Grid>
              <Grid item xs={12} md={6} lg={4} xxl={3}>
                <CustomInput
                  id="payment_transaction_id"
                  name="payment_details.payment_transaction_id" // Ensure that the name corresponds to the correct path in formik values
                  label="Transaction Id"
                  variant="outlined"
                  size="small"
                  type="number"
                  fullWidth
                  onChange={formik.handleChange}
                  value={formik.values.payment_details?.payment_transaction_id || ""} // Set a default value if necessary
                  error={formik.touched.payment_details?.payment_transaction_id && Boolean(formik.errors.payment_details?.payment_transaction_id)}
                  helperText={formik.touched.payment_details?.payment_transaction_id && formik.errors.payment_details?.payment_transaction_id}
                  sx={{ width: '100%', my: '15px' }}
                />
              </Grid>
            </Grid>
          </>}
        {
          valueExportTab === 3 &&
          <>
            <Grid container columnSpacing={2} mt={2}>
              <Grid item xs={12} md={6} lg={5}>
                <Autocomplete
                  multiple
                  id="tags-outlined"
                  options={allCourceName}
                  getOptionLabel={(option) => option.title}
                  defaultValue={[]}
                  filterSelectedOptions
                  onChange={(event, newValue) => {
                    formik.setFieldValue('course_order', newValue);
                  }}
                  renderInput={(params) => (
                    <CustomInput
                      {...params}
                      label="Find Course"
                      error={formik.touched.course_id && Boolean(formik.errors.course_id)}
                      helperText={formik.touched.course_id && formik.errors.course_id}
                      variant="outlined"
                      margin="normal"
                      size="large"
                      fullWidth
                      sx={{ my: '15px' }}
                    />
                  )}
                />
              </Grid>
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
                  onClick={() => navigate(AdminPanelRouteOfEndpoint.CUSTOMER_ADMIN_ROUTE)}
                />
              </Grid>
            </Grid>
          </>
        }
      </form>
    </Box >
  )
}

export default CustomerEdit;
