import React from 'react';
import { Link } from 'react-router-dom';

function SellerCard({ seller }) {
  return (
    <tr className="hover:bg-gray-100 transition-all">
      <td className="px-4 py-2 border text-center">
        <Link
          to={`seller-details/${seller._id}`}
          className="text-blue-600 hover:underline"
        >
          {seller.businessName}
        </Link>
      </td>
      <td className="px-4 py-2 border text-center">{seller.businessName}</td>
      <td className="px-4 py-2 border text-center">{seller.email}</td>
      <td className="px-4 py-2 border text-center">{seller.phone}</td>
      <td className="px-4 py-2 border text-center">{seller.state}</td>
    </tr>
  );
}

export default SellerCard;
