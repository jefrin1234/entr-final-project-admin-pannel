import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../config/axiosInstance';
import toast from 'react-hot-toast';

function NotificationDetails() {
  const { id } = useParams(); 
  const { notifications } = useSelector((state) => state.admin); 
  const [notification, setNotification] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const foundNotification = notifications.find((notification) => notification._id === id);
    if (foundNotification) {
      setNotification(foundNotification);
      fetchVerificationStatus(foundNotification); 
      setLoading(false); 

      if (foundNotification.isRead === false) {
        handleUpdateNotification(foundNotification._id);
      }
    } else {
      setLoading(true);
    }
  }, [notifications, id]);

  
  const fetchVerificationStatus = async (data) => {
    try {
      setLoading(true);
      let response;
      if (data.message.includes('Seller')) {
        response = await axiosInstance.get(`/seller/profile/${data.data._id}`);
      } else if (data.message.includes('product')) {
        response = await axiosInstance.get(`/products/product-details/${data.data._id}`);
      }
    
      const isVerified = response.data.data.verified === true 
      setVerified(isVerified); 
      setLoading(false);
    } catch (error) {
     toast.error("error getting notification status")
      setLoading(false);
    }
  };

  const handleUpdateNotification = async (notificationId) => {
    try {
      await axiosInstance({
        method: 'POST',
        url: `/admin/update-notification/${notificationId}`,
        data: { isRead: true }
      });
    } catch (error) {
     toast.error("error updating notification")
    }
  };

  const handleVerify = async () => {
    try {
      if (notification.message.includes('Seller')) {
        await axiosInstance.post('/seller/verify-seller', { sellerId: notification.data._id });
        toast.success("Seller verified successfully");
      } else if (notification.message.includes('product')) {
        await axiosInstance.post(`/products/verify-product/${notification.data._id}`);
        toast.success("Product verified successfully");
      }

      setVerified(true);
    } catch (error) {
    
      toast.error("Error verifying");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-gray-700 animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!notification) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="text-2xl font-semibold text-red-600">Notification not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 md:p-10 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-10 space-y-6 border-l-4 border-green-500">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 border-b pb-2">Notification Details</h2>
        <p className="text-lg text-gray-700 mb-6">Message: <span className="font-semibold text-green-500">{notification.message}</span></p>

        {notification.message === 'Seller verification request' ? (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="space-y-4 bg-gray-50 p-4 rounded-lg shadow">
                <p><span className="font-semibold text-gray-700">Name:</span> {notification.data.name}</p>
                <p><span className="font-semibold text-gray-700">Email:</span> {notification.data.email}</p>
                <p><span className="font-semibold text-gray-700">Phone:</span> {notification.data.phone}</p>
                <p><span className="font-semibold text-gray-700">Business Name:</span> {notification.data.businessName}</p>
              </div>
              <div className="space-y-4 bg-gray-50 p-4 rounded-lg shadow">
                <p><span className="font-semibold text-gray-700">City:</span> {notification.data.city}</p>
                <p><span className="font-semibold text-gray-700">State:</span> {notification.data.state}</p>
                <p><span className="font-semibold text-gray-700">Pickup Location:</span> {notification.data.pickupLocation}</p>
                <p><span className="font-semibold text-gray-700">Postal Code:</span> {notification.data.postalCode}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
              <div className="space-y-2 bg-gray-50 p-4 rounded-lg shadow">
                <p className="font-semibold text-gray-700">Registration Certificate:</p>
                <img
                  src={notification.data.registrationCetificate[0]}
                  alt="Registration Certificate"
                  className="w-full h-auto max-h-60 object-cover rounded-lg shadow-lg transition-transform duration-200 hover:scale-105"
                />
              </div>
              <div className="space-y-4 bg-gray-50 p-4 rounded-lg shadow">
                <p><span className="font-semibold text-gray-700">PAN:</span> {notification.data.pan}</p>
                <p><span className="font-semibold text-gray-700">Account Number:</span> {notification.data.accountNumber}</p>
                <p><span className="font-semibold text-gray-700">Account Holder Name:</span> {notification.data.accountHolderName}</p>
                <p><span className="font-semibold text-gray-700">Bank Name:</span> {notification.data.bankName}</p>
                <p><span className="font-semibold text-gray-700">IFSC Code:</span> {notification.data.ifsc}</p>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-lg"><span className="font-semibold text-gray-700">Product Name:</span> {notification.data.name}</p>
            <p className="text-lg"><span className="font-semibold text-gray-700">Brand:</span> {notification.data.brand}</p>
            <p className="text-lg"><span className="font-semibold text-gray-700">Category:</span> {notification.data.category}</p>
            <p className="text-lg"><span className="font-semibold text-gray-700">Colour:</span> {notification.data.colour}</p>
            <p className="text-lg"><span className="font-semibold text-gray-700">Description:</span> {notification.data.description}</p>
            <p className="text-lg"><span className="font-semibold text-gray-700">Price:</span> {notification.data.sellingPrice}</p>
            <div className="mt-4">
              <span className="font-semibold text-gray-700">Images:</span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {notification.data.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="Product"
                    className="w-full h-48 object-cover rounded-lg shadow-md transition-transform duration-200 hover:scale-105"
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-4 mt-10">
          <button
            disabled={verified}
            onClick={handleVerify}
            className={`py-3 px-6 rounded-lg shadow-md transition-all duration-200 
              ${verified ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700 text-white'}`}
          >
            {verified ? 'Verified' : 'Verify'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default NotificationDetails;
