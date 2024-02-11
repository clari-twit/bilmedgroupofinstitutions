import Sidebar from 'layout/Sidebar';
import { Outlet } from 'react-router-dom';
import { getCurrentUser } from 'utils/localStorage/getCurrentUser';

function Layout() {
  const userToken = getCurrentUser()?.token;
  return userToken ? <Sidebar /> : <Outlet />;
}

export default Layout;
