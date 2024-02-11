import { createTheme } from '@mui/material/styles';

const CustomThemeBreakpoint = createTheme({
  breakpoints: {
    values: {
      // For screens size more than 0px
      xs: 0,
      // For screens size more than 400px
      sm: 400,
      // For screens size more than 600px
      md: 600,
      // For screens size more than 800px
      lg: 800,
      // For screens size more than 1000px
      xl: 1000,
      // For screens size more than 1200px
      xxl: 1200,
      // For screens size more than 1400px
      xxxl: 1400,
      // For screens size more than 1600px
      defaultScreen: 1600,
    },
  },
  typography: {
    fontFamily: 'Sora, sans-serif'
  }
});

export default CustomThemeBreakpoint;

// This code is for use of breakpoint
// const useStyles = makeStyles((theme) => ({
//   coloredText: {
//     // For screens size more than 0px
//     [theme.breakpoints.up('xs')]: {
//       color: 'red'
//     },
//     // For screens size more than 400px
//     [theme.breakpoints.up('sm')]: {
//       color: 'green'
//     },
//     // For screens size more than 600px
//     [theme.breakpoints.up('md')]: {
//       color: 'orange'
//     },
//     // For screens size more than 800px
//     [theme.breakpoints.up('lg')]: {
//       color: 'red'
//     },
//     // For screens size more than 1000px
//     [theme.breakpoints.up('xl')]: {
//       color: 'purple'
//     },
//     // For screens size more than 1200px
//     [theme.breakpoints.up('xxl')]: {
//       color: 'brown'
//     },
//     // For screens size more than 1400px
//     [theme.breakpoints.up('xxxl')]: {
//       color: 'pink'
//     },
//     // For screens size more than 1600px
//     [theme.breakpoints.up('defaultScreen')]: {
//       color: 'black'
//     }
//   }
// }));
