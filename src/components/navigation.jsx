// src/components/Navigation.jsx

import React, { useState, useEffect } from 'react';
import { ArrowCircleRight, CirclesFour } from '@phosphor-icons/react';
import SmoothScroll from 'smooth-scroll';
import Logo from '../assets/Logo.png';

// Initialisation de smooth scroll avec des options
export const scroll = new SmoothScroll('a[href*="#"]', {
  speed: 800,
  speedAsDuration: true,
});

export const NavBar = () => {
  // Déclaration de deux états locaux : 'open' pour gérer l'ouverture/fermeture du menu mobile et 'navBarColor' pour changer la couleur de la navbar au scroll
  const [open, setOpen] = useState(false);
  const [navBarColor, setNavBarColor] = useState(false);

  // Fonction qui inverse l'état 'open' à chaque clic (ouvre/ferme le menu)
  const handleToggle = () => {
    setOpen(!open);
  };

  const handleLinkClick = () => {
    setOpen(false); // Ferme le menu mobile après un clic sur un lien
  };

  // Fonction qui surveille le scroll et modifie 'navBarColor' en fonction de la position de scroll (si on dépasse 10px de scroll, la couleur de la navbar change)
  const listenScrollEvent = () => {
    window.scrollY > 10 ? setNavBarColor(true) : setNavBarColor(false);
  };

   // useEffect est utilisé pour écouter les événements de scroll quand le composant est monté
  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
    return () => {
      window.removeEventListener('scroll', listenScrollEvent);
    };
  }, []);

  return (
    <header className="w-full h-18 fixed top-0 left-0 z-50 bg-white shadow-lg transition duration-500 ease-in-out hover:shadow-xl">
      <nav
        className={`w-full md:h-20 h-14 px-6 lg:px-20 md:px-12 flex justify-between items-center transition-all duration-500 ease-in-out`}
      >
        <a href="/" className="md:h-20 h-12">
          <img src={Logo} alt="Logo" className="h-full w-auto" />
        </a>
        <div className="lg:flex hidden items-center gap-20">
          <ul className="flex items-center justify-center gap-8 text-base font-semibold tracking-wider">
            {['features', 'about', 'services', 'gallery', 'team', 'contact'].map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  className="page-scroll uppercase pb-2 hover:text-gray-500 transition duration-300 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-gradient-to-r after:from-gray-600 after:via-red-500 after:to-blue-500 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="lg:hidden flex items-center">
          <div className="text-gray-950 cursor-pointer" onClick={handleToggle}>
            <CirclesFour size={30} color="currentColor" weight="fill" />
          </div>
        </div>
      </nav>

      {/* Mobile Nav */}
      <nav
        className={`flex justify-end lg:hidden h-screen w-full bg-gray-950/90 fixed top-0 ${
          open ? 'right-0' : '-right-[120vw]'
        } transition-all duration-500 ease-out`}
      >
        <div
          className={`w-[70%] h-screen bg-white flex flex-col justify-between items-center relative ${
            open ? 'right-0' : '-right-[120vw]'
          } transition-all duration-500 ease-out delay-300`}
        >
          <section className="w-full px-4 py-6 flex flex-col gap-16">
            <div className="w-full flex justify-between items-center">
              <a href="/" className="md:h-12 h-10">
                <img src={Logo} alt="Logo" className="h-full w-auto" />
              </a>
              <div className="text-gray-950 cursor-pointer" onClick={handleToggle}>
                <ArrowCircleRight size={25} color="currentColor" weight="fill" />
              </div>
            </div>
            <ul className="flex flex-col gap-3 pl-2 text-lg font-semibold tracking-wider">
              {['features', 'about', 'services', 'gallery', 'team', 'contact'].map((section) => (
                <li key={section}>
                  <a
                    href={`#${section}`}
                    className="page-scroll uppercase pb-2 hover:text-gray-500 transition duration-300"
                    onClick={handleLinkClick} // Ferme le menu mobile après clic
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
