import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../config/axiosInstance';
import moment from 'moment';
import { UserRoundPen, Trash } from 'lucide-react';
import EditUser from './EditUser';
import ConfirmationModal from './ConfirmModel';
import toast from 'react-hot-toast';

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [editUser, setEditUser] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const fetchCustomers = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/admin/all-users',
      });
      setCustomers(response.data.data);
    } catch (error) {
      
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axiosInstance({
        method: 'DELETE',
        url: `/admin/delete-user/${userId}`,
      });
      fetchCustomers(); 
      setConfirmDelete(false); 
      toast.success("User account deleted");
    } catch (error) {
    
      toast.error("Error deleting user account");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className='bg-white p-4 md:p-6 lg:p-8'>
      <div className='overflow-x-auto'>
        <table className='min-w-full border border-gray-300 bg-white rounded-lg'>
          <thead className='bg-gray-800 text-white'>
            <tr>
              <th className='px-4 py-2 text-left'>Sr.</th>
              <th className='px-4 py-2 text-left'>Name</th>
              <th className='px-4 py-2 text-left'>Email</th>
              <th className='px-4 py-2 text-left'>Role</th>
              <th className='px-4 py-2 text-left'>Created Date</th>
              <th className='px-4 py-2 text-center'>Action</th>
            </tr>
          </thead>
          <tbody className='divide-y divide-gray-200'>
            {customers.map((customer, index) => (
              <tr key={customer._id} className='hover:bg-gray-50'>
                <td className='px-4 py-2 whitespace-nowrap'>{index + 1}</td>
                <td className='px-4 py-2 whitespace-nowrap'>{customer.name}</td>
                <td className='px-4 py-2 whitespace-nowrap'>{customer.email}</td>
                <td className='px-4 py-2 whitespace-nowrap'>{customer.role.join(', ')}</td>
                <td className='px-4 py-2 whitespace-nowrap'>{moment(customer.createdAt).format('LL')}</td>
                <td className='px-4 py-2 flex items-center justify-center space-x-2'>
                  <button
                    className='bg-green-100 p-2 rounded-full hover:bg-green-300 hover:text-white transition duration-300 ease-in-out'
                    onClick={() => {
                      setSelectedUser(customer);
                      setEditUser(true);
                    }}
                  >
                    <UserRoundPen />
                  </button>
                  <button
                    className='bg-red-100 p-2 rounded-full hover:bg-red-300 hover:text-white transition duration-300 ease-in-out'
                    onClick={() => {
                      setUserIdToDelete(customer._id);
                      setConfirmDelete(true);
                    }}
                  >
                    <Trash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editUser && selectedUser && (
        <EditUser
          role={selectedUser.role}
          onClose={() => {
            setEditUser(false);
            setSelectedUser(null);
          }}
          name={selectedUser.name}
          email={selectedUser.email}
          fetchCustomers={fetchCustomers}
          userId={selectedUser._id}
        />
      )}

      {confirmDelete && (
        <ConfirmationModal
          message="Are you sure you want to delete this user? This action can't be undone."
          onCancel={() => setConfirmDelete(false)}
          onConfirm={() => {
            deleteUser(userIdToDelete);
          }}
        />
      )}
    </div>
  );
}

export default Customers;
