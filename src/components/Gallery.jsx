import React, { useState } from 'react';
import intro_bg from '/assets/intro_bg.jpg';
import headerBg from '/assets/headerBg.jpg';
import sary from '/assets/sary.jpg';
import sary1 from '/assets/sary1.jpg';
import sary2 from '/assets/sary2.jpg';
import sary3 from '/assets/sary3.jpg';
import sary4 from '/assets/sary4.jpg';
import Head from '/assets/Head.jpg';

const imageMap = {
  'intro_bg': intro_bg,
  'headerBg': headerBg,
  'sary': sary,
  'sary1': sary1,
  'sary2': sary2,
  'sary3': sary3,
  'sary4': sary4,
  'Head': Head,
};

const ITEMS_PER_PAGE = 8;

const Gallery = ({ data }) => {
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleImageClick = (image) => {
    setEnlargedImage(image);
  };

  const handleClose = () => {
    setEnlargedImage(null);
  };

  // Vérifiez que `data.projects` est défini avant de tenter de l'utiliser
  if (!data || !data.projects) {
    return <div>Loading...</div>;  // Affiche un message de chargement si les données ne sont pas disponibles
  }

  // Pagination logic
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = data.projects.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.projects.length / ITEMS_PER_PAGE);

  return (
    <section id="gallery" className="p-12 pt-24">
      <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center uppercase">{data.title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentItems.map((project) => (
          <div
            key={project.id}
            className="relative group cursor-pointer"
            onClick={() => handleImageClick(imageMap[project.image])}
          >
            <img
              src={imageMap[project.image]}
              alt={project.title}
              className="w-full h-48 object-cover rounded-lg transition-transform duration-300 transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center p-4">
              <h3 className="text-white text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-white mb-2 hidden group-hover:block">{project.description}</p>
              <span className="text-white hidden group-hover:block">{project.date}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg mr-2 disabled:bg-gray-400"
          disabled={currentPage === 1}
        >
          Précédent
        </button>
        <span className="flex items-center px-4 py-2">
          Page {currentPage} sur {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg ml-2 disabled:bg-gray-400"
          disabled={currentPage === totalPages}
        >
          Suivant
        </button>
      </div>

      {enlargedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50" onClick={handleClose}>
          <img src={enlargedImage} alt="Enlarged" className="max-w-full max-h-full object-contain" />
        </div>
      )}
    </section>
  );
};

export default Gallery;
