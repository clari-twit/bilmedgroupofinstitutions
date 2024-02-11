import { Grid } from '@mui/material';
import { NotFoundPageStyle } from 'layout/NotFoundPage.style';

function NotFoundPage() {
  return (
    <Grid sx={NotFoundPageStyle.mainPage}>
      <Grid item sx={NotFoundPageStyle.oopsText}>Oops!</Grid>
      <Grid item sx={NotFoundPageStyle.notFoundText}>404-PAGE NOT FOUND</Grid>
    </Grid>
  )
}

export default NotFoundPage;
