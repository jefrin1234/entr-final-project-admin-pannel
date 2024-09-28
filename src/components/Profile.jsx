
import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../config/axiosInstance';
import toast from 'react-hot-toast';

function Profile() {
  const [data, setData] = useState({});
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const fetchAdminProfile = async () => {
    try {
      const response = await axiosInstance.get('/admin/profile');
      setData(response.data.data);
    } catch (error) {
      toast.error("Error getting profile details");
    }
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      const response = await axiosInstance.post('/admin/password-change', {
        currentPassword,
        newPassword,
      });

      toast.success(response.data.message);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      toast.error("Error changing password: " + error.response.data.message);
    }
  };

  useEffect(() => {
    fetchAdminProfile();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-300 p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Admin Profile</h1>
        <span className="block text-gray-600 mb-4">Email: <strong>{data.email}</strong></span>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Change Password</h2>
          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-200"
          />
          <button
            onClick={handleChangePassword}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition duration-300 shadow-md"
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
