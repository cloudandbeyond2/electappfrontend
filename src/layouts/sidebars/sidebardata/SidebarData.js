import * as Icon from 'react-feather';

const SidebarData = [
  {
    title: 'Dashboards',
    href: '/dashboards/modern',
    id: 1,
    suffixColor: 'bg-cyan rounded-pill text-dark-white',
    icon: <Icon.Home />,
    collapisble: true,
  
  },
  {
    title: 'Agents',
    href: '/agentform',
    icon: <Icon.Disc />,
  },
  {
    title: 'Agents Lists',
    href: '/apps/contacts',
    icon: <Icon.User />,
    id: 2.3,
    collapisble: false,
  },
   {
    title: 'Add User',
    href: '/form-validation',
    icon: <Icon.CheckSquare />,
    id: 3.3,
    collapisble: false,
  },
  {
    title: 'User List',
    href: '/tickt/ticket-list',
    icon: <Icon.Disc />,
  },
  {
    title: 'All Agents',
    href: '/tables/data-table',
    icon: <Icon.HardDrive />,
    id: 4.3,
    collapisble: false,
  },
  {
    title: 'Login',
    href: '/auth/loginformik',
    icon: <Icon.Disc />,
  },

];

export default SidebarData;
