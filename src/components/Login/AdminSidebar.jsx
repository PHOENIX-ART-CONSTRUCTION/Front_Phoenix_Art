import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaNewspaper, FaComment, FaSignOutAlt, FaUsers, FaCircle } from 'react-icons/fa';

const AdminSidebar = ({ username }) => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Pour l'état rétractable du sidebar
  const navigate = useNavigate();

  useEffect(() => {
    // Pour s'assurer que le sidebar est ouvert après le login
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true); // Ouvre le sidebar sur les écrans larges
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Vérifie la taille au chargement

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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
    if (window.innerWidth < 768) {
      setIsOpen(!isOpen); // Ouvre/Ferme le sidebar seulement sur mobile
    }
  };

  return (
    <div className="relative">
      {/* Bouton pour ouvrir/fermer le sidebar */}
      <button onClick={handleToggleSidebar} className="p-4 fixed z-70 lg:hidden text-white">
        <FaBars size={24} />
      </button>

      {/* Overlay semi-transparent */}
      {isOpen && (
        <div
          onClick={handleToggleSidebar}
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
        />
      )}

      {/* Sidebar rétractable */}
      <motion.aside
        initial={{ width: isOpen ? 0 : '300px' }}
        animate={{ width: isOpen ? '300px' : '0' }} // Sidebar retractable en petit écran
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className={`fixed top-0 left-0 text-white h-full z-50 flex flex-col overflow-hidden lg:w-[300px] lg:translate-x-0 lg:static`}
        style={{ background: '#051D41' }}
      >
        <div className="flex items-center justify-center h-16 border-b border-gray-700">
          {/* Logo */}
          <img src="/assets/logo.png" alt="Logo Phoenix Art" className="w-12 h-12 flex" />
          <h3 className="text-lg p-4 text-[#BE0B0B] font-bold">ADMIN PANNEL !</h3>
        </div>

        {/* Message de bienvenue */}
        <div className="p-4 text-center ">
          <p className="text-lg">Bonjour,et Bienvenue  !</p>
          <p className="flex items-center justify-center space-x-2 text-sm">
            <FaCircle className="text-green-500" /> <span>En ligne</span>
          </p>
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
            <li>
              <button
                onClick={() => handlePageChange('/admin_phoenixac/membres')}
                className="flex items-center space-x-3 py-2 px-4 rounded hover:bg-gray-700 w-full text-left"
              >
                <FaUsers size={20} /> <span>Membres</span>
              </button>
            </li>
          </ul>
        </nav>
       {/* Déconnexion */}
        <div className="p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full text-left py-2 px-4 rounded hover:bg-gray-700"
          >
            <FaSignOutAlt size={20} /> <span>Déconnexion</span>
          </button>
        </div>
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
