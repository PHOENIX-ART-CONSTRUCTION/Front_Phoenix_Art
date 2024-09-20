import React from 'react';
import { motion } from 'framer-motion'; 

export const Header = ({ data }) => {
  // Vérifie si les données ou le titre sont disponibles
  if (!data || !data.title) {
    return null; // Retourne null si les données ou le titre ne sont pas encore chargés
  }

  // Variants d'animation pour le titre avec un effet de rebond
  const titleVariants = {
    hidden: { opacity: 0, y: -100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        type: "spring",
        stiffness: 80,
        damping: 15,
      },
    },
  };

  // Variants d'animation pour le sous-titre et le bouton
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        duration: 1,
        staggerChildren: 0.3, // Pour faire apparaître les enfants en décalé
      },
    },
  };

  return (
    <header className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      {/* Vidéo de fond */}
      <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover">
        <source src="./assets/video.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la balise vidéo.
      </video>

      {/* Couverture semi-transparente */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Contenu du header */}
      <div className="relative z-10 p-4 text-white">
        {/* Titre avec animation */}
        <motion.h1
          className="text-4xl md:text-6xl mb-4 uppercase font-bold"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
        >
          {data.title}
        </motion.h1>

        {/* Sous-titre et CTA avec animation */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={contentVariants}
        >
          <motion.p
            className="text-lg md:text-2xl mb-8 font-bold"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            {data.subtitle}
          </motion.p>

          <motion.a
            href="#services"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg transform transition duration-500 ease-in-out hover:scale-105 hover:bg-gradient-to-r hover:from-blue-600 hover:via-gray-500 hover:to-indigo-600 hover:shadow-xl"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {data.ctaText}
          </motion.a>
        </motion.div>
      </div>
    </header>
  );
};
