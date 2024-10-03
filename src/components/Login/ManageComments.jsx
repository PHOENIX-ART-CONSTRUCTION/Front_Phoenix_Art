import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminSidebar from './AdminSidebar';

const ManageComments = () => {
  const [comments, setComments] = useState([]);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [newCommentText, setNewCommentText] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoaderVisible, setIsLoaderVisible] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); 
  const commentsPerPage = 3; 

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await axios.get('https://backphoenixart-1.onrender.com/api/v1/feedback/');
      setComments(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des commentaires:', error);
    }
  };

  const handleDeleteComment = async (id) => {
    setIsLoaderVisible(true); // Afficher le loader
    try {
      await axios.delete(`https://backphoenixart-1.onrender.com/api/v1/feedback/${id}`);
      fetchComments();
    } catch (error) {
      console.error('Erreur lors de la suppression du commentaire:', error);
    } finally {
      setIsLoaderVisible(false); // Masquer le loader
      setCommentToDelete(null);
    }
  };

  const confirmDeleteComment = (id) => {
    setCommentToDelete(id);
  };

  const cancelDeleteComment = () => {
    setCommentToDelete(null);
  };

  const handleEditComment = (comment) => {
    setEditingCommentId(comment.id);
    setNewCommentText(comment.message);
    setIsModalOpen(true);
  };

  const handleUpdateComment = async (id) => {
    try {
      await axios.put(`https://backphoenixart-1.onrender.com/api/v1/feedback/${id}`, {
        message: newCommentText,
      });
      setEditingCommentId(null);
      setIsModalOpen(false);
      fetchComments();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du commentaire:', error);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Pagination Logic
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);
  const totalPages = Math.ceil(comments.length / commentsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row bg-gray-300">
      <AdminSidebar />
      <div className="w-full h-screen p-6 overflow-y-auto">
        <h2 className="text-3xl font-bold mb-4 text-center uppercase">Gestion des Commentaires</h2>
        {comments.length > 0 ? (
          <>
            {currentComments.map((comment) => (
              <div key={comment.id} className="bg-gray-100 p-4 mb-4 rounded shadow-md">
                <p className="font-semibold uppercase ">
                  <strong>Auteur :</strong> {comment.name}
                </p>
                <p className="bg-gray-100 p-2 rounded shadow-md">
                  <strong>Commentaire :</strong> {comment.message}
                </p>
                <div className="mt-2 flex flex-col md:flex-row md:justify-between">
                  <button
                    onClick={() => handleEditComment(comment)}
                    className="bg-[#051D41] text-white px-4 py-2 rounded-lg mb-2 md:mb-0 md:mr-2 w-full md:w-auto"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => confirmDeleteComment(comment.id)}
                    className="bg-[#BE0B0B] text-white px-4 py-2 rounded-lg w-full md:w-auto"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))}

            {/* Pagination Controls */}
            <div className="flex justify-center space-x-1 mt-4 flex-col md:flex-row">
              <button
                onClick={handlePreviousPage}
                disabled={currentPage === 1}
                className="bg-gray-500 text-white px-3 py-2 rounded-lg w-full md:w-auto"
              >
                Précédent
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="bg-gray-500 text-white px-4 py-2 mt-2 rounded-lg w-full md:w-auto"
              >
                Suivant
              </button>
            </div>
            <p className="text-center mt-2">
              Page {currentPage} sur {totalPages}
            </p>
          </>
        ) : (
          <p>Aucun commentaire pour l'instant.</p>
        )}
      </div>

      {/* Confirmation Modal for Deletion */}
      {commentToDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-md text-center">
            <h3 className="text-xl font-bold mb-4">Voulez-vous vraiment supprimer ce commentaire ?</h3>
            <div className="flex justify-between flex-col sm:flex-row mt-4">
              <button
                onClick={() => handleDeleteComment(commentToDelete)}
                className="bg-[#BE0B0B] text-white px-4 py-2 rounded-lg w-full sm:w-auto mb-2 sm:mb-0"
              >
                Oui
              </button>
              <button
                onClick={cancelDeleteComment}
                className="bg-gray-300 text-black px-4 py-2 rounded-lg w-full sm:w-auto"
              >
                Non
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Editing Comment */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
            <h3 className="text-xl font-bold mb-4 text-center uppercase">Modifier le Commentaire</h3>
            <textarea
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <div className="flex justify-end space-x-2 flex-col sm:flex-row">
              <button
                onClick={() => handleUpdateComment(editingCommentId)}
                className="bg-[#267a05] text-white px-4 py-2 rounded-lg w-full sm:w-auto"
              >
                Enregistrer
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-[#BE0B0B] text-white px-4 py-2 rounded-lg w-full sm:w-auto"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Loader */}
      {isLoaderVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="loader"></div> {/* Utilisation du loader */}
        </div>
      )}
    </div>
  );
};

export default ManageComments;
