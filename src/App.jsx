import React, { useState, useEffect } from 'react';
import { NavBar } from './components/navigation';
import { Header } from './components/Header';
import { Features } from './components/Features';
import { About } from './components/About';
import { Services } from './components/Services';
import Gallery from './components/Gallery';
import CommentsList from './components/CommentsList'; 
import ContactForm from './components/ContactForm';
import JsonData from './data/data.json';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SmoothScroll from 'smooth-scroll';

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  const [comments, setComments] = useState([
    { name: 'John Doe', message: 'Super site web !', avatar: 'https://ui-avatars.com/api/?name=John+Doe' },
    { name: 'Jane Smith', message: 'J\'ai adoré le contenu.', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith' },
    { name: 'Andriah Mila', message: 'J\'aime le contenu.', avatar: 'https://ui-avatars.com/api/?name=Andriah+Mila' },
    { name: 'Mitsanta Andriah', message: 'C\'est vraiment interessant les services qu\'offre cette entreprise Phoenix Art.', avatar: 'https://ui-avatars.com/api/?name=Mitsanta+Andriah' }
  ]);

  useEffect(() => {
    setLandingPageData(JsonData);

    new SmoothScroll('a[href*="#"]', {
      speed: 1000,
      speedAsDuration: true,
    });
  }, []);

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
                <CommentsList comments={comments} onAddComment={handleAddComment} />
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