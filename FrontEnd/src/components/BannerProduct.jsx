import React, { useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Icons for navigation
import { Link } from 'react-router-dom';
import image1 from '../assest/banner/img1.webp'
import image2 from '../assest/banner/img2.webp'
import image3 from '../assest/banner/img3.jpg'
import image4 from '../assest/banner/img4.jpg'
import image5 from '../assest/banner/img5.webp'


import image1Mobile from '../assest/banner/img1_mobile.jpg'
import image2Mobile from '../assest/banner/img2_mobile.webp'
import image3Mobile from '../assest/banner/img3_mobile.jpg'
import image4Mobile from '../assest/banner/img4_mobile.jpg'
import image5Mobile from '../assest/banner/img5_mobile.png'

const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0);

    const desktopImages = [
        { src: image1, link: '/product/1' },
        { src: image2, link: '/product/2' },
        { src: image3, link: '/product/3' },
        { src: image4, link: '/product/4' },
        { src: image5, link: '/product/5' }
    ];

    const mobileImages = [
        { src: image1Mobile, link: '/product/1' },
        { src: image2Mobile, link: '/product/2' },
        { src: image3Mobile, link: '/product/3' },
        { src: image4Mobile, link: '/product/4' },
        { src: image5Mobile, link: '/product/5' }
    ];

    const nextImage = () => {
        if (desktopImages.length - 1 > currentImage) {
            setCurrentImage(prev => prev + 1);
        }
    };

    const prevImage = () => {
        if (currentImage !== 0) {
            setCurrentImage(prev => prev - 1);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (desktopImages.length - 1 > currentImage) {
                nextImage();
            } else {
                setCurrentImage(0);
            }
        }, 5000); // Automatically switch every 5 seconds

        return () => clearInterval(interval);
    }, [currentImage]);

    return (
        <div className="container mx-auto px-4 rounded mt-20">
            <div className="h-56 md:h-72 w-full bg-gray-100 relative overflow-hidden rounded-lg shadow-lg">

                {/* Desktop & Tablet Navigation */}
                <div className="absolute z-10 h-full w-full md:flex items-center justify-between hidden">
                    <button onClick={prevImage} className="bg-black/0 shadow-lg rounded-full p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 transition">
                        <FaChevronLeft size={24} />
                    </button>
                    <button onClick={nextImage} className="bg-white/0 shadow-lg rounded-full p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 transition">
                        <FaChevronRight size={24} />
                    </button>
                </div>

                {/* Desktop & Tablet Banner */}
                <div className=" cursor-pointer hidden md:flex h-full w-full overflow-hidden">
                    {
                        desktopImages.map((imageObj, index) => (
                            <Link to={`/product`} key={imageObj.src} className=" w-full h-full min-w-full min-h-full transition-transform duration-500  cursor-pointer" style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                <img src={imageObj.src} alt={`Banner ${index + 1}`} className="w-full h-full object-cover cur" />
                            </Link>
                        ))
                    }
                </div>

                {/* Mobile Version */}
                <div className="flex h-full w-full overflow-hidden md:hidden">
                    {
                        mobileImages.map((imageObj, index) => (
                            <Link to={`/product`} key={imageObj.src} className="w-full h-full min-w-full min-h-full transition-transform duration-500" style={{ transform: `translateX(-${currentImage * 100}%)` }}>
                                <img src={imageObj.src} alt={`Mobile Banner ${index + 1}`} className="w-full h-full object-cover" />
                            </Link>
                        ))
                    }
                </div>

            </div>
        </div>
    );
};

export default BannerProduct;
