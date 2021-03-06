import React from 'react';
import { useSelector } from 'react-redux';

import { Alert } from 'react-bootstrap';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  return (
    <div>
      {notification.message && (
        <Alert id='notification' variant={notification.style}>
          {notification.message}
        </Alert>
      )}
    </div>
  );
};

export default Notification;
