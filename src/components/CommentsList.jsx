import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentsList = () => {
  const [showForm, setShowForm] = useState(false); // Affichage du formulaire
  const [newComment, setNewComment] = useState({ name: '', message: '' }); // Nouveaux commentaires
  const [commentList, setCommentList] = useState([]); // Liste des commentaires
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [isSubmitting, setIsSubmitting] = useState(false); // Indicateur d'ajout du commentaire
  const [error, setError] = useState(null); // Gestion des erreurs
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const commentsPerPage = 6; // Nombre de commentaires à afficher par page
  const [successMessage, setSuccessMessage] = useState(''); // Message de succès

  const apiURL = 'https://backphoenixart-1.onrender.com/api/v1/feedback/'; // URL pour récupérer les commentaires
  const postCommentURL = 'https://backphoenixart-1.onrender.com/api/v1/feedback/create/'; // URL pour ajouter un commentaire

  // Récupération des commentaires
  const fetchComments = async () => {
    try {
      const response = await axios.get(apiURL);
      setCommentList(response.data); // Mise à jour de la liste des commentaires
      setLoading(false);
    } catch (err) {
      setError('Erreur lors du chargement des commentaires');
      setLoading(false);
    }
  };

  // Utilisation d'useEffect pour charger les commentaires au montage du composant
  useEffect(() => {
    fetchComments();
  }, []);

  // Ajout d'un nouveau commentaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Activer le loader

    // Vérifie que le nom et le message ne sont pas vides
    if (newComment.name && newComment.message) {
      try {
        // Envoyer la requête POST au backend pour ajouter un commentaire
        const response = await axios.post(postCommentURL, {
          name: newComment.name,
          message: newComment.message,
        });

        // Ajouter le nouveau commentaire à la liste locale
        setCommentList([...commentList, response.data]);

        // Réinitialiser le formulaire
        setNewComment({ name: '', message: '' });

        // Fermer le formulaire
        setShowForm(false);

        // Afficher un message de succès
        setSuccessMessage('Commentaire ajouté avec succès!');
        setTimeout(() => setSuccessMessage(''), 3000); // Effacer le message après 3 secondes
      } catch (err) {
        setError('Erreur lors de l\'ajout du commentaire');
      } finally {
        setIsSubmitting(false); // Désactiver le loader
      }
    }
  };

  // Fonction pour basculer l'affichage du formulaire
  const handleAddCommentClick = () => {
    setShowForm(!showForm);
  };

  // Pagination
  const indexOfLastComment = currentPage * commentsPerPage; // Index du dernier commentaire
  const indexOfFirstComment = indexOfLastComment - commentsPerPage; // Index du premier commentaire
  const currentComments = commentList.slice(indexOfFirstComment, indexOfLastComment); // Commentaires affichés

  const totalPages = Math.ceil(commentList.length / commentsPerPage); // Nombre total de pages

  // Changer de page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="comments-list container mx-auto my-10 p-6 bg-gray-50 rounded-lg shadow-sm relative">
      <h2 className="text-4xl font-bold text-center uppercase mb-10">Avis & Commentaires</h2>

      {/* Gestion du chargement et des erreurs */}
      {loading ? (
        <p className="text-center font-semibold">Chargement des commentaires...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : currentComments.length > 0 ? (
        <div className="flex flex-wrap -mx-4">
          {currentComments.map((comment, index) => {
            const avatar = `https://ui-avatars.com/api/?name=${comment.name.replace(' ', '+')}`; // Générez l'avatar ici
            return (
              <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-4">
                <div className="flex items-start mb-4 p-4 bg-white rounded-lg shadow">
                  {/* Avatar */}
                  <img
                    src={avatar} // Utilisez l'avatar généré
                    alt="Avatar"
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{comment.name}</h3>
                    <p>{comment.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center font-bold">Aucun commentaire pour l'instant. Soyez le premier à commenter !</p>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-4 py-2 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Bouton d'ajout de commentaire */}
      <div className="mt-8 text-center">
        <button
          onClick={handleAddCommentClick}
          className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow hover:bg-blue-600"
        >
          {showForm ? 'Annuler' : 'Ajouter un commentaire'}
        </button>
      </div>

      {/* Loader lors de l'envoi du commentaire */}
      {isSubmitting && <p className="text-center text-green-500 font-semibold">Envoi du commentaire...</p>}

      {/* Message de succès */}
      {successMessage && <p className="text-center text-green-500 font-bold mt-4">{successMessage}</p>}

      {/* Overlay et formulaire de commentaire */}
      {showForm && (
        <>
          {/* Overlay semi-transparent */}
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
            onClick={handleAddCommentClick}
          >
            {/* Formulaire centré */}
            <div
              className="bg-white p-6 rounded-lg shadow-lg z-50 w-11/12 sm:w-2/3 lg:w-1/3 relative"
              onClick={(e) => e.stopPropagation()} // Empêcher la fermeture lors d'un clic à l'intérieur du formulaire
            >
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Entrez votre nom"
                    value={newComment.name}
                    onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Entrez votre commentaire"
                    rows="4"
                    value={newComment.message}
                    onChange={(e) => setNewComment({ ...newComment, message: e.target.value })}
                  ></textarea>
                </div>
                <div className="text-right">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-500 text-white font-bold rounded-lg shadow hover:bg-green-600"
                  >
                    Envoyer
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CommentsList;
