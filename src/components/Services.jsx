import React, { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';

export const Services = ({ data }) => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour le modal
  const [selectedImage, setSelectedImage] = useState(null); // Image sélectionnée

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % data.length;
      setCurrentIndex(nextIndex);
      if (carouselRef.current) {
        carouselRef.current.scrollTo({
          left: carouselRef.current.offsetWidth * nextIndex,
          behavior: 'smooth',
        });
      }
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval); // Clean up on component unmount
  }, [currentIndex, data.length]);

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + data.length) % data.length;
    setCurrentIndex(prevIndex);
    carouselRef.current.scrollTo({
      left: carouselRef.current.offsetWidth * prevIndex,
      behavior: 'smooth',
    });
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % data.length;
    setCurrentIndex(nextIndex);
    carouselRef.current.scrollTo({
      left: carouselRef.current.offsetWidth * nextIndex,
      behavior: 'smooth',
    });
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  const nextImageIndex = (currentIndex + 1) % data.length; // Index of the next image

  return (
    <>
      {/* Titre en dehors de la section */}
      <h2 className="text-4xl font-bold text-center mt-10 pt-10 uppercase bg-[#051D41] text-[#BE0B0B]">
        Nos Services
      </h2>

      {/* Section des services */}
      <section id="services" className="w-full h-screen bg-[#051D41]  text-center px-4 flex flex-col lg:flex-row" style={{ background: '#051D41' }}>
        {/* Première partie: Carrousel principal avec boutons */}
        <div className="relative w-full lg:w-2/3 h-full flex flex-col justify-center items-center">
          <div className="w-full h-[80%] relative overflow-hidden">
            <div
              ref={carouselRef}
              className="flex w-full h-full overflow-x-auto snap-x snap-mandatory"
            >
              {data.length > 0 ? (
                data.map((service, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-full h-full snap-start flex items-center justify-center px-8"
                    onClick={() => openModal(service.image)} // Ouvrir le modal lors du clic sur l'image
                  >
                    <img
                      src={service.image}
                      alt={`Image de service: ${service.name}`} // Texte alternatif amélioré
                      className="object-cover sm:w-full sm:h-[80%] md:w-[50%] md:h-[50%] lg:w-full lg:h-[90%] cursor-pointer"
                      loading="lazy" // Chargement différé pour améliorer les performances
                    />
                  </div>
                ))
              ) : (
                <p>Aucun service disponible.</p>
              )}
            </div>
          </div>
          {/* Boutons pour naviguer */}
          <button
            onClick={handlePrev}
            aria-label="Voir le service précédent" // Accessibilité : Label pour les lecteurs d'écran
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg z-5"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={handleNext}
            aria-label="Voir le service suivant" // Accessibilité : Label pour les lecteurs d'écran
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg z-5"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Deuxième partie: Carrousel non cliquable */}
        <div className="w-full lg:w-1/3 h-full flex flex-col justify-center items-center bg-gray-30">
          <div className="w-full h-[40%] flex items-center justify-center">
            {data.length > 0 && (
              <div className="w-[80%] h-[80%] overflow-hidden">
                <img
                  src={data[nextImageIndex].image}
                  alt={`Image de service suivant: ${data[nextImageIndex].name}`} 
                  className="object-cover w-full h-full opacity-50"
                  loading="lazy" // Chargement différé
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Modal pour afficher l'image en plein écran */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="relative">
            <img
              src={selectedImage}
              alt="Aperçu en plein écran"
              className="w-full h-auto max-h-screen object-contain"
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-white text-2xl bg-black p-2 rounded-full"
              aria-label="Fermer l'aperçu"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
    </>
  );
};
