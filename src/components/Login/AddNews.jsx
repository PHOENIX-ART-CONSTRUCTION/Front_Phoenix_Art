import React, { useState } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';

const AddNews = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const response = await axios.post(
        'https://backphoenixart-1.onrender.com/api/v1/actus/create/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 201) {
        setSuccess(true);
        setTitle('');
        setDescription('');
        setImage(null);
      }
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-300">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Form Content */}
      <div className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-6 text-center uppercase">Ajouter une actualité</h1>

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            Actualité ajoutée avec succès!
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-gray-100 p-4 mb-4 rounded shadow-md">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Titre</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Description</label>
            <textarea
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Image</label>
            <input
              type="file"
              className="w-full p-2 border border-gray-300 rounded-lg"
              onChange={handleImageChange}
              required
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className={`w-[150px] p-2 text-white font-semibold rounded-lg text-center ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#051D41] hover:bg-[#08316f]'
              }`}
              disabled={loading}
            >
              {loading ? 'Ajout en cours...' : 'Ajouter'}
            </button>
          </div>
        </form>

        {loading && (
          <div className="flex justify-center">
            <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddNews;
