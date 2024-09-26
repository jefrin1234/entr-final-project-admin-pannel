import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../config/axiosInstance';
import ProductCard from './ProductCard'
import toast from 'react-hot-toast';

function Products() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 10;
  
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/products/search', {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          q: searchQuery,
        },
      });
      setProducts(response.data.data);
      setTotalPages(response.data.pagination ? response.data.pagination.totalPages : 1);
    } catch (error) {
    toast.error("error getting product ")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchQuery]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchProducts();
  };

  const onToggleVerification = async (productId) => {
    try {
      const response = await axiosInstance.post(`/products/product-deactivate/${productId}`);
      const updatedProduct = response.data.data;
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId ? updatedProduct : product
        )
      );
      toast.success(
        `Product has been ${updatedProduct.verified ? 'activated' : 'deactivated'}.`
      );
    } catch (error) {
      toast.error('Error updating product verification status.');
    }
  };

  const onDelete = async (productId) => {
    try {
      const response = await axiosInstance.delete(`/products/delete-product/${productId}`);
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
      toast.success('Product deleted');
      fetchProducts()
    } catch (error) {
      toast.error('Error deleting product');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSearchSubmit} className="mb-4 flex items-center space-x-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search products..."
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
        >
          Search
        </button>
      </form>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto min-h-[300px]"> {/* Ensuring minimum height */}
          <table className="min-w-full border border-gray-300 bg-white rounded-lg shadow-md">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Image</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Brand</th> 
                <th className="px-4 py-2 text-left">Description</th>
                <th className="px-4 py-2 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onToggleVerification={onToggleVerification}
                    onDelete={onDelete}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-4 text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center space-x-2 mt-4"> {/* Adjusted spacing */}
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded-md ${
                currentPage === index + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              } hover:bg-blue-400 transition-colors duration-300`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Products;
