import React, { useEffect } from 'react';
import { useRoutes, useLocation, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';
import { routes } from './routes';

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
  const element = useRoutes(routes);
  return (
    <Layout>
      {element}
    </Layout>
  );
};

export default App;