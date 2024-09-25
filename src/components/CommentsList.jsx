import React, { useState } from 'react';

const CommentsList = ({ comments }) => {
  const [showForm, setShowForm] = useState(false); // Affichage du formulaire
  const [newComment, setNewComment] = useState({ name: '', message: '' }); // Nouveaux commentaires
  const [commentList, setCommentList] = useState(comments); // Liste des commentaires

  // Fonction pour basculer l'affichage du formulaire
  const handleAddCommentClick = () => {
    setShowForm(!showForm);
  };

  // Fonction pour gérer l'envoi du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifie que le nom et le message ne sont pas vides
    if (newComment.name && newComment.message) {
      // Ajouter un nouvel avatar avec un service de génération d'avatar
      const avatar = `https://ui-avatars.com/api/?name=${newComment.name.replace(' ', '+')}`;
      
      // Ajouter le nouveau commentaire à la liste
      setCommentList([...commentList, { ...newComment, avatar }]);

      // Réinitialiser le formulaire
      setNewComment({ name: '', message: '' });
      
      // Fermer le formulaire
      setShowForm(false);
    }
  };

  return (
    <div className="comments-list container mx-auto my-10 p-6 relative">
      <h2 className="text-4xl uppercase font-bold text-center mb-10">Avis & Commentaires</h2>

      {/* Affichage des commentaires */}
      {commentList.length > 0 ? (
        <div className="flex flex-wrap -mx-4">
          {commentList.map((comment, index) => (
            <div key={index} className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <div className="flex items-start mb-4 p-4 bg-white rounded-lg shadow-xl">
                {/* Avatar */}
                <img
                  src={comment.avatar}
                  alt="Avatar"
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold">{comment.name}</h3>
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
