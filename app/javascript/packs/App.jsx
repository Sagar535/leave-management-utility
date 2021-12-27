import React from 'react';
import ReactDOM from 'react-dom';
import LeaveManagementApp from '../leave_management';

document.addEventListener('DOMContentLoaded', () => {
  const node = document.getElementById('user_data');
  const data = JSON.parse(node.getAttribute('data')) || {};
  const path_node = document.getElementById('path_data');
  const path_data = path_node.getAttribute('data') || '/admin/dashboard';

  ReactDOM.render(
    <LeaveManagementApp data={data} path={path_data} />,
    document.body.appendChild(document.createElement('div')),
  );
});
