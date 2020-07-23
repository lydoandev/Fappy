import * as routesUrl from '../routesUrl'

export default [
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Theme']
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Components']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'DASHBOARD',
    to: routesUrl.DASHBOARD,
    icon: 'cil-cursor',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'USERS MANAGEMENT',
    to: routesUrl.LIST_USERS,
    icon: 'cil-user',
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'SELLERS MANAGEMENT ',
    icon: 'cil-puzzle',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'RESTAURANTS',
        to: routesUrl.LIST_RESTAURANT,
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'MARKETERS',
        to: routesUrl.LIST_MARKETER,
      },
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'CHARS',
    to: routesUrl.CHARTS,
    icon: 'cil-chart-pie'
  },
  
]

