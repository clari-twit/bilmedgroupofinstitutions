import { Box, Button } from '@mui/material';
import CustomLoading from 'components/CustomLoading';

function CustomButton({ variant = 'outlined', disabled, size = 'medium', style, marginRight, backgroundColor = 'var(--white)', border, minWidth, borderRadius, label, height, width, margin, onClick, onChange, onFocus, startIcon, endIcon, labelColor, labelFontSize, labelFontWeight, padding, fontWeight, type = 'button', accept, component, textTransform, isLoading, ...rest }) {
  // Custom style for the button
  const customStyles = {
    border: border || '0',
    borderRadius: borderRadius || '8px',
    padding: padding || 'auto',
    backgroundColor: disabled ? 'var(--gray)' : backgroundColor,
    width: width || 'auto',
    height: height || 'auto',
    margin,
    minWidth,
    marginRight,
    ...style
  };

  let labelTextColor;
  if (backgroundColor === 'var(--black)') {
    labelTextColor = 'var(--white)';
  } else if (backgroundColor === 'var(--white)') {
    labelTextColor = 'var(--black)';
  } else {
    labelTextColor = labelColor;
  }

  // Custom style for button's label
  const customLabelStyles = {
    fontSize: labelFontSize || '14px',
    fontWeight,
    color: labelTextColor,
    textTransform: textTransform || 'none',
  };

  return (
    <Button
      variant={variant}
      size={size}
      style={customStyles}
      onClick={onClick}
      onChange={onChange}
      onFocus={onFocus}
      component={component}
      type={type}
      accept={accept}
      startIcon={startIcon}
      disabled={disabled}
      endIcon={endIcon}
      disableRipple
      {...rest}
    >
      {label && <Box component="span" style={customLabelStyles}>{label}</Box>}
      {isLoading && <CustomLoading inline isSmallLoading />}
    </Button>
  );
}

export default CustomButton;
