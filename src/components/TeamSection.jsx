import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowCircleUp, ArrowCircleDown } from '@phosphor-icons/react';
import teamData from '../data/data.json'; 

const TeamSection = () => {
  const [currentMember, setCurrentMember] = useState(0);

  const handlePrev = () => {
    setCurrentMember((prev) => (prev === 0 ? teamData.team.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentMember((prev) => (prev === teamData.team.length - 1 ? 0 : prev + 1));
  };

  const { name, position, description, image } = teamData.team[currentMember];

  return (
    <section id="équipe" className="w-full shadow-lg py-10  flex flex-col items-center"  style={{ background: '#051D41' }}>
      <div className="max-w-6xl w-full flex flex-col items-center">
        <h2 className="text-4xl font-bold text-[#be0b0b] uppercase mb-8">Notre Équipe</h2>

        <div className="relative w-full h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={name}
              className="flex flex-col md:flex-row w-full items-center justify-between"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.5 }}
            >
              {currentMember % 2 === 0 ? (
                <>
                  <div className="w-full md:w-1/2 h-full p-4">
                    <img
                      src={image}
                      alt={name}
                      className="w-[400px] h-[450px] object-cover md-12 rounded-lg shadow-lg"
                    />
                  </div>
                  <div className="w-full md:w-1/2 h-full p-6">
                    <h3 className="text-2xl text-center font-bold text-[#7C7C7C] uppercase mb-2">{name}</h3>
                    <p className="text-lg text-white text-center font-semibold mb-4">{position}</p>
                    <p className="text-base text-justify text-white">{description}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-full md:w-1/2 h-full p-6">
                    <h3 className="text-2xl text-center font-bold text-[#7C7C7C] uppercase mb-2">{name}</h3>
                      <p className="text-lg text-white text-center font-semibold mb-4">{position}</p>
                      <p className="text-base text-justify text-white">{description}</p>
                  </div>
                  
                  <div className="w-full md:w-1/2 h-full p-4">
                    <img
                      src={image}
                      alt={name}
                      className="w-[400px] h-[450px] object-cover  rounded-lg shadow-lg"
                    />
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-6 space-x-4">
            <button onClick={handlePrev} aria-label="Précédent" className="text-gray-700">
              <ArrowCircleUp size={40} weight="fill" />
            </button>
            <button onClick={handleNext} aria-label="Suivant" className="text-gray-700">
              <ArrowCircleDown size={40} weight="fill" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
