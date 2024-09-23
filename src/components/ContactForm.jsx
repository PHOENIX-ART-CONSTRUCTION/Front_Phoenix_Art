import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logique pour envoyer les données
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="w-full my-10 p-0" id="contact">
      <h2 className="text-4xl uppercase font-bold text-center mb-10">Contactez-nous</h2>
      <div className="flex flex-col md:flex-row p-0 items-stretch w-full">
        {/* Première colonne : Formulaire */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 shadow-[0_8px_20px_-5px_rgba(0,0,0,0.4),0_2px_10px_rgba(0,0,0,0.1)] flex-1 h-full"
        >
          <form onSubmit={handleSubmit} className="space-y-6 h-full">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                Nom
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Entrez votre nom"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Entrez votre email"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"  // Désactiver la redimension
                placeholder="Votre message"
                rows="5"
                style={{ height: '117px' }} 
                required
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-8 rounded-full text-lg font-semibold shadow-lg transform transition duration-500 ease-in-out hover:scale-105 hover:bg-gradient-to-r hover:from-blue-600 hover:via-gray-500 hover:to-indigo-600 hover:shadow-xl"
              >
                Envoyer
              </button>
            </div>
          </form>
        </motion.div>

        {/* Deuxième colonne : Image */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex-1 flex justify-center items-center h-full"
        >
          <img
            src="/assets/Contact.jpg"
            alt="Contact"
            className="w-full h-[70%] object-cover shadow-lg"
             />
        </motion.div>
      </div>
    </div>
  );
};

export default ContactForm;
