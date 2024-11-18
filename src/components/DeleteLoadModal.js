import React from 'react';
import { FaTrashAlt } from 'react-icons/fa';

const DeleteLoadModal = ({ isOpen, load, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-1/3">
        <h2 className="text-xl mb-4 text-red-500">Are you sure you want to delete this load?</h2>
        
        <div className="mb-4">
          <p><strong>Load ID:</strong> {load.load._id}</p>
          <p><strong>From:</strong> {load.from_location}</p>
          <p><strong>To:</strong> {load.to_location}</p>
        </div>

        <div className="mt-4 flex justify-end gap-4">
          <button className="px-4 py-2 text-gray-700" onClick={onClose}>
            Cancel
          </button>
          <button
            className="px-4 py-2 text-red-500"
            onClick={onDelete}
          >
            <FaTrashAlt /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteLoadModal;
