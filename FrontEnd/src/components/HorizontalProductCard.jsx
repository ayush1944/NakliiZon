import React, { useContext, useEffect, useRef, useState } from 'react';
import fetchCategoryWiseProduct from '../helper/fetchCategoryWiseProduct';
import displayINRCurrency from '../helper/currency';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { Link } from 'react-router-dom';
import addToCart from '../helper/addToCart';
import Context from '../context';

const HorizontalCardProduct = ({ category, heading }) => {
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
    }, [category]);

    const scrollRight = () => {
        scrollElement.current.scrollBy({
            left: 300,
            behavior: 'smooth',
        });
    };

    const scrollLeft = () => {
        scrollElement.current.scrollBy({
            left: -300,
            behavior: 'smooth',
        });
    };

    return (
        <div className='container mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-semibold py-4'>{heading}</h2>
            <div
                className='flex items-center gap-4 md:gap-6 overflow-x-scroll scorllbar-none transition-all duration-300'
                ref={scrollElement}
                style={{ scrollBehavior: 'smooth' }}
            >
                <button
                    className='hidden md:flex items-center justify-center absolute left-0 z-10 w-10 h-10 bg-black/30 hover:bg-black/50 text-slate-50 opacity-30 hover:opacity-70 text-2xl rounded-full transition-all shadow-lg backdrop-blur-sm'
                    onClick={scrollLeft}
                >
                    <FaAngleLeft />
                </button>
                <button
                    className='bg-white p-1 opacity-25 hover:opacity-70 right-0 text-2xl  hidden md:flex items-center justify-center absolute  z-10 w-10 h-10  bg-black/30 hover:bg-black/50 text-white rounded-full transition-all shadow-lg backdrop-blur-sm'
                    onClick={scrollRight}
                >
                    <FaAngleRight />
                </button>

                {loading
                    ? loadingList.map((_, index) => (
                        <div
                            key={index}
                            className='w-full min-w-[280px] md:min-w-[300px] lg:min-w-[320px] max-w-[280px] md:max-w-[300px] lg:max-w-[320px] h-36 bg-white rounded-sm shadow flex'
                        >
                            <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'></div>
                            <div className='p-4 grid w-full gap-2'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'></h2>
                                <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                                <div className='flex gap-3 w-full'>
                                    <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                    <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                </div>
                                <button className='text-sm text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse'></button>
                            </div>
                        </div>
                    ))
                    : data.map((product, index) => (
                        <Link
                            key={index}
                            to={"product/" + product?._id}
                            className='w-full min-w-[280px] md:min-w-[320px] lg:min-w-[340px] max-w-[280px] md:max-w-[300px] lg:max-w-[320px] h-36 bg-white rounded-sm shadow flex'
                        >
                            <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                                <img
                                    src={product.productImage[0].secure_url}
                                    className='object-scale-down h-full hover:scale-110 transition-all'
                                    alt={product.productName}
                                />
                            </div>
                            <div className='p-4 mx-auto w-full grid '>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>
                                    {product?.productName}
                                </h2>
                                <p className='capitalize text-slate-500'>
                                    {product?.category}
                                </p>
                                <div className='flex md:gap-3 '>
                                    <p className='text-red-600 font-medium'>
                                        {displayINRCurrency(product?.sellingPrice)}
                                    </p>
                                    <p className='text-slate-500 line-through opacity-0 md:opacity-100  '>
                                        {displayINRCurrency(product?.price)}
                                    </p>
                                </div>
                                <button
                                    className='mt-1 text-sm  right-0  bg-red-600 hover:bg-red-700 text-white w-32 md:px-3 md:py-0.5 rounded-full'
                                    onClick={(e) => handleAddToCart(e, product?._id)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </Link>
                    ))}
            </div>
        </div>
    );
};

export default HorizontalCardProduct;
