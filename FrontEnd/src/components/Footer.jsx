import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-6">
            <h5 className="text-lg font-bold mb-4">NakliZon Shop</h5>
            <p className="text-sm">
              Providing the best products and services to make your shopping experience exceptional.
            </p>
          </div>
          <div className="w-full md:w-1/3 mb-6">
            <h5 className="text-lg font-bold mb-4">Links</h5>
            <ul className="list-none space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 mb-6">
            <h5 className="text-lg font-bold mb-4">Contact Us</h5>
            <p className="text-sm">
              123 Market Street, Suite 100<br />
              Anytown, AN 12345<br />
              Email: <a href="mailto:info@naklizon.com" className="text-gray-400 hover:text-white">info@naklizon.com</a><br />
              Phone: (123) 456-7890
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 pt-4 mt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} NakliZon Shop. All rights reserved. <br />
            Made with ♥ by Ayush
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
