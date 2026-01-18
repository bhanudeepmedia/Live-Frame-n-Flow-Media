import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
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

// Growth Partner Imports
import GrowthPartnerLanding from './pages/GrowthPartner/Landing';
import GrowthPartnerApply from './pages/GrowthPartner/Apply';
import GrowthPartnerSignup from './pages/GrowthPartner/Signup';
import GrowthPartnerLogin from './pages/GrowthPartner/Login';
import GrowthPartnerDashboard from './pages/GrowthPartner/Dashboard';
import AdminDashboard from './pages/Admin/Dashboard';

// Placeholder components for routes not fully implemented in this demo
const PlaceholderPage = ({ title }: { title: string }) => (
  <div className="min-h-screen flex items-center justify-center pt-20">
    <div className="text-center">
      <h1 className="text-4xl font-display font-bold mb-4">{title}</h1>
      <p className="text-white/50">Content coming soon...</p>
    </div>
  </div>
);

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const hideNavFooterSteps = [
    '/growth-partner/dashboard',
    '/admin/growth-partners-dashboard',
    '/growth-partner/signup',
    '/growth-partner/login'
  ];
  const shouldHide = hideNavFooterSteps.includes(location.pathname);

  return (
    <div className="min-h-screen bg-background text-white font-sans selection:bg-accent selection:text-background">
      <ScrollToTop />
      <CustomCursor />
      {!shouldHide && <Navbar />}

      <main>
        {children}
      </main>

      {!shouldHide && <Footer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/approach" element={<Approach />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/founder-bhanudeep" element={<Founder />} />
          <Route path="/work" element={<Work />} />
          <Route path="/insights" element={<Insights />} />

          {/* Growth Partner Ecosystem Routes */}
          <Route path="/growth-partner" element={<GrowthPartnerLanding />} />
          <Route path="/growth-partner/apply" element={<GrowthPartnerApply />} />
          <Route path="/growth-partner/signup" element={<GrowthPartnerSignup />} />
          <Route path="/growth-partner/login" element={<GrowthPartnerLogin />} />
          <Route path="/growth-partner/dashboard" element={<GrowthPartnerDashboard />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<GrowthPartnerLogin />} />
          <Route path="/admin/growth-partners-dashboard" element={<AdminDashboard />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;