import { AccountCircle, LogoutOutlined as LogoutOutlinedIcon, MoreVert as MoreIcon } from '@mui/icons-material';
import { AppBar, Box, Grid, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import { AuthenticationRouteOfEndpoint } from 'constant/routesEndPoint';
import { headerStyle } from 'layout/Header.style';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';

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
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle sx={headerStyle.avtarImg} />
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
      </Box>
    </Box>
  );
}

export default Header;
