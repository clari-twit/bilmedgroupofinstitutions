import Home from "views/adminPannel/home/Home";
import { AdminPanelRouteOfEndpoint } from "./routesEndPoint";
import CustomerAdmin from "views/adminPannel/customerAdmin/CustomerAdmin";
import Cource from "views/adminPannel/cource/Cource";

export const protectedRoute = [
  {
    to: AdminPanelRouteOfEndpoint.HOME_ROUTE,
    Component: Home,
  },
  {
    to: AdminPanelRouteOfEndpoint.CUSTOMER_ADMIN_ROUTE,
    Component: CustomerAdmin,
  },
  {
    to: AdminPanelRouteOfEndpoint.COURCE_ROUTE,
    Component: Cource,
  },
]
