import React, { useState } from 'react';
import intro_bg from '/assets/intro_bg.jpg';
import headerBg from '/assets/headerBg.jpg';
import sary from '/assets/sary.jpg';
import sary1 from '/assets/sary1.jpg';
import sary2 from '/assets/sary2.jpg';
import sary3 from '/assets/sary3.jpg';
import sary4 from '/assets/sary4.jpg';
import Head from '/assets/Head.jpg';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const imageMap = {
  intro_bg,
  headerBg,
  sary,
  sary1,
  sary2,
  sary3,
  sary4,
  Head,
};

const ITEMS_PER_PAGE = 8;

const Gallery = ({ data }) => {
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  const handleImageClick = (image, index) => {
    setEnlargedImage(image);
    setCurrentImageIndex(index);
  };
  const handleClose = () => {
    setEnlargedImage(null);
    setCurrentImageIndex(null);
  };

  const handlePrevImage = () => {
    const prevIndex = (currentImageIndex - 1 + data.projects.length) % data.projects.length;
    setEnlargedImage(imageMap[data.projects[prevIndex].image]);
    setCurrentImageIndex(prevIndex);
  };

  const handleNextImage = () => {
    const nextIndex = (currentImageIndex + 1) % data.projects.length;
    setEnlargedImage(imageMap[data.projects[nextIndex].image]);
    setCurrentImageIndex(nextIndex);
  };

  if (!data?.projects) {
    return <div>Chargement...</div>; // État de chargement
  }

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const currentItems = data.projects.slice(indexOfLastItem - ITEMS_PER_PAGE, indexOfLastItem);
  const totalPages = Math.ceil(data.projects.length / ITEMS_PER_PAGE);

  return (
    <section id="galerie" className="p-12 pt-24">
      <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center text-[#051D41] uppercase">
        {data.title}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentItems.map(({ id, image, title, description, date }, index) => (
          <div
            key={id}
            className="relative group cursor-pointer"
            onClick={() => handleImageClick(imageMap[image], index)}
          >
            <img
              src={imageMap[image]}
              alt={title}
              className="w-full h-48 object-cover rounded-lg transition-transform duration-300 transform group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4">
              <h3 className="text-white text-xl font-semibold mb-2">{title}</h3>
              <p className="text-white mb-2 hidden group-hover:block">{description}</p>
              <span className="text-white hidden group-hover:block">{date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2 disabled:bg-gray-400"
          aria-label="Page précédente"
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        <span className="flex items-center px-4 py-2">
          {currentPage} sur {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-2 disabled:bg-gray-400"
          aria-label="Page suivante"
          disabled={currentPage === totalPages}
        >
          Suivant
        </button>
      </div>

      {enlargedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={handleClose}
        >
          <div
            className="relative"
            onClick={(e) => e.stopPropagation()} // Empêche la fermeture en cliquant sur l'image
          >
            <img
              src={enlargedImage}
              alt="Aperçu agrandi"
              className="max-w-[80vw] max-h-[80vh] object-contain"
            />
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-white text-2xl bg-black p-2 rounded-full"
              aria-label="Fermer l'aperçu"
            >
              <FaTimes />
            </button>
            <button
              onClick={handlePrevImage}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              aria-label="Image précédente"
            >
              <FaChevronLeft />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full"
              aria-label="Image suivante"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
