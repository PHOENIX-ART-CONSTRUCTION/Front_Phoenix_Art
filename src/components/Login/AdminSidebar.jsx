// src/components/AdminSidebar.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes, FaNewspaper, FaComment, FaSignOutAlt } from 'react-icons/fa';

const AdminSidebar = () => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Pour l'état rétractable du sidebar
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoading(true); // Affiche le loader
    setTimeout(() => {
      setLoading(false); // Cache le loader
      navigate('/'); // Redirection vers la page d'accueil
    }, 2000); // Simule un délai de 2 secondes avant la redirection
  };

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen); // Ouvre/Ferme le sidebar
  };

  return (
    <div className="relative flex">
      {/* Bouton pour ouvrir/fermer le sidebar */}
      <button onClick={handleToggleSidebar} className="p-4 text-gray-800 bg-white fixed z-50">
        {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Sidebar rétractable */}
      <motion.aside
        initial={{ width: 0 }}
        animate={{ width: isOpen ? 250 : 0 }} // Largeur du sidebar rétractable
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="bg-gray-800 text-white min-h-screen flex flex-col overflow-hidden"
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>

        {/* Menu du sidebar */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link
                to="/admin_phoenixac/dashboard"
                className="flex items-center space-x-3 py-2 px-4 rounded hover:bg-gray-700"
              >
                <FaNewspaper size={20} /> <span>Actus</span>
              </Link>
            </li>
            <li>
              <Link
                to="/admin_phoenixac/comments"
                className="flex items-center space-x-3 py-2 px-4 rounded hover:bg-gray-700"
              >
                <FaComment size={20} /> <span>Commentaires</span>
              </Link>
            </li>
            {/* Bouton Déconnexion */}
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-3 w-full text-left py-2 px-4 rounded hover:bg-gray-700"
              >
                <FaSignOutAlt size={20} /> <span>Déconnexion</span>
              </button>
            </li>
          </ul>
        </nav>
      </motion.aside>

      {/* Loader lors de la déconnexion */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="flex flex-col items-center">
            <div className="loader border-t-4 border-b-4 border-white rounded-full w-16 h-16 animate-spin"></div>
            <p className="text-white mt-4 text-lg">Déconnexion...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
