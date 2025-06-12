import React from 'react';

const TabButton = ({ id, label, count, activeTab, onClick }) => {
  return (
    <button
      key={id}
      onClick={() => onClick(id)}
      className={`px-6 py-3 text-sm font-medium rounded-lg transition-colors ${
        activeTab === id
          ? 'bg-primary text-white'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
      }`}
    >
      {label} ({count})
    </button>
  );
};

export default TabButton;