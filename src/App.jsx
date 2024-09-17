import React, { useState, useEffect } from 'react';
import { NavBar } from './components/navigation';
import { Header } from './components/Header';
import { Features } from './components/Features';
import { About } from './components/About';
import { Services } from './components/Services';
import Gallery from './components/Gallery';
import CommentsList from './components/CommentsList'; // Import du composant de la liste des commentaires
import ContactForm from './components/ContactForm'; // Import du formulaire de contact
import JsonData from './data/data.json';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Suppression de l'import de Link de 'react-scroll'

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  
  // État pour les commentaires
  const [comments, setComments] = useState([
    { name: 'John Doe', message: 'Super site web !', avatar: 'https://ui-avatars.com/api/?name=John+Doe' },
    { name: 'Jane Smith', message: 'J\'ai adoré le contenu.', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith' },
    { name: 'Andriah Mila', message: 'J\'aime le contenu.', avatar: 'https://ui-avatars.com/api/?name=Andriah+Mila' },
    { name: 'Mitsanta Andriah', message: 'C\'est vraiment interessant les services qu\'offre cette entreprise Phoenix Art.', avatar: 'https://ui-avatars.com/api/?name=Mitsanta+Andriah' }
  ]);

  // Charger les données du fichier JSON
  useEffect(() => {
    setLandingPageData(JsonData);
  }, []);

  // Fonction pour gérer l'ajout d'un commentaire
  const handleAddComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Header data={landingPageData.Header || {}} />
                <Features data={landingPageData.Features || []} />
                <About aboutData={landingPageData.About || {}} whyChooseUsData={landingPageData.WhyChooseUs || {}} />
                <Services data={landingPageData.Services || []} />
                <Gallery data={landingPageData.Gallery || {}} />
                {/* Passer la fonction d'ajout de commentaire à CommentsList */}
                <CommentsList comments={comments} onAddComment={handleAddComment} />
                {/* Ajouter le formulaire de contact ici */}
                <ContactForm />
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
