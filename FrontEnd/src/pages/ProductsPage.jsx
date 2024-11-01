import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import SummeryApi from '../common'; // Replace this with your actual API configuration

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from the API
  const fetchProducts = async () => {
    try {
      const response = await fetch(SummeryApi.All_products.url, {
        method: SummeryApi.All_products.method,
      });
      const data = await response.json();

      if (data.success) {
        setProducts(data.products);
      } else {
        toast.error('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('An error occurred while fetching products.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle product deletion
  const deleteProduct = async (productId) => {
    try {
      const response = await fetch(`${SummeryApi.Delete_product.url}/${productId}`, {
        method: SummeryApi.Delete_product.method,
      });
      const data = await response.json();

      if (data.success) {
        toast.success('Product deleted successfully');
        setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
      } else {
        toast.error('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('An error occurred while deleting the product.');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6 text-gray-700">All Products</h2>
      
      {loading ? (
        <p>Loading products...</p>
      ) : products.length > 0 ? (
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left">Product Name</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-b">
                <td className="py-3 px-6">{product.name}</td>
                <td className="py-3 px-6">${product.price}</td>
                <td className="py-3 px-6">{product.category}</td>
                <td className="py-3 px-6 flex space-x-4">
                  {/* Edit button */}
                  <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded flex items-center">
                    <FaEdit className="mr-2" />
                    Edit
                  </button>

                  {/* Delete button */}
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded flex items-center"
                  >
                    <FaTrash className="mr-2" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products found.</p>
      )}
    </div>
  );
};

export default ProductsPage;
