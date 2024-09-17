import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Fonction pour générer l'URL de l'avatar en fonction du nom
const generateAvatarURL = (name) => {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`;
};

const CommentsList = () => {
  const [showForm, setShowForm] = useState(false); // Affichage du formulaire
  const [newComment, setNewComment] = useState({ nom: '', message: '' }); // Nouveaux commentaires
  const [commentList, setCommentList] = useState([]); // Liste des commentaires
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [error, setError] = useState(null); // Gestion des erreurs

  const apiURL = 'http://192.168.1.108:8000/api/v1/feedback/'; // URL du backend

  // Fonction pour récupérer les commentaires
  const fetchComments = async () => {
    try {
      const response = await axios.get(apiURL);
      setCommentList(response.data.map(comment => ({
        ...comment,
        avatar: generateAvatarURL(comment.nom) // Génération de l'URL de l'avatar
      }))); // Mettre à jour la liste des commentaires avec les avatars
      setLoading(false); // Fin du chargement
    } catch (err) {
      setError('Erreur lors du chargement des commentaires');
      setLoading(false);
    }
  };

  // Utilisation d'useEffect pour charger les commentaires au montage du composant
  useEffect(() => {
    fetchComments();
  }, []);

  // Fonction pour ajouter un nouveau commentaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérifie que le nom et le message ne sont pas vides
    if (newComment.nom && newComment.message) {
      try {
        // Envoyer la requête POST au backend pour ajouter un commentaire
        const response = await axios.post(apiURL, {
          nom: newComment.nom,
          message: newComment.message
        });

        // Ajouter le nouveau commentaire à la liste locale avec l'avatar généré
        setCommentList([
          ...commentList,
          {
            ...response.data,
            avatar: generateAvatarURL(response.data.nom) // Génération de l'URL de l'avatar
          }
        ]);

        // Réinitialiser le formulaire
        setNewComment({ nom: '', message: '' });

        // Fermer le formulaire
        setShowForm(false);
      } catch (err) {
        setError('Erreur lors de l\'ajout du commentaire');
      }
    }
  };

  // Fonction pour basculer l'affichage du formulaire  
  const handleAddCommentClick = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="comments-list container mx-auto my-10 p-12 bg-gray-100 rounded-lg shadow-lg relative">
      <h2 className="text-4xl font-bold text-center mb-10">Commentaires</h2>

      {/* Gestion du chargement et des erreurs */}
      {loading ? (
        <p>Chargement des commentaires...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : commentList.length > 0 ? (
        <div className="flex flex-wrap -mx-4">
          {commentList.map((comment, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <div className="flex items-start mb-4 p-4 bg-white rounded-lg shadow">
                {/* Avatar */}
                <img
                  src={comment.avatar}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  {/* Affichage du nom */}
                  <h3 className="text-xl font-semibold">{comment.nom}</h3>
                  {/* Affichage du message */}
                  <p>{comment.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Aucun commentaire pour l'instant. Soyez le premier à commenter !</p>
      )}

      {/* Bouton d'ajout de commentaire */}
      <div className="mt-8 text-center">
        <button
          onClick={handleAddCommentClick}
          className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow hover:bg-blue-600"
        >
          {showForm ? 'Annuler' : 'Ajouter un commentaire'}
        </button>
      </div>

      {/* Overlay et formulaire de commentaire */}
      {showForm && (
        <>
          {/* Overlay semi-transparent */}
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
            onClick={handleAddCommentClick} // Clic sur l'overlay pour fermer le formulaire
          >
            {/* Formulaire centré */}
            <div
              className="bg-white p-6 rounded-lg shadow-lg z-50 w-11/12 sm:w-2/3 lg:w-1/3 relative"
              onClick={(e) => e.stopPropagation()} // Empêcher la fermeture lors d'un clic à l'intérieur du formulaire
            >
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nom">
                    Nom
                  </label>
                  <input
                    type="text"
                    id="nom"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Entrez votre nom"
                    value={newComment.nom}
                    onChange={(e) => setNewComment({ ...newComment, nom: e.target.value })}
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
