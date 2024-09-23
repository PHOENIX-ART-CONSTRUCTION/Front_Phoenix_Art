// src/components/molecules/FeatureCards.jsx

import React from 'react';
import { motion } from 'framer-motion';

// Variantes d'animation pour les cartes
const cardVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    backgroundColor: 'rgb(255, 255, 255)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    backgroundColor: 'rgb(255, 255, 255)',
  },
  expanded: {
    opacity: 1,
    scale: 1,
    position: 'fixed',
    top: '55%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60vw',
    height: '80vh',
    zIndex: 50,
    overflow: 'auto',
    backgroundColor: 'rgb(255, 255, 255)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: '8px',
  },
};

// Variantes d'animation pour l'overlay
const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 0.7 },
};

const FeatureCards = ({ feature, isExpanded, onCardClick }) => {
  const handleCardClick = () => {
    onCardClick();
  };

  return (
    <div>
      {isExpanded && (
        <motion.div
          className="fixed inset-0 bg-black opacity-70 z-40"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        />
      )}
      <motion.div
        className={`relative p-6 bg-white shadow-lg rounded-lg cursor-pointer ${isExpanded ? 'expanded' : ''}`}
        style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}
        onClick={handleCardClick}
        variants={cardVariants}
        initial="hidden"
        animate={isExpanded ? 'expanded' : 'visible'}
        exit="hidden"
        transition={{ type: 'spring', stiffness: 300, damping: 30, mass: 1, duration: 0.5 }}
      >
        {/* Assurez-vous que toutes les images ont la même taille */}
        <img
          src={feature.image}
          alt={feature.title}
          className={`w-full h-48 object-cover mb-4 rounded-md ${isExpanded ? 'h-48' : ''}`} // Taille fixe en mode normal et agrandi
        />
        <h3 className={`text-xl font-semibold mb-2 ${isExpanded ? 'text-3xl' : ''}`}>
          {feature.title}
        </h3>
        <p className={`text-sm ${isExpanded ? 'text-lg' : ''}`}>
          {isExpanded ? feature.fullDescription : feature.description}
        </p>
      </motion.div>
    </div>
  );
};

export default FeatureCards;
