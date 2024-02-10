import { AccountCircle, LogoutOutlined as LogoutOutlinedIcon, MoreVert as MoreIcon, NotificationsNoneOutlined as NotificationsNoneOutlinedIcon } from '@mui/icons-material';
import { AppBar, Badge, Box, Grid, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import companyLogo from 'assets/companyLogo.jpeg';
import { AuthenticationRouteOfEndpoint } from 'constant/routesEndPoint';
import { getLocalStorageItem } from 'helper/localStorage';
import { headerStyle } from 'layout/Header.style';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'utils/localStorage/getCurrentUser';

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [anchorNotificationEl, setAnchorNotificationEl] = useState(null);
  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const getLoginRoleName = getCurrentUser()?.roles[0];
  const isNotificationOpen = Boolean(anchorNotificationEl);
  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const getUserRole = getLocalStorageItem('current_user');
  const userRole = JSON.parse(getUserRole);
  const notificationCount = useSelector((state => state?.notificationCountNumber?.notificationCount));

  // User menu open for use this function
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Mobile screen menu close for use this function
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  // Menu close for use this function
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  // Mobile screen menu open for use this function
  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // Notification model open
  const handleNotificationOpen = (event) => {
    setAnchorNotificationEl(event.currentTarget);
  };

  // Notification model close
  const handleNotificationclose = () => {
    setAnchorNotificationEl(null);
  };

  // Log out for use this function
  const handleLogOut = () => {
    localStorage.clear();
    navigate(AuthenticationRouteOfEndpoint.LOGIN_ROUTE);
  }

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => { handleMenuClose(); handleLogOut(); }} sx={headerStyle.userMenuListFullScreen}><LogoutOutlinedIcon /> Logout</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
    </Menu>
  );

  const notificationRenderMenu = (
    <Menu
      anchorEl={anchorNotificationEl}
      open={isNotificationOpen}
      onClose={handleNotificationclose}
      PaperProps={{
        elevation: 0,
        sx: {
          overflow: 'auto',
          maxHeight: '400px',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >
    </Menu>
  );

  return (
    <Box sx={headerStyle.headerMain}>
      <Box sx={headerStyle.flexGrowOne}>
        <AppBar position="static" sx={headerStyle.appBar}>
          <Grid display="flex" justifyContent="space-between" alignItems="center">
            <Toolbar>
              <Box sx={headerStyle.flexGrowOne} />
              <Box sx={headerStyle.smallScreenHeader}>
                <IconButton
                  size="large"
                  aria-label="show new notifications"
                  color="inherit"
                  onClick={handleNotificationOpen}
                >
                  <Badge badgeContent={notificationCount[0]?.pageInformation || null} color="error">
                    <NotificationsNoneOutlinedIcon sx={headerStyle.notificatioIcon} />
                  </Badge>
                </IconButton>
                {getLoginRoleName !== 'super admin' &&
                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    color="inherit"
                  >
                    {getCurrentUser()?.company_logo ? <img src={getCurrentUser()?.company_logo} alt="logo" style={headerStyle.profileImg} /> : <img src={companyLogo} alt="logo" style={headerStyle.profileImg} />}
                  </IconButton>}
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  {userRole?.profile_image === null ? <AccountCircle sx={headerStyle.avtarImg} /> : <img src={userRole?.profile_image} alt="logo" style={headerStyle.profileImg} />}
                </IconButton>
              </Box>
              <Box sx={headerStyle.showMoreIcon}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </Grid>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
        {notificationRenderMenu}
      </Box>
    </Box>
  );
}

export default Header;
