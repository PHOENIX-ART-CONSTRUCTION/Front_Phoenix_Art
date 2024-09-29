import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';

const AddNews = () => {
  const [news, setNews] = useState({
    title: '',
    description: '',
    image: null,
    date: '',
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNews({ ...news, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(news); // Envoyer les données d'actualité au backend
  };

  return (
    <div className="flex bg-gray-300">
      <AdminSidebar />
      
      <div className="w-full h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-4 uppercase">Ajouter une Actualité</h2>
        <form onSubmit={handleSubmit} className="bg-gray-100 p-6 shadow-lg rounded-lg w-3/4">
          
          <input
            type="text"
            value={news.title}
            onChange={(e) => setNews({ ...news, title: e.target.value })}
            className="border p-2 mb-4 w-full"
            placeholder="Titre de l'actualité"
            required
          />
          <textarea
            value={news.description}
            onChange={(e) => setNews({ ...news, description: e.target.value })}
            className="border p-2 mb-4 w-full"
            placeholder="Description de l'actualité"
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 mb-4 w-full"
            required
          />
          {news.image && (
            <img src={news.image} alt="Preview" className="mb-4 w-full h-48 object-cover rounded" />
          )}
          <input
            type="date"
            value={news.date}
            onChange={(e) => setNews({ ...news, date: e.target.value })}
            className="border p-2 mb-4 w-full"
            required
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full">
            Ajouter l'actualité
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNews;
