import React, { useState } from 'react';
import AdminSidebar from './AdminSidebar';
import axios from 'axios';
import './Loader.css'; // Assurez-vous d'importer le fichier CSS pour le loader

const AddNews = () => {
  const [news, setNews] = useState({
    title: '',
    description: '',
    image: null,
  });

  const [loading, setLoading] = useState(false); // État pour le loader
  const [error, setError] = useState(''); // État pour les erreurs
  const [success, setSuccess] = useState(false); // État pour le succès

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNews({ ...news, image: file }); // Stocker le fichier d'image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Afficher le loader
    setError(''); // Réinitialiser les erreurs
    setSuccess(false); // Réinitialiser le succès

    try {
      const formData = new FormData();
      formData.append('title', news.title);
      formData.append('description', news.description);
      formData.append('image', news.image);

      // Récupérer le token depuis localStorage
      const token = localStorage.getItem('token');

      // Requête POST vers le backend pour ajouter l'actualité
      const response = await axios.post('https://backphoenixart-1.onrender.com/api/v1/actus/create/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`, // Ajouter le token dans l'en-tête
        },
      });

      if (response.status === 201) {
        setSuccess(true); // Actualité ajoutée avec succès
        setNews({ title: '', description: '', image: null }); // Réinitialiser le formulaire
      }
    } catch (error) {
      if (error.response) {
        setError('Erreur lors de l\'ajout de l\'actualité : ' + (error.response.data.message || 'Erreur inconnue'));
      } else {
        setError('Erreur lors de la connexion au serveur : ' + error.message);
      }
    } finally {
      setLoading(false); // Cacher le loader après la tentative
    }
  };

  return (
    <div className="flex" style={{ background: '#7C7B7C' }}>
      <AdminSidebar />

      <div className="w-full h-screen flex flex-col items-center justify-center">
        {loading && (
          <div className="loader-overlay">
            <div className="loader"></div>
          </div>
        )}
        <form onSubmit={handleSubmit} className="bg-gray-200 p-6 shadow-lg rounded-lg w-3/4">
          <h2 className="text-3xl text-center font-bold mb-4 uppercase">Ajouter une Actualité</h2>
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
            <img src={URL.createObjectURL(news.image)} alt="Preview" className="mb-4 w-full h-48 object-cover rounded" />
          )}
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full">
            Ajouter l'actualité
          </button>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          {success && <p className="text-green-500 mt-4 text-center">Actualité ajoutée avec succès !</p>}
        </form>
      </div>
    </div>
  );
};

export default AddNews;
