import { Box, CircularProgress } from '@mui/material';

const loadingStyle = {
  mainPage: {
    height: 'auto',
    width: '100%'
  },
  loadingBox: {
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center'
  },
  circleBox: {
    height: '26px',
    width: '26px',
    color: 'var(--black)'
  },
  loading: {
    color: 'var(--black)'
  }
}

function CustomLoading({ inline, isSmallLoading }) {
  return (
    <Box sx={{ ...loadingStyle.mainPage, marginTop: !inline ? '20vh' : '0px' }}>
      <Box sx={loadingStyle.loadingBox}>
        {isSmallLoading ? <CircularProgress style={loadingStyle.circleBox} /> :
          <CircularProgress style={loadingStyle.loading} />}
      </Box>
    </Box>
  )
}

export default CustomLoading;
