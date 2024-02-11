import * as React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function CustomTabPanel(props) {
  const { children, value, index, tabPadding, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: tabPadding }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  )
}

export default CustomTabPanel;
