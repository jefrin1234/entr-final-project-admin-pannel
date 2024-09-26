import React, { useState } from 'react';
import { axiosInstance } from '../config/axiosInstance';
import toast from 'react-hot-toast';
function EditUser({ role, onClose, name, email, fetchCustomers, userId }) {
  const [newRole, setNewRole] = useState(role[0]); // Default to the first role

  const updateRole = async () => {
    try {
     
    const response =   await axiosInstance({
        method: 'PATCH',
        url: `/admin/role-update/${userId}`, // Ensure this endpoint exists in your backend
        data: { role: newRole },
      });
     
      toast.success("User updated successfully")
      fetchCustomers(); // Refresh customer list after updating
      onClose(); // Close modal after updating
    } catch (error) {
     toast.error("error updating user role")
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Edit User Role</h2>
        <div className="mb-4">
          <label className="block font-semibold">Name</label>
          <p className="text-gray-700">{name}</p>
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Email</label>
          <p className="text-gray-700">{email}</p>
        </div>
        <div className="mb-4">
          <label className="block font-semibold">Role</label>
          <select
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            {/* Add other roles if necessary */}
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={updateRole}
          >
            Update Role
          </button>
          <button
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditUser;
