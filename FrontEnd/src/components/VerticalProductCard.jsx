import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helper/fetchCategoryWiseProduct';
import displayINRCurrency from '../helper/currency';
import { FaAngleLeft, FaAngleRight, FaShoppingCart, FaBolt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import addToCart from '../helper/addToCart';
import Context from '../context';

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const loadingList = new Array(13).fill(null);

  const scrollElement = useRef();

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e, id) => {
    await addToCart(e, id);
    fetchUserAddToCart();
  };

  const fetchData = async () => {
    setLoading(true);
    const categoryProduct = await fetchCategoryWiseProduct(category);
    setLoading(false);
    setData(categoryProduct?.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const scrollRight = () => {
    scrollElement.current.scrollLeft += 344;
  };
  const scrollLeft = () => {
    scrollElement.current.scrollLeft -= 344;
  };

  return (
    <div className='container mx-auto px-4 my-6 relative'>
      <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
      <div className='relative'>
        {/* Scroll Buttons for Desktop */}
        <button
          className='hidden md:flex items-center justify-center absolute top-[40%] z-10 w-10 left-2 h-10 bg-black/30 hover:bg-black/50 text-white opacity-30 hover:opacity-70 text-2xl rounded-full transition-all shadow-lg  backdrop-blur-sm'
          onClick={scrollLeft}
        >
          <FaAngleLeft />
        </button>
        <button
          className='hidden md:flex items-center justify-center absolute top-[40%] right-2 z-10 w-10 h-10 bg-black/30 hover:bg-black/50 text-white opacity-30 hover:opacity-70 text-2xl rounded-full transition-all shadow-lg backdrop-blur-sm'
          onClick={scrollRight}
        >
          <FaAngleRight />
        </button>

        {/* Product List */}
        <div
          className='flex gap-6 overflow-x-scroll scorllbar-none transition-all'
          ref={scrollElement}
        >
          {loading
            ? loadingList.map((_, index) => (
                <div
                  key={index}
                  className='min-w-[280px] md:min-w-[320px] bg-white rounded-lg shadow-lg p-4 animate-pulse'
                >
                  <div className='bg-slate-200 h-48 w-full rounded-lg mb-4'></div>
                  <div className='h-6 bg-slate-200 rounded-full mb-2'></div>
                  <div className='h-4 bg-slate-200 rounded-full mb-2'></div>
                  <div className='h-6 bg-slate-200 rounded-full'></div>
                </div>
              ))
            : data.map((product, index) => (
                <Link
                  key={index}
                  to={'/product/'+ product?._id}
                  className='min-w-[280px] md:min-w-[320px] bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow p-4'
                >
                  <div className='relative group'>
                    <img
                      src={product.productImage[0]?.secure_url}
                      alt={product?.productName}
                      className='w-full h-48 object-scale-down scale-75 rounded-lg mb-4 group-hover:scale-90 transition-transform duration-500'
                      loading='lazy'
                    />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <h2 className='font-medium text-lg text-black truncate'>{product?.productName}</h2>
                    <p className='text-slate-500 capitalize'>{product?.category}</p>
                    <div className='flex items-center gap-2'>
                      <p className='text-red-600 font-medium'>{displayINRCurrency(product?.sellingPrice)}</p>
                      <p className='text-slate-500 line-through'>{displayINRCurrency(product?.price)}</p>
                    </div>
                    <div className='flex flex-col md:flex-row gap-2'>
                      <button
                        className='flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-1.5 px-4 rounded-full w-full md:w-auto transition'
                        onClick={(e) => handleAddToCart(e, product?._id)}
                      >
                        <FaShoppingCart /> Add to Cart
                      </button>
                      <button
                        className='flex items-center justify-center gap-2 bg-orange-600 hover:bg-orange-700 text-white py-1.5 px-4 rounded-full w-full md:w-auto transition'
                        onClick={(e) => handleAddToCart(e, product?._id)}
                      >
                        <FaBolt /> Buy Now
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
        </div>
      </div>
    </div>
  );
};

export default VerticalCardProduct;
