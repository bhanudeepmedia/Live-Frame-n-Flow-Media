import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Approach from './pages/Approach';
import Founder from './pages/Founder';
import Work from './pages/Work';
import Insights from './pages/Insights';

// Placeholder components for routes not fully implemented in this demo
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="min-h-screen flex items-center justify-center pt-20">
    <div className="text-center">
      <h1 className="text-4xl font-display font-bold mb-4">{title}</h1>
      <p className="text-white/50">Content coming soon...</p>
    </div>
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-background text-white font-sans selection:bg-accent selection:text-background">
        <ScrollToTop />
        <CustomCursor />
        <Navbar />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/approach" element={<Approach />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/founder-bhanudeep" element={<Founder />} />
            <Route path="/work" element={<Work />} />
            <Route path="/insights" element={<Insights />} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;