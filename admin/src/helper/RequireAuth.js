import { Outlet } from 'react-router-dom';
import Unauthorized from 'layout/Unauthorized';

function RequireAuth() {
  const token = '123';

  return token ? (
    <Outlet />
  ) : (
    <Unauthorized />
  )
}

export default RequireAuth;
