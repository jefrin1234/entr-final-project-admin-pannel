import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { axiosInstance } from '../config/axiosInstance';
import { FaStar } from 'react-icons/fa'; 
import toast from 'react-hot-toast';

function Ratings() {
  const [ratings, setRatings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRatings, setTotalRatings] = useState(0);
  const limit = 5;
  const { productId } = useParams();

  const fetchProductRatings = async (page) => {
    try {
      const response = await axiosInstance({
        method: 'GET',
        url: `/rating/product/${productId}?page=${page}&limit=${limit}`,
      });

      setRatings(response.data.data);
      setTotalRatings(response.data.totalRatings);
    } catch (error) {
      console.error("Error fetching ratings:", error);
      toast.error("Error fetching ratings");
    }
  };

  const handleDeleteRating = async (ratingId) => {
    try {
      await axiosInstance({
        method: 'DELETE',
        url: `/rating/delete-rating`,
        data: { ratingId: ratingId }
      });

      setRatings((prev) => prev.filter((rating) => rating._id !== ratingId));
      toast.success("Rating deleted successfully");
    } catch (error) {
      console.error("Error deleting rating:", error);
      toast.error("Error deleting rating");
    }
  };

  useEffect(() => {
    if (productId) {
      fetchProductRatings(currentPage);
    }
  }, [productId, currentPage]);

  const totalPages = Math.ceil(totalRatings / limit);

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">Product Ratings</h1>
      <span className="text-red-700 mb-4 block font-bold">Total Ratings: {ratings?.length > 0 ? ratings.length : 0}</span>

      <div className="bg-white shadow-md rounded-lg p-6">
        {ratings?.length > 0 ? (
          ratings.map((rating) => (
            <div key={rating._id} className="flex flex-col md:flex-row items-start md:items-center justify-between border-b py-4 gap-4">
              <div className="flex items-center space-x-2">
              
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`h-5 w-5 ${index < rating.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                  />
                ))}
                <span className="ml-2 text-gray-700 font-semibold">{rating.rating}</span>
              </div>
              <div className="text-gray-700 flex-1">
                <p className="text-md font-medium">{rating.comment}</p>
                <p className="text-sm text-gray-500">Rated by: <span className="font-semibold">{rating.userId?.name || "Anonymous"}</span></p>
              </div>
              <button
                className="text-red-500 hover:text-red-700 transition duration-300"
                onClick={() => handleDeleteRating(rating._id)}
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center py-4">No ratings available for this product.</p>
        )}
      </div>

     
      <div className="flex justify-center mt-6 mb-4">
        {ratings?.length > 0 && (
          <>
            <button
              className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="mx-2">{`Page ${currentPage} of ${totalPages || 1}`}</span>
            <button
              className="px-4 py-2 mx-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-300"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
            >
              Next
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Ratings;
