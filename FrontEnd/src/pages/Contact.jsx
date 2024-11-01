import React, { useState } from 'react';

const Contact = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you can handle form submission logic (e.g., send to API)

        // For demonstration purposes, we will just show a success message
        setSuccessMessage('Thank you for your message! We will get back to you soon.');
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div className="bg-gray-100 text-gray-800 mt-16">
            {/* Header Section */}
            <header className="bg-gray-800 text-white p-4">
                <h1 className="text-2xl font-bold">Contact Us</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li><a href="/" className="hover:text-gray-400">Home</a></li>
                        <li><a href="/about" className="hover:text-gray-400">About Us</a></li>
                        <li><a href="/product-category" className="hover:text-gray-400">Products</a></li>
                    </ul>
                </nav>
            </header>

            {/* Main Content */}
            <main className="container mx-auto p-6">
                <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                <p className="mb-6">We would love to hear from you! Please fill out the form below to reach out to us.</p>

                {/* Success Message */}
                {successMessage && (
                    <div className="bg-green-100 text-green-700 p-4 rounded mb-4">
                        {successMessage}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                            Message
                        </label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            rows="4"
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="bg-gray-800 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline"
                    >
                        Send Message
                    </button>
                </form>
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

export default Contact;

