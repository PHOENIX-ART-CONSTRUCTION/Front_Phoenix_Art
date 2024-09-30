import React, { useEffect, useState } from 'react';

const NewsCarousel = () => {
  const [newsData, setNewsData] = useState([]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Pour gérer le chargement des données
  const [error, setError] = useState(null); // Pour gérer les erreurs

  useEffect(() => {
    //récupérer les données depuis l'API
    const fetchNewsData = async () => {
      try {
        const response = await fetch('https://backphoenixart-1.onrender.com/api/v1/actus/');
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des actualités');
        }
        const data = await response.json();
        
        // Trier les actualités par date (du plus récent au plus ancien)
        const sortedData = data.sort((a, b) => new Date(b.create_at) - new Date(a.create_at));
        setNewsData(sortedData);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchNewsData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (newsData && newsData.length > 0) {
        setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsData.length);
      }
    }, 7000); // Change news every 7 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [newsData]);

  if (isLoading) {
    return <p className="text-center py-10">Chargement des actualités...</p>;
  }

  if (error) {
    return <p className="text-center py-10 text-red-500">{error}</p>;
  }

  if (!newsData || newsData.length === 0) {
    return <p className="text-center py-10">Aucune actualité disponible</p>;
  }

  const { title, description, image, create_at } = newsData[currentNewsIndex];

  return (
    <section className="w-full h-auto bg-gray-100 flex items-center justify-center py-10">
      <div className="max-w-7xl w-full h-auto grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Text content: title, description, and date */}
        <div className="p-6 flex flex-col justify-center text-left space-y-4">
          <h2 className="text-2xl md:text-3xl uppercase text-center font-bold">{title}</h2>
          <p className="text-md md:text-lg text-gray-800">{description}</p>
          <p className="text-sm text-gray-500">{new Date(create_at).toLocaleDateString()}</p>
        </div>

        {/* Image content */}
        <div className="relative w-full h-[350px] md:h-[400px]">
          <img
            src={image}
            alt={`Actualité: ${title}`}
            className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          />
        </div>
      </div>
    </section>
  );
};

const NewsSection = () => {
  return (
    <div className="w-full py-10">
      <h2 className="text-4xl font-bold text-center uppercase mb-8">Actualités</h2>
      <NewsCarousel />
    </div>
  );
};

export default NewsSection;
