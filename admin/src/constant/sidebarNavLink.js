import { People as PeopleIcon } from '@mui/icons-material';
import HomeIcon from '@mui/icons-material/Home';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { AdminPanelRouteOfEndpoint } from 'constant/routesEndPoint';

export const adminRole = [
  {
    id: 0,
    sidebarMenuIcon: <HomeIcon />,
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
    sidebarMenuIcon: <MenuBookIcon />,
    sidebarMenuLabel: 'Cource',
    sidebarMenuRoute: `${AdminPanelRouteOfEndpoint.COURCE_ROUTE}`
  }
]

