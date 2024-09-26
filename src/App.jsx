import React, { useState, useEffect } from 'react';
import { NavBar } from './components/navigation';
import { Header } from './components/Header';
import { Features } from './components/Features';
import { About } from './components/About';
import { Services } from './components/Services';
import Gallery from './components/Gallery';
import TeamSection from './components/TeamSection';
import CommentsList from './components/CommentsList'; 
import Actu from './components/Actu'; 
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import JsonData from './data/data.json';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SmoothScroll from 'smooth-scroll';
import { motion } from 'framer-motion'; // Import Framer Motion

const App = () => {
  const [landingPageData, setLandingPageData] = useState({});
  const [comments, setComments] = useState([]);

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

  // Variants pour l'animation de scroll reveal 
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8, // Temps de transition 
        ease: [0.42, 0, 0.58, 1], // Courbe d'anticipation et de relâchement pour plus de fluidité
      },
    },
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
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={sectionVariants}
                >
                  <Header data={landingPageData.Header || {}} />
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={sectionVariants}
                >
                  <Actu />
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={sectionVariants}
                >
                  <About
                    aboutData={landingPageData.About || {}}
                    whyChooseUsData={landingPageData.WhyChooseUs || {}}
                  />
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={sectionVariants}
                >
                  <Features data={landingPageData.Features || []} />
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={sectionVariants}
                >
                  <Services data={landingPageData.Services || []} />
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={sectionVariants}
                >
                  <Gallery data={landingPageData.Gallery || {}} />
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={sectionVariants}
                >
                  <TeamSection data={landingPageData.TeamSection || {}} />
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={sectionVariants}
                >
                  <CommentsList comments={comments} onAddComment={handleAddComment} />
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={sectionVariants}
                >
                  <ContactForm />
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  variants={sectionVariants}
                >
                  <Footer />
                </motion.div>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
