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
    <section id='contact' className="w-full h-screen bg-gray-100 flex items-center justify-center py-10">
      <div className="max-w-7xl w-full h-auto grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Formulaire de contact */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 flex flex-col justify-center items-center text-left space-y-4"
        >
          <h2 className="text-2xl md:text-3xl font-bold uppercase text-center">Contactez-nous</h2>
          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                Nom:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="border p-2 mb-4 w-full rounded-lg"
                placeholder="Entrez votre nom"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="border p-2 mb-4 w-full rounded-lg"
                placeholder="Entrez votre email"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-gray-700  font-bold mb-2">
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="border p-2 w-full rounded-lg resize-none"
                placeholder="Votre message"
                rows="5"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className=" text-white py-2 px-4 rounded w-full" style={{ background: '#051D41' }}
            >
              Envoyer
            </button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="relative w-full h-full flex items-center justify-center"
        >
          <img
            src="/assets/Contact.jpg"
            alt="Contact"
            className="w-full h-full  transition-opacity duration-1000 ease-in-out"
          />
        </motion.div>

      </div>
    </section>
  );
};

export default ContactForm;
