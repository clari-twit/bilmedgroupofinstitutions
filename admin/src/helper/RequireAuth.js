import { Outlet } from 'react-router-dom';
import Unauthorized from 'layout/Unauthorized';
import { getCurrentUser } from 'utils/localStorage/getCurrentUser';

function RequireAuth() {
  const token = getCurrentUser().token;

  return token ? (
    <Outlet />
  ) : (
    <Unauthorized />
  )
}

export default RequireAuth;
