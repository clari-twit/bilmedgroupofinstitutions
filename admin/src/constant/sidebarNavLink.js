import { GridView as GridViewIcon, People as PeopleIcon, Person as PersonIcon } from '@mui/icons-material';
import { AdminPanelRouteOfEndpoint } from 'constant/routesEndPoint';

export const adminRole = [
  {
    id: 0,
    sidebarMenuIcon: <GridViewIcon />,
    sidebarMenuLabel: 'Home',
    sidebarMenuRoute: `${AdminPanelRouteOfEndpoint.HOME_ROUTE}`
  },
  {
    id: 1,
    sidebarMenuIcon: <PeopleIcon />,
    sidebarMenuLabel: 'Customer Admin',
    sidebarMenuRoute: `${AdminPanelRouteOfEndpoint.CUSTOMER_ADMIN_ROUTE}`
  },
  {
    id: 2,
    sidebarMenuIcon: <PersonIcon />,
    sidebarMenuLabel: 'Cource',
    sidebarMenuRoute: `${AdminPanelRouteOfEndpoint.COURCE_ROUTE}`
  }
]

