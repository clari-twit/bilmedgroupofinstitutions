import { Grid, Typography } from '@mui/material';

const leftPartStyle = {
  leftPartMainPage: {
    background: 'var(--gray)',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '5vw',
    display: { md: 'flex', xs: 'none' }
  },
  title: {
    fontWeight: 600,
    fontSize: { xxl: '70px', lg: '48px', xs: '32px' }
  },
  description: {
    color: 'var(--darkGray)',
    fontWeight: 300,
    fontSize: { xxl: '38px', lg: '28px', xs: '20px' }
  }
}

// Authentication common left part
function CustomLeftPart({ title, description }) {
  return (
    <Grid item xs={0} md={6} sx={leftPartStyle.leftPartMainPage}>
      <Typography sx={leftPartStyle.title}>{title}</Typography>
      <Typography sx={leftPartStyle.description}>{description}</Typography>
    </Grid>
  )
}

export default CustomLeftPart;
