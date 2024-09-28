


import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { axiosInstance } from '../config/axiosInstance';
import toast from 'react-hot-toast';

function SellerDetails() {
  const [sellerDetails, setSellerDetails] = useState(null);
  const { sellerId } = useParams();
  const navigate = useNavigate();

  const fetchSellerDetails = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: `/seller/profile/${sellerId}`,
      });
      setSellerDetails(response.data.data);
      console.log(response.data.data._id)
    } catch (error) {
      toast.error('Error getting seller details');
    }
  };

  const handleVerifySeller = async () => {

    if(sellerDetails.verified){
      if(window.window.confirm('are you sure you want to unverify this seller')){
        try {
          await axiosInstance({
            method: 'PATCH',
            url: `/admin/unverify-seller/${sellerId}`,
          });
          toast.success('Seller Unverified successfully');
          fetchSellerDetails();
        } catch (error) {
          toast.error('Error unverifying seller');
        }
      }
    }else if(!sellerDetails.verified){
      try {
        await axiosInstance({
          method: 'POST',
          url: `/seller/verify-seller`,
          data:{
            sellerId:sellerId
          }
        });
        toast.success('Seller verified successfully');
        fetchSellerDetails();
      } catch (error) {
        toast.error('Error verifying seller');
      }
    }


  };

  const handleDeleteSeller = async () => {
    if (window.confirm('Are you sure you want to delete this seller account?')) {
      try {
        await axiosInstance({
          method: 'DELETE',
          url: `/admin/delete-seller/${sellerId}`,
        });
        toast.success('Seller account deleted successfully');
        navigate('/sellers');
      } catch (error) {
        toast.error('Error deleting seller account');
      }
    }
  };

  useEffect(() => {
    if (sellerId) {
      fetchSellerDetails();
    }
  }, [sellerId]);

  if (!sellerDetails) {
    return <div className="text-center text-gray-700 font-semibold mt-10">Loading...</div>;
  }

  return (
    <div className="p-6 sm:p-8 max-w-6xl mx-auto bg-gray-50 shadow-lg rounded-lg space-y-8">
   
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 border-b-2 pb-4 border-gray-200 space-y-4 sm:space-y-0">
        <div>
          <h1 className="text-2xl sm:text-4xl font-bold text-indigo-700">{sellerDetails.businessName}</h1>
          {sellerDetails.verified && (
            <span className="ml-2 text-green-600 font-semibold" title="Verified">
              &#10003; Verified
            </span>
          )}
        </div>
        <div className="space-x-4">
          <Link
            to={`/seller/products/${sellerDetails._id}`}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-500 transition duration-200"
          >
            View Products
          </Link>
          <Link
            to={`/seller/seller-orders/${sellerId}`}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-500 transition duration-200"
          >
            View Orders
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Seller Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <p className="text-gray-700"><strong className="text-gray-900">Name:</strong> {sellerDetails.name}</p>
            <p className="text-gray-700"><strong className="text-gray-900">Email:</strong> {sellerDetails.email}</p>
            <p className="text-gray-700"><strong className="text-gray-900">Phone:</strong> {sellerDetails.phone}</p>
            <p className="text-gray-700"><strong className="text-gray-900">City:</strong> {sellerDetails.city}</p>
            <p className="text-gray-700"><strong className="text-gray-900">State:</strong> {sellerDetails.state}</p>
          </div>
          <div>
            <p className="text-gray-700"><strong className="text-gray-900">Pickup Location:</strong> {sellerDetails.pickupLocation}</p>
            <p className="text-gray-700"><strong className="text-gray-900">Postal Code:</strong> {sellerDetails.postalCode}</p>
            <p className="text-gray-700"><strong className="text-gray-900">GSTIN Number:</strong> {sellerDetails.gstinNumber}</p>
            <p className="text-gray-700"><strong className="text-gray-900">PAN:</strong> {sellerDetails.pan}</p>
          </div>
        </div>
      </div>

    
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Bank Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <p className="text-gray-700"><strong className="text-gray-900">Account Holder Name:</strong> {sellerDetails.accountHolderName}</p>
            <p className="text-gray-700"><strong className="text-gray-900">Account Number:</strong> {sellerDetails.accountNumber}</p>
          </div>
          <div>
            <p className="text-gray-700"><strong className="text-gray-900">Bank Name:</strong> {sellerDetails.bankName}</p>
            <p className="text-gray-700"><strong className="text-gray-900">IFSC:</strong> {sellerDetails.ifsc}</p>
          </div>
        </div>
      </div>

   
    
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
  <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Registration Certificate</h2>
  {Array.isArray(sellerDetails.registrationCetificate) && sellerDetails.registrationCetificate.length > 0 ? (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {sellerDetails.registrationCetificate.map((url, index) => (
        <div key={index} className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow-md">
          <img
            src={url}
            alt={`Registration Certificate ${index + 1}`}
            className="w-40 h-40 object-cover rounded-lg mb-2"
          />
          <span className="text-gray-600 text-sm">Certificate {index + 1}</span>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-600">No registration certificate available</p>
  )}
</div>



      <div className="flex justify-end space-x-4">
        <button
          onClick={handleVerifySeller}
        
          className={`px-6 py-3 rounded-lg font-semibold text-white ${sellerDetails.verified ? 'bg-orange-500 c' : 'bg-green-600 hover:bg-green-500'} transition duration-200`}
        >
          {sellerDetails.verified ? 'unverify' : 'Verify'}
        </button>
        <button
          onClick={handleDeleteSeller}
          className="px-6 py-3 rounded-lg font-semibold text-white bg-red-600 hover:bg-red-500 transition duration-200"
        >
          Delete Seller
        </button>
      </div>
    </div>
  );
}

export default SellerDetails;
