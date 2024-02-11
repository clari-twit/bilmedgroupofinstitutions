export const NotFoundPageStyle = {
  mainPage: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: 'var(--white)'
  },
  oopsText: {
    fontWeight: '900',
    background: 'linear-gradient(to Right, #FFC3A1, #F0997D,#D3756B, #A75D5D)',
    webkitTextFillColor: 'transparent',
    webkitBackgroundClip: 'text',
    fontSize: { md: '150px', xs: '80px' }
  },
  notFoundText: {
    fontWeight: 900,
    textAlign: 'center',
    fontSize: { md: '30px', xs: '20px' }
  }
}
