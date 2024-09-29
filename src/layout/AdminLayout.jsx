
import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';
import { axiosInstance } from '../config/axiosInstance';
import { useDispatch } from 'react-redux';
import { setAdminNotifications } from '../slices/adminSlice';
import toast from 'react-hot-toast';

function AdminLayout() {
  const dispatch = useDispatch();

  const fetchAdminNotifications = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/admin/admin-notifications',
      });

     

      const notifications = response.data.data || [];
      const readNotifications = notifications.filter(
        (notification) => notification.isRead
      );
      const unreadNotifications = notifications.filter(
        (notification) => !notification.isRead
      );

    
      dispatch(
        setAdminNotifications({
          readNotifications: readNotifications,
          unReadNotifications: unreadNotifications,
          notifications:notifications
        })
      );

     
    } catch (error) {
     toast.error("Error getting notification")
    }
  };

  useEffect(() => {
    fetchAdminNotifications();
  }, []);

  return (
    <div>
      <Header />
      <div className="min-h-[calc(100vh)] pt-16">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default AdminLayout;

