import React from 'react';

export default function NotifyUser(message, position, type, notifierRef) {
  const options = {
    place: position,
    message: (
      <div>
        <div className="text-capitalize">
          <i className="tim-icons icon-bell-55 pr-4" />
          { message }
        </div>
      </div>
    ),
    type,
    icon: '',
    autoDismiss: 2,
  };
  notifierRef.current.notificationAlert(options);
}
