import React, { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaCloudUploadAlt } from 'react-icons/fa';
import productCategory from '../helper/productCategory';
import uploadImage from '../helper/uploadImages';
import SummeryApi from '../common';
import { toast } from 'react-toastify';

const UploadProductModal = ({ onClose, onUploadSuccess }) => {
  const [selectedImages, setSelectedImages] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [imageToView, setImageToView] = useState(null);

  const [data, setData] = useState({
    productName: '',
    brandName: '',
    category: '',
    productImage: [],
    price: '',
    description: '',
    sellingPrice: ''
  });

  useEffect(() => {
    // Disable body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      // Enable body scroll when modal is closed
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(SummeryApi.uploadProduct.url, {
      method: SummeryApi.uploadProduct.method,
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      // Trigger product refresh after successful upload
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    } else if (responseData.error) {
      toast.error(responseData.message);
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const imagePreviews = files.map((file) => URL.createObjectURL(file));

    setSelectedImages((prevImages) => [...prevImages, ...imagePreviews]);

    const uploadedImages = await Promise.all(
      files.map(async (file) => {
        const uploadImageCloudinary = await uploadImage(file);
        return uploadImageCloudinary;
      })
    );

    setData((prevData) => ({
      ...prevData,
      productImage: [...prevData.productImage, ...uploadedImages],
    }));
  };

  const handleDeleteImage = (index) => {
    const updatedSelectedImages = selectedImages.filter((_, i) => i !== index);
    const updatedProductImages = data.productImage.filter((_, i) => i !== index);
    setSelectedImages(updatedSelectedImages);
    setData((prevData) => ({
      ...prevData,
      productImage: updatedProductImages,
    }));
  };

  const handleImageClick = (image) => {
    setImageToView(image);
    setShowImageModal(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-md relative overflow-y-auto"
        style={{ maxHeight: '90vh' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
        >
          <IoMdClose size={24} />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Upload Product
          </h2>

          <input
            type="text"
            required
            id="productName"
            name="productName"
            placeholder="Product Name"
            value={data.productName}
            onChange={handleOnChange}
            className="border w-full px-4 py-2 mb-4 rounded-md"
          />

          <input
            required
            type="text"
            id="brandName"
            name="brandName"
            placeholder="Brand Name"
            value={data.brandName}
            onChange={handleOnChange}
            className="border w-full px-4 py-2 mb-4 rounded-md"
          />

          <input
            required
            type="number"
            id="price"
            name="price"
            placeholder="Product Price"
            value={data.price}
            onChange={handleOnChange}
            className="border w-full px-4 py-2 mb-4 rounded-md"
          />

          <input
            required
            type="number"
            id="sellingPrice"
            name="sellingPrice"
            placeholder="Selling Price"
            value={data.sellingPrice}
            onChange={handleOnChange}
            className="border w-full px-4 py-2 mb-4 rounded-md"
          />

          <textarea
            required
            type="text"
            id="description"
            name="description"
            placeholder="Enter Product Description"
            value={data.description}
            onChange={handleOnChange}
            className="border w-full px-4 py-2 mb-4 rounded-md resize-none"
          />

          <div className="flex items-center gap-4 mb-6">
            <label htmlFor="category">Category: </label>
            <select
              name="category"
              id="category"
              value={data.category}
              onChange={handleOnChange}
              className="border w-full px-3 py-1 rounded-md"
            >
              <option value="" disabled>
                Select Category
              </option>
              {productCategory.map((item, index) => (
                <option key={index} value={item.value}>
                  {item.value}
                </option>
              ))}
            </select>
          </div>

          <div
            className="border border-gray-300 p-6 rounded-lg flex flex-col justify-center items-center cursor-pointer relative"
            style={{ width: '100%', height: '150px', backgroundColor: '#f8f9fa' }}
          >
            <FaCloudUploadAlt className="text-5xl text-gray-400 mb-4" />
            <span className="text-gray-500">Upload Product Image</span>
            <input
              required
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
            />
          </div>

          <div className="mt-4 p-4 border border-gray-300 rounded-lg max-h-60 overflow-y-auto">
            <h3 className="text-lg font-semibold mb-2">Uploaded Images:</h3>
            <div className="grid grid-cols-2 gap-4">
              {selectedImages.length > 0 ? (
                selectedImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Selected ${index}`}
                      className="w-20 h-20 object-contain rounded-lg cursor-pointer"
                      onClick={() => handleImageClick(image)}
                    />
                    <button
                      onClick={() => handleDeleteImage(index)}
                      className="absolute top-0 right-0 bg-red-600 text-white p-1 rounded-full"
                    >
                      ✕
                    </button>
                  </div>
                ))
              ) : (
                <span className="text-red-500">*No Images Uploaded</span>
              )}
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full mt-6 flex items-center px-4 py-2 bg-blue-600 justify-center text-white rounded-md hover:bg-blue-700"
          >
            Upload Product
          </button>
        </div>

        {/* Image Modal */}
        {showImageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-8 rounded-lg relative max-w-lg w-full">
              <button
                onClick={() => setShowImageModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500"
              >
                <IoMdClose size={24} />
              </button>
              <img
                src={imageToView}
                alt="Selected"
                className="w-full rounded-lg h-96 object-contain mb-4"
              />
              <button
                onClick={() => {
                  const indexToRemove = selectedImages.indexOf(imageToView);
                  handleDeleteImage(indexToRemove);
                  setShowImageModal(false);
                }}
                className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700"
              >
                Delete Image
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadProductModal;
