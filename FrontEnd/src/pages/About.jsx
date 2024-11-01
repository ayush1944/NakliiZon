import React from 'react';

const About = () => {
    return (
        <div className="bg-gray-100 text-gray-800 mt-16">
            {/* Header Section */}
            <header className="bg-gray-800 text-white p-4">
                <h1 className="text-2xl font-bold">About Us</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li><a href="/" className="hover:text-gray-400">Home</a></li>
                        <li><a href="/product-category" className="hover:text-gray-400">Products</a></li>
                        <li><a href="/contact" className="hover:text-gray-400">Contact</a></li>
                    </ul>
                </nav>
            </header>

            {/* Main Content */}
            <main className="container mx-auto p-6">
                <section className="mb-8">
                    <h2 className="text-3xl font-bold mb-4">Welcome to NakliZon</h2>
                    <p className="text-lg">At NakliZon, we are dedicated to bringing you the finest products with quality and care. Our mission is to provide our customers with the best online shopping experience possible.</p>
                </section>

                <section className="mb-8">
                    <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
                    <p>To offer high-quality products that enhance the lives of our customers while providing exceptional service.</p>
                </section>

                <section className="mb-8">
                    <h3 className="text-2xl font-semibold mb-2">Our Story</h3>
                    <p>NakliZon was founded in [Year] by [Founder Name]. With a passion for [Industry/Field], we set out to create a platform where customers can easily find and purchase [Product Type]. Over the years, we have grown into a trusted name in the industry, known for our commitment to quality and customer satisfaction.</p>
                </section>

                <section className="mb-8">
                    <h3 className="text-2xl font-semibold mb-2">Our Values</h3>
                    <ul className="list-disc list-inside">
                        <li>Quality: We prioritize quality in everything we do.</li>
                        <li>Customer Focus: Our customers are at the heart of our business.</li>
                        <li>Integrity: We believe in being honest and transparent in all our dealings.</li>
                        <li>Innovation: We constantly seek new ways to improve our products and services.</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-2xl font-semibold mb-2">Meet the Team</h3>
                    <p>Our team is made up of dedicated professionals who are passionate about what they do. Together, we work hard to ensure that you have the best experience possible with NakliZon.</p>
                </section>
            </main>

            {/* Footer Section */}
            <footer className="bg-gray-800 text-white p-4 mt-8">
                <p>&copy; 2024 NakliZon. All rights reserved.</p>
                <div className="flex space-x-4">
                    <a href="#" className="hover:text-gray-400">Facebook</a>
                    <a href="#" className="hover:text-gray-400">Twitter</a>
                    <a href="#" className="hover:text-gray-400">Instagram</a>
                </div>
            </footer>
        </div>
    );
}

export default About;
