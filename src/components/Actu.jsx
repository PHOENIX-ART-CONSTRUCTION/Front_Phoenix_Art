import React, { useEffect, useState } from 'react';

// Composant pour l'affichage d'une carte d'actualité
const NewsCard = ({ title, description, image, create_at, fade }) => {
  return (
    <div className="max-w-5xl w-full h-auto grid grid-cols-1 lg:grid-cols-2 gap-6 bg-[#051D41] shadow-lg rounded-lg overflow-hidden">
      {/* Texte avec effet slide-in */}
      <div
        className={`p-6 flex flex-col items-center justify-start text-left space-y-4 transition-transform duration-700 ease-in-out ${
          fade ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
        }`}
      >
        <h2 className="text-4xl md:text-2xl uppercase text-center font-bold text-[#BE0B0B]">
          {title}
        </h2>
        <p className="text-sm md:text-base text-gray-300 leading-relaxed">
          {description}
        </p>
        <p className="text-xs text-gray-500 italic">
          {new Date(create_at).toLocaleDateString()}
        </p>
      </div>

      {/* Image avec effet fade-in */}
      <div className="relative w-full h-[300px] md:h-[350px]">
        <img
          src={image}
          alt={`Actualité: ${title}`}
          className={`w-full h-full object-cover rounded-lg transition-opacity duration-1000 ease-in-out ${
            fade ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    </div>
  );
};

// Composant pour le carrousel d'actualités
const NewsCarousel = () => {
  const [newsData, setNewsData] = useState([]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fade, setFade] = useState(true);

  // Fonction pour récupérer les données des actualités
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const response = await fetch(
          'https://backphoenixart-1.onrender.com/api/v1/actus/'
        );
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des actualités');
        }
        const data = await response.json();

        // Tri des actualités par date
        const sortedData = data.sort(
          (a, b) => new Date(b.create_at) - new Date(a.create_at)
        );
        setNewsData(sortedData);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  // Mise à jour automatique de l'actualité affichée
  useEffect(() => {
    const interval = setInterval(() => {
      if (newsData && newsData.length > 0) {
        setFade(false);
        setTimeout(() => {
          setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsData.length);
          setFade(true);
        }, 500);
      }
    }, 7000);

    return () => clearInterval(interval);
  }, [newsData]);

  if (isLoading) {
    return <p className="text-center py-10">Chargement des actualités...</p>;
  }

  if (error) {
    return (
      <p className="text-center py-10 text-red-500">
        {error} - Veuillez réessayer plus tard.
      </p>
    );
  }

  if (!newsData || newsData.length === 0) {
    return <p className="text-center py-10">Aucune actualité disponible</p>;
  }

  const { title, description, image, create_at } = newsData[currentNewsIndex];

  return (
    <section className="w-full h-auto bg-gray-50 flex items-center justify-center py-10">
      {/* Affichage de la carte d'actualité */}
      <NewsCard
        title={title}
        description={description}
        image={image}
        create_at={create_at}
        fade={fade}
      />
    </section>
  );
};

// Composant principal pour la section Actualités
const NewsSection = () => {
  return (
    <div className="w-full py-10">
      <h2 className="text-4xl md:text-4xl font-bold text-center uppercase text-[#051D41] mb-8">
        Actualités
      </h2>
      <NewsCarousel />
    </div>
  );
};

export default NewsSection;
