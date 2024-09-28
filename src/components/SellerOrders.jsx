import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../config/axiosInstance';
import { FaBoxOpen } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

function SellerOrders() {
  const {sellerId} = useParams()
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get(`/orders/seller-orders/${sellerId}`);
        console.log(response.data.data)
        setOrders(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);



  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Seller Orders</h1>
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
          <FaBoxOpen className="text-6xl text-gray-400 dark:text-gray-600" />
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300">No orders found</h2>
          <p className="text-gray-500 dark:text-gray-400"> no new orders!</p>
        </div>
      ) : (
        orders.map((order) => {
         
          const sellerTotal = order.items.reduce((total, item) => {
            return total + item.price * item.quantity;
          }, 0);

          return (
            <div key={order._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
              <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
             
              <p className="text-gray-700"> Total Price: <span className="font-bold">${sellerTotal.toFixed(2)}</span></p>
              <p className="text-gray-700">Payment Method: <span className="font-bold">{order.paymentMethod}</span></p>
              <p className="text-gray-700">Payment Status: <span className="font-bold">{order.paymentStatus}</span></p>
              <p className="text-gray-700">Order Status: <span className="font-bold">{order.orderStatus}</span></p>

              
              <div className="border p-4 rounded-md mt-4">
                <p className="text-black font-bold mt-2">Shipping Address:</p>
                <div className="ml-4 text-gray-700 flex flex-col sm:flex-row sm:flex-wrap gap-y-1 gap-x-4">
                  <span>{order?.address.fullName}</span>
                  <span>{order?.address?.phoneNumber}</span>
                  <span>{order?.address.streetAddress},</span>
                  <span>{order?.address?.city},</span>
                  <span>{order?.address?.state},</span>
                  <span>{order?.address?.postalCode}</span>
                </div>
              </div>

              <div className="mt-4">
                {order.items.map((item) => (
                  <div key={item.productId._id} className="border p-4 mb-2 rounded bg-gray-100">
                
                    <img src={item.productId.images[0]} alt={item.productName} className="w-16 h-16 object-cover mb-2 rounded-md" />
                    <h4 className="font-semibold">{item.productId.name}</h4>
                    <p>Quantity: <span className="font-bold">{item.quantity}</span></p>
                    <p>Price: <span className="font-bold">${item.price}</span></p>
                    <p>Status: <span className={`font-bold ${item.status === 'delivered' ? 'text-green-600' : 'text-yellow-600'}`}>{item.status}</span></p>

                
                  </div>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default SellerOrders;
