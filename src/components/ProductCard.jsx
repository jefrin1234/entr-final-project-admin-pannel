const ProductCard = ({ product, onToggleVerification, onDelete }) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="px-4 py-2 whitespace-nowrap">{product.id}</td>
      <td className="px-4 py-2 whitespace-nowrap">
        <div className="w-12 h-12 overflow-hidden rounded-full border">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </td>
      <td className="px-4 py-2 whitespace-nowrap text-orange-500">{product.name}</td>
      <td className="px-4 py-2 whitespace-nowrap  text-red-500">{product.stock}</td>
      <td className="px-4 py-2 whitespace-nowrap text-green-500">${product.sellingPrice}</td>
      <td className="px-4 py-2 whitespace-nowrap capitalize text-black ">{product.category}</td>
      <td className="px-4 py-2 whitespace-nowrap capitalize text-pink-900">{product.brand}</td>
      <td className="px-4 py-2 whitespace-nowrap max-w-xs truncate text-gray-500">{product.description}</td>
      <td className="px-4 py-2 flex items-center justify-center space-x-2">
        <button
          className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600 transition-colors duration-300"
          onClick={() => onDelete(product._id)}
        >
          Delete
        </button>
        <button
          className={`text-white px-2 py-1 rounded-md transition-colors duration-300 ${
            product.verified
              ? 'bg-orange-400 hover:bg-orange-500'
              : 'bg-green-500 hover:bg-green-600'
          }`}
          onClick={() => onToggleVerification(product._id)}
        >
          {product.verified ? 'Deactivate' : 'Activate'}
        </button>
      </td>
    </tr>
  );
};

export default ProductCard;
