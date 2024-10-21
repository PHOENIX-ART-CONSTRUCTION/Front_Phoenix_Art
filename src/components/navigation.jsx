import React, { useState, useEffect } from 'react';
import { ArrowCircleRight, CirclesFour } from '@phosphor-icons/react';
import SmoothScroll from 'smooth-scroll';
import Logo from '/assets/logo.png';

// Initialisation de Smooth Scroll avec des options pour un défilement fluide
export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 800,
  speedAsDuration: true,
});

export const NavBar = () => {
  const [open, setOpen] = useState(false); // État pour le menu mobile (ouvert/fermé)
  const [navBarColor, setNavBarColor] = useState(false); // État pour la couleur de la barre de navigation

  // Fonction pour basculer l'état du menu mobile
  const handleToggle = () => {
    setOpen(!open);
  };

  // Fonction pour fermer le menu mobile après un clic sur un lien
  const handleLinkClick = () => {
    setOpen(false);
  };

  // Fonction pour changer la couleur de la barre de navigation lors du défilement
  const listenScrollEvent = () => {
    setNavBarColor(window.scrollY > 10); // La couleur change si la position de défilement est supérieure à 10 pixels
  };

  // Utilisation de useEffect pour ajouter et nettoyer l'écouteur d'événements de défilement
  useEffect(() => {
    const onScroll = () => listenScrollEvent();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      // Classes de style conditionnelles en fonction de l'état de la couleur de la barre de navigation
      className={`w-full h-15 fixed top-0 left-0 z-50 shadow-lg transition duration-500 ease-in-out hover:shadow-xl ${
        navBarColor ? 'bg-[#051D41]' : 'bg-[#051D41] bg-opacity-60'
      }`}
    >
      <nav
        className="w-full md:h-20 h-14 px-3 lg:px-5 md:px-2 flex justify-between items-center text-[#be0b0b] transition-all duration-500 ease-in-out"
        role="navigation" // Amélioration de l'accessibilité
        aria-label="Barre de navigation principale"
      >
        {/* Logo avec lien vers la page d'accueil */}
        <a href="/" className="md:h-20 h-12">
          <img
            src={Logo}
            alt="Logo de l'entreprise"
            className="h-full w-auto"
            width="200"
            height="50"
            loading="lazy"
          />
        </a>

        {/* Menu de navigation pour les écrans de bureau */}
        <div className="lg:flex hidden items-center gap-20">
          <ul className="flex items-center justify-center gap-8 text-base font-bold tracking-wider">
            {['à propos', 'caractéristiques', 'services', 'galerie', 'équipes', 'contact'].map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  className="page-scroll uppercase pb-2 hover:text-[#999595] font-bold transition duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-gray-600 after:via-red-500 after:to-blue-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                  aria-label={`Naviguer vers la section ${section}`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Bouton pour ouvrir le menu mobile */}
        <div className="lg:hidden flex items-center">
          <div
            className="text-gray-300 cursor-pointer"
            onClick={handleToggle}
            aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
            role="button" // Amélioration de l'accessibilité
            tabIndex={0} // Permettre la navigation au clavier
          >
            <CirclesFour size={30} color="currentColor" weight="fill" />
          </div>
        </div>
      </nav>

      {/* Menu Mobile pour les petits écrans */}
      <nav
        className={`flex justify-end lg:hidden h-screen w-full bg-gray-950/90 fixed top-0 ${
          open ? 'right-0' : '-right-[120vw]'
        } transition-all duration-500 ease-out`}
        aria-hidden={!open} // Masquer le menu pour les lecteurs d'écran lorsqu'il est fermé
      >
        <div
          className={`w-[70%] h-screen bg-white flex flex-col justify-between items-center relative transition-all duration-500 ease-out delay-300 ${
            open ? 'right-0' : '-right-[120vw]'
          }`}
        >
          <section className="w-full px-4 py-6 flex flex-col gap-16">
            <div className="w-full flex justify-between items-center">
              <a href="/" className="md:h-12 h-10">
                <img
                  src={Logo}
                  alt="Logo de l'entreprise"
                  className="h-full w-auto"
                  loading="lazy"
                />
              </a>
              <div
                className="text-gray-950 cursor-pointer"
                onClick={handleToggle}
                aria-label="Fermer le menu"
                role="button"
                tabIndex={0}
              >
                <ArrowCircleRight size={25} color="currentColor" weight="fill" />
              </div>
            </div>

            {/* Liens du menu mobile */}
            <ul className="flex flex-col gap-3 pl-2 text-lg font-semibold tracking-wider">
              {['à propos', 'caractéristiques', 'services', 'galerie', 'équipes', 'contact'].map((section) => (
                <li key={section}>
                  <a
                    href={`#${section}`}
                    className="page-scroll uppercase pb-2 hover:text-gray-500 transition duration-300"
                    onClick={handleLinkClick}
                    aria-label={`Naviguer vers la section ${section}`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </nav>
    </header>
  );
};
