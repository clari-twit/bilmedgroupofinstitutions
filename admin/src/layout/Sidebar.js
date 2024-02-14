import { LogoutOutlined as LogoutOutlinedIcon } from '@mui/icons-material';
import { Box, CssBaseline } from '@mui/material';
import dataTechnoLogo from 'assets/companyLogo.jpeg';
import { AuthenticationRouteOfEndpoint } from 'constant/routesEndPoint';
import { adminRole } from 'constant/sidebarNavLink';
import { sidebarStyle } from 'layout/Sidebar.style';
import Unauthorized from 'layout/Unauthorized';
import { useState } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { getCurrentUser } from 'utils/localStorage/getCurrentUser';

function Sidebar() {
  // eslint-disable-next-line
  const [open, setOpen] = useState(window.innerWidth > 600);
  const location = useLocation()?.pathname;
  const userToken = getCurrentUser()?.token;
  const navigate = useNavigate();

  // Log out for use this function
  const handleLogOut = () => {
    localStorage.clear();
    navigate(AuthenticationRouteOfEndpoint?.LOGIN_ROUTE);
  }

  return (
    <Box>
      {!userToken ? <Unauthorized /> :
        <Box display="flex">
          <CssBaseline />
          <Box component="nav" style={open ? sidebarStyle.sideNav : sidebarStyle.sideNavClosed}>
            <Box sx={sidebarStyle.logo}>
              <img src={dataTechnoLogo} alt={dataTechnoLogo} style={{ height: '50px', width: '50px' }} />
            </Box>
            <Box sx={sidebarStyle.sidebarMenu}>
              <Box sx={sidebarStyle.sidebarMenuCustom}>
                {adminRole && adminRole.map(item => {
                  return (
                    <NavLink key={item.id} to={item.sidebarMenuRoute} style={{ ...sidebarStyle.sidebarItem, backgroundColor: item.sidebarMenuRoute === location || location?.split('/').includes(item.sidebarMenuRoute?.split('/')[1]) ? 'var(--lightNeutral)' : 'var(--white)', color: item.sidebarMenuRoute === location ? 'var(--black)' : 'var(--darkNeutral)' }} className="sidebarNavMenu">
                      {item.sidebarMenuIcon}
                      <Box component="span" sx={{ ...sidebarStyle.linkText, color: item.sidebarMenuRoute === location || location?.split('/').includes(item.sidebarMenuRoute?.split('/')[1]) ? 'var(--black)' : 'var(--darkNeutral)' }}>
                        {item.sidebarMenuLabel}
                      </Box>
                    </NavLink>
                  );
                })}
              </Box>
              <Box component="span" display="flex" justifyContent="center" onClick={() => handleLogOut()} style={{ transform: 'translate(0px, 40px)', cursor: 'pointer' }}><LogoutOutlinedIcon />&nbsp;&nbsp;Logout</Box>
            </Box>
          </Box>
          <Box sx={sidebarStyle.rightSidePartOfScreen}>
            <Box sx={{ ...sidebarStyle.contentPartOfScreen, width: open ? 'calc(100vw - 200px)' : 'calc(100vw - 61px)' }}>
              <Box sx={sidebarStyle.outletMain}>
                {userToken ? <Outlet /> : <Unauthorized />}
              </Box>
            </Box>
          </Box>
        </Box>}
    </Box>
  )
}

export default Sidebar;
