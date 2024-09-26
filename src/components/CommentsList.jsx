import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CommentsList = () => {
  const [showForm, setShowForm] = useState(false); // Affichage du formulaire
  const [newComment, setNewComment] = useState({ name: '', message: '' }); // Nouveaux commentaires
  const [commentList, setCommentList] = useState([]); // Liste des commentaires
  const [loading, setLoading] = useState(true); // Indicateur de chargement
  const [error, setError] = useState(null); // Gestion des erreurs
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Suivi de l'authentification
  const [isCreatingAccount, setIsCreatingAccount] = useState(false); // Suivi du formulaire de création de compte
  const [passwordVisible, setPasswordVisible] = useState(false); // État pour la visibilité du mot de passe
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false); // État pour la visibilité du mot de passe de confirmation

  const apiURL = 'https://backphoenixart-1.onrender.com/api/v1/feedback/'; // URL du backend

  // récupération des commentaires
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

  useEffect(() => {
    fetchComments(); // Charger les commentaires au montage
  }, []);

  // ajout d'un nouveau commentaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newComment.name && newComment.message) {
      try {
        const response = await axios.post(apiURL, {
          name: newComment.name,
          message: newComment.message,
        });

        setCommentList([...commentList, response.data]); // Ajouter le nouveau commentaire
        setNewComment({ name: '', message: '' }); // Réinitialiser le formulaire
        setShowForm(false); // Fermer le formulaire
      } catch (err) {
        setError('Erreur lors de l\'ajout du commentaire');
      }
    }
  };

  // Fonction pour vérifier l'authentification
  const checkAuthentication = () => {
    const token = localStorage.getItem('authToken');
    return !!token; // Retourne true si un token est présent
  };

  const handleAddCommentClick = () => {
    if (checkAuthentication()) {
      setIsAuthenticated(true);
      setShowForm(true); // Afficher le formulaire de commentaire
    } else {
      setIsAuthenticated(false);
      setShowForm(true); // Afficher le formulaire de connexion ou d'inscription
    }
  };

  const toggleCreateAccount = () => {
    setIsCreatingAccount(!isCreatingAccount);
  };

  return (
    <div className="comments-list container mx-auto my-10 p-6 bg-gray-50 rounded-lg shadow-sm relative">
      <h2 className="text-4xl font-bold text-center uppercase mb-10">Avis & Commentaires</h2>

      {loading ? (
        <p className="text-center font-semibold">Chargement des commentaires...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : commentList.length > 0 ? (
        <div className="flex flex-wrap -mx-4">
          {commentList.map((comment, index) => {
            const avatar = `https://ui-avatars.com/api/?name=${comment.name.replace(' ', '+')}`;
            return (
              <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-4">
                <div className="flex items-start mb-4 p-4 bg-white rounded-lg shadow">
                  <img src={avatar} alt="Avatar" className="w-12 h-12 rounded-full mr-4 object-cover" />
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

      <div className="mt-8 text-center">
        <button
          onClick={handleAddCommentClick}
          className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow hover:bg-blue-600"
        >
          {showForm ? 'Annuler' : 'Ajouter un commentaire'}
        </button>
      </div>

      {showForm && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
            onClick={handleAddCommentClick}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg z-50 w-11/12 sm:w-2/3 lg:w-1/3 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowForm(false)}
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
              >
                Retour
              </button>

              {!isAuthenticated ? (
                !isCreatingAccount ? (
                  <form>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Nom d'utilisateur</label>
                      <input
                        type="text"
                        id="username"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Entrez votre nom d'utilisateur"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Mot de passe</label>
                      <div className="relative">
                        <input
                          type={passwordVisible ? 'text' : 'password'}
                          id="password"
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Entrez votre mot de passe"
                        />
                        <button
                          type="button"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                          className="absolute right-2 top-2 text-gray-500"
                        >
                          {passwordVisible ? 'Cacher' : 'Afficher'}
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <button className="px-6 py-2 bg-green-500 text-white font-bold rounded-lg shadow hover:bg-green-600">
                        Se connecter
                      </button>
                    </div>
                    <div className="text-center mt-4">
                      <p>Pas de compte ? <a onClick={toggleCreateAccount} className="text-blue-500 cursor-pointer">S'inscrire</a></p>
                    </div>
                  </form>
                ) : (
                  <form>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">Nom d'utilisateur</label>
                      <input
                        type="text"
                        id="username"
                        className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Entrez votre nom d'utilisateur"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">Mot de passe</label>
                      <div className="relative">
                        <input
                          type={passwordVisible ? 'text' : 'password'}
                          id="password"
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Entrez votre mot de passe"
                        />
                        <button
                          type="button"
                          onClick={() => setPasswordVisible(!passwordVisible)}
                          className="absolute right-2 top-2 text-gray-500"
                        >
                          {passwordVisible ? 'Cacher' : 'Afficher'}
                        </button>
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">Confirmez le mot de passe</label>
                      <div className="relative">
                        <input
                          type={confirmPasswordVisible ? 'text' : 'password'}
                          id="confirmPassword"
                          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Confirmez votre mot de passe"
                        />
                        <button
                          type="button"
                          onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                          className="absolute right-2 top-2 text-gray-500"
                        >
                          {confirmPasswordVisible ? 'Cacher' : 'Afficher'}
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <button className="px-6 py-2 bg-green-500 text-white font-bold rounded-lg shadow hover:bg-green-600">
                        S'inscrire
                      </button>
                    </div>
                    <div className="text-center mt-4">
                      <p>Déjà un compte ? <a onClick={toggleCreateAccount} className="text-blue-500 cursor-pointer">Se connecter</a></p>
                    </div>
                  </form>
                )
              ) : (
                // Formulaire de commentaire
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nom</label>
                    <input
                      type="text"
                      id="name"
                      value={newComment.name}
                      onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">Commentaire</label>
                    <textarea
                      id="message"
                      value={newComment.message}
                      onChange={(e) => setNewComment({ ...newComment, message: e.target.value })}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Votre commentaire"
                      required
                    ></textarea>
                  </div>
                  <div className="text-right">
                    <button className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg shadow hover:bg-blue-600">
                      Ajouter un commentaire
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CommentsList;
