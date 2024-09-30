import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Loader.css'; // Assurez-vous d'importer le fichier CSS

const AdminLogin = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false); // État pour le loader
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Afficher le loader

    // Requête POST vers le backend pour authentification
    try {
      const response = await fetch('https://backphoenixart-1.onrender.com/api/v1/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username, // Utilisation du username
          password: password,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        // Authentification réussie
        onLogin(); // Mettre à jour l'état d'authentification
        navigate('/admin_phoenixac/dashboard'); // Rediriger vers le tableau de bord
      } else {
        // Gestion des erreurs d'authentification
        setError(data.message || 'Nom d’utilisateur ou mot de passe incorrect');
      }
    } catch (error) {
      setError('Erreur lors de la connexion. Veuillez réessayer.');
    }
    
    setLoading(false); // Cacher le loader après la tentative
  };

  return (
    <section className="w-full h-screen bg-gray-300 flex items-center justify-center py-10">
      {loading && (
        <div className="loader-overlay">
          <div className="loader"></div>
        </div>
      )}
      <div className="max-w-4xl w-full h-auto grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Formulaire de connexion */}
        <div className="p-6 flex flex-col justify-center items-center text-left space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold uppercase text-center">Phoenix Admin</h2>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="w-full">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border p-2 mb-4 w-full"
              placeholder="Entrez votre nom d'utilisateur"
              required
            />
            <div className="relative mb-4">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 w-full"
                placeholder="Entrez votre mot de passe"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-2 top-2">
                {showPassword ? 'Masquer' : 'Afficher'}
              </button>
            </div>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded w-full">
              Se connecter
            </button>
          </form>
        </div>

        {/* Image d'administration */}
        <div className="relative w-full h-[450px] md:h-[500px] flex items-center justify-center">
          <img
            src="/assets/Admin.jpg"
            alt="Administration"
            className="w-full h-full object-cover transition-opacity duration-1000 ease-in-out"
          />
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
