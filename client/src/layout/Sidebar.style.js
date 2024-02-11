export const sidebarStyle = {
  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: '20px'
  },
  sidebarMenu: {
    height: 'calc(100vh - 146px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    mt: { md: 0, xs: '30px' }
  },
  sidebarMenuCustom: {
    height: 'calc(100vh - 100px)',
    overflowY: 'auto',
    paddingTop: '20px'
  },
  companyLogo: {
    transform: 'translate(0px, -16px)',
    px: '24px',
    textWrap: 'nowrap',
    overflow: 'hidden',
    marginTop: { md: '0px', xs: '31px' }
  },
  rightSidePartOfScreen: {
    height: '100vh',
    width: '100%'
  },
  contentPartOfScreen: {
    height: 'calc(100vh - 64px)',
    padding: { xs: '12px 12px', md: '20px 24px' },
    backgroundColor: 'var(--neutral)'
  },
  arrowIcon: {
    border: '1px solid var(--white)',
    borderRadius: '50%',
    boxShadow: '1px 1px 7px var(--darkGray)',
    backgroundColor: 'var(--white)'
  },
  leftRightArrow: {
    transform: 'translate(12px, 0px)',
    textAlign: 'end',
    display: { md: 'block', xs: 'none' },
  },
  sidebarOpenCloseMenuButton: {
    color: 'var(--black)',
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer'
  },
  linkText: {
    textWrap: 'nowrap',
    paddingLeft: '16px',
    fontFamily: 'Sora, sans-serif',
  },
  sideNav: {
    height: '100vh',
    backgroundColor: 'var(--white)',
    borderRight: '1px',
    minWidth: '264px'
  },
  sideNavClosed: {
    width: '60px'
  },
  sidebarItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    cursor: 'pointer',
    textDecoration: 'none',
    overflow: 'hidden',
    margin: '0 8px',
    borderRadius: '8px'
  },
  outletMain: {
    background: 'var(--white)',
    width: '100%',
    height: '100%',
    overflow: 'auto'
  }
}
