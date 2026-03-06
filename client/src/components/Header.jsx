import React from "react";

export default function Header({ user, onLogout }) {
  return (
    <div className="max-w-4xl mx-auto flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-800">
        Welcome, {user?.name}
      </h1>
      <button
        onClick={onLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg font-semibold"
      >
        Logout
      </button>
    </div>
  );
}
