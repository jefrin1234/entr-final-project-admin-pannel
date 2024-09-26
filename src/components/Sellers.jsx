import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { axiosInstance } from '../config/axiosInstance';
import SellerCard from './SellerCard';

function Sellers() {
  const [sellers, setSellers] = useState([]);

  const fetchAllSellers = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: '/admin/all-sellers',
      });
    
      setSellers(response.data.data);
    } catch (error) {
      toast.error('Error getting sellers');
    }
  };

  useEffect(() => {
    fetchAllSellers();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-semibold mb-4">Total Sellers: {sellers.length}</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Business Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Phone</th>
              <th className="px-4 py-2 border">State</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller) => (
              <SellerCard key={seller._id} seller={seller} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Sellers;
