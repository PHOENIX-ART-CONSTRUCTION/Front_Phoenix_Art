import React, { useState } from 'react';
import { FaChevronUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export const About = ({ aboutData, whyChooseUsData }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Fonction pour gérer l'expansion et la fermeture de la section
  const toggleExpand = () => setIsExpanded((prev) => !prev);

  if (!aboutData || !whyChooseUsData) {
    return null;
  }

  return (
    <div className="relative z-5" id="à propos">
      {/* Section About */}
      <section className="relative flex flex-col items-center py-10">
        <div className="absolute inset-0">
          <img
            src={aboutData.image}
            alt="Vue d'ensemble des projets de Phoenix Art Construction"
            className="w-full h-full object-cover opacity-50"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>
        <div className="relative z-9 px-4 py-8 text-white md:px-8 md:py-16 md:w-4/5 lg:w-3/4 lg:py-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 uppercase text-center">
            {aboutData.title}
          </h2>
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

      {/* Bouton "En savoir plus" */}
      <div className="flex justify-center my-8">
        <motion.button
          onClick={toggleExpand}
          whileTap={{ scale: 0.95 }}
          aria-expanded={isExpanded}
          aria-label="En savoir plus sur Phoenix Art Construction"
          className={`bg-[#051D41] text-[#BE0B0B] px-6 py-2 rounded-full transition duration-300 ${
            isExpanded ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#C8CDCD]'
          } focus:outline-none focus:ring-2 focus:ring-blue-300`}
        >
          {isExpanded ? 'Réduire' : 'En savoir plus'}
        </motion.button>
      </div>

      {/* Section "Pourquoi nous choisir" */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="whyChooseUs"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="relative mt-12 mb-12 p-8 bg-[rgba(155,185,230,0.16)] text-black rounded-lg shadow-2xl border mx-12"
          >
            <h3 className="text-xl md:text-5xl font-bold text-black uppercase mb-6 text-center">
              {whyChooseUsData.title}
            </h3>
            <ol className="list-decimal list-inside space-y-4 text-justify pl-6">
              {whyChooseUsData.details &&
                whyChooseUsData.details.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, scale: 0.3, x: -50 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.3, x: -50 }}
                    transition={{ delay: 0.1 * index }}
                    className="text-lg"
                  >
                    {item.title}:
                    <span className="block text-lg">{item.description}</span>
                  </motion.li>
                ))}
            </ol>
            <motion.button
              onClick={toggleExpand}
              whileTap={{ scale: 0.95 }}
              aria-label="Fermer la section Pourquoi nous choisir"
              className="mt-6 bg-[#be0b0b] text-white p-2 flex justify-center items-center rounded-full hover:bg-red-500 transition duration-300"
            >
              <FaChevronUp size={24} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
