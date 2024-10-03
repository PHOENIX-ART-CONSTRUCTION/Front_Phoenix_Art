import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';

const ManageMembers = () => {
 /* const [comments, setComments] = useState([]); // Stocker les commentaires
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
  };*/

  return (
    <div className="flex bg-gray-300">
      <AdminSidebar />
      <div className="w-full h-screen p-6">
        <h2 className="text-3xl font-bold mb-4 text-center uppercase">Gestion des Equipes</h2>
        
      </div>
    </div>
  );
};

export default ManageMembers;
