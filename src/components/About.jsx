import React, { useState } from 'react';
import { FaChevronUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export const About = ({ aboutData, whyChooseUsData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleExpandClick = () => {
    if (!isExpanded) {
      setIsExpanded(true);
    }
  };

  const handleCollapseClick = () => {
    setIsExpanded(false);
  };

  if (!aboutData || !whyChooseUsData) {
    return null; // Retourne null si les données ne sont pas encore chargées
  }

  return (
    <div className="relative z-5" id="à propos">
      {/* Section About */}
      <section className="relative flex flex-col items-center py-10">
        {/* Image de fond avec superposition */}
        <div className="absolute inset-0">
          <img
            src={aboutData.image}
            alt="À propos de Phoenix Art Construction"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>

        {/* Contenu principal */}
        <div className="relative z-9 px-4 py-8 text-white md:px-8 md:py-16 md:w-4/5 lg:w-3/4 lg:py-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase text-center">{aboutData.title}</h2>
          <div className="space-y-6">
            {aboutData.intro &&
              aboutData.intro.map((paragraph, index) => (
                <p key={index} className="text-xl text-justify md:text-xl">
                  {paragraph}
                </p>
              ))}
          </div>
        </div>
      </section>

      {/* Bouton "En savoir plus" en dehors de la section About */}
      <div className="flex justify-center my-8">
        <motion.button
          onClick={handleExpandClick}
          whileTap={{ scale: 0.95 }}
          disabled={isExpanded} // Désactive le bouton lorsqu'il est déjà ouvert
          className={`bg-blue-500 text-white px-6 py-2 rounded-full ${
            isExpanded ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
          }`}
        >
          En savoir plus
        </motion.button>
      </div>

      {/* Section "Pourquoi nous choisir" avec animation Framer Motion */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="whyChooseUs"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }} // Animation de fermeture
            transition={{ duration: 0.4 }}
            className="relative mt-12 mb-12 p-8 bg-[rgba(155,185,230,0.16)] text-black rounded-lg shadow-2xl border mx-12"
          >
            <h3 className="text-xl md:text-5xl font-bold text-black uppercase mb-6 text-center">
              {whyChooseUsData.title}
            </h3>
            <ol className="list-decimal list-inside space-y-4 text-left  pl-6">
              {whyChooseUsData.details &&
                whyChooseUsData.details.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, scale: 0.3, x: -50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.3, x: -50 }} // Animation de fermeture
                    transition={{ delay: 0.1 * index }}
                    className="text-lg "
                  >{item.title }:
                    <span className="block text-lg "> {item.description}</span>
                  </motion.li>
                ))}
            </ol>

            <motion.button
              onClick={handleCollapseClick}
              whileTap={{ scale: 0.95 }}
              className="mt-6 bg-red-500 text-white p-2 flex justify-center items-center rounded-full hover:bg-red-600 transition duration-300"
            >
              <FaChevronUp size={24} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
