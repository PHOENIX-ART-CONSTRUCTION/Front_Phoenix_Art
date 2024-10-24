import React from 'react';
import { FaFacebookF, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className=" text-gray-100 py-12" style={{ background: '#051D41' }}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Section Résumé du site */}
          <div className="text-center md:text-left md:w-1/3">
            <h3 className="text-xl font-bold uppercase tracking-wider text-[#be0b0b] mb-4">Phoenix Art Construction</h3>
            <p className="text-gray-400 text-sm font-bold">
              Phoenix Art Construction est un leader dans la construction de bâtiments durables et écologiques, avec un engagement à offrir des solutions innovantes et des matériaux de haute qualité.
            </p>
          </div>

        {/* Section Réseaux sociaux - centré */}
          <div className="md:w-1/3 pb-9">
            <h4 className="text-lg font-semibold uppercase pb-6 text-center">Suivez-nous sur</h4>
            <div className="flex justify-center space-x-4">
              <a
                href="https://www.facebook.com/profile.php?id=100064267231850"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-gray-600 transition duration-300"
                aria-label="Suivez-nous sur Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.linkedin.com/in/heritiana-andriamanjato-363318135/?originalSubdomain=m"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 bg-gray-800 rounded-full hover:bg-gray-600 transition duration-300"
                aria-label="Suivez-nous sur LinkedIn"
              >
                <FaLinkedinIn />
              </a>
            </div>
</div>

           {/*Citation*/}
          <div className="text-center pb-1 md:text-left md:w-1/3">
            <h3 className="text-xl font-bold text-[#be0b0b] uppercase tracking-wider mb-4">Phoenix Art Construction</h3>
            <p className="text-gray-400 font-bold uppercase text-md">
                "Bâtir aujourd'hui, améliorer demain : <br />
                l'art de la construction au service de l'avenir."
            </p>
          </div>

        </div>

        {/* Ligne de séparation */}
        <hr className="my-4 border-gray-700" />

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Phoenix Art Construction.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
