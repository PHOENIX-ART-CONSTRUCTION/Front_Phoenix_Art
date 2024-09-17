import React from 'react';
import { motion } from 'framer-motion'; 

export const Header = ({ data }) => {
  // Vérifie si les données ou le titre sont disponibles
  if (!data || !data.title) {
    return null; // Retourne null si les données ou le titre ne sont pas encore chargés
  }

 

  return (
    <header className="relative h-screen flex items-center justify-center text-center overflow-hidden">

      {/* Vidéo de fond */}
      <video autoPlay muted loop className="absolute inset-0 w-full h-full object-cover">
        <source src="./src/assets/video.mp4" type="video/mp4" />
        Votre navigateur ne supporte pas la balise vidéo.
      </video>

      {/* Couverture semi-transparente */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Contenu du header */}
      <div className="relative z-10 p-4 text-white">
        <h1 className="text-4xl md:text-6xl mb-4">
        {data.title}
        </h1>
        <p className="text-lg md:text-2xl mb-8">{data.subtitle}</p>
        <a
          href="#services"
          className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg transform transition duration-500 ease-in-out hover:scale-105 hover:bg-gradient-to-r hover:from-blue-600 hover:via-gray-500 hover:to-indigo-600 hover:shadow-xl"
        >
          {data.ctaText}
        </a>

      </div>
    </header>
  );
};
