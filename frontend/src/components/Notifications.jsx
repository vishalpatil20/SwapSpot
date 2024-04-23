import React, { useState } from 'react';
import axios from 'axios'; // Import axios

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = async () => {
    try {
      const authToken = localStorage.getItem('authToken'); // Retrieve authToken from local storage
      const response = await axios.get('http://localhost:3000/notifications/user', {
        headers: {
          Authorization: `Bearer ${authToken}`, // Use authToken in the Authorization header
        },
      });

      setNotifications(response.data.notifications);
      setIsOpen(!isOpen);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  return (
    <div className="relative inline-block text-left">
      {/* Button for notifications */}
      <button onClick={handleClick} className="inline-flex justify-center w-full rounded-full border border-gray-300 shadow-sm px-2 py-2 bg-[#004AAD] text-sm font-medium text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-[#004AAD]">
        {/* Notification icon */}
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a2 2 0 100-4 2 2 0 000 4zM18 10a8 8 0 10-16 0h16z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Notification box */}
      {isOpen && notifications.length > 0 && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {notifications.map(notification => (
              <div key={notification.id} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">{notification.message}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notification;
