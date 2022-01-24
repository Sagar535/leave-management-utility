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
import Admin from './views/admin/Admin';
import SalarySettingDashboard from './views/salarySetting/SalarySettingDashboard';
import SalarySetting from './views/salarySetting/SalarySetting';
import TaxRuleDashboard from './views/taxRule/TaxRuleDashboard';
import TaxRuleItemDashboard from './views/taxRule/TaxRuleItemDashboard';

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
    path: '/admin',
    name: 'Admin',
    icon: 'ni ni-tv-2 text-primary',
    component: Admin,
    layout: '/admin',
  },
  {
    path: '/salary_settings',
    name: 'Salary Setting Dashboard',
    icon: 'ni ni-tv-2 text-primary',
    component: SalarySettingDashboard,
    layout: '/admin',
  },
  {
    path: '/salary_setting/:id',
    name: 'Salary Setting',
    icon: 'ni ni-tv-2 text-primary',
    component: SalarySetting,
    layout: '/admin',
  },
  {
    path: '/tax_rules',
    name: 'Tax Rules Dashboard',
    icon: 'ni ni-tv-2 text-primary',
    component: TaxRuleDashboard,
    layout: '/admin',
  },
  {
    path: '/tax_rule_items',
    name: 'Tax Rule Items Dashboard',
    icon: 'ni ni-tv-2 text-primary',
    component: TaxRuleItemDashboard,
    layout: '/admin',
  },
];
export default routes;
