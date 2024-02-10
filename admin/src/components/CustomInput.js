import { Box, InputAdornment, TextField, outlinedInputClasses } from '@mui/material';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';

function CustomInput({ label, size, borderColorName, backgroundColor, placeholder, value, onClick, onChange, onFocus, startAdornment, endAdornment, requiredLabel, ...rest }) {
  const customTheme = (outerTheme) =>
    createTheme({
      palette: {
        mode: outerTheme.palette.mode
      },
      components: {
        MuiTextField: {
          styleOverrides: {
            root: {
              '--TextField-brandBorderColor': borderColorName || 'var(--black)',
              '--TextField-brandBorderHoverColor': borderColorName || 'var(--black)',
              '--TextField-brandBorderFocusedColor': borderColorName || 'var(--black)',
              '& label.Mui-focused': {
                color: 'var(--TextField-brandBorderFocusedColor)',
                fontSize: '16px',
                fontWeight: 400
              }
            }
          }
        },
        MuiOutlinedInput: {
          styleOverrides: {
            notchedOutline: {
              borderColor: 'var(--TextField-brandBorderColor)'
            },
            root: {
              [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: 'var(--TextField-brandBorderHoverColor)'
              },
              [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
                borderColor: 'var(--TextField-brandBorderFocusedColor)'
              }
            }
          }
        },
        MuiFilledInput: {
          styleOverrides: {
            root: {
              '&:before, &:after': {
                borderBottom: '2px solid var(--TextField-brandBorderColor)'
              },
              '&:hover:not(.Mui-disabled, .Mui-error):before': {
                borderBottom: '2px solid var(--TextField-brandBorderHoverColor)'
              },
              '&.Mui-focused:after': {
                borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)'
              }
            }
          }
        },
        MuiInput: {
          styleOverrides: {
            root: {
              '&:before': {
                borderBottom: '2px solid var(--TextField-brandBorderColor)'
              },
              '&:hover:not(.Mui-disabled, .Mui-error):before': {
                borderBottom: '2px solid var(--TextField-brandBorderHoverColor)'
              },
              '&.Mui-focused:after': {
                borderBottom: '2px solid var(--TextField-brandBorderFocusedColor)'
              }
            }
          }
        }
      }
    });

  // Custom style for the input
  const customStyles = {
    backgroundColor: backgroundColor || 'var(--white)',
  };

  const outerTheme = useTheme();

  return (
    <Box
      sx={{
        display: 'grid',
        gap: 2
      }}
    >
      <ThemeProvider theme={customTheme(outerTheme)}>
        <TextField
          label={<>{requiredLabel && (<><span>{label}</span><span style={{ color: 'var(--red)', fontSize: '20px' }}> *</span></>)}{!requiredLabel && label}</>}
          focused
          size={size}
          placeholder={placeholder}
          value={value}
          onClick={onClick}
          onChange={onChange}
          onFocus={(e) => e.target.setAttribute('value', '')}
          onBlur={(e) => e.target.setAttribute('value', '')}
          autoComplete="off"
          InputProps={{
            autoComplete: 'new-password',
            style: customStyles,
            // If you want to add an icon at the beginning inside the input
            startAdornment: startAdornment && (
              <InputAdornment position="start">{startAdornment}</InputAdornment>
            ),
            // If you want to add an icon at the end inside the input
            endAdornment: endAdornment && (
              <InputAdornment position="end">{endAdornment}</InputAdornment>
            ),
          }}
          {...rest}
        />

      </ThemeProvider>
    </Box>
  );
}

export default CustomInput;
