export const loginStyle = {
  loginMainPage: {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dataTechLogo: {
    textAlign: 'center',
  },
  loginTitle: {
    textAlign: 'center',
    fontSize: { lg: '38px', xs: '24px' },
    fontWeight: 600
  },
  loginDescription: {
    color: 'var(--lightGray)',
    fontWeight: 400,
    textAlign: 'center',
    paddingBottom: '50px',
    fontSize: { lg: '16px', xs: '12px' }
  },
  rightSideForm: {
    width: '100%',
    padding: '24px 5vw'
  },
  fullWidth: {
    width: '100%'
  },
  errorMessage: {
    color: 'var(--red)',
    fontFamily: 'Sora, sans-serif'
  },
  forgotPasswordText: {
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: { xl: '18px', xs: '12px' }
  },
  eyeIcon: {
    cursor: 'pointer',
    color: 'var(--lightGray)'
  },
  checkbox: {
    padding: '0px',
    color: 'var(--veryLightGray)',
    '&.Mui-checked': {
      color: 'var(--darkNeutral)'
    }
  },
  rememberMeAndForgotPasswordBox: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: '20px'
  },
  rememberMeBox: {
    display: 'flex',
    alignItems: 'center'
  },
  rememberMeText: {
    fontWeight: 400,
    color: 'var(--darkGray)',
    fontSize: { xl: '18px', xs: '12px' },
    cursor: 'pointer'
  }
}
