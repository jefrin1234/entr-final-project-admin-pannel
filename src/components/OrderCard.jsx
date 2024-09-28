


import React from 'react';
import { Link } from 'react-router-dom';

function OrderCard({ order, type }) {
  console.log(order)
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4 hover:shadow-lg transition-shadow duration-200 ease-in-out">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Order ID: {order._id}</h3>
          <p className="text-gray-600">Total Price: {type === 'all' ? `$${order.totalPrice}` : '$0'}</p>
          <p className="text-gray-600">Payment Method: {order.paymentMethod}</p>
          <p className={`text-sm ${order.paymentStatus === 'paid' ? 'text-green-500' : 'text-red-500'}`}>
            Payment Status: {order.paymentStatus}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-gray-600 font-semibold">Shipping Address:</p>
          <p className="text-gray-600">{order.address.name}</p>
          <p className="text-gray-600">{order.address.streetAddress}</p>
          <p className="text-gray-600">{order.address.city}, {order.address.state} - {order.address.postalCode}</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {order.items.map((item) => (
          <div key={item._id} className="flex items-start space-x-4 bg-gray-50 p-4 rounded-lg">
            <img src={item?.productId?.images[0]} alt="Product" className="w-16 h-16 object-cover rounded-lg" />
            <div>
              <p className="font-medium text-gray-800">Quantity: {item.quantity}</p>
              <p className="text-gray-600">Price: ${item.price}</p>
              <p className={`text-sm ${item.status === 'shipped' ? 'text-blue-500' : 'text-yellow-500'}`}>
                Shipping Status: {item.status}
              </p>
              <Link
                to={`/sellers/seller-details/${item.sellerId?._id}`}
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-800 mt-2 block"
              >
                Seller: {item.sellerId?.businessName}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrderCard;
