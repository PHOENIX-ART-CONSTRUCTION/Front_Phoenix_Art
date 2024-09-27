// src/components/AdminSidebar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen flex flex-col">
      <div className="flex items-center justify-center h-16 border-b border-gray-700">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <li>
            <Link to="/admin_phoenixac/dashboard" className="block py-2 px-4 rounded hover:bg-gray-700">
              Actus
            </Link>
          </li>
          <li>
            <Link to="/admin_phoenixac/comments" className="block py-2 px-4 rounded hover:bg-gray-700">
              Commentaires
            </Link>
          </li>
          {/* Ajoute d'autres liens si nécessaire */}
          <li>
            <button 
              onClick={handleLogout} 
              className="block w-full text-left py-2 px-4 rounded hover:bg-gray-700"
            >
              Déconnexion
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
