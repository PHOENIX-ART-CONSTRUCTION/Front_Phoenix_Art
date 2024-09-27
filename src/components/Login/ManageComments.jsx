import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';

const ManageComments = () => {
  const [comments, setComments] = useState([]); // Stocker les commentaires
  const [editingComment, setEditingComment] = useState(null); // Commentaire en cours d'édition
  const [newCommentText, setNewCommentText] = useState(''); // Texte modifié

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get('https://backphoenixart-1.onrender.com/api/v1/feedback/');
      setComments(response.data); // Supposant que la réponse soit un tableau de commentaires
    } catch (error) {
      console.error('Erreur lors du chargement des commentaires:', error);
    }
  };

  const handleDeleteComment = async (id) => {
    try {
      await axios.delete(`https://backphoenixart-1.onrender.com/api/v1/feedback/${id}`);
      fetchComments(); // Recharger les commentaires après suppression
    } catch (error) {
      console.error('Erreur lors de la suppression du commentaire:', error);
    }
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment);
    setNewCommentText(comment.message); // Mettre le texte du commentaire dans le champ d'édition
  };

  const handleUpdateComment = async (id) => {
    try {
      await axios.put(`https://backphoenixart-1.onrender.com/api/v1/feedback/${id}`, {
        message: newCommentText,
      });
      setEditingComment(null);
      fetchComments(); // Recharger les commentaires après modification
    } catch (error) {
      console.error('Erreur lors de la mise à jour du commentaire:', error);
    }
  };

  return (
    <div className="flex">
      <AdminSidebar />
      <div className="w-full h-screen p-6">
        <h2 className="text-2xl font-bold mb-4">Gestion des Commentaires</h2>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="bg-gray-100 p-4 mb-4 rounded shadow-md">
              {editingComment && editingComment._id === comment._id ? (
                <>
                  <textarea
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    className="border p-2 mb-4 w-full"
                  />
                  <button
                    onClick={() => handleUpdateComment(comment._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2"
                  >
                    Enregistrer
                  </button>
                  <button
                    onClick={() => setEditingComment(null)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  >
                    Annuler
                  </button>
                </>
              ) : (
                <>
                  <p>{comment.message}</p>
                  <div className="mt-2">
                    <button
                      onClick={() => handleEditComment(comment)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-lg mr-2"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                      Supprimer
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p>Aucun commentaire pour l'instant.</p>
        )}
      </div>
    </div>
  );
};

export default ManageComments;
