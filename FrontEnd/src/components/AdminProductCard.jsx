import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayCurrency from '../helper/currency';
import { MdDelete } from "react-icons/md";
import DeleteConfirmationModal from './DeleteConfirmationModal';
import SummeryApi from '../common';
import { toast } from 'react-toastify';


const AdminProductCard = ({data,fetchdata})=> {
    const [editProduct,setEditProduct] = useState(false)

    const [showDeleteModal, setShowDeleteModal] = useState(false);
  // Function to handle delete product
  const handleDeleteProduct = async (e) => {
    e.preventDefault();
    const response = await fetch(SummeryApi.deleteProduct.url, {
        method: SummeryApi.deleteProduct.method,
        credentials: 'include',
        headers: {
        'content-type': 'application/json',
      },
        body: JSON.stringify(data),
      });

    const responseData = await response.json();
    if (responseData.success) {
        toast.success(responseData?.message);
        setShowDeleteModal(false);
        fetchdata()
      } else if (responseData.error) {
        toast.error(responseData.message);
      }
    };

  return (
    <div  className="bg-white p-4 border border-gray-200 rounded shadow-sm hover:shadow-lg transition-shadow">
        <img 
        src={data.productImage?.[0]?.secure_url || '/placeholder-image.png'} 
        alt={data.name} 
        className="w-full h-48 object-contain mb-2 rounded" 
        />
        <div className='flex justify-between items-center'>
            <div className='overflow-hidden'>
                <h2 className="font-semibold hover:text-slate-900 text-slate-700 cursor-pointer text-lg truncate text-ellipsis">{data.productName}</h2>
                <div className="text-sm text-black font-extrabold ">
                    {
                        displayCurrency(data.sellingPrice)
                    }
                </div>
                <p className="text-sm font-semibold text-gray-600">Category: <span className='font-semibold text-slate-500 hover:text-slate-900 cursor-pointer'>{data.category}</span></p>
            </div>
                    <div className='flex flex-col gap-1 '>
                    <button className=" h-full flex items-center justify-center p-2 text-2xl rounded-full cursor-pointer hover:bg-[#0056b3] hover:text-white transition-all duration-300"
            onClick={()=>setEditProduct(true)}>
                <MdEdit />
            </button>
            <button className=" h-full p-2 hover:text-white text-2xl rounded-full cursor-pointer hover:bg-[#c82333] transition-all duration-300"
            onClick={() => setShowDeleteModal(true)}>
                <MdDelete />
            </button>
                    </div>
        </div>

    {/* Admin Edit Product */}
        {
            editProduct && <AdminEditProduct fetchdata={fetchdata} productData={data} onClose={()=>setEditProduct(false)}
            />
        }

    
      {/* Delete Confirmation Modal */}
      {
        showDeleteModal && (
          <DeleteConfirmationModal
            onConfirm={handleDeleteProduct}
            onCancel={() => setShowDeleteModal(false)}
          />
        )
      }
    </div>
  )
}

export default AdminProductCard
