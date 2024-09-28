


import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../config/axiosInstance';
import OrderCard from './OrderCard';


function AllOrders() {
  const [paidOrders, setPaidOrders] = useState([]);
  const [unPaidOrders, setUnPaidOrders] = useState([]);
  const [showPaidOrders, setShowPaidOrders] = useState(true);
  const [sortBy, setSortBy] = useState('totalPrice'); 
  const [sortOrder, setSortOrder] = useState('desc');
  const [orderStatus, setOrderStatus] = useState(''); 
  const [paymentMethod, setPaymentMethod] = useState(''); 

  const fetchAllOrders = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: "/orders/all-orders",
        params: {
          sortBy,
          sortOrder,
          orderStatus,
          paymentMethod,
        }
      });

      const orders = response.data.data;
    
      setUnPaidOrders(orders.filter((order) => order.paymentStatus === 'unpaid'));
      setPaidOrders(orders.filter((order) => order.paymentStatus === 'paid'));
    } catch (error) {
    
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [sortBy, sortOrder, orderStatus, paymentMethod]);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Orders List</h1>
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowPaidOrders(true)}
          className={`px-4 py-2 mr-2 rounded-md font-semibold focus:outline-none ${showPaidOrders ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Paid Orders
        </button>
        <button
          onClick={() => setShowPaidOrders(false)}
          className={`px-4 py-2 rounded-md font-semibold focus:outline-none ${!showPaidOrders ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Unpaid Orders
        </button>
      </div>
      <div className="flex justify-center mb-6 space-x-4">
        <button
          onClick={() => setSortBy('totalPrice')}
          className={`px-4 py-2 rounded-md font-semibold focus:outline-none ${sortBy === 'totalPrice' ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-800'}`}
        >
          Sort by Price
        </button>
        <button
          onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          className="px-4 py-2 rounded-md font-semibold bg-gray-200 text-gray-800 focus:outline-none"
        >
          {sortOrder === 'asc' ? 'Latest' : 'oldest'}
        </button>
      </div>
      <div className="flex justify-center mb-6 space-x-4">
  
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="px-4 py-2 rounded-md border"
        >
          <option value="">All Payment Methods</option>
          <option value="card">Card</option>
          <option value="cash">Cash on Delivery</option>
        </select>
      </div>
      <div className="grid gap-6">
        {showPaidOrders ? (
          paidOrders.length > 0 ? (
            paidOrders.map((order) => (
              <OrderCard key={order._id} order={order} type={'all'} />
            ))
          ) : (
            <p className="text-center text-gray-600">No paid orders found</p>
          )
        ) : (
          unPaidOrders.length > 0 ? (
            unPaidOrders.map((order) => (
              <OrderCard key={order._id} order={order} type={'all'} />
            ))
          ) : (
            <p className="text-center text-gray-600">No unpaid orders found</p>
          )
        )}
      </div>
    </div>
  );
}

export default AllOrders;
