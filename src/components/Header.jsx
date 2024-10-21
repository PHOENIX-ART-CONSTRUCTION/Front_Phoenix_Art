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
        staggerChildren: 0.3,
      },
    },
  };

  // Animation des couleurs du texte (rouge, bleu ciel et gris)
  const colorCycle = {
    initial: { color: '#be0b0b' }, // Rouge initial
    animate: {
      color: ['#be0b0b', '#051D41', '#7C7C7C'], // Rouge, bleu , gris
      transition: {
        repeat: Infinity,
        repeatType: 'reverse', // Revenir en arrière après chaque cycle
        duration: 4, // Durée totale du cycle
      },
    },
  };

  return (
    <header className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover"
        aria-label="Vidéo de présentation de Phoenix Art Construction montrant des projets de construction réussis" // Amélioration de l'accessibilité
      >
        <source src="./assets/video.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la balise vidéo.
      </video>

      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative z-10 p-4 text-white">
        {/* Titre avec animation de cycle de couleurs */}
        <motion.h1
          className="text-4xl md:text-6xl mb-4 uppercase font-bold"
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          {...colorCycle} // Ajout de l'animation de cycle de couleurs
        >
          {data.title} 
        </motion.h1>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={contentVariants}
        >
          <motion.p
            className="text-lg md:text-2xl text-[#999595] mb-8 uppercase font-bold"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            {data.subtitle}
          </motion.p>

          <motion.a
            href="#services"
            className="bg-[#051D41] text-[#BE0B0B] py-3 px-6 md:px-8 rounded-full text-lg font-bold shadow-lg hover:bg-[#0A234B]"
            tabindex="0"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {data.ctaText || "Voir nos services de construction"}
          </motion.a>

        </motion.div>
      </div>
    </header>
  );
};
