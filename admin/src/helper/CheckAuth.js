import { AdminPanelRouteOfEndpoint, AuthenticationRouteOfEndpoint } from 'constant/routesEndPoint';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getCurrentUser } from 'utils/localStorage/getCurrentUser';

export default function CheckAuth() {
  const isLoggedIn = getCurrentUser()?.token;
  const location = useLocation()?.pathname;
  return !isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to={location === AuthenticationRouteOfEndpoint.USER_ADD_PROFILE_DETAILS_FIRST_TIME ? AuthenticationRouteOfEndpoint.LOGIN_ROUTE : AdminPanelRouteOfEndpoint.HOME_ROUTE} replace />
  )
}
