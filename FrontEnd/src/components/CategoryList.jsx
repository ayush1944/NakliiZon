import React, { useEffect, useState } from 'react';
import SummeryApi from '../common';
import { Link } from 'react-router-dom';

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]);
  const [loading,setLoading] = useState(false)  

  const fetchCategoryProduct = async ()=>{
    setLoading(true)
    const response = await fetch(SummeryApi.categoryProduct.url)
    const dataResponse = await response.json()
    setLoading(false)
    setCategoryProduct(dataResponse.data)
  }

  useEffect(()=>{
    fetchCategoryProduct()
  },[])

  return (
    <div className='container mx-auto p-4'>
      <div className='flex justify-between items-center overflow-scroll scorllbar-none gap-4'> 
        {
          loading ?(
            <div>
              <div className='h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 animate-pulse '>
              </div>
              <p className='text-center hover:text-blue-600 text-sm md:text-base capitalize'> Categories</p>
            </div>
          )
          :
          (
            categoryProduct.map((product,index)=>{
              return(
                  <div key={index} className=''>
                    <Link to={"/product-category?category="+product?.category}  className='cursor-pointer '>
                      <div className='h-16 w-16 md:w-20 md:h-20 rounded-full p-4 bg-slate-200 overflow-hidden '>
                        <img src={product?.productImage[0].secure_url} alt={product.category} className='h-full w-full hover:scale-125 transition-all duration-300 object-scale-down  mix-blend-multiply' />
                      </div>
                      <p className='text-center hover:text-blue-600 text-sm md:text-base capitalize'>{product.category}</p>
                    </Link>
                  </div>
              )})
          )
        }
      </div>
    </div>
  );
};

export default CategoryList;
