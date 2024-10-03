import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';

const AddNews = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNewsId, setEditingNewsId] = useState(null);

  const itemsPerPage = 2; // Limite d'actualités par page

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://backphoenixart-1.onrender.com/api/v1/actus/');
        setNewsList(response.data);
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
      } catch (err) {
        setError('Erreur lors de la récupération des actualités.');
      }
    };

    fetchNews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);

    // N'ajoutez pas l'image si vous modifiez une actualité
    if (!editingNewsId) {
      formData.append('image', image);
    }

    try {
      if (editingNewsId) {
        await axios.put(`https://backphoenixart-1.onrender.com/api/v1/actus/${editingNewsId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        await axios.post('https://backphoenixart-1.onrender.com/api/v1/actus/create/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      setSuccess(true);
      setTitle('');
      setDescription('');
      setImage(null);
      setEditingNewsId(null);
      setIsModalOpen(false);
      
      // Récupérer à nouveau les actualités
      const response = await axios.get('https://backphoenixart-1.onrender.com/api/v1/actus/');
      setNewsList(response.data);
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (newsId = null) => {
    if (newsId) {
      const newsToEdit = newsList.find((news) => news.id === newsId);
      setTitle(newsToEdit.title);
      setDescription(newsToEdit.description);
      setImage(newsToEdit.image);
      setEditingNewsId(newsId);
    } else {
      setTitle('');
      setDescription('');
      setImage(null);
      setEditingNewsId(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (newsId) => {
    try {
      await axios.delete(`https://backphoenixart-1.onrender.com/api/v1/actus/${newsId}`);
      setNewsList(newsList.filter((news) => news.id !== newsId));
    } catch (err) {
      setError('Erreur lors de la suppression de l\'actualité.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-300">
      <AdminSidebar />

      <main className="flex-grow p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-center uppercase" aria-label="Actualités">
            Actualités
          </h1>
          <button
            onClick={() => openModal()}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Ajouter une actualité
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            Actualité ajoutée avec succès!
          </div>
        )}

        <div>
          {newsList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((news) => (
            <div key={news.id} className="bg-gray-100 p-4 mb-4 rounded shadow-md flex flex-col md:flex-row">
              <div className="flex-grow">
                <h2 className="font-semibold">{news.title}</h2>
                <p>{news.description}</p>
              </div>
              <img src={news.image} alt={news.title} className="w-full h-48 object-cover mt-2 md:mt-0 md:w-64 md:h-48 ml-0 md:ml-4 rounded" />
              <div className="flex flex-col items-center justify-center md:flex-row md:items-start md:ml-2 mt-2 md:mt-0">
                <button
                  onClick={() => openModal(news.id)}
                  className="bg-yellow-500 text-white p-1 rounded mb-2 md:mb-0 md:mr-2"
                >
                  Modifier
                </button>
                <button
                  onClick={() => handleDelete(news.id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Supprimer
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Précédent
          </button>
          <span>
            Page {currentPage} sur {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="bg-gray-500 text-white p-2 rounded"
          >
            Suivant
          </button>
        </div>

        {/* Modal pour ajouter/modifier une actualité */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg w-[90%] md:w-[50%] h-auto"> 
              <h2 className="text-xl font-bold mb-4" aria-label={editingNewsId ? 'Modifier l\'actualité' : 'Ajouter une actualité'}>
                {editingNewsId ? 'Modifier l\'actualité' : 'Ajouter une actualité'}
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2" htmlFor="news-title">Titre</label>
                  <input
                    type="text"
                    id="news-title"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    aria-required="true"
                    placeholder="Entrez le titre ici"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2" htmlFor="news-description">Description</label>
                  <textarea
                    id="news-description"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    style={{ height: '100px' }} // Hauteur fixe
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    aria-required="true"
                    placeholder="Entrez la description ici"
                  ></textarea>
                </div>

                {editingNewsId && (
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Image actuelle</label>
                    <img
                      src={newsList.find((news) => news.id === editingNewsId).image}
                      alt={`Image de ${title}`}
                      className="w-full h-48 object-cover rounded"
                    />
                  </div>
                )}

                {!editingNewsId && (
                  <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="news-image">Image</label>
                    <input
                      type="file"
                      id="news-image"
                      onChange={(e) => setImage(e.target.files[0])}
                      required
                      aria-required="true"
                    />
                  </div>
                )}

                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded-lg"
                    disabled={loading}
                  >
                    {loading ? 'En cours...' : editingNewsId ? 'Modifier' : 'Ajouter'}
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="ml-2 bg-gray-500 text-white p-2 rounded-lg"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AddNews;
