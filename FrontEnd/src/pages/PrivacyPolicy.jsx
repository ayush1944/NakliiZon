import React from 'react';

const Privacy = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <div className="max-w-2xl bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center mb-4">Privacy Policy</h1>
                <p className="text-gray-700 text-lg mb-4">
                    At NakliZon, we are committed to protecting your privacy. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our website or make a purchase from us.
                </p>
                <p className="text-gray-700 text-lg mb-4">
                    <strong>Information We Collect:</strong>
                    <ul className="list-disc list-inside mb-4">
                        <li>Personal information (name, email, address, etc.) when you create an account or make a purchase.</li>
                        <li>Payment information processed through secure payment gateways.</li>
                        <li>Non-personal information (cookies, browser type, IP address, etc.) for analytical purposes.</li>
                    </ul>
                </p>
                <p className="text-gray-700 text-lg mb-4">
                    <strong>How We Use Your Information:</strong>
                    <ul className="list-disc list-inside mb-4">
                        <li>To process and fulfill your orders.</li>
                        <li>To communicate with you about your account and orders.</li>
                        <li>To improve our website and customer service.</li>
                    </ul>
                </p>
                <p className="text-gray-700 text-lg mb-4">
                    <strong>Your Rights:</strong>
                    <ul className="list-disc list-inside mb-4">
                        <li>You have the right to access, update, or delete your personal information.</li>
                        <li>You have the right to request that we do not sell or share your information with third parties.</li>
                    </ul>
                </p>
                <p className="text-gray-700 text-lg mb-4">
                    If you have any questions about this Privacy Policy, please contact us at support@naklizon.com.
                </p>
                <p className="text-gray-700 text-lg mb-4">
                    <strong>Effective Date:</strong> This policy is effective as of [Insert Date].
                </p>
            </div>
        </div>
    );
}

export default Privacy;
