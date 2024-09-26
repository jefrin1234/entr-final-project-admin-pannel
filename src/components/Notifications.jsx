import React, { useState } from 'react';

import toast from 'react-hot-toast';
import { FaTrashAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import Spinner from './Loading';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../config/axiosInstance';

function Notifications() {
  const [loading, setLoading] = useState(false);

  const readNotifications = useSelector(state => state.admin.readNotifications);
  const unReadNotifications = useSelector(state => state.admin.unReadNotifications);



  const [activeTab, setActiveTab] = useState('unread'); // Tracks the active section



  if (loading) {
    return (
      <>
              <Spinner />
      </>
    );
  }

  return (
    <div className="p-4 bg-violet-200 rounded-lg shadow-lg border border-gray-200 max-w-5xl mx-auto">
      <h2 className="text-2xl md:text-3xl font-bold mb-6  text-center">Notifications</h2>

      {/* Tab Navigation */}
      <div className="md:flex justify-center mb-6  gap-6">
        <button
          className={`text-lg md:text-xl font-semibold mx-2 md:mx-4 pb-1 ${activeTab === 'unread' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('unread')}
        >
          Unread Notifications
        </button>
        <button
          className={`text-lg md:text-xl font-semibold mx-2 md:mx-4 pb-1 ${activeTab === 'read' ? 'text-green-600 border-b-2 border-green-600' : 'text-gray-500'}`}
          onClick={() => setActiveTab('read')}
        >
          Read Notifications
        </button>
      </div>

      <div className="flex flex-col md:flex-row md:space-x-8">
        {/* Unread Notifications Section */}
        <section className={`md:w-1/2 ${activeTab === 'unread' ? 'block' : 'hidden md:block'}`}>
          {unReadNotifications.length === 0 ? (
            <p className="text-center text-gray-500">No unread notifications</p>
          ) : (
            <div  className="space-y-4">
              {unReadNotifications.map(notification => (
                <div
                  key={notification.id }
                  className="flex justify-between items-center p-3 md:p-4 bg-yellow-100 border border-yellow-300 rounded-lg shadow-sm"
                >
                  <div>
                    <Link   to={`notification-details/${notification._id}`} className="text-gray-700 font-medium text-sm md:text-base">{notification.message} 
                    </Link>
                  </div>

                
                 
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Read Notifications Section */}
        <section className={`md:w-1/2 ${activeTab === 'read' ? 'block' : 'hidden md:block'}`}>
          {readNotifications.length === 0 ? (
            <p className="text-center text-gray-500">No read notifications</p>
          ) : (
            <div className="space-y-4">
              {readNotifications.map(notification => (
                <Link to={`notification-details/${notification._id}`}
                  key={notification.id}
                  className="flex justify-between items-center p-3 md:p-4 bg-gray-200 border border-gray-400 rounded-lg shadow-sm"
                >
                  <div>
                    <p className="text-gray-700 font-medium text-sm md:text-base">{notification.message} 
                    </p>
                  </div>
                  
                 
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Notifications;
