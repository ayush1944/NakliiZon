import React from 'react';
import CategoryList from '../components/CategoryList';
import BannerProduct from '../components/BannerProduct';
import HorizontalCardProduct from '../components/HorizontalProductCard';
import VerticalProductCard from '../components/VerticalProductCard';

const Home = () => {
  return (
    <div className="home-page px-4 lg:px-8 ">
      {/* Hero Banner Section */}
      <div className="mb-6">
        <BannerProduct />
      </div>

      {/* Categories List */}
      <div className="mb-8">
        <CategoryList />
      </div>

      {/* Horizontal Scrolling Sections for Specific Categories */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Top AirPods</h2>
        <HorizontalCardProduct category="Airpodes" />
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Popular Earphones</h2>
        <HorizontalCardProduct category="Earphones" />
      </section>

      {/* Grid Layout for Other Product Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <VerticalProductCard category="Mobiles" heading="Top Mobiles" />
        <VerticalProductCard category="Watches" heading="Top Watches" />
        <VerticalProductCard category="Speakers" heading="Top Speakers" />
        <VerticalProductCard category="Televisions" heading="Top Televisions" />
        <VerticalProductCard category="Camera" heading="Top Cameras" />
        <VerticalProductCard category="Refrigerator" heading="Top Refrigerator" />
        <VerticalProductCard category="Mouse" heading="Top Mouse" />
        <VerticalProductCard category="Trimmers" heading="Top Trimmers" />
        <VerticalProductCard category="Processor" heading="Top Processor" />
        <VerticalProductCard category="Printers" heading="Top Printers" />
      </div>
    </div>
  );
};

export default Home;
