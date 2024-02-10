import { KeyboardArrowLeft as KeyboardArrowLeftIcon, KeyboardArrowRight as KeyboardArrowRightIcon } from '@mui/icons-material';
import { Box, CssBaseline } from '@mui/material';
import dataTechnoLogo from 'assets/companyLogo.jpeg';
import { adminRole } from 'constant/sidebarNavLink';
import Header from 'layout/Header';
import { sidebarStyle } from 'layout/Sidebar.style';
import Unauthorized from 'layout/Unauthorized';
import { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { getCurrentUser } from 'utils/localStorage/getCurrentUser';

function Sidebar() {
  const [open, setOpen] = useState(window.innerWidth > 600);
  const location = useLocation()?.pathname;
  const userToken = getCurrentUser()?.token;
  console.log(setOpen);

  return (
    <Box>
      {!userToken ? <Unauthorized /> :
        <Box display="flex">
          <CssBaseline />
          <Box component="nav" style={open ? sidebarStyle.sideNav : sidebarStyle.sideNavClosed}>
            <Box sx={sidebarStyle.logo}>
              <img src={dataTechnoLogo} alt={dataTechnoLogo} />
            </Box>
            <Box sx={sidebarStyle.leftRightArrow}>
              <Box component="span" sx={sidebarStyle.sidebarOpenCloseMenuButton}>
                {open ? <KeyboardArrowLeftIcon sx={sidebarStyle.arrowIcon} /> : <KeyboardArrowRightIcon sx={sidebarStyle.arrowIcon} />}
              </Box>
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
            </Box>
          </Box>
          <Box sx={sidebarStyle.rightSidePartOfScreen}>
            <Header />
            <Box sx={{ ...sidebarStyle.contentPartOfScreen, width: open ? 'calc(100vw - 264px)' : 'calc(100vw - 61px)' }}>
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
