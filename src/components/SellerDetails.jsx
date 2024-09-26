import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../config/axiosInstance';
import toast from 'react-hot-toast';

function SellerDetails() {
  const [sellerDetails, setSellerDetails] = useState({});
  const { sellerId } = useParams();

  const fetchSellerDetails = async () => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: `/seller/profile/${sellerId}`,
      });
      console.log(response.data.data);
      setSellerDetails(response.data.data);
    } catch (error) {
      toast.error('Error getting seller details');
    }
  };

  useEffect(() => {
    if (sellerId) {
      fetchSellerDetails();
    }
  }, [sellerId]);

  if (!sellerDetails) {
    return <div className="text-center">Loading...</div>;
  }


  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Seller Details</h1>
      <div className="flex items-center mb-4">
        <h2 className="text-xl font-semibold">{sellerDetails.businessName}</h2>
        {sellerDetails.verified && (
          <span className="ml-2 text-green-500" title="Verified">
            &#10003; {/* Checkmark for verification */}
          </span>
        )}
      </div>
      <div className="space-y-2">
        <p><strong>Name:</strong> {sellerDetails.name}</p>
        <p><strong>Email:</strong> {sellerDetails.email}</p>
        <p><strong>Phone:</strong> {sellerDetails.phone}</p>
        <p><strong>Pickup Location:</strong> {sellerDetails.pickupLocation}</p>
        <p><strong>City:</strong> {sellerDetails.city}</p>
        <p><strong>State:</strong> {sellerDetails.state}</p>
        <p><strong>Postal Code:</strong> {sellerDetails.postalCode}</p>
        <p><strong>Account Holder Name:</strong> {sellerDetails.accountHolderName}</p>
        <p><strong>Account Number:</strong> {sellerDetails.accountNumber}</p>
        <p><strong>Bank Name:</strong> {sellerDetails.bankName}</p>
        <p><strong>IFSC:</strong> {sellerDetails.ifsc}</p>
        <p><strong>PAN:</strong> {sellerDetails.pan}</p>
        <p><strong>GSTIN Number:</strong> {sellerDetails.gstinNumber}</p>
        <div>
          <strong>Registration Certificate:</strong>
          <div className="mt-2 flex space-x-2">
            {Array.isArray(sellerDetails.registrationCetificate) && sellerDetails.registrationCetificate.length > 0 ? (
              sellerDetails.registrationCetificate.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt="Registration Certificate"
                  className="w-32 h-auto rounded shadow border"
                />
              ))
            ) : (
              <span>No registration certificate available</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerDetails;
