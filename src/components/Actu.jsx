import React, { useEffect, useState } from 'react';

const NewsCarousel = ({ newsData }) => {
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (newsData && newsData.length > 0) {
        setCurrentNewsIndex((prevIndex) => (prevIndex + 1) % newsData.length);
      }
    }, 5000); // Change news every 5 seconds

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [newsData]);

  if (!newsData || newsData.length === 0) {
    return <p className="text-center py-10">Aucune actualité disponible</p>;
  }

  const { title, description, image, date } = newsData[currentNewsIndex];

  return (
    <section className="w-full h-auto bg-gray-100 flex items-center justify-center py-10">
      <div className="max-w-7xl w-full h-auto grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 flex flex-col justify-center text-left space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          <p className="text-sm text-gray-500">{new Date(date).toLocaleDateString()}</p>
          <p className="text-md md:text-lg text-gray-800">{description}</p>
        </div>

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

const mockNewsData = [
  {
    title: 'Nouvelle Construction terminée',
    description:
      "Phoenix Art Construction est fier d'annoncer la fin de la construction du nouveau siège social de l'entreprise XYZ...",
    image: '/assets/sary2.jpg',
    date: '2024-09-20',
  },
  {
    title: 'Lancement d’un nouveau projet',
    description:
      "Nous avons récemment commencé un projet ambitieux de construction d’un complexe résidentiel écologique...",
    image: '/assets/sary1.jpg',
    date: '2024-09-18',
  },
  {
    title: 'Visite officielle du chantier',
    description:
      "Nous avons eu l'honneur d'accueillir le maire de la ville pour une visite de notre chantier de rénovation du centre-ville...",
    image: '/assets/sary3.jpg',
    date: '2024-09-15',
  },
  {
    title: 'Ouverture d’un nouveau bureau à Paris',
    description:
      "Phoenix Art Construction est ravi d'annoncer l'ouverture de son tout nouveau bureau à Tana...",
    image: '/assets/sary4.jpg',
    date: '2024-09-10',
  },
  {
    title: 'Formation sur les nouvelles normes de construction',
    description:
      "Nos équipes ont récemment suivi une formation sur les nouvelles normes de construction durable...",
    image: '/assets/sary.jpg',
    date: '2024-09-05',
  },
];

const NewsSection = () => {
  return (
    <div className="w-full py-10">
      <h2 className="text-4xl font-bold text-center uppercase mb-8">Actualités</h2>
      <NewsCarousel newsData={mockNewsData} />
    </div>
  );
};

export default NewsSection;
