import React, { useState } from 'react';

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative">
      {/* Images */}
      <img 
        src={images[currentIndex]?.secure_url} 
        alt="Product" 
        className="w-full h-64 object-contain" 
      />
      
      {/* Previous Button */}
      <button 
        onClick={goToPrevious} 
        className="absolute -left-4 top-1/2 transform -translate-y-1/2 text-2xl text-black">
        ❮
      </button>

      {/* Next Button */}
      <button 
        onClick={goToNext} 
        className="absolute -right-4 top-1/2 transform -translate-y-1/2 text-2xl text-black">
        ❯
      </button>

      {/* Indicators */}
      <div className="flex justify-center mt-2">
        {images.map((_, index) => (
          <div 
            key={index} 
            onClick={() => setCurrentIndex(index)} 
            className={`w-2 h-2 mx-1 rounded-full cursor-pointer ${currentIndex === index ? 'bg-gray-900' : 'bg-gray-400'}`}>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
