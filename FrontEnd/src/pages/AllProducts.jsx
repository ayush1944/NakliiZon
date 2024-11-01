import React, { useEffect, useState } from 'react'; 
import SummeryApi from '../common'; 
import UploadProductModal from '../components/UploadProductModal';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false);
  const [allProduct, setAllProduct] = useState([]);

  const fetchAllProduct = async () => {
    const response = await fetch(SummeryApi.getproduct.url);
    const dataResponse = await response.json();
    
    setAllProduct(dataResponse?.data || []);
  };

  useEffect(() => {
    fetchAllProduct();
  }, []);


  // Function to refresh products after a new upload
  const refreshProducts = () => {
    fetchAllProduct();
  };

  return (
    <div className="h-full overflow-hidden">
      {/* Header Section */}
      <div className="bg-white py-2 px-4 flex justify-between items-center shadow">
        <h2 className="font-bold text-lg">All Products :</h2>
        <button 
          className="border-2 rounded-full px-4 py-2 border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition-all duration-300" 
          onClick={() => setOpenUploadProduct(true)}>
          Upload New Product
        </button>
      </div>


    {/* Uploaded product details */}
      <div className=" h-[calc(100vh-100px)] mt-2 overflow-y-scroll overscroll-contain p-4 bg-gray-100">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
          {
            allProduct.length ? (
            allProduct.map((product, index) => {
              return (
            <AdminProductCard data={product} key={index+"allProduct"} fetchdata={fetchAllProduct} />
              
            )} )
          ) : (
            <p className="text-center text-gray-500 col-span-full">No products found</p>
          )
          }
        </div>
      </div>

      {/* Upload Product Modal */}
      {openUploadProduct && (
        <UploadProductModal 
          onClose={() => setOpenUploadProduct(false)} 
          onUploadSuccess={refreshProducts}  // Pass refreshProducts to be called on successful upload
        />
      )}
    </div>
  );
};

export default AllProducts;
