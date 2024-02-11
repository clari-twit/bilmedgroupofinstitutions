import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import { AuthenticationRouteOfEndpoint } from 'constant/routesEndPoint';
import { unauthorizedStyle } from 'layout/Unauthorized.style';
import { CustomButton } from 'components';

function Unauthorized() {
  const navigate = useNavigate();

  const handleUnauthorized = () => {
    navigate(AuthenticationRouteOfEndpoint.LOGIN_ROUTE);
  }

  return (
    <Grid sx={unauthorizedStyle.main}>
      <Grid item sx={unauthorizedStyle.UnauthorizedText}>Unauthorized</Grid>
      <Grid item sx={unauthorizedStyle.UnauthorizedDescription}>
        You do not have access to the requested page.
      </Grid>
      <CustomButton
        variant="contained"
        label="Go to Login"
        margin="20px 0 0 0"
        labelFontSize="18px"
        onClick={handleUnauthorized}
        labelFontWeight={400}
      />
    </Grid>
  )
}

export default Unauthorized;
