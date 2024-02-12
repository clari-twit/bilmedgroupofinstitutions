import Home from "views/adminPannel/home/Home";
import { AdminPanelRouteOfEndpoint } from "./routesEndPoint";
import CustomerAdmin from "views/adminPannel/customerAdmin/CustomerAdmin";
import Cource from "views/adminPannel/cource/Cource";
import CourceAdd from "views/adminPannel/cource/CourceAdd";
import CourceEdit from "views/adminPannel/cource/CourceEdit";

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
  {
    to: AdminPanelRouteOfEndpoint.COURCE_ADD_ROUTE,
    Component: CourceAdd,
  },
  {
    to: `${AdminPanelRouteOfEndpoint.COURCE_EDIT_ROUTE}/:editDataId`,
    Component: CourceEdit,
  },
]
