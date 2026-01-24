import React, { useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';

// Lazy load pages for performance
const Home = React.lazy(() => import('./pages/Home'));
const Services = React.lazy(() => import('./pages/Services'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Approach = React.lazy(() => import('./pages/Approach'));
const Founder = React.lazy(() => import('./pages/Founder'));
const Work = React.lazy(() => import('./pages/Work'));
const Insights = React.lazy(() => import('./pages/Insights'));

// Growth Partner Imports
const GrowthPartnerLanding = React.lazy(() => import('./pages/GrowthPartner/Landing'));
const GrowthPartnerApply = React.lazy(() => import('./pages/GrowthPartner/Apply'));
const GrowthPartnerSignup = React.lazy(() => import('./pages/GrowthPartner/Signup'));
const GrowthPartnerLogin = React.lazy(() => import('./pages/GrowthPartner/Login'));
const GrowthPartnerDashboard = React.lazy(() => import('./pages/GrowthPartner/Dashboard'));
const AdminDashboard = React.lazy(() => import('./pages/Admin/Dashboard'));

const LoadingFallback = () => <div className="min-h-screen bg-black" />;

const HashHandler = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Check for hash-based URL on mount (e.g. /#/services) and redirect to clean URL
    if (window.location.hash) {
      const path = window.location.hash.replace('#', '');
      if (path && path !== '/') {
        window.history.replaceState(null, '', path);
        navigate(path, { replace: true });
      }
    }
  }, [navigate]);
  return null;
};

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
      <HashHandler />
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
        <Suspense fallback={<LoadingFallback />}>
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
        </Suspense>
      </Layout>
    </Router>
  );
};

export default App;