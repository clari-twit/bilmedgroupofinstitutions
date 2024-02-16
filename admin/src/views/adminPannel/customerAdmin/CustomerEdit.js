import { Autocomplete, Box, Grid, Tab, Tabs, Typography } from '@mui/material';
import axios from 'axios';
import { CustomButton, CustomInput } from 'components';
import { ConvertCustomerData, addCustomerDetailsInitialValues, convertCustomerData, convertDateFormat } from 'constant/initialValues';
import { AdminPanelRouteOfEndpoint, AuthenticationRouteOfEndpoint } from 'constant/routesEndPoint';
import { addCustomerDetailsValidationSchemanew } from 'constant/validationSchema';
import { useFormik } from 'formik';
import { errorNotification, successNotification } from 'helper/notification';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCurrentUser } from 'utils/localStorage/getCurrentUser';
import { UserAddProfileDetailsStyle } from '../cource/UserAddProfileDetails.style';

function CustomerEdit() {
  const [valueExportTab, setValueExportTab] = useState(0);
  const [loading, setLoading] = useState(false);
  const [allCourceName, setAllCourceName] = useState([]);
  const [contries, setContries] = useState();
  const [allState, setAllState] = useState();
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState("13/10/23");
  const [costomersData, setCostomersData] = useState();
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const { editDataId } = useParams();
  const token = getCurrentUser()?.token;
  console.log(costomersData);

  const enabledAllCourses = allCourceName?.filter(course => course?.status === 'Enable');
  const uniqueCourses = costomersData?.course_order?.filter((course, index) => {
    return costomersData?.course_order?.findIndex(obj => obj.id === course.id) === index;
  });
  console.log(enabledAllCourses)
  const sumOfPrices = uniqueCourses?.reduce((total, course) => total + course?.price, 0);

  const handleSave = () => {
    // onSave(editedValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedValue(editedValue);
    setIsEditing(false);
    // onCancel();
  };

  const handleExportModalTabChange = (event, newValue) => {
    setValueExportTab(newValue);
  };

  const getByIdCourceData = async () => {
    if (!token) {
      navigate(AuthenticationRouteOfEndpoint?.UNAUTHORIZE_ROUTE);
      return;
    }
    try {
      const data = await axios.get(BASE_URL + `api/customer/details?customer_id=${editDataId}`, {
        headers: {
          'x-access-token': token,
        },
        withCredentials: true,
      });
      //  console.log(data)
      if (data?.data) {
        // setDefultFile(data.data.course.course.course_image)
        setCostomersData(convertCustomerData(data.data.customer[0]));
      }
    } catch (err) {
      console.log(err)
    }
  };

  useEffect(() => {
    getByIdCourceData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formik = useFormik({
    initialValues: addCustomerDetailsInitialValues,
    validationSchema: addCustomerDetailsValidationSchemanew,
    onSubmit: async (values) => {
     
      console.log(values,"sgdhffhg")
      const fillData = ConvertCustomerData(values)
      delete fillData.create_at
      delete fillData.token
      delete fillData.update_at
      fillData["customer_id"] = editDataId
      fillData["customer_address_id"] = editDataId
      delete fillData.create_at
      values.course_order.forEach(order => {
        order.course_id = order.course_id;
        delete order.title;
        delete order.id;
      });
      
      const convertedData = values;
      convertedData.address.state = parseInt(convertedData.address.state);
      convertedData.address.country = parseInt(convertedData.address.country);
      convertedData.general.status = parseInt(convertedData.general.status);
      // convertedData.course_order = convertedData.course_order.filter(item => item.id !== item.course_id);
      console.log("sgdhffhg", convertedData)
      console.log(fillData)
      if (!token) {
        navigate(AuthenticationRouteOfEndpoint?.UNAUTHORIZE_ROUTE);
        return;
      }
      try {
        setLoading(true);
        const response = await axios.put(BASE_URL + 'api/customer/update', JSON.stringify(fillData), {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
          },
        });
        console.log(response)
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

  useEffect(() => {
    formik.setValues(costomersData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [costomersData]);
  // console.log(formik.values)

  function convertToNewFormat(originalArray) {
    let newArray = [];
    originalArray.forEach(obj => {
      let newName = obj.course_name;
      let newId = obj.course_id;
      let newStatus = obj.course_status;
      let newPrice = obj.course_price;
      let newCreatedDate = obj?.created_date;
      let newPExpiryDate = obj?.expiry_date;
      let newObj = { title: newName, id: newId, status: newStatus, price: newPrice, createDate: newCreatedDate, expiryDate: newPExpiryDate };
      newArray.push(newObj);
    });
    return newArray;
  }

  const getAllReworkData = async () => {
    if (!token) {
      navigate(AuthenticationRouteOfEndpoint?.UNAUTHORIZE_ROUTE);
      return;
    }
    setLoading(true);
    try {
      const data = await axios.get(BASE_URL + 'api/course', {
        headers: {
          'x-access-token': token,
        },
        withCredentials: true,
      });
      console.log("ffffffffff", data)
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
        getAllReworkData()
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData(formik.values?.address?.country);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values?.address?.country]);
  // console.log(formik.errors)

  const removeCourseOrder = (idToRemove) => {
    const updatedCourseOrder = costomersData.course_order.filter(course => course.id !== idToRemove);
    setCostomersData({
      ...costomersData,
      course_order: updatedCourseOrder
    });
  }

  const handleDateUpdate = (e, j) => {

    const date = new Date(e);

    // Convert the date to UTC string
    var utcDateString = date.toUTCString();
    console.log(utcDateString, j)
    const updatedOrder = {
      ...costomersData,
      course_order: costomersData.course_order.map(course => {
        if (course.id === j) {
          return {
            ...course,
            customer_order_courses_expired_date: utcDateString
          };
        }
        return course;
      })
    };
    setCostomersData(updatedOrder);
    setIsEditing(false)
  }


console.log(formik.errors)
  return (
    <Box p={2}>
      <form autoComplete="off" onSubmit={formik.handleSubmit}>
        <Typography variant="h4" paddingLeft={1}>Customer Edit</Typography>
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
                  value={formik.values?.general.name} // Corrected access to nested field
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
                  value={formik.values?.general.email} // Corrected access to nested field
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
                  value={formik.values?.general.password} // Corrected access to nested field
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
                  value={formik.values?.general.telephone} // Corrected access to nested field
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
                  value={formik.values?.general.status || 1} // Using general.status as the value
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
              {/* <Grid item xs={12} md={6} lg={4} xxl={3}>
                <CustomInput
                  id="device_info"
                  name="general.device_info"
                  select
                  variant="outlined"
                  label="Device Info"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values?.general.device_info || "device_info"} // Using general.device_info as the value
                  SelectProps={{ native: true }}
                  error={formik.touched.general?.device_info && Boolean(formik.errors.general?.device_info)}
                  helperText={formik.touched.general?.device_info && formik.errors.general?.device_info}
                  fullWidth
                  margin="normal"
                  sx={{ my: '15px' }}
                >
                  <option value="device_info">Device Info</option>
                  <option value="">Unset</option>
                </CustomInput>
              </Grid> */}
              <Grid item xs={12} textAlign="end">
                <CustomButton
                  variant="contained"
                  height="30px"
                  width="104.17px"
                  margin="10px 0 0 10px"
                  border="1px solid var(--black)"
                  labelFontWeight={400}
                  label="Next"
                  onClick={() => setValueExportTab(1)}
                />
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
                  value={formik.values?.address.first_name} // Corrected access to nested field
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
                  value={formik.values?.address.last_name}
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
                  value={formik.values?.address?.company}
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
                  value={formik.values?.address?.company_id}
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
                  value={formik.values?.address?.tax_id}
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
                  value={formik.values?.address?.address_1}
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
                  value={formik.values?.address?.address_2}
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
                  value={formik.values?.address?.city}
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
                  value={formik.values?.address?.postcode}
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
                  value={formik.values?.address?.country || "Select your country"}
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
                  value={formik.values?.address?.state || "Select your state"}
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
              <Grid item xs={12} display="flex" justifyContent="space-between">
                <CustomButton
                  variant="contained"
                  height="30px"
                  width="104.17px"
                  margin="10px 0 0 10px"
                  border="1px solid var(--black)"
                  labelFontWeight={400}
                  label="Previous"
                  onClick={() => setValueExportTab(0)}
                />
                <CustomButton
                  variant="contained"
                  height="30px"
                  width="104.17px"
                  margin="10px 0 0 10px"
                  border="1px solid var(--black)"
                  labelFontWeight={400}
                  label="Next"
                  onClick={() => setValueExportTab(2)}
                />
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
                  name="payment_details.payment_method" // Ensure that the name corresponds to the correct path in formik values?
                  select
                  variant="outlined"
                  label="Payment Method"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values?.payment_details?.payment_method || ""} // Set a default value if necessary
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
                  value={formik.values?.payment_details?.payment_transaction_id || ""} // Set a default value if necessary
                  error={formik.touched.payment_details?.payment_transaction_id && Boolean(formik.errors.payment_details?.payment_transaction_id)}
                  helperText={formik.touched.payment_details?.payment_transaction_id && formik.errors.payment_details?.payment_transaction_id}
                  sx={{ width: '100%', my: '15px' }}
                />
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="space-between">
                <CustomButton
                  variant="contained"
                  height="30px"
                  width="104.17px"
                  margin="10px 0 0 10px"
                  border="1px solid var(--black)"
                  labelFontWeight={400}
                  label="Previous"
                  onClick={() => setValueExportTab(1)}
                />
                <CustomButton
                  variant="contained"
                  height="30px"
                  width="104.17px"
                  margin="10px 0 0 10px"
                  border="1px solid var(--black)"
                  labelFontWeight={400}
                  label="Next"
                  onClick={() => setValueExportTab(3)}
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
                  options={enabledAllCourses}
                  getOptionLabel={(option) => option.title}
                  defaultValue={[]}
                  onChange={(event, newValue) => {
                    setSelectedCourses(newValue);
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
              <Grid item xs={12}>
                <table>
                  <thead>
                    <tr>
                      <th style={{ minWidth: '200px' }}>Cource Name</th>
                      <th style={{ minWidth: '80px' }}>Created Date</th>
                      <th style={{ minWidth: '80px' }}>Expiry Date</th>
                      <th style={{ minWidth: '80px' }}>Price</th>
                      <th style={{ minWidth: '80px' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uniqueCourses?.length === 0 && (
                      <tr>
                        <td colSpan="4" style={{ paddingTop: '30px', paddingBottom: '30px' }}>No Data Found</td>
                      </tr>
                    )}
                    {console.log(costomersData)}
                    {costomersData?.course_order?.length > 0 && costomersData?.course_order.map(course => (
                      <tr key={course.id}>
                        <td style={{ minWidth: '200px', paddingTop: '10px', paddingBottom: '10px' }}>{course?.title}</td>
                        <td style={{ minWidth: '140px', paddingTop: '10px', paddingBottom: '10px' }}>{convertDateFormat(course?.create_at)}</td>
                        <td style={{ minWidth: '140px', paddingTop: '10px', paddingBottom: '10px' }}>
                          {isEditing ? (
                            <>
                              <input
                                type="date"
                                value={editedValue}
                                onChange={(e) => handleDateUpdate(e.target.value, course.id)}
                                style={{ borderRadius: '0' }}
                              />
                              <button onClick={handleSave}>Save</button>
                              <button onClick={handleCancel}>Cancel</button>
                            </>
                          ) : (
                            <div onClick={() => setIsEditing(true)}>{convertDateFormat(course?.customer_order_courses_expired_date)}</div>
                          )}
                        </td>
                        <td style={{ minWidth: '80px', paddingTop: '10px', paddingBottom: '10px' }}>{course.price}</td>
                        <td>
                          <CustomButton
                            variant="contained"
                            // height="30px"
                            // width="104.17px"
                            margin="0 10px"
                            border="1px solid var(--black)"
                            labelFontWeight={400}
                            label="Edit"
                            onClick={() => setIsEditing(true)}
                          />
                          <CustomButton
                            variant="contained"
                            // height="30px"
                            // width="104.17px"
                            // margin="10px 0 0 10px"
                            border="1px solid var(--black)"
                            labelFontWeight={400}
                            label="remove"
                            onClick={() => removeCourseOrder(course.id)}
                          />
                        </td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan="3" style={{ paddingTop: '10px', paddingBottom: '10px' }}>Total Price:-</td>
                      <td style={{ paddingTop: '10px', paddingBottom: '10px' }}>{sumOfPrices}</td>
                    </tr>
                  </tbody>
                </table>
              </Grid>
              <Grid item xs={12} display="flex" justifyContent="space-between">
                <Box>
                  <CustomButton
                    variant="contained"
                    height="30px"
                    width="104.17px"
                    margin="10px 0 0 10px"
                    border="1px solid var(--black)"
                    labelFontWeight={400}
                    label="Previous"
                    onClick={() => setValueExportTab(2)}
                  />
                </Box>
                <Box>
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
                </Box>
              </Grid>
            </Grid>
          </>
        }
      </form>
    </Box >
  )
}

export default CustomerEdit;