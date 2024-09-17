import React, { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export const Services = ({ data }) => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

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

  const nextImageIndex = (currentIndex + 1) % data.length; // Index of the next image

  return (
    <section id="services" className="w-full h-screen bg-gray-200 text-center px-4 flex flex-col lg:flex-row">
      {/* Première partie: Carrousel principal avec boutons */}
      <div className="relative w-full lg:w-2/3 h-full flex flex-col justify-center items-center">
        <h2 className="text-4xl font-bold text-center mb-10">Nos Services</h2>
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
                >
                  <img
                    src={service.image}
                    alt={service.name}
                    className="object-cover sm:w-full sm:h-[80%] md:w-[50%] md:h-[50%] lg:w-full lg:h-[90%]"
                  />
                </div>
              ))
            ) : (
              <p>No services available.</p>
            )}
          </div>
        </div>
        {/* Boutons pour naviguer */}
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg z-10"
        >
          <FaChevronLeft />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full shadow-lg z-10"
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
                alt={data[nextImageIndex].name}
                className="object-cover w-full h-full opacity-50"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
