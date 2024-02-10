import { AccountCircle, LogoutOutlined as LogoutOutlinedIcon } from '@mui/icons-material';
import { AppBar, Box, Grid, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import { AuthenticationRouteOfEndpoint } from 'constant/routesEndPoint';
import { headerStyle } from 'layout/Header.style';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const isMenuOpen = Boolean(anchorEl);
  const menuId = 'primary-search-account-menu';

  // User menu open for use this function
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Menu close for use this function
  const handleMenuClose = () => {
    setAnchorEl(null);
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

  return (
    <Box sx={headerStyle.headerMain}>
      <Box sx={headerStyle.flexGrowOne}>
        <AppBar position="static" sx={headerStyle.appBar}>
          <Grid display="flex" justifyContent="flex-end" alignItems="center">
            <Toolbar>
              <Box>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  sx={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  <AccountCircle sx={headerStyle.avtarImg} />
                </IconButton>
              </Box>
            </Toolbar>
          </Grid>
        </AppBar>
        {renderMenu}
      </Box>
    </Box>
  );
}

export default Header;
