import React, { useState } from "react";

export default function Header({ user, onLogout }) {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const confirmLogout = () => {
    setShowLogoutModal(false);
    onLogout();
  };

  return (
    <>
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {user?.name}
        </h1>

        <button
          onClick={() => setShowLogoutModal(true)}
          className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold"
        >
          Logout
        </button>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-80 text-center">
            <h3 className="text-lg font-semibold mb-3">Logout Confirmation</h3>

            <p className="text-gray-600 mb-5">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={confirmLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Logout
              </button>

              <button
                onClick={() => setShowLogoutModal(false)}
                className="bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
