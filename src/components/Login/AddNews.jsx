import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';

const AddNews = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Mettre à jour l'état avec l'image en Base64
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !image) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    setLoading(true);
    const newsData = { title, description, image };

    // Récupérez le csrfToken
    const csrfToken = localStorage.getItem('csrfToken');
    if (!csrfToken) {
      alert('Token CSRF manquant.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://backphoenixart-1.onrender.com/api/v1/actus/create/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken, // Ajoutez le csrfToken ici
        },
        body: JSON.stringify(newsData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erreur lors de l\'ajout de l\'actualité');
      }

      await response.json();
      alert('Actualité ajoutée avec succès !');
      navigate('/admin_phoenixac/dashboard');
    } catch (error) {
      alert(`Erreur : ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-6 bg-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-center uppercase">Ajouter une Actualité</h2>
        <form onSubmit={handleSubmit} className="bg-gray-100 p-4 mb-4 rounded shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700">Titre</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-100 rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="mt-1 block w-full border border-gray-300 rounded p-2"
              accept="image/*"
              required
            />
            {image && (
              <div className="mt-4">
                <p className="text-gray-700">Aperçu de l'image :</p>
                <img src={image} alt="Aperçu" className="w-32 h-32 object-cover mt-2 border" />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
            disabled={loading}
          >
            {loading ? 'Enregistrement...' : 'Ajouter l\'Actualité'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNews;
