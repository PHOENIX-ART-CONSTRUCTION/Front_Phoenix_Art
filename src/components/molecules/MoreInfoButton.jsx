import React from 'react';

export const MoreInfoButton = ({ onClick }) => {
  return (
    <div className="flex justify-center my-8">
      <button
        onClick={onClick}
        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg transform transition duration-500 ease-in-out hover:scale-105 hover:bg-gradient-to-r hover:from-blue-600 hover:via-gray-500 hover:to-indigo-600 hover:shadow-xl"
      >
        En savoir plus
      </button>
    </div>
  );
};
