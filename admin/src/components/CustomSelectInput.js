import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material';

function CustomSelectInput({ label, MenuProps, placeholder, borderColorName, options, value, onChange, onBlur, disabled, errorMessage, requiredLabel, ...rest }) {
  const customTheme = (outerTheme) =>
    createTheme({
      palette: {
        mode: outerTheme.palette.mode
      },
      components: {
        MuiTextField: {
          styleOverrides: {
            root: {
              '--TextField-brandBorderColor': borderColorName || 'var(--darkGray)',
              '--TextField-brandBorderHoverColor': borderColorName || 'var(--darkGray)',
              '--TextField-brandBorderFocusedColor': borderColorName || 'var(--darkGray)',
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
  const outerTheme = useTheme();
  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
      <Autocomplete
        fullWidth
        disablePortal
        id="combo-box-demo"
        options={options}
        value={value}
        onChange={onChange}
        disabled={disabled}
        onBlur={onBlur}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={placeholder}
            focused="true"
            label={
              <>
                {requiredLabel && (
                  <>
                    <span>{label}</span>
                    <span style={{ color: 'var(--red)', fontSize: '20px' }}> *</span>
                  </>
                )}
                {!requiredLabel && label}
              </>
            }
          />
        )}
        {...rest}
      />
      {errorMessage}
    </ThemeProvider>
  );
}

export default CustomSelectInput;
