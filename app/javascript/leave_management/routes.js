/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies
or substantial portions of the Software.
*/
import FullCalendar from './views/calendar/FullCalendar';
import Dashboard from './views/dashboard/Dashboard';
import User from './views/user/User';
import UserProfile from './views/user/UserProfile';

const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'ni ni-tv-2 text-primary',
    component: Dashboard,
    layout: '/admin',
  },
  {
    path: '/calendar',
    name: 'Calendar',
    icon: 'ni ni-tv-2 text-primary',
    component: FullCalendar,
    layout: '/admin',
  },
  {
    path: '/users',
    name: 'User',
    icon: 'ni ni-tv-2 text-primary',
    component: User,
    layout: '/admin',
  },
  {
    path: '/user-profile/:id',
    name: 'UserProfile',
    icon: 'ni ni-tv-2 text-primary',
    component: UserProfile,
    layout: '/admin',
  },
];
export default routes;
