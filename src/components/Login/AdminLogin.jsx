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
        
        // Stockez le csrfToken dans localStorage
        localStorage.setItem('csrfToken', data.csrfToken);

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
    <section className="w-full h-screen bg-gray-300 flex items-center justify-center py-10" aria-labelledby="login-heading">
      {loading && (
        <div className="loader-overlay" aria-live="polite">
          <div className="loader"></div>
        </div>
      )}
      <div className="max-w-4xl w-full h-auto grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Formulaire de connexion */}
        <div className="p-6 flex flex-col justify-center items-center text-left space-y-4">
          <h2 id="login-heading" className="text-2xl md:text-3xl font-bold uppercase text-[#BE0B0B] text-center">Phoenix Admin</h2>
          {error && <p className="text-red-500 mb-4" role="alert">{error}</p>}
          <form onSubmit={handleSubmit} className="w-full">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border p-2 mb-4 w-full"
              placeholder="Entrez votre nom d'utilisateur"
              required
              aria-label="Nom d'utilisateur"
            />
            <div className="relative mb-4">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border p-2 w-full"
                placeholder="Entrez votre mot de passe"
                required
                aria-label="Mot de passe"
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)} 
                className="absolute right-2 top-2"
                aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
              >
                {showPassword ? 'Masquer' : 'Afficher'}
              </button>
            </div>
            <button type="submit" className="bg-[#051D41] text-white py-2 px-4 rounded w-full">
              Se connecter
            </button>
          </form>
        </div>

        {/* Section avec fond, logo et citation */}
        <div className="relative w-full h-[450px] md:h-[500px] flex flex-col items-center justify-center bg-[#051D41]">
          <div className="absolute top-1/4 flex flex-col items-center">
            <img
              src="/assets/logo.png"
              alt="Logo Phoenix"
              className="w-24 h-24 object-contain mb-4"
              loading="lazy"
            />
          </div>
          
          {/* Citation inspirante */}
          <div className="text-white text-center mt-20 px-6">
            <p className="text-lg italic font-bold uppercase text-gray-500">
              "La réussite n'est pas le fruit du hasard, mais celui de la persévérance et du travail acharné."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
