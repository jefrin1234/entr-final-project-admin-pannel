


import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

function SellerCard({ seller }) {
  return (
    <tr className="hover:bg-gray-100 transition-all">
      <td className="px-4 py-2 border text-center">
      
        <div className="flex items-center  space-x-2">
         
        <div className='flex gap-8'>
        <span className="flex-shrink-0 w-5 h-5 flex items-center justify-between">
            {seller.verified ? (
              <FaCheckCircle className="text-green-500" title="Verified Seller" />
            ) : (
              <FaTimesCircle className="text-red-500" title="Not Verified Seller" />
            )}
          </span>
          
          <Link
            to={`seller-details/${seller._id}`}
            className="text-blue-600 hover:underline max-w-[150px] truncate text-left"
          >
            {seller.businessName}
          </Link>
        </div>
        </div>
      </td>
      <td className="px-4 py-2 border text-center">{seller.email}</td>
      <td className="px-4 py-2 border text-center">{seller.phone}</td>
      <td className="px-4 py-2 border text-center">{seller.state}</td>
    </tr>
  );
}

export default SellerCard;
