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

  const handlePageChange = (path) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false); // Cache le loader après le changement de page
      navigate(path); // Redirection vers la nouvelle page
    }, 1000); // Simule un délai de 1 seconde
  };

  const handleToggleSidebar = () => {
    setIsOpen(!isOpen); // Ouvre/Ferme le sidebar
  };

  return (
    <div className="relative">
      {/* Bouton pour ouvrir/fermer le sidebar */}
      <button onClick={handleToggleSidebar} className="p-4 text-gray-800 fixed z-50">
        {isOpen ? <FaTimes size={24} className="text-white" /> : <FaBars size={24} />}
      </button>

      {/* Overlay semi-transparent */}
      {isOpen && (
        <div
          onClick={handleToggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
        />
      )}

      {/* Sidebar rétractable */}
      <motion.aside
        initial={{ width: 0 }}
        animate={{ width: isOpen ? '70%' : 0 }} // Mobile : 70% de largeur lorsqu'il est ouvert
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="fixed top-0 left-0 bg-gray-800 text-white h-full z-50 flex flex-col overflow-hidden !md:w-[30%] !lg:w-[30%]" // Définit la largeur à 30% pour md et lg
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
          <h1 className="text-xl font-bold uppercase">Admin Panel</h1>
        </div>

        {/* Menu du sidebar */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => handlePageChange('/admin_phoenixac/dashboard')}
                className="flex items-center space-x-3 py-2 px-4 rounded hover:bg-gray-700 w-full text-left"
              >
                <FaNewspaper size={20} /> <span>Actus</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => handlePageChange('/admin_phoenixac/comments')}
                className="flex items-center space-x-3 py-2 px-4 rounded hover:bg-gray-700 w-full text-left"
              >
                <FaComment size={20} /> <span>Commentaires</span>
              </button>
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

      {/* Loader lors de la déconnexion ou changement de page */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="flex flex-col items-center">
            <div className="loader border-t-4 border-b-4 border-white rounded-full w-16 h-16 animate-spin"></div>
            <p className="text-white mt-4 text-lg">Chargement...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
