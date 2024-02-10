export const headerStyle = {

  title: {
    marginLeft: { xs: '11px', sm: '14px', md: '10px', lg: '20px', xl: '30px', xxl: '40px' },
  },
  tileText: {
    fontSize: { xs: '11px', sm: '14px', md: '13px', lg: '16px', xl: '18px', xxl: '20px' },
    fontWeight: 400
  },
  tileTextSecond: {
    fontSize: { xs: '11px', sm: '14px', md: '13px', lg: '16px', xl: '18px', xxl: '20px' },
    margin: { md: '0px 4px', xxl: '0px 6px' },
    fontWeight: 400
  },
  userFullName: {
    fontSize: { xs: '11px', sm: '14px', md: '13px', lg: '16px', xl: '18px', xxl: '20px' },
    fontWeight: 600
  },
  userRole: {
    fontSize: { xs: '11px', sm: '14px', md: '13px', lg: '16px', xl: '18px', xxl: '20px' },
    fontWeight: 600
  },
  headerMain: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%'
  },
  appBar: {
    backgroundColor: 'var(--white)',
    color: 'var(--black)',
    height: { md: '90px', xs: '64px' },
    justifyContent: 'center'
  },
  bellIcon: {
    fontSize: '18px',
    backgroundColor: 'var(--white)',
    padding: '5px 10px',
    borderRadius: '8px'
  },
  smallScreenHeader: {
    display: { xs: 'none', xl: 'flex', gap: '5px' },
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  showMoreIcon: {
    display: { xs: 'flex', xl: 'none' }
  },
  userMenuListFullScreen: {
    fontFamily: 'Sora, sans-serif'
  },
  flexGrowOne: {
    flexGrow: 1
  },
  seeMoreButton: {
    display: 'flex',
    justifyContent: 'flex-end',
    margin: '4px 14px'
  },
  checkBoxButton: {
    color: '#CBCBCB',
    borderRadius: '8px',
    '&.Mui-checked': {
      color: 'black',
    },
  },
  smallAvtarImg: {
    fontSize: '24px'
  },
  avtarImg: {
    fontSize: '30px'
  },
  smallProfileImg: {
    height: '25px'
  },
  profileImg: {
    height: '34px',
    width: '34px',
    borderRadius: '50%',
    objectFit: 'fill'
  },
  companyLogo: {
    height: '40px',
    display: 'flex',
    alignItems: 'end'
  },
  smallNotificationIcon: {
    fontSize: '20px'
  },
  notificatioIcon: {
    fontSize: '26px'
  }
}
