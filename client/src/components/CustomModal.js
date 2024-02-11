import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Box, Divider, Grid, Modal, Typography } from '@mui/material';

function CustomModal({ children, open, handleClose, width, label, icon = true, isDivider, isGrayBlock }) {
  const modalStyle = {
    main: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      backgroundColor: '#FCFCFC',
      borderRadius: '16px',
      width,
      padding: '24px',
      boxShadow: '0px 32px 48px -8px rgba(0, 0, 0, 0.10), 0px 0px 14px -4px rgba(0, 0, 0, 0.05)',
      maxHeight: '85vh',
      overflowY: 'auto',
      '@media(max-Width: 600px)': {
        width: '80%'
      }
    },
    mainLabel: {
      fontWeight: 600,
      fontSize: { md: '22px', xs: '16px' },
      display: 'flex',
      alignItems: 'center'
    },
    label: {
      width: '16px',
      height: '32px',
      backgroundColor: '#c5c5c5',
      marginRight: '16px',
      borderRadius: '4px',
    },
    divider: {
      marginTop: '24px',
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle.main}>
        <Grid display="flex" justifyContent="space-between" alignItems="center">
          <Typography sx={modalStyle.mainLabel}>
            {isGrayBlock && <Typography sx={modalStyle.label} />}
            {label}
          </Typography>
          {icon && <HighlightOffIcon onClick={handleClose} sx={{ cursor: 'pointer' }} />}
        </Grid>
        {isDivider && <Divider sx={modalStyle.divider} />}
        {children}
      </Box>
    </Modal>
  )
}

export default CustomModal;
