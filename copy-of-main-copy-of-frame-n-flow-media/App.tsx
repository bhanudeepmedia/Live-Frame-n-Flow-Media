import React, { useEffect, useState } from 'react';
import { useRoutes, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppWidget from './components/WhatsAppWidget';
import LoadingScreen from './components/LoadingScreen';
import { routes } from './routes';
import { WhatsAppProvider } from './contexts/WhatsAppContext';

// Declare dataLayer and gtag for TypeScript
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

// GTM + GA4 Page View Tracker for SPA navigation
const useGTMPageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    // Initialize dataLayer if it doesn't exist
    window.dataLayer = window.dataLayer || [];

    // Send page_view to GA4 directly via gtag
    if (typeof window.gtag === 'function') {
      window.gtag('config', 'G-MGKYJ45STW', {
        page_path: location.pathname + location.search,
        page_title: document.title,
        page_location: window.location.href
      });
    }

    // Also push to dataLayer for GTM
    window.dataLayer.push({
      event: 'virtualPageview',
      page: {
        path: location.pathname,
        title: document.title,
        url: window.location.href,
        search: location.search,
        hash: location.hash
      }
    });
  }, [location.pathname, location.search, location.hash]);
};

const HashHandler = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Check for hash-based URL on mount
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

  // Track page views for GTM on route changes
  useGTMPageTracking();

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

      {!shouldHide && <WhatsAppWidget />}
    </div>
  );
};

const App: React.FC = () => {
  const element = useRoutes(routes);
  const [loading, setLoading] = useState(true);

  return (
    <>
      <WhatsAppProvider>
        <AnimatePresence mode='wait'>
          {loading && (
            <LoadingScreen key="loading" onComplete={() => setLoading(false)} />
          )}
        </AnimatePresence>

        {!loading && (
          <Layout>
            {element}
          </Layout>
        )}
      </WhatsAppProvider>
    </>
  );
};

export default App;