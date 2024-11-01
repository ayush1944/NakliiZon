import React, { useState } from 'react';

const SettingsPage = () => {
  const [accountSettings, setAccountSettings] = useState({
    username: 'admin',
    email: 'admin@example.com',
  });
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
  });
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: true,
    password: '',
    confirmPassword: '',
  });

  const handleAccountChange = (e) => {
    setAccountSettings({ ...accountSettings, [e.target.name]: e.target.value });
  };

  const handleNotificationsChange = (e) => {
    setNotifications({ ...notifications, [e.target.name]: e.target.checked });
  };

  const handleSecurityChange = (e) => {
    setSecuritySettings({ ...securitySettings, [e.target.name]: e.target.value });
  };

  const saveSettings = () => {
    // Logic to save settings, such as API calls
    alert('Settings saved!');
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6 text-gray-700">Settings</h2>

      {/* Account Settings */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-2xl font-semibold mb-4 text-gray-700">Account Settings</h3>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              name="username"
              value={accountSettings.username}
              onChange={handleAccountChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={accountSettings.email}
              onChange={handleAccountChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </form>
      </div>

      {/* Notification Settings */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h3 className="text-2xl font-semibold mb-4 text-gray-700">Notification Settings</h3>
        <form>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="emailNotifications"
                checked={notifications.emailNotifications}
                onChange={handleNotificationsChange}
                className="mr-2"
              />
              Email Notifications
            </label>
          </div>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="smsNotifications"
                checked={notifications.smsNotifications}
                onChange={handleNotificationsChange}
                className="mr-2"
              />
              SMS Notifications
            </label>
          </div>
        </form>
      </div>

      {/* Security Settings */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-2xl font-semibold mb-4 text-gray-700">Security Settings</h3>
        <form>
          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="twoFactorAuth"
                checked={securitySettings.twoFactorAuth}
                onChange={(e) => setSecuritySettings({ ...securitySettings, twoFactorAuth: e.target.checked })}
                className="mr-2"
              />
              Enable Two-Factor Authentication
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">New Password</label>
            <input
              type="password"
              name="password"
              value={securitySettings.password}
              onChange={handleSecurityChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={securitySettings.confirmPassword}
              onChange={handleSecurityChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </form>
      </div>

      {/* Save Button */}
      <button
        onClick={saveSettings}
        className="bg-[#44655a] text-white p-3 rounded-lg mt-6 w-full"
      >
        Save Settings
      </button>
    </div>
  );
};

export default SettingsPage;
