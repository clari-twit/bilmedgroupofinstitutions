import { AuthenticationRouteOfEndpoint } from 'constant/routesEndPoint';
import { Login } from 'views/authentication';

export const publicRoute = [
  {
    to: AuthenticationRouteOfEndpoint.LOGIN_ROUTE,
    Component: Login,
  }
];
