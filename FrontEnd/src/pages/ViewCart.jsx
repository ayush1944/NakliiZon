import React, { useContext, useEffect, useState } from 'react';
import SummeryApi from '../common';
import Context from '../context';
import displayINRCurrency from '../helper/currency';

const Cart = () => {
    const [data, setData] = useState([]);
    const [savedData, setSavedData] = useState([]); // For saved for later items
    const [loading, setLoading] = useState(false);
    const [discount, setDiscount] = useState(10); // Assuming a default 10% discount
    const [shippingFee, setShippingFee] = useState(50); // Flat shipping fee for simplicity
    const [taxRate] = useState(0.18); // Assuming 18% tax rate
    const context = useContext(Context);
    const loadingCart = new Array(context.cartProductCount).fill(null);

    // Fetching cart data
    const fetchData = async () => {
        const response = await fetch(SummeryApi.viewAddToCartProduct.url, {
            method: SummeryApi.viewAddToCartProduct.method,
            credentials: 'include',
            headers: { "content-type": 'application/json' },
        });

        const responseData = await response.json();
        if (responseData.success) {
            setData(responseData.data);
        }
    };

    // Fetch saved for later items
    const fetchSavedForLaterData = async () => {
        const response = await fetch(SummeryApi.viewSavedForLater.url, {
            method: SummeryApi.viewSavedForLater.method,
            credentials: 'include',
            headers: { "content-type": 'application/json' },
        });

        const responseData = await response.json();
        if (responseData.success) {
            setSavedData(responseData.data);
        }
    };

    const handleLoading = async () => {
        await fetchData();
        await fetchSavedForLaterData();
    };

    useEffect(() => {
        setLoading(true);
        handleLoading();
        setLoading(false);
    }, []);

    // Increase quantity of a product
    const increaseQty = async (id, qty) => {
        const response = await fetch(SummeryApi.updateAddToCartProduct.url, {
            method: SummeryApi.updateAddToCartProduct.method,
            credentials: 'include',
            headers: { "content-type": 'application/json' },
            body: JSON.stringify({ _id: id, quantity: qty + 1 }),
        });

        const responseData = await response.json();
        if (responseData.success) fetchData();
    };

    // Decrease quantity of a product (cannot go below 1)
    const decreaseQty = async (id, qty) => {
        if (qty > 1) {
            const response = await fetch(SummeryApi.updateAddToCartProduct.url, {
                method: SummeryApi.updateAddToCartProduct.method,
                credentials: 'include',
                headers: { "content-type": 'application/json' },
                body: JSON.stringify({ _id: id, quantity: qty - 1 }),
            });

            const responseData = await response.json();
            if (responseData.success) fetchData();
        }
    };

    // Delete item from cart with confirmation
    const deleteCartProduct = async (id) => {
        if (window.confirm('Are you sure you want to remove this item from your cart?')) {
            const response = await fetch(SummeryApi.deleteAddToCartProduct.url, {
                method: SummeryApi.deleteAddToCartProduct.method,
                credentials: 'include',
                headers: { "content-type": 'application/json' },
                body: JSON.stringify({ _id: id }),
            });

            const responseData = await response.json();
            if (responseData.success) {
                fetchData();
                context.fetchUserAddToCart();
            }
        }
    };

    // Save item for later
    const saveForLater = async (id) => {
        const response = await fetch(SummeryApi.saveForLater.url, {
            method: SummeryApi.saveForLater.method,
            credentials: 'include',
            headers: { "content-type": 'application/json' },
            body: JSON.stringify({ _id: id }),
        });

        const responseData = await response.json();
        if (responseData.success) {
            fetchData();
            fetchSavedForLaterData();
        }
    };

    // Restore item from saved for later back to cart
    const restoreToCart = async (id) => {
        const response = await fetch(SummeryApi.restoreFromSaved.url, {
            method: SummeryApi.restoreFromSaved.method,
            credentials: 'include',
            headers: { "content-type": 'application/json' },
            body: JSON.stringify({ _id: id }),
        });

        const responseData = await response.json();
        if (responseData.success) {
            fetchSavedForLaterData();
            fetchData();
        }
    };

    // Calculating totals
    const totalQty = data.reduce((prev, curr) => prev + curr.quantity, 0);
    const totalPrice = data.reduce((prev, curr) => prev + (curr.quantity * curr?.productId?.sellingPrice), 0);
    const discountAmount = totalPrice * (discount / 100);
    const taxAmount = totalPrice * taxRate;
    const finalPrice = totalPrice - discountAmount + taxAmount + shippingFee;
    
    const calculateDiscountPercentage = (price, sellingPrice) => {
        if (price === 0) return 0; // Prevent division by zero
        return Math.round(((price - sellingPrice) / price) * 100);
    };



    return (
        <div className="container mt-20 px-4">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Your Shopping Cart</h1>
            <h2 className="text-2xl font-bold text-gray-700 mb-4">Review your items and proceed to checkout</h2>

            {data.length === 0 && !loading ? (
                <p className="bg-white py-5 text-center rounded shadow">Your cart is empty</p>
            ) : (
                <div className="flex flex-col lg:flex-row gap-10">
                    {/** Product Summary Section */}
                    <div className="w-full lg:w-2/3 overflow-y-scroll h-[80vh] scrollbar-none">
                        <h3 className="text-xl font-semibold mb-4">Cart Items</h3>
                        {loading ? (
                            loadingCart.map((_, index) => (
                                <div key={index} className="w-full bg-gray-200 h-32 mb-4 animate-pulse rounded"></div>
                            ))
                        ) : (
                            data.map((product) => (
                                <div key={product._id} className="bg-white p-4 rounded-lg shadow-md flex mb-4 transition-all duration-200 hover:shadow-xl">
                                    <img src={product?.productId?.productImage?.[0]?.secure_url} alt={product?.productId?.productName} className="w-24 h-24 object-cover rounded-md" />
                                    <div className="ml-4 flex-grow">
                                        <h4 className="font-semibold text-lg">{product?.productId?.productName}</h4>
                                        <p className="text-gray-500">{product?.productId?.category}</p>
                                        <div className='flex justify-between'>
                                        <div className="flex justify-between items-center mt-2 flex-col">
                                            <p className="text-gray-700 line-through font-semibold">{displayINRCurrency(product?.productId?.price)}</p>
                                            <p className="text-red-600 font-semibold">{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                            <span className="text-green-500 font-semibold ml-2">{calculateDiscountPercentage(product?.productId?.price, product?.productId?.sellingPrice)}% Off</span>
                                        </div>
                                        <div className="flex items-center mt-2 space-x-2 md:flex flex-col gap-2">
                                            <div>
                                            <button className="bg-gray-200 p-2 rounded transition hover:bg-gray-300 font-bold" onClick={() => decreaseQty(product?._id, product?.quantity)}>-</button>
                                            <span className="px-3">{product?.quantity}</span>
                                            <button className="bg-gray-200 p-2 rounded transition hover:bg-gray-300 font-bold" onClick={() => increaseQty(product?._id, product?.quantity)}>+</button>
                                            </div>
                                            <div className='flex gap-2 md:flex flex-col'>
                                                
                                            <button className="text-white p-2 rounded hover:bg-blue-700 bg-blue-600 text-nowrap" onClick={() => saveForLater(product?._id)}>
                                                Save for Later
                                            </button>
                                            <button className="text-white p-2 rounded hover:bg-red-700 text-nowrap bg-red-600" onClick={() => deleteCartProduct(product?._id)}>
                                                Remove Item
                                            </button>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}

                        {/** Saved for Later Section */}
                        {savedData.length > 0 && (
                            <div className="mt-6">
                                <h3 className="text-xl font-semibold mb-4">Saved for Later</h3>
                                {savedData.map((product) => (
                                    <div key={product._id} className="bg-white p-4 rounded-lg shadow-md flex mb-4 transition-all duration-200 hover:shadow-xl">
                                        <img src={product?.productId?.productImage?.[0]?.secure_url} alt={product?.productId?.productName} className="w-24 h-24 object-cover rounded-md" />
                                        <div className="ml-4 flex-grow">
                                            <h4 className="font-semibold text-lg">{product?.productId?.productName}</h4>
                                            <p className="text-gray-500">{product?.productId?.category}</p>
                                            <div className="flex justify-between items-center mt-2">
                                                <p className="text-red-600">{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                                <p className="font-semibold text-gray-800">{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                            </div>
                                            <button className="text-blue-600 hover:underline mt-2" onClick={() => restoreToCart(product?._id)}>
                                                Move to Cart
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/** Price Summary Section */}
                    <div className="w-full lg:w-1/3 bg-white p-4 rounded-lg shadow-md h-fit mb-8">
                        <h3 className="text-xl font-semibold mb-4">Price Summary</h3>
                        <div className="flex justify-between">
                            <span className="text-gray-700">Total Quantity:</span>
                            <span className="font-bold">{totalQty}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="text-gray-700">Subtotal:</span>
                            <span className="font-bold">{displayINRCurrency(totalPrice)}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="text-gray-700">Discount ({discount}%):</span>
                            <span className="font-bold text-red-600">-{displayINRCurrency(discountAmount)}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="text-gray-700">Tax (18%):</span>
                            <span className="font-bold text-green-600">+{displayINRCurrency(taxAmount)}</span>
                        </div>
                        <div className="flex justify-between mt-2">
                            <span className="text-gray-700">Shipping Fee:</span>
                            <span className="font-bold text-green-600">+{displayINRCurrency(shippingFee)}</span>
                        </div>
                        <div className="border-t mt-4 pt-2">
                            <div className="flex justify-between">
                                <span className="font-bold text-lg">Total Price:</span>
                                <span className="font-bold text-lg">{displayINRCurrency(finalPrice)}</span>
                            </div>
                        </div>
                        <button className="mt-4 bg-orange-600 text-white p-3 rounded-full w-full hover:bg-orange-700 transition">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;