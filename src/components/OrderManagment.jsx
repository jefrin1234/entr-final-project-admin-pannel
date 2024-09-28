import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [sortField, setSortField] = useState('price'); // Default sorting field
  const [sortOrder, setSortOrder] = useState('desc'); // Default sorting order
  const [orderStatus, setOrderStatus] = useState(''); // Default no status filter
  const [paymentMethod, setPaymentMethod] = useState(''); // Default no payment filter

  // Fetch orders whenever sorting or filtering options change
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/orders', {
          params: {
            sortField,
            sortOrder,
            orderStatus,
            paymentMethod,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, [sortField, sortOrder, orderStatus, paymentMethod]);

  return (
    <div>
      <h2>Order Management</h2>

      {/* Sorting Options */}
      <div>
        <label>Sort by Price: </label>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Filtering by Order Status */}
      <div>
        <label>Filter by Order Status: </label>
        <select
          value={orderStatus}
          onChange={(e) => setOrderStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Filtering by Payment Method */}
      <div>
        <label>Filter by Payment Method: </label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value="">All</option>
          <option value="card">Card</option>
          <option value="cash">Cash on Delivery</option>
          <option value="bank">Bank Transfer</option>
        </select>
      </div>

      {/* Orders List */}
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Total Price</th>
            <th>Order Status</th>
            <th>Payment Method</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.totalPrice}</td>
              <td>{order.orderStatus}</td>
              <td>{order.paymentMethod}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
