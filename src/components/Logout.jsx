// LogoutModal.js
import React from 'react';

const LogoutModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0   flex justify-center items-center z-40">
      <div className="bg-green-200 p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Confirm Logout</h2>
        <p>Are you sure you want to log out?</p>
        <div className="flex justify-end mt-4">
          <button onClick={onClose} className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
