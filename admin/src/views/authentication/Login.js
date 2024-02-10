import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Checkbox, Grid, Typography } from '@mui/material';
import dataTechnoLogo from 'assets/companyLogo.jpeg';
import { CustomButton, CustomInput, CustomLeftPart } from 'components';
import { loginInitialValues } from 'constant/initialValues';
import { AdminPanelRouteOfEndpoint } from 'constant/routesEndPoint';
import { loginValidationSchema } from 'constant/validationSchema';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { errorNotification } from 'helper/notification';
import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLoginAPI } from 'services/api';
import { loginStyle } from 'views/authentication/Login.style';

function Login() {
  const [eyeOpen, setEyeOpen] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const requiredField = loginValidationSchema?._nodes;
  const navigate = useNavigate();
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  // Password show for
  const handleShowPassword = () => {
    setEyeOpen(true);
  };

  // Password hide for
  const handleHidePassword = () => {
    setEyeOpen(false);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log(values, 'values')
    setLoading(true);
    if (values) {
      try {
        const data = await postLoginAPI("api/user/auth", values);
        if (data.status === true) {
          if (rememberMe) {
            Cookies.set('authToken', data.token);
          }
          navigate(AdminPanelRouteOfEndpoint.HOME_ROUTE);
        } else {
          errorNotification(data.message);
          setLoading(false);
        }
      } catch (error) {
        errorNotification('Add a proper user data');
      } finally {
        setSubmitting(false);
      }
    }
  };

  return (
    <Grid container height="100vh">
      <CustomLeftPart title="BILMED" description="GROUP" />
      <Grid item xs={12} md={6}>
        <Box sx={loginStyle.loginMainPage}>
          <Formik
            initialValues={loginInitialValues}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
            validateOnChange="true"
            validateOnBlur="true"
          >
            {({ isValid, isSubmitting, values }) => (
              <Form style={loginStyle.rightSideForm}>
                <Box sx={loginStyle.dataTechLogo}>
                  <img src={dataTechnoLogo} alt={dataTechnoLogo} style={{ height: '150px' }} />
                </Box>
                <Typography sx={loginStyle.loginTitle}>Welcome</Typography>
                <Typography sx={loginStyle.loginDescription}>Please enter your login details below</Typography>
                {/* ----Email Address field---- */}
                <Field
                  as={CustomInput}
                  placeholder="Enter your user name"
                  label="User Name"
                  requiredLabel
                  name="username"
                  borderColorName="var(--darkGray)"
                  type="text"
                  sx={loginStyle.fullWidth}
                />
                <ErrorMessage name="username" component="div" style={loginStyle.errorMessage} />
                {/* ----Password field---- */}
                <Field
                  as={CustomInput}
                  placeholder="Enter your password"
                  label="Password"
                  requiredLabel
                  name="password"
                  borderColorName="var(--darkGray)"
                  type={eyeOpen === false ? 'password' : 'text'}
                  endAdornment={eyeOpen === false ? <VisibilityOff onClick={handleShowPassword} sx={loginStyle.eyeIcon} /> : <Visibility onClick={handleHidePassword} sx={loginStyle.eyeIcon} />}
                  sx={{ ...loginStyle.fullWidth, marginTop: '40px' }}
                />
                <ErrorMessage name="password" component="div" style={loginStyle.errorMessage} />
                {/* ----Forgot Password and Remember me field---- */}
                <Box sx={loginStyle.rememberMeAndForgotPasswordBox}>
                  <Box sx={loginStyle.rememberMeBox} onClick={() => setRememberMe(!rememberMe)}>
                    <Checkbox
                      {...label}
                      checked={rememberMe}
                      sx={loginStyle.checkbox}
                    />
                    <Typography sx={loginStyle.rememberMeText}>Remember me</Typography>
                  </Box>
                </Box>
                {/* ----Submit Button---- */}
                <CustomButton
                  isLoading={loading}
                  variant="contained"
                  height="52px"
                  width="100%"
                  backgroundColor="var(--black)"
                  margin="20px 0 0 0"
                  labelFontSize="18px"
                  labelFontWeight={400}
                  label={!loading ? 'Submit' : undefined}
                  type="submit"
                  disabled={loading || (isSubmitting || Object.keys(values).some((key) => {
                    const value = values[key];
                    return requiredField.includes(key) && (!value || (typeof value === 'string' && value.trim() === ''));
                  }) || !isValid)}
                />
              </Form>
            )}
          </Formik>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;
