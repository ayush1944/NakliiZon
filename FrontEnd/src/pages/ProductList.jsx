import React from 'react';

const products = [
  {
    id: 1,
    name: 'Product 1',
    price: '$25.99',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Product 2',
    price: '$19.99',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Product 3',
    price: '$35.00',
    image: 'https://via.placeholder.com/150',
  },
];

const ProductList = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="border p-4 text-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-4"
              />
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-gray-600">{product.price}</p>
              <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-full hover:bg-blue-700">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
