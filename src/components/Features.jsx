import React, { useState } from 'react';
import FeaturesCards from './molecules/FeatureCards';

export const Features = ({ data }) => {
  const [expandedFeature, setExpandedFeature] = useState(null);

  if (!data?.features?.length) {
    return null; // Retourne null si les données ne sont pas encore chargées ou sont vides
  }

  // Gérer le clic sur la carte de fonctionnalité
  const handleCardClick = (feature) => {
    setExpandedFeature(expandedFeature === feature ? null : feature);
  };

  return (
    <section id="caractéristiques" className="relative py-20 bg-gray-100">
      {/* Couche de couleur semi-transparente */}
      <div className="absolute inset-0 bg-white opacity-80"></div>

      {/* Contenu des caractéristiques */}
      <div className="relative z-10 container mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10 uppercase text-[#051D41]">
          {data.title}
        </h2>
        <p className="text-lg text-center mb-16">{data.description}</p>

        {/* Grille des cartes de fonctionnalités */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${expandedFeature ? 'overflow-hidden' : ''}`}>
          {data.features.map((feature) => (
            <FeaturesCards
              key={feature.id}
              feature={feature}
              isExpanded={expandedFeature === feature}
              onCardClick={() => handleCardClick(feature)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
